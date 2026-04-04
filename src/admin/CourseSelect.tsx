import { useState, useEffect } from 'react';

import { ChevronDown, Plus } from 'lucide-react';

interface CourseSelectProps {
    value: string;
    onChange: (value: string) => void;
    courses: any[];
    label?: string;
    required?: boolean;
    placeholder?: string;
}

export default function CourseSelect({ value, onChange, courses, label = "Course/Subject", required = true, placeholder = "Select Course" }: CourseSelectProps) {
    const [isAddingNew, setIsAddingNew] = useState(false);

    // If the value is not in the predefined list and not empty, it might be a custom entry
    useEffect(() => {
        if (value && !courses.some(c => c.title === value) && !isAddingNew) {
            // Check if it's a legacy value or something we should show as custom
            // But usually we just let the parent control it.
        }
    }, [value, courses]);

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <label className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{label}</label>
                <button
                    type="button"
                    onClick={() => setIsAddingNew(!isAddingNew)}
                    className="text-[10px] text-brand-400 font-bold uppercase hover:text-white transition-colors flex items-center gap-1"
                >
                    {isAddingNew ? 'Select from list' : <><Plus size={10} /> Add New</>}
                </button>
            </div>

            {isAddingNew ? (
                <input
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    className="w-full bg-white/5 border border-brand-500/30 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none animate-in fade-in zoom-in duration-200"
                    placeholder="Type new course name..."
                    required={required}
                    autoFocus
                />
            ) : (
                <div className="relative group">
                    <select
                        value={value}
                        onChange={e => onChange(e.target.value)}
                        className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none cursor-pointer appearance-none transition-all pr-10 hover:border-white/20"
                        required={required}
                    >
                        <option value="">{placeholder}</option>
                        {courses.map((course, idx) => (
                            <option key={course.id || idx} value={course.title}>
                                {course.title}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 group-hover:text-gray-300 transition-colors">
                        <ChevronDown size={16} />
                    </div>
                </div>
            )}
        </div>
    );
}
