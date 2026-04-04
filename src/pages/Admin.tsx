import { useState, useEffect, useCallback } from 'react';
import Login from '../admin/Login';
import AdminLayout from '../admin/AdminLayout';
import Inquiries from '../admin/Inquiries';
import Courses from '../admin/Courses';
import Stories from '../admin/Stories';
import Testimonials from '../admin/Testimonials';
import Gallery from '../admin/Gallery';
import Recruitments from '../admin/Recruitments';
import CentersManagement from '../admin/CentersManagement';
import Students from '../admin/Students';
import Admissions from '../admin/Admissions';
import FranchiseManagement from '../admin/FranchiseManagement';
import { NotificationProvider, useNotification } from '../components/AdminUI/NotificationProvider';


const API_BASE = 'http://127.0.0.1:5050/api';

function AdminContent({ token, onLogout, role }: { token: string; onLogout: () => void; role: string }) {

    const { confirm, showToast } = useNotification();
    const [activeTab, setActiveTab] = useState(role === 'franchise' ? 'admissions' : 'inquiries');
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [allCourses, setAllCourses] = useState<any[]>([]);

    const fetchCourses = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE}/courses`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const result = await res.json();
                setAllCourses(result);
            }
        } catch (err) {
            console.error('Error fetching global courses');
        }
    }, [token]);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const isPaginated = ['inquiries', 'franchise', 'recruitment'].includes(activeTab);
            const url = isPaginated
                ? `${API_BASE}/${activeTab}?page=${page}&limit=10`
                : `${API_BASE}/${activeTab}`;

            const res = await fetch(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const result = await res.json();
            if (res.ok) {
                if (isPaginated && result.data) {
                    setData(result.data);
                    setTotalPages(Math.ceil(result.total / result.limit));
                } else {
                    setData(result);
                    setTotalPages(1);
                }
            } else {
                if (res.status === 401) onLogout();
                console.error('Fetch error:', result.message);
            }
        } catch (err) {
            console.error('Network error fetching data');
        }
        setLoading(false);
    }, [activeTab, token, onLogout, page]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        setPage(1);
    }, [activeTab]);


    const handleAdd = async (newData: any) => {
        setLoading(true);
        try {
            const isFormData = newData instanceof FormData;
            const res = await fetch(`${API_BASE}/${activeTab}`, {
                method: 'POST',
                headers: {
                    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
                    'Authorization': `Bearer ${token}`
                },
                body: isFormData ? newData : JSON.stringify(newData),
            });

            if (res.ok) {
                showToast(`New ${activeTab.slice(0, -1)} added successfully`, 'success');
                fetchData();
                setShowForm(false);
            } else {
                if (res.status === 401) onLogout();
                const result = await res.json();
                showToast(result.message || 'Error adding item', 'error');
                setLoading(false);
            }

        } catch (err) {
            console.error(`Error adding to ${activeTab}:`, err);
            showToast('Network error or server unavailable', 'error');
            setLoading(false);
        }
    };

    const handleDelete = async (id: any) => {
        const isConfirmed = await confirm({
            title: 'Delete Confirmation',
            message: 'Are you sure you want to delete this recorded item? This action cannot be undone.',
            confirmText: 'Yes, Delete',
            cancelText: 'Cancel',
            type: 'danger'
        });

        if (!isConfirmed) return;

        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/${activeTab}/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                showToast('Item deleted successfully', 'success');
                fetchData();
            } else {
                if (res.status === 401) onLogout();
                const result = await res.json();
                showToast(result.message || 'Error deleting item', 'error');
                setLoading(false);
            }

        } catch (err) {
            showToast('Network error during deletion', 'error');
            console.error(`Error deleting from ${activeTab}`);
            setLoading(false);
        }
    };

    const handleSaveCenter = async (centerData: any) => {
        setLoading(true);
        try {
            const isUpdate = !!centerData.id;
            const url = isUpdate ? `${API_BASE}/centers/${centerData.id}` : `${API_BASE}/centers`;
            const method = isUpdate ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(centerData),
            });

            if (res.ok) {
                showToast(`Center ${isUpdate ? 'updated' : 'added'} successfully`, 'success');
                fetchData();
                setShowForm(false);
            } else {
                if (res.status === 401) onLogout();
                const result = await res.json();
                showToast(result.message || 'Error saving center', 'error');
                setLoading(false);
            }

        } catch (err) {
            console.error('Error saving center:', err);
            showToast('Network error or server unavailable', 'error');
            setLoading(false);
        }
    };

    const handleSaveStudent = async (studentData: any) => {
        setLoading(true);
        try {
            const isFormData = studentData instanceof FormData;
            let rid = '';

            if (isFormData) {
                rid = studentData.get('rid') as string;
            } else {
                rid = studentData.rid;
            }

            // Check if student exists in current data to determine if it's an update
            const isUpdate = data.some(s => s.rid === rid);

            const url = isUpdate ? `${API_BASE}/studentinfo/${rid}` : `${API_BASE}/studentinfo`;
            const method = isUpdate ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
                    'Authorization': `Bearer ${token}`
                },
                body: isFormData ? studentData : JSON.stringify(studentData),
            });

            if (res.ok) {
                showToast(`Student ${isUpdate ? 'updated' : 'added'} successfully`, 'success');
                setShowForm(false);
                fetchData();
            } else {
                if (res.status === 401) onLogout();
                const result = await res.json();
                showToast(result.message || 'Error saving student', 'error');
                setLoading(false);
            }
        } catch (err) {
            console.error('Error saving student:', err);
            showToast('Network error or server unavailable', 'error');
            setLoading(false);
        }
    };

    const handleSaveFranchise = async (franchiseData: any) => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/franchise-accounts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(franchiseData),
            });

            if (res.ok) {
                showToast('Franchise registered successfully', 'success');
                fetchData();
            } else {
                if (res.status === 401) onLogout();
                const result = await res.json();
                showToast(result.message || 'Error registering franchise', 'error');
            }
        } catch (err) {
            showToast('Network error', 'error');
        }
        setLoading(false);
    };

    const handleDeleteFranchise = async (id: number) => {
        const isConfirmed = await confirm({
            title: 'Delete Franchise',
            message: 'Are you sure? This will remove their login access.',
            confirmText: 'Delete Account',
            type: 'danger'
        });
        if (!isConfirmed) return;

        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/franchise-accounts/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                showToast('Franchise deleted', 'success');
                fetchData();
            } else {
                if (res.status === 401) onLogout();
            }
        } catch (err) {
            showToast('Network error', 'error');
        }
        setLoading(false);
    };


    return (
        <AdminLayout
            activeTab={activeTab}
            setActiveTab={(tab) => { setActiveTab(tab); setShowForm(false); }}
            onLogout={onLogout}
            onAdd={!['inquiries', 'recruitment', 'franchise-accounts'].includes(activeTab) ? () => setShowForm(true) : undefined}
            role={role}
        >
            {activeTab === 'inquiries' && <Inquiries data={data} loading={loading} onDelete={handleDelete} page={page} totalPages={totalPages} onPageChange={setPage} />}
            {activeTab === 'franchise' && <Inquiries data={data} loading={loading} onDelete={handleDelete} page={page} totalPages={totalPages} onPageChange={setPage} />}
            {activeTab === 'centers' && <CentersManagement data={data} loading={loading} onDelete={handleDelete} onSave={handleSaveCenter} />}
            {activeTab === 'franchise-accounts' && <FranchiseManagement data={data} loading={loading} onSave={handleSaveFranchise} onDelete={handleDeleteFranchise} />}


            {activeTab === 'courses' && (
                <Courses
                    data={data}
                    loading={loading}
                    onAddCourse={handleAdd}
                    onDeleteCourse={handleDelete}
                    showForm={showForm}
                    setShowForm={setShowForm}
                />
            )}
            {activeTab === 'stories' && (
                <Stories
                    data={data}
                    loading={loading}
                    onAddStory={handleAdd}
                    onDeleteStory={handleDelete}
                    showForm={showForm}
                    setShowForm={setShowForm}
                />
            )}
            {activeTab === 'testimonials' && (
                <Testimonials
                    data={data}
                    loading={loading}
                    onAddTestimonial={handleAdd}
                    onDeleteTestimonial={handleDelete}
                    showForm={showForm}
                    setShowForm={setShowForm}
                />
            )}
            {activeTab === 'gallery' && (
                <Gallery
                    data={data}
                    loading={loading}
                    onAddImage={handleAdd}
                    onDeleteImage={handleDelete}
                    showForm={showForm}
                    setShowForm={setShowForm}
                />
            )}
            {activeTab === 'recruitment' && <Recruitments data={data} loading={loading} onDelete={handleDelete} page={page} totalPages={totalPages} onPageChange={setPage} />}

            {activeTab === 'studentinfo' && (
                <Students
                    data={data}
                    loading={loading}
                    onAddStudent={handleSaveStudent}
                    onDeleteStudent={handleDelete}
                    showForm={showForm}
                    setShowForm={setShowForm}
                    courses={allCourses}
                />
            )}
            {activeTab === 'admissions' && (
                <Admissions
                    data={data}
                    loading={loading}
                    onAddAdmission={handleAdd}
                    onDeleteAdmission={handleDelete}
                    showForm={showForm}
                    setShowForm={setShowForm}
                    role={role}
                    courses={allCourses}
                />
            )}
        </AdminLayout>
    );
}

export default function Admin() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState('');
    const [role, setRole] = useState('admin');

    useEffect(() => {
        const verifyToken = async (storedToken: string) => {
            try {
                const res = await fetch(`${API_BASE}/auth/verify`, {
                    headers: { 'Authorization': `Bearer ${storedToken}` }
                });
                const result = await res.json();
                if (res.ok) {
                    setToken(storedToken);
                    setRole(result.user.role || 'admin');
                    setIsLoggedIn(true);
                } else {
                    localStorage.removeItem('altron_admin_token');
                    setIsLoggedIn(false);
                }
            } catch (err) {
                console.error('Token verification failed');
                localStorage.removeItem('altron_admin_token');
                setIsLoggedIn(false);
            }
        };


        const savedToken = localStorage.getItem('altron_admin_token');
        if (savedToken) {
            verifyToken(savedToken);
        }
    }, []);


    const onLogin = (newToken: string, userRole: string = 'admin') => {
        localStorage.setItem('altron_admin_token', newToken);
        setToken(newToken);
        setRole(userRole);
        setIsLoggedIn(true);
    };


    const onLogout = () => {
        localStorage.removeItem('altron_admin_token');
        setIsLoggedIn(false);
        setToken('');
    };

    if (!isLoggedIn) {
        return <Login onLogin={onLogin} />;
    }

    return (
        <NotificationProvider>
            <AdminContent token={token} onLogout={onLogout} role={role} />
        </NotificationProvider>
    );

}
