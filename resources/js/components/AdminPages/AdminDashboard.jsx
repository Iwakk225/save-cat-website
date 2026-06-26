import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
    Search,
    Users,
    Activity,
    MessageSquare,
    Calendar,
    MapPin,
    ThumbsUp,
    ChevronLeft,
    ChevronRight,
    X,
    Shield,
    ArrowLeft,
    LogOut,
    FileText,
    CheckCircle,
    UserX,
    Sparkles,
    Eye,
    MessageCircle,
    RefreshCw,
    Trash2
} from 'lucide-react';
import { initialUsers, initialPosts, initialComments } from './mockData';
import Logo from '@/assets/savecatlogo.png';
import BgImage from '@/assets/imageskitten.jpeg';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [currentTab, setCurrentTab] = useState('overview'); // 'overview', 'users', 'reports', 'comments'
    
    // Global simulated state
    const [users, setUsers] = useState(initialUsers);
    const [posts, setPosts] = useState(initialPosts);
    const [comments, setComments] = useState(initialComments);

    // Common states
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Filters for reports tab
    const [reportStatusFilter, setReportStatusFilter] = useState('all'); // 'all', 'active', 'resolved'

    // Detail Modal States
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalTab, setModalTab] = useState('posts'); // 'posts' or 'comments'
    
    // View report modal state
    const [selectedReport, setSelectedReport] = useState(null);

    // Admin Info State
    const [adminUser, setAdminUser] = useState(null);
    const [isBypassed, setIsBypassed] = useState(false);

    useEffect(() => {
        // Cek admin status dari localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setAdminUser(parsed);
        } else {
            // Demo mode fallback
            setAdminUser({
                name: 'Demo Administrator',
                email: 'admin@savecat.com',
                is_admin: true
            });
        }
    }, []);

    const handleBypassDemo = () => {
        setIsBypassed(true);
        setAdminUser({
            name: 'Demo Administrator (Bypassed)',
            email: 'admin@savecat.com',
            is_admin: true
        });
    };

    // Reset pagination and search query when changing tabs
    useEffect(() => {
        setSearchQuery('');
        setCurrentPage(1);
    }, [currentTab]);

    // Statistics calculations
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status === 'online').length;
    const totalPosts = posts.length;
    const totalComments = comments.length;

    // Format Date Helper
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // ==========================================
    // ACTIONS FOR USERS TAB
    // ==========================================
    const handleForceLogout = (userId, userName) => {
        Swal.fire({
            title: 'Putuskan Sesi User?',
            text: `Apakah Anda yakin ingin melakukan force logout pada ${userName}? Sesi login mereka akan langsung diakhiri.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Ya, Keluarkan!',
            cancelButtonText: 'Batal',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                // Update user status to offline
                setUsers(prevUsers =>
                    prevUsers.map(u => (u.id === userId ? { ...u, status: 'offline' } : u))
                );

                // If currently viewed in modal, update modal state too
                if (selectedUser && selectedUser.id === userId) {
                    setSelectedUser(prev => ({ ...prev, status: 'offline' }));
                }

                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil Keluar',
                    text: `Sesi login ${userName} telah diputuskan.`,
                    confirmButtonColor: '#10b981',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    };

    const handleViewDetails = (user) => {
        // Filter posts and comments dynamically from parent states
        const userPosts = posts.filter(p => p.user_id === user.id);
        const userComments = comments
            .filter(c => c.user_id === user.id)
            .map(c => {
                const post = posts.find(p => p.id === c.post_id);
                return {
                    ...c,
                    post_title: post ? post.title : 'Postingan tidak ditemukan'
                };
            });

        setSelectedUser({
            ...user,
            postsList: userPosts,
            commentsList: userComments
        });
        setModalTab('posts');
    };

    // ==========================================
    // ACTIONS FOR REPORTS TAB
    // ==========================================
    const handleTogglePostStatus = (postId, currentStatus, postTitle) => {
        const nextStatus = currentStatus === 'active' ? 'resolved' : 'active';
        const nextStatusLabel = nextStatus === 'resolved' ? 'Selesai (Resolved)' : 'Aktif';

        Swal.fire({
            title: 'Ubah Status Laporan?',
            text: `Ubah status laporan "${postTitle}" menjadi ${nextStatusLabel}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#10b981',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Ya, Ubah!',
            cancelButtonText: 'Batal',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                setPosts(prevPosts =>
                    prevPosts.map(p => (p.id === postId ? { ...p, status: nextStatus } : p))
                );

                Swal.fire({
                    icon: 'success',
                    title: 'Status Diperbarui',
                    text: `Laporan sekarang ditandai sebagai ${nextStatusLabel}.`,
                    confirmButtonColor: '#10b981',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    };

    const handleDeletePost = (postId, postTitle) => {
        Swal.fire({
            title: 'Hapus Laporan?',
            text: `Apakah Anda yakin ingin menghapus laporan "${postTitle}"? Semua komentar di bawah postingan ini juga akan ikut terhapus.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                // Remove the post
                setPosts(prev => prev.filter(p => p.id !== postId));
                // Cascade delete comments belonging to this post
                setComments(prev => prev.filter(c => c.post_id !== postId));

                Swal.fire({
                    icon: 'success',
                    title: 'Laporan Dihapus',
                    text: 'Laporan dan diskusinya telah berhasil dihapus.',
                    confirmButtonColor: '#10b981',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    };

    // ==========================================
    // ACTIONS FOR COMMENTS TAB
    // ==========================================
    const handleDeleteComment = (commentId, commenterName) => {
        Swal.fire({
            title: 'Hapus Komentar?',
            text: `Hapus komentar dari ${commenterName}? Tindakan ini tidak dapat dibatalkan.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                setComments(prev => prev.filter(c => c.id !== commentId));

                Swal.fire({
                    icon: 'success',
                    title: 'Komentar Dihapus',
                    text: 'Komentar berhasil dihapus.',
                    confirmButtonColor: '#10b981',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    };

    // Loading State
    if (!adminUser) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white font-poppins">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    // Access Denied State
    if (!adminUser.is_admin && !isBypassed) {
        return (
            <div className="relative min-h-screen flex items-center justify-center p-4 font-poppins text-white bg-slate-950">
                {/* Background */}
                <div className="absolute inset-0 z-0">
                    <img src={BgImage} alt="Background" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-linear-to-br from-teal-950/90 via-slate-950/85 to-emerald-950/90 backdrop-blur-md" />
                </div>
                
                {/* Content Card */}
                <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8 text-center space-y-6 animate-slide-up">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center mx-auto text-red-400">
                        <Shield className="w-8 h-8" />
                    </div>
                    
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold">Akses Ditolak</h2>
                        <p className="text-sm text-gray-300">
                            Maaf, akun Anda ({adminUser.name}) tidak memiliki wewenang untuk membuka Dashboard Administrator.
                        </p>
                    </div>

                    <div className="space-y-3 pt-2">
                        <button
                            onClick={handleBypassDemo}
                            className="cursor-pointer w-full bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/20 text-sm flex items-center justify-center gap-2"
                        >
                            <Sparkles className="w-4 h-4 animate-pulse" />
                            Masuk Demo Admin (Reviewer Mode)
                        </button>
                        
                        <button
                            onClick={() => navigate('/')}
                            className="cursor-pointer w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3 px-4 rounded-xl transition-colors text-sm"
                        >
                            Kembali ke Beranda
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ==========================================
    // FILTER & PAGINATION CALCULATIONS BY TAB
    // ==========================================
    
    // 1. Users Tab Calculations
    const filteredUsers = users.filter(user => {
        const query = searchQuery.toLowerCase();
        return (
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.telp.includes(query)
        );
    });
    const usersTotalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const usersStartIndex = (currentPage - 1) * itemsPerPage;
    const paginatedUsers = filteredUsers.slice(usersStartIndex, usersStartIndex + itemsPerPage);

    // 2. Reports Tab Calculations
    const filteredPosts = posts.filter(post => {
        const query = searchQuery.toLowerCase();
        const reporter = users.find(u => u.id === post.user_id);
        const reporterName = reporter ? reporter.name.toLowerCase() : 'unknown';

        const matchesQuery = 
            post.title.toLowerCase().includes(query) ||
            post.location.toLowerCase().includes(query) ||
            post.content.toLowerCase().includes(query) ||
            reporterName.includes(query);

        const matchesStatus = 
            reportStatusFilter === 'all' || 
            post.status === reportStatusFilter;

        return matchesQuery && matchesStatus;
    });
    const reportsTotalPages = Math.ceil(filteredPosts.length / itemsPerPage);
    const reportsStartIndex = (currentPage - 1) * itemsPerPage;
    const paginatedPosts = filteredPosts.slice(reportsStartIndex, reportsStartIndex + itemsPerPage);

    // 3. Comments Tab Calculations
    const filteredComments = comments.map(comment => {
        const user = users.find(u => u.id === comment.user_id);
        const post = posts.find(p => p.id === comment.post_id);
        return {
            ...comment,
            user_name: user ? user.name : 'Unknown',
            post_title: post ? post.title : 'Postingan Dihapus/Tidak ditemukan'
        };
    }).filter(comment => {
        const query = searchQuery.toLowerCase();
        return (
            comment.content.toLowerCase().includes(query) ||
            comment.user_name.toLowerCase().includes(query) ||
            comment.post_title.toLowerCase().includes(query)
        );
    });
    const commentsTotalPages = Math.ceil(filteredComments.length / itemsPerPage);
    const commentsStartIndex = (currentPage - 1) * itemsPerPage;
    const paginatedComments = filteredComments.slice(commentsStartIndex, commentsStartIndex + itemsPerPage);

    return (
        <div className="relative min-h-screen font-poppins overflow-x-hidden text-white bg-slate-950">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0 animate-fade-in">
                <img
                    src={BgImage}
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-br from-teal-950/90 via-slate-950/85 to-emerald-950/90 backdrop-blur-md" />
            </div>

            {/* Main Layout Grid */}
            <div className="relative z-10 flex min-h-screen">
                {/* Sidebar */}
                <aside className="w-80 bg-slate-900/60 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col justify-between hidden md:flex">
                    <div className="space-y-8">
                        {/* Logo */}
                        <div className="flex items-center space-x-3 pb-6 border-b border-white/10">
                            <img src={Logo} alt="Save Cat Logo" className="w-12 h-12 object-contain animate-pulse" />
                            <div>
                                <h2 className="font-bold text-lg leading-tight tracking-wider text-emerald-400">Save Cat</h2>
                                <span className="text-xs text-gray-400">ADMINISTRATOR</span>
                            </div>
                        </div>

                        {/* Admin Badge */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-400 to-teal-600 flex items-center justify-center font-bold text-white shadow-inner">
                                AD
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-semibold truncate">{adminUser?.name}</p>
                                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full inline-block mt-1 font-medium">
                                    Super Admin
                                </span>
                            </div>
                        </div>

                        {/* Navigation Menu */}
                        <nav className="space-y-2">
                            <button
                                onClick={() => setCurrentTab('overview')}
                                className={`cursor-pointer w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                                    currentTab === 'overview'
                                        ? 'bg-linear-to-r from-emerald-600 to-teal-600 text-white font-medium shadow-md shadow-emerald-500/20'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <Activity className="w-5 h-5" />
                                <span>Beranda & Statistik</span>
                            </button>

                            <button
                                onClick={() => setCurrentTab('users')}
                                className={`cursor-pointer w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                                    currentTab === 'users'
                                        ? 'bg-linear-to-r from-emerald-600 to-teal-600 text-white font-medium shadow-md shadow-emerald-500/20'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <Users className="w-5 h-5" />
                                <span>Pemantauan User</span>
                            </button>

                            <button
                                onClick={() => setCurrentTab('reports')}
                                className={`cursor-pointer w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                                    currentTab === 'reports'
                                        ? 'bg-linear-to-r from-emerald-600 to-teal-600 text-white font-medium shadow-md shadow-emerald-500/20'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <FileText className="w-5 h-5" />
                                <span>Manajemen Laporan</span>
                            </button>

                            <button
                                onClick={() => setCurrentTab('comments')}
                                className={`cursor-pointer w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                                    currentTab === 'comments'
                                        ? 'bg-linear-to-r from-emerald-600 to-teal-600 text-white font-medium shadow-md shadow-emerald-500/20'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <MessageSquare className="w-5 h-5" />
                                <span>Manajemen Komentar</span>
                            </button>
                        </nav>
                    </div>

                    {/* Exit/Logout */}
                    <div className="pt-6 border-t border-white/10">
                        <Link
                            to="/"
                            className="flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Kembali ke Beranda</span>
                        </Link>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 p-6 md:p-10 flex flex-col space-y-8 overflow-y-auto max-h-screen">
                    {/* Header */}
                    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
                        <div>
                            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-1">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Dashboard Panel</span>
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                {currentTab === 'overview' && 'Selamat Datang, Admin'}
                                {currentTab === 'users' && 'Pemantauan Aktivitas User'}
                                {currentTab === 'reports' && 'Manajemen Laporan Penyelamatan'}
                                {currentTab === 'comments' && 'Manajemen Komentar Komunitas'}
                            </h1>
                            <p className="text-gray-400 text-sm mt-1">
                                {currentTab === 'overview' && 'Ringkasan data aktivitas penyelamatan kucing dan kontribusi komunitas.'}
                                {currentTab === 'users' && 'Pantau status login, postingan laporan, dan komentar user secara real-time.'}
                                {currentTab === 'reports' && 'Ubah status laporan (Resolved/Active) atau hapus laporan palsu/spam.'}
                                {currentTab === 'comments' && 'Pantau dan bersihkan diskusi komentar yang melanggar aturan komunitas.'}
                            </p>
                        </div>

                        {/* Quick Mobile Back Link */}
                        <Link
                            to="/"
                            className="md:hidden flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Beranda</span>
                        </Link>
                    </header>

                    {/* Tab Navigation for Mobile */}
                    <div className="flex md:hidden bg-slate-900/60 p-1 border border-white/10 rounded-xl flex-wrap">
                        <button
                            onClick={() => setCurrentTab('overview')}
                            className={`flex-1 py-2 text-center text-xs font-medium rounded-lg transition-all ${
                                currentTab === 'overview' ? 'bg-linear-to-r from-emerald-600 to-teal-600 text-white' : 'text-gray-400'
                            }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setCurrentTab('users')}
                            className={`flex-1 py-2 text-center text-xs font-medium rounded-lg transition-all ${
                                currentTab === 'users' ? 'bg-linear-to-r from-emerald-600 to-teal-600 text-white' : 'text-gray-400'
                            }`}
                        >
                            User
                        </button>
                        <button
                            onClick={() => setCurrentTab('reports')}
                            className={`flex-1 py-2 text-center text-xs font-medium rounded-lg transition-all ${
                                currentTab === 'reports' ? 'bg-linear-to-r from-emerald-600 to-teal-600 text-white' : 'text-gray-400'
                            }`}
                        >
                            Laporan
                        </button>
                        <button
                            onClick={() => setCurrentTab('comments')}
                            className={`flex-1 py-2 text-center text-xs font-medium rounded-lg transition-all ${
                                currentTab === 'comments' ? 'bg-linear-to-r from-emerald-600 to-teal-600 text-white' : 'text-gray-400'
                            }`}
                        >
                            Komentar
                        </button>
                    </div>

                    {/* ==========================================
                        TAB CONTENT: OVERVIEW & STATS
                       ========================================== */}
                    {currentTab === 'overview' && (
                        <div className="space-y-8 animate-fade-in">
                            {/* Metric Cards Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* Card 1: Total Users */}
                                <div className="group relative bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-emerald-500/30 rounded-2xl p-6 transition-all duration-300 shadow-xl overflow-hidden">
                                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all duration-300" />
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-gray-400 text-sm font-medium">Total User Terdaftar</p>
                                            <h3 className="text-3xl font-bold mt-2 tracking-tight">{totalUsers}</h3>
                                        </div>
                                        <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
                                            <Users className="w-6 h-6" />
                                        </div>
                                    </div>
                                    <div className="mt-4 text-xs text-emerald-300 flex items-center space-x-1">
                                        <span className="font-semibold">Status:</span>
                                        <span className="text-gray-400">Semua Relawan Aktif</span>
                                    </div>
                                </div>

                                {/* Card 2: Active Logged In Users */}
                                <div className="group relative bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-teal-500/30 rounded-2xl p-6 transition-all duration-300 shadow-xl overflow-hidden">
                                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-teal-500/10 rounded-full blur-xl group-hover:bg-teal-500/20 transition-all duration-300" />
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-gray-400 text-sm font-medium">User Sedang Login</p>
                                            <h3 className="text-3xl font-bold mt-2 tracking-tight flex items-center space-x-2">
                                                <span>{activeUsers}</span>
                                                <span className="relative flex h-3 w-3">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                                </span>
                                            </h3>
                                        </div>
                                        <div className="p-3 bg-teal-500/10 rounded-xl text-teal-400 border border-teal-500/20">
                                            <Activity className="w-6 h-6" />
                                        </div>
                                    </div>
                                    <div className="mt-4 text-xs text-teal-300 flex items-center space-x-1">
                                        <span className="font-semibold">Aktif Hari Ini:</span>
                                        <span className="text-gray-400">{Math.round((activeUsers/totalUsers)*100)}% dari total</span>
                                    </div>
                                </div>

                                {/* Card 3: Total Posts */}
                                <div className="group relative bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 rounded-2xl p-6 transition-all duration-300 shadow-xl overflow-hidden">
                                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all duration-300" />
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-gray-400 text-sm font-medium">Total Laporan (Post)</p>
                                            <h3 className="text-3xl font-bold mt-2 tracking-tight">{totalPosts}</h3>
                                        </div>
                                        <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 border border-cyan-500/20">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                    </div>
                                    <div className="mt-4 text-xs text-cyan-300 flex items-center space-x-1">
                                        <span className="font-semibold">Rescue Sukses:</span>
                                        <span className="text-gray-400">{posts.filter(p => p.status === 'resolved').length} Laporan (Resolved)</span>
                                    </div>
                                </div>

                                {/* Card 4: Total Comments */}
                                <div className="group relative bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-sky-500/30 rounded-2xl p-6 transition-all duration-300 shadow-xl overflow-hidden">
                                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-sky-500/10 rounded-full blur-xl group-hover:bg-sky-500/20 transition-all duration-300" />
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-gray-400 text-sm font-medium">Total Komentar</p>
                                            <h3 className="text-3xl font-bold mt-2 tracking-tight">{totalComments}</h3>
                                        </div>
                                        <div className="p-3 bg-sky-500/10 rounded-xl text-sky-400 border border-sky-500/20">
                                            <MessageSquare className="w-6 h-6" />
                                        </div>
                                    </div>
                                    <div className="mt-4 text-xs text-sky-300 flex items-center space-x-1">
                                        <span className="font-semibold">Rasio Diskusi:</span>
                                        <span className="text-gray-400">{(totalComments / Math.max(totalPosts, 1)).toFixed(1)}x per laporan</span>
                                    </div>
                                </div>
                            </div>

                            {/* Info Box & Quick Action */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Main Information panel */}
                                <div className="lg:col-span-2 bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-6 shadow-xl space-y-4">
                                    <h4 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                                        <Shield className="w-5 h-5" />
                                        Panduan Operasional Administrator
                                    </h4>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        Sebagai administrator Save Cat, Anda bertanggung jawab penuh atas kebersihan data dan kenyamanan komunitas. Gunakan alat ini dengan bijak:
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                            <h5 className="font-semibold text-emerald-300 text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                                                <Users className="w-4 h-4" /> Pemantauan User
                                            </h5>
                                            <p className="text-xs text-gray-400 leading-relaxed">
                                                Cari user tertentu, pantau status login mereka, dan gunakan tombol <strong>Force Logout</strong> jika akun tersebut disalahgunakan.
                                            </p>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                            <h5 className="font-semibold text-emerald-300 text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                                                <FileText className="w-4 h-4" /> Manajemen Laporan
                                            </h5>
                                            <p className="text-xs text-gray-400 leading-relaxed">
                                                Selesaikan laporan kucing jalanan jika tim penyelamat telah mengevakuasinya dengan mengubah status ke <strong>Resolved</strong>, atau hapus laporan palsu.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="pt-4 flex flex-wrap gap-4">
                                        <button
                                            onClick={() => setCurrentTab('users')}
                                            className="cursor-pointer bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium text-xs px-4 py-2.5 rounded-xl transition-all duration-300"
                                        >
                                            Pantau User
                                        </button>
                                        <button
                                            onClick={() => setCurrentTab('reports')}
                                            className="cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs px-4 py-2.5 rounded-xl transition-all"
                                        >
                                            Kelola Laporan
                                        </button>
                                    </div>
                                </div>

                                {/* Recent Activity Feed */}
                                <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                                    <div className="space-y-4">
                                        <h4 className="text-md font-bold text-gray-200">Aktivitas Terkini Relawan</h4>
                                        <div className="space-y-3.5 max-h-60 overflow-y-auto pr-1">
                                            <div className="flex items-start space-x-3 text-xs border-b border-white/5 pb-2.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                                                <div>
                                                    <p className="text-gray-300"><span className="font-semibold text-white">Diana Sari</span> memposting donasi pengobatan kornea.</p>
                                                    <span className="text-[10px] text-gray-500">Baru saja</span>
                                                </div>
                                            </div>
                                            <div className="flex items-start space-x-3 text-xs border-b border-white/5 pb-2.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                                                <div>
                                                    <p className="text-gray-300"><span className="font-semibold text-white">Mega Wahyuni</span> memposting laporan kucing odd-eye Menteng.</p>
                                                    <span className="text-[10px] text-gray-500">14 menit yang lalu</span>
                                                </div>
                                            </div>
                                            <div className="flex items-start space-x-3 text-xs border-b border-white/5 pb-2.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                                                <div>
                                                    <p className="text-gray-300"><span className="font-semibold text-white">Rian Kurniawan</span> login ke website.</p>
                                                    <span className="text-[10px] text-gray-500">1 jam yang lalu</span>
                                                </div>
                                            </div>
                                            <div className="flex items-start space-x-3 text-xs">
                                                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                                                <div>
                                                    <p className="text-gray-300"><span className="font-semibold text-white">Siti Rahmawati</span> keluar (logout) dari website.</p>
                                                    <span className="text-[10px] text-gray-500">2 jam yang lalu</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-[11px] text-gray-500 text-center pt-2">
                                        Data tersimulasi interaktif
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ==========================================
                        TAB CONTENT: USER MONITORING TABLE
                       ========================================== */}
                    {currentTab === 'users' && (
                        <div className="space-y-6 animate-fade-in">
                            {/* Search & Statistics Overview inside Monitoring Panel */}
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl flex flex-col md:flex-row justify-between items-center gap-4">
                                <div className="relative w-full md:max-w-md">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Cari user berdasarkan nama, email, atau telepon..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-emerald-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-400/20 text-sm transition-all"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>

                                <div className="flex items-center gap-6 text-sm shrink-0">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                                        <span className="text-gray-300">Online: <strong className="text-white">{activeUsers}</strong></span>
                                    </div>
                                    <div className="flex items-center gap-2 border-l border-white/10 pl-6">
                                        <span className="text-gray-300">Hasil Pencarian: <strong className="text-white">{filteredUsers.length}</strong></span>
                                    </div>
                                </div>
                            </div>

                            {/* Responsive Table Container */}
                            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-white/5 text-gray-200 border-b border-white/10 text-xs font-semibold uppercase tracking-wider">
                                                <th className="py-4 px-6">Nama Relawan</th>
                                                <th className="py-4 px-6">Email / Telp</th>
                                                <th className="py-4 px-6 text-center">Status Login</th>
                                                <th className="py-4 px-6 text-center">Laporan Post</th>
                                                <th className="py-4 px-6 text-center">Komentar</th>
                                                <th className="py-4 px-6 text-center">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5 text-sm">
                                            {paginatedUsers.length > 0 ? (
                                                paginatedUsers.map((user) => {
                                                    const userPostsCount = posts.filter(p => p.user_id === user.id).length;
                                                    const userCommentsCount = comments.filter(c => c.user_id === user.id).length;

                                                    return (
                                                        <tr key={user.id} className="hover:bg-white/5 transition-colors duration-200 group">
                                                            <td className="py-4 px-6 font-semibold text-white">
                                                                <div className="flex items-center space-x-3">
                                                                    <div className="w-9 h-9 rounded-full bg-linear-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-300">
                                                                        {user.name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase()}
                                                                    </div>
                                                                    <span>{user.name}</span>
                                                                </div>
                                                            </td>
                                                            <td className="py-4 px-6">
                                                                <div className="flex flex-col">
                                                                    <span className="text-gray-200">{user.email}</span>
                                                                    <span className="text-xs text-gray-400 mt-0.5">{user.telp}</span>
                                                                </div>
                                                            </td>
                                                            <td className="py-4 px-6 text-center">
                                                                {user.status === 'online' ? (
                                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                                        Online
                                                                    </span>
                                                                ) : (
                                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-500/10 text-gray-400 border border-white/5">
                                                                        <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                                                                        Offline
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td className="py-4 px-6 text-center text-gray-200 font-semibold">
                                                                {userPostsCount}
                                                            </td>
                                                            <td className="py-4 px-6 text-center text-gray-200 font-semibold">
                                                                {userCommentsCount}
                                                            </td>
                                                            <td className="py-4 px-6">
                                                                <div className="flex items-center justify-center gap-2">
                                                                    <button
                                                                        onClick={() => handleViewDetails(user)}
                                                                        className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/30 text-emerald-300 hover:bg-emerald-50 hover:text-white text-xs font-medium transition-all duration-300 hover:shadow-md hover:shadow-emerald-500/20"
                                                                    >
                                                                        <Eye className="w-3.5 h-3.5" />
                                                                        Lihat Detail
                                                                    </button>
                                                                    {user.status === 'online' && (
                                                                        <button
                                                                            onClick={() => handleForceLogout(user.id, user.name)}
                                                                            title="Paksa Logout Sesi User"
                                                                            className="cursor-pointer p-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
                                                                        >
                                                                            <UserX className="w-3.5 h-3.5" />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className="py-12 px-6 text-center text-gray-400">
                                                        Tidak ada user yang ditemukan dengan kriteria pencarian tersebut.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination Footer */}
                                {usersTotalPages > 1 && (
                                    <div className="bg-white/5 border-t border-white/10 px-6 py-4 flex items-center justify-between">
                                        <div className="text-xs text-gray-400">
                                            Menampilkan <strong className="text-white">{usersStartIndex + 1}</strong> -{' '}
                                            <strong className="text-white">
                                                {Math.min(usersStartIndex + itemsPerPage, filteredUsers.length)}
                                            </strong>{' '}
                                            dari <strong className="text-white">{filteredUsers.length}</strong> user
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                disabled={currentPage === 1}
                                                className="cursor-pointer p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                                            >
                                                <ChevronLeft className="w-4 h-4" />
                                            </button>
                                            {Array.from({ length: usersTotalPages }).map((_, i) => (
                                                <button
                                                    key={i + 1}
                                                    onClick={() => setCurrentPage(i + 1)}
                                                    className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                                                        currentPage === i + 1
                                                            ? 'bg-emerald-600 border-emerald-500 text-white shadow-md'
                                                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                                                    }`}
                                                >
                                                    {i + 1}
                                                </button>
                                            ))}
                                            <button
                                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, usersTotalPages))}
                                                disabled={currentPage === usersTotalPages}
                                                className="cursor-pointer p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                                            >
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ==========================================
                        TAB CONTENT: REPORTS MANAGEMENT
                       ========================================== */}
                    {currentTab === 'reports' && (
                        <div className="space-y-6 animate-fade-in">
                            {/* Filter and Search Bar */}
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl flex flex-col md:flex-row justify-between items-center gap-4">
                                <div className="relative w-full md:max-w-md">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Cari laporan berdasarkan judul, lokasi, atau pelapor..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-emerald-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-400/20 text-sm transition-all"
                                    />
                                </div>

                                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto shrink-0 pb-1 md:pb-0">
                                    <button
                                        onClick={() => { setReportStatusFilter('all'); setCurrentPage(1); }}
                                        className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                                            reportStatusFilter === 'all'
                                                ? 'bg-emerald-600 border-emerald-500 text-white shadow-md'
                                                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                                        }`}
                                    >
                                        Semua Laporan ({posts.length})
                                    </button>
                                    <button
                                        onClick={() => { setReportStatusFilter('active'); setCurrentPage(1); }}
                                        className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                                            reportStatusFilter === 'active'
                                                ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300 shadow-md'
                                                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                                        }`}
                                    >
                                        Aktif ({posts.filter(p => p.status === 'active').length})
                                    </button>
                                    <button
                                        onClick={() => { setReportStatusFilter('resolved'); setCurrentPage(1); }}
                                        className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                                            reportStatusFilter === 'resolved'
                                                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 shadow-md'
                                                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                                        }`}
                                    >
                                        Selesai ({posts.filter(p => p.status === 'resolved').length})
                                    </button>
                                </div>
                            </div>

                            {/* Reports Grid Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {paginatedPosts.length > 0 ? (
                                    paginatedPosts.map((post) => {
                                        const reporter = users.find(u => u.id === post.user_id);
                                        const postCommentsCount = comments.filter(c => c.post_id === post.id).length;

                                        return (
                                            <div
                                                key={post.id}
                                                className="group relative flex flex-col justify-between bg-white/10 backdrop-blur-xl border border-white/15 hover:border-emerald-500/40 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/5"
                                            >
                                                <div>
                                                    {/* Header Card */}
                                                    <div className="flex justify-between items-start gap-3">
                                                        <span className="text-[10px] text-gray-400">
                                                            ID: #{post.id}
                                                        </span>
                                                        {post.status === 'resolved' ? (
                                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/20">
                                                                <CheckCircle className="w-3 h-3" />
                                                                Selesai (Resolved)
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-yellow-500/20 text-yellow-300 border border-yellow-500/20">
                                                                <Activity className="w-3 h-3" />
                                                                Aktif
                                                            </span>
                                                        )}
                                                    </div>

                                                    <h3 className="font-bold text-sm text-white mt-3 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                                                        {post.title}
                                                    </h3>

                                                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                                                        <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                                                        <span>{post.location}</span>
                                                    </p>

                                                    <p className="text-xs text-gray-300 mt-3 line-clamp-3 leading-relaxed">
                                                        {post.content}
                                                    </p>
                                                </div>

                                                <div className="mt-5 space-y-4">
                                                    {/* Info Footer */}
                                                    <div className="flex items-center justify-between border-t border-white/5 pt-3 text-[10px] text-gray-400">
                                                        <span>Pelapor: <strong className="text-gray-300">{reporter ? reporter.name : 'Unknown'}</strong></span>
                                                        <span className="flex items-center gap-1">
                                                            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                                                            {postCommentsCount} Komentar
                                                        </span>
                                                    </div>

                                                    {/* Aksi */}
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => setSelectedReport(post)}
                                                            className="cursor-pointer flex-1 py-2 text-center text-xs font-semibold rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors"
                                                        >
                                                            Detail
                                                        </button>

                                                        <button
                                                            onClick={() => handleTogglePostStatus(post.id, post.status, post.title)}
                                                            title={post.status === 'active' ? 'Tandai Selesai' : 'Aktifkan Kembali'}
                                                            className="cursor-pointer p-2 rounded-lg bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all duration-200"
                                                        >
                                                            <RefreshCw className="w-3.5 h-3.5" />
                                                        </button>

                                                        <button
                                                            onClick={() => handleDeletePost(post.id, post.title)}
                                                            title="Hapus Laporan"
                                                            className="cursor-pointer p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="col-span-full py-16 text-center text-gray-400">
                                        Tidak ada laporan yang sesuai dengan pencarian/filter.
                                    </div>
                                )}
                            </div>

                            {/* Reports Pagination */}
                            {reportsTotalPages > 1 && (
                                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl px-6 py-4 flex items-center justify-between">
                                    <div className="text-xs text-gray-400">
                                        Menampilkan <strong className="text-white">{reportsStartIndex + 1}</strong> -{' '}
                                        <strong className="text-white">
                                            {Math.min(reportsStartIndex + itemsPerPage, filteredPosts.length)}
                                        </strong>{' '}
                                        dari <strong className="text-white">{filteredPosts.length}</strong> laporan
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="cursor-pointer p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                        </button>
                                        {Array.from({ length: reportsTotalPages }).map((_, i) => (
                                            <button
                                                key={i + 1}
                                                onClick={() => setCurrentPage(i + 1)}
                                                className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                                                    currentPage === i + 1
                                                        ? 'bg-emerald-600 border-emerald-500 text-white shadow-md'
                                                        : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                                                }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, reportsTotalPages))}
                                            disabled={currentPage === reportsTotalPages}
                                            className="cursor-pointer p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ==========================================
                        TAB CONTENT: COMMENTS MANAGEMENT
                       ========================================== */}
                    {currentTab === 'comments' && (
                        <div className="space-y-6 animate-fade-in">
                            {/* Search Bar for Comments */}
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl flex flex-col md:flex-row justify-between items-center gap-4">
                                <div className="relative w-full md:max-w-md">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Cari komentar berdasarkan isi, penulis, atau judul post..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-emerald-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-400/20 text-sm transition-all"
                                    />
                                </div>

                                <div className="text-sm text-gray-300 shrink-0">
                                    Total Komentar Komunitas: <strong className="text-white">{filteredComments.length}</strong>
                                </div>
                            </div>

                            {/* Comments Table */}
                            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-white/5 text-gray-200 border-b border-white/10 text-xs font-semibold uppercase tracking-wider">
                                                <th className="py-4 px-6 w-1/4">Penulis</th>
                                                <th className="py-4 px-6 w-1/3">Target Laporan</th>
                                                <th className="py-4 px-6">Isi Komentar</th>
                                                <th className="py-4 px-6 text-center">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5 text-sm">
                                            {paginatedComments.length > 0 ? (
                                                paginatedComments.map((comment) => (
                                                    <tr key={comment.id} className="hover:bg-white/5 transition-colors duration-200">
                                                        <td className="py-4 px-6 font-semibold text-white">
                                                            <div className="flex items-center space-x-3">
                                                                <div className="w-8 h-8 rounded-full bg-linear-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 flex items-center justify-center font-bold text-emerald-300 text-xs shrink-0">
                                                                    {comment.user_name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase()}
                                                                </div>
                                                                <div className="truncate max-w-[150px]">
                                                                    <p className="truncate font-semibold">{comment.user_name}</p>
                                                                    <span className="text-[10px] text-gray-500">{formatDate(comment.created_at)}</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <p className="text-emerald-300 hover:underline cursor-pointer truncate max-w-[250px] font-medium">
                                                                {comment.post_title}
                                                            </p>
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <p className="text-gray-300 italic max-w-sm line-clamp-2">
                                                                "{comment.content}"
                                                            </p>
                                                        </td>
                                                        <td className="py-4 px-6 text-center">
                                                            <button
                                                                onClick={() => handleDeleteComment(comment.id, comment.user_name)}
                                                                className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white text-xs font-semibold transition-all duration-200"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                                Hapus
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="py-12 px-6 text-center text-gray-400">
                                                        Tidak ada komentar yang ditemukan.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Comments Pagination */}
                                {commentsTotalPages > 1 && (
                                    <div className="bg-white/5 border-t border-white/10 px-6 py-4 flex items-center justify-between">
                                        <div className="text-xs text-gray-400">
                                            Menampilkan <strong className="text-white">{commentsStartIndex + 1}</strong> -{' '}
                                            <strong className="text-white">
                                                {Math.min(commentsStartIndex + itemsPerPage, filteredComments.length)}
                                            </strong>{' '}
                                            dari <strong className="text-white">{filteredComments.length}</strong> komentar
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                disabled={currentPage === 1}
                                                className="cursor-pointer p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                                            >
                                                <ChevronLeft className="w-4 h-4" />
                                            </button>
                                            {Array.from({ length: commentsTotalPages }).map((_, i) => (
                                                <button
                                                    key={i + 1}
                                                    onClick={() => setCurrentPage(i + 1)}
                                                    className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                                                        currentPage === i + 1
                                                            ? 'bg-emerald-600 border-emerald-500 text-white shadow-md'
                                                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                                                    }`}
                                                >
                                                    {i + 1}
                                                </button>
                                            ))}
                                            <button
                                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, commentsTotalPages))}
                                                disabled={currentPage === commentsTotalPages}
                                                className="cursor-pointer p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                                            >
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </main>
            </div>

            {/* ==========================================
                DETAIL MODAL: AKTIVITAS USER PROFILE
               ========================================== */}
            {selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="relative w-full max-w-4xl bg-slate-900/90 border border-white/20 rounded-2xl shadow-3xl overflow-hidden animate-slide-up max-h-[90vh] flex flex-col">
                        {/* Modal Header */}
                        <div className="p-6 bg-white/5 border-b border-white/10 flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 rounded-full bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center font-bold text-lg text-white">
                                    {selectedUser.name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">{selectedUser.name}</h3>
                                    <div className="flex items-center gap-3 mt-1.5">
                                        <span className="text-xs text-gray-400 flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" />
                                            Gabung: {formatDate(selectedUser.joined_date)}
                                        </span>
                                        {selectedUser.status === 'online' ? (
                                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                Online
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-500/10 text-gray-400 border border-white/5">
                                                <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                                                Offline
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {selectedUser.status === 'online' && (
                                    <button
                                        onClick={() => handleForceLogout(selectedUser.id, selectedUser.name)}
                                        className="cursor-pointer flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white text-xs font-semibold transition-all"
                                    >
                                        <UserX className="w-3.5 h-3.5" />
                                        Force Logout
                                    </button>
                                )}
                                <button
                                    onClick={() => setSelectedUser(null)}
                                    className="cursor-pointer p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Body with Tab selection */}
                        <div className="flex border-b border-white/10 bg-slate-900/40 p-1">
                            <button
                                onClick={() => setModalTab('posts')}
                                className={`flex-1 py-3 text-center text-sm font-semibold border-b-2 transition-all ${
                                    modalTab === 'posts'
                                        ? 'border-emerald-500 text-emerald-400 bg-white/5'
                                        : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                Postingan Kontribusi ({selectedUser.postsList.length})
                            </button>
                            <button
                                onClick={() => setModalTab('comments')}
                                className={`flex-1 py-3 text-center text-sm font-semibold border-b-2 transition-all ${
                                    modalTab === 'comments'
                                        ? 'border-emerald-500 text-emerald-400 bg-white/5'
                                        : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                Komentar Tertulis ({selectedUser.commentsList.length})
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="flex-1 p-6 overflow-y-auto bg-slate-950/40 space-y-4">
                            {/* TAB: POSTS */}
                            {modalTab === 'posts' && (
                                <div className="space-y-4">
                                    {selectedUser.postsList.length > 0 ? (
                                        selectedUser.postsList.map(post => (
                                            <div key={post.id} className="bg-white/5 border border-white/10 rounded-xl p-5">
                                                <div className="flex justify-between items-start gap-4">
                                                    <h4 className="text-md font-bold text-white">{post.title}</h4>
                                                    {post.status === 'resolved' ? (
                                                        <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                            <CheckCircle className="w-3.5 h-3.5" />
                                                            Resolved
                                                        </span>
                                                    ) : (
                                                        <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                                                            <Activity className="w-3.5 h-3.5" />
                                                            Active
                                                        </span>
                                                    )}
                                                </div>

                                                <p className="text-sm text-gray-300 mt-2 leading-relaxed whitespace-pre-line">{post.content}</p>

                                                <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-3 border-t border-white/5 text-xs text-gray-400">
                                                    <div className="flex items-center gap-4">
                                                        <span className="flex items-center gap-1">
                                                            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                                                            {post.location}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <ThumbsUp className="w-3.5 h-3.5 text-blue-400" />
                                                            {post.likes_count} Suka
                                                        </span>
                                                    </div>
                                                    <span>Diposting: {formatDate(post.created_at)}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-12 text-center text-gray-400 text-sm">
                                            User ini belum pernah memposting laporan penyelamatan kucing.
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* TAB: COMMENTS */}
                            {modalTab === 'comments' && (
                                <div className="space-y-4">
                                    {selectedUser.commentsList.length > 0 ? (
                                        selectedUser.commentsList.map(comment => (
                                            <div key={comment.id} className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                                                <div className="flex justify-between items-start gap-4">
                                                    <div className="text-xs text-gray-400">
                                                        Berkomentar pada postingan:{' '}
                                                        <span className="font-semibold text-emerald-300">"{comment.post_title}"</span>
                                                    </div>
                                                    <span className="text-[10px] text-gray-500">{formatDate(comment.created_at)}</span>
                                                </div>
                                                <p className="text-sm text-gray-200 leading-relaxed italic bg-black/10 p-3 rounded-lg border-l-2 border-emerald-500">
                                                    "{comment.content}"
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-12 text-center text-gray-400 text-sm">
                                            User ini belum pernah menulis komentar pada postingan manapun.
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 bg-white/5 border-t border-white/10 flex justify-end">
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="cursor-pointer px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold transition-colors"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ==========================================
                DETAIL MODAL: LAPORAN PENYELAMATAN (READ-ONLY PREVIEW)
               ========================================== */}
            {selectedReport && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="relative w-full max-w-2xl bg-slate-900/90 border border-white/20 rounded-2xl shadow-3xl overflow-hidden animate-slide-up max-h-[90vh] flex flex-col">
                        {/* Modal Header */}
                        <div className="p-6 bg-white/5 border-b border-white/10 flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <FileText className="w-5 h-5 text-emerald-400" />
                                <h3 className="text-lg font-bold text-white">Detail Laporan Penyelamatan #{selectedReport.id}</h3>
                            </div>
                            <button
                                onClick={() => setSelectedReport(null)}
                                className="cursor-pointer p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="flex-1 p-6 overflow-y-auto space-y-6">
                            {/* Status and Title */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    {selectedReport.status === 'resolved' ? (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/20">
                                            <CheckCircle className="w-3.5 h-3.5" />
                                            Selesai (Resolved / Rescued)
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-300 border border-yellow-500/20 animate-pulse">
                                            <Activity className="w-3.5 h-3.5 animate-spin-slow" />
                                            Aktif (Butuh Bantuan)
                                        </span>
                                    )}
                                    <span className="text-xs text-gray-400">
                                        Tanggal Posting: {formatDate(selectedReport.created_at)}
                                    </span>
                                </div>
                                <h2 className="text-xl font-bold text-white leading-snug">{selectedReport.title}</h2>
                            </div>

                            {/* Location Box */}
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-xs text-gray-400 uppercase font-semibold">Lokasi Kejadian</h4>
                                    <p className="text-sm text-gray-200 mt-1">{selectedReport.location}</p>
                                </div>
                            </div>

                            {/* Description Content */}
                            <div className="space-y-2">
                                <h4 className="text-xs text-gray-400 uppercase font-semibold">Deskripsi Kejadian</h4>
                                <p className="text-sm text-gray-300 leading-relaxed bg-black/10 p-4 rounded-xl border border-white/5 whitespace-pre-line">
                                    {selectedReport.content}
                                </p>
                            </div>

                            {/* Metadata */}
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div className="bg-white/5 border border-white/5 rounded-xl p-3">
                                    <p className="text-[10px] text-gray-500 uppercase font-semibold">Pelapor</p>
                                    <p className="text-sm font-semibold mt-1">
                                        {users.find(u => u.id === selectedReport.user_id)?.name || 'Unknown'}
                                    </p>
                                </div>
                                <div className="bg-white/5 border border-white/5 rounded-xl p-3">
                                    <p className="text-[10px] text-gray-500 uppercase font-semibold">Suka (Likes)</p>
                                    <p className="text-sm font-semibold mt-1 flex items-center justify-center gap-1">
                                        <ThumbsUp className="w-4 h-4 text-blue-400" />
                                        {selectedReport.likes_count} orang
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 bg-white/5 border-t border-white/10 flex justify-end gap-2">
                            <button
                                onClick={() => {
                                    handleTogglePostStatus(selectedReport.id, selectedReport.status, selectedReport.title);
                                    setSelectedReport(null);
                                }}
                                className="cursor-pointer px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                            >
                                Ubah Status
                            </button>
                            <button
                                onClick={() => setSelectedReport(null)}
                                className="cursor-pointer px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 font-semibold transition-colors"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
