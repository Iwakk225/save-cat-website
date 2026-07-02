import { useState, useEffect } from 'react';

export default function useReports() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('semua');
    const [statusFilter, setStatus] = useState('semua');
    const [sortBy, setSortBy] = useState('terbaru');
    const [page, setPage] = useState(1);

    const [reports, setReports] = useState([]);
    const [stats, setStats] = useState({ total: 0, aktif: 0, selesai: 0, darurat: 0 });
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const fetchReports = async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams({
                search, category, status: statusFilter, sortBy, page,
            });
            const res = await fetch(`/api/reports?${params.toString()}`);
            if (res.ok) {
                const data = await res.json();
                setReports(data.reports);
                setStats(data.stats);
                setTotalPages(data.pagination.last_page);
                setTotalItems(data.pagination.total);
            }
        } catch (e) {
            console.error("Gagal memuat laporan", e);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => { setPage(1); }, [search, category, statusFilter, sortBy]);


    useEffect(() => {
        fetchReports();
    }, [search, category, statusFilter, sortBy, page]);

    const resetFilters = () => {
        setSearch('');
        setCategory('semua');
        setStatus('semua');
    };

    return {
        search, setSearch,
        category, setCategory,
        statusFilter, setStatus,
        sortBy, setSortBy,
        page, setPage,
        reports, stats, totalPages, totalItems, isLoading,
        resetFilters
    };
}