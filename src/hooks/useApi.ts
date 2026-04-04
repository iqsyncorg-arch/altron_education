import { useState, useEffect } from 'react';

const API_BASE = 'http://api.altroneducation.com/api';

export function useApi<T>(endpoint: string, initialData: T[] = []) {
    const [data, setData] = useState<T[]>(initialData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE}${endpoint}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const result = await response.json();
                setData(Array.isArray(result) ? result : [result]);
            } catch (err: any) {
                setError(err.message);
                console.error(`Fetch error at ${endpoint}:`, err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint]);

    return { data, loading, error };
}
