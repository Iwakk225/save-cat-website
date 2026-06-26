import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Search, MapPin, Clock, MessageCircle, AlertCircle,
    ChevronLeft, ChevronRight, X, Phone, User,
    Filter, SlidersHorizontal, ArrowRight, PenLine,
    CheckCircle2, Loader2, Cat, Eye, Compass
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '../layouts/Navbar';
import HeroImage from '@/assets/hero.webp';
import Swal from 'sweetalert2';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_REPORTS = [
    {
        id: 1, title: 'Kucing terluka parah di depan minimarket Jl. Sudirman',
        category: 'terluka', urgency: 'tinggi', status: 'aktif',
        location: 'Jl. Sudirman No. 45, Jakarta Pusat',
        description: 'Ditemukan seekor kucing oranye jantan dengan luka di kaki belakang kiri, sepertinya tertabrak kendaraan. Kucing masih sadar tapi tidak bisa berdiri. Butuh bantuan segera dari relawan atau dokter hewan terdekat.',
        reporter: 'Budi Santoso', contact: '08123456789',
        comments: 8, createdAt: '2026-06-25T08:30:00Z',
        image: 'https://placecats.com/400/300',
        tags: ['Luka Fisik', 'Butuh Segera'],
    },
    {
        id: 2, title: 'Anak kucing terlantar ditemukan di kolong jembatan',
        category: 'terlantar', urgency: 'sedang', status: 'aktif',
        location: 'Kolong Jembatan Semanggi, Jakarta Selatan',
        description: 'Ada 3 anak kucing kecil sekitar 2-3 minggu, belum bisa buka mata sepenuhnya. Kemungkinan ditinggal induknya. Perlu susu khusus bayi kucing dan tempat yang hangat segera.',
        reporter: 'Siti Rahayu', contact: '08234567890',
        comments: 14, createdAt: '2026-06-25T10:15:00Z',
        image: 'https://placecats.com/401/300',
        tags: ['Bayi Kucing', '3 Ekor'],
    },
    {
        id: 3, title: 'Kucing sakit keras, mata berair dan tidak mau makan',
        category: 'sakit', urgency: 'tinggi', status: 'aktif',
        location: 'Perumahan Griya Asri Blok C No. 12, Depok',
        description: 'Kucing kampung putih betina, ditemukan lemas di depan rumah sejak 2 hari lalu. Matanya berair terus, hidung meler, dan tidak mau makan sama sekali. Diduga flu kucing parah.',
        reporter: 'Ahmad Fauzi', contact: '08345678901',
        comments: 5, createdAt: '2026-06-24T16:00:00Z',
        image: 'https://placecats.com/402/300',
        tags: ['Flu Kucing', 'Lemas'],
    },
    {
        id: 4, title: 'Kucing terjebak di dalam saluran drainase',
        category: 'terjebak', urgency: 'tinggi', status: 'selesai',
        location: 'Jl. Kebon Jeruk Raya, Jakarta Barat',
        description: 'Seekor kucing abu-abu terjebak di dalam saluran air sempit. Sudah meraung-raung sejak pagi. Perlu alat bantu untuk mengeluarkannya. Sudah dicoba dengan tongkat tapi gagal.',
        reporter: 'Dewi Lestari', contact: '08456789012',
        comments: 22, createdAt: '2026-06-24T09:00:00Z',
        image: 'https://placecats.com/403/300',
        tags: ['Terjebak', 'Perlu Alat'],
    },
    {
        id: 5, title: 'Kucing kondisi darurat setelah disiram air panas',
        category: 'darurat', urgency: 'tinggi', status: 'aktif',
        location: 'Gang Mawar No. 3, Tangerang',
        description: 'Kucing belang hitam putih ditemukan dengan luka bakar di punggung dan ekor. Diduga disiram air panas oleh oknum tidak bertanggung jawab. Perlu penanganan dokter hewan SEGERA.',
        reporter: 'Rina Kusuma', contact: '08567890123',
        comments: 31, createdAt: '2026-06-23T14:30:00Z',
        image: 'https://placecats.com/404/300',
        tags: ['Darurat', 'Luka Bakar', 'Kasus Kekerasan'],
    },
    {
        id: 6, title: 'Kucing terlantar sangat kurus butuh adopsi',
        category: 'terlantar', urgency: 'rendah', status: 'aktif',
        location: 'Pasar Minggu, Jakarta Selatan',
        description: 'Kucing kuning betina sangat kurus, tulang rusuknya kelihatan. Sudah diberi makan sementara oleh warga sekitar tapi butuh adopsi permanen. Sudah divaksin dasar.',
        reporter: 'Hendra Wijaya', contact: '08678901234',
        comments: 7, createdAt: '2026-06-23T11:00:00Z',
        image: 'https://placecats.com/405/300',
        tags: ['Siap Adopsi', 'Sudah Vaksin'],
    },
    {
        id: 7, title: 'Tiga ekor kucing kampung butuh tempat tinggal sementara',
        category: 'terlantar', urgency: 'sedang', status: 'aktif',
        location: 'Jl. Fatmawati, Jakarta Selatan',
        description: 'Induk kucing dan 2 anaknya kehilangan tempat tinggal karena renovasi gedung. Butuh foster sementara atau adopsi. Sudah jinak dan mudah bergaul.',
        reporter: 'Maya Pertiwi', contact: '08789012345',
        comments: 9, createdAt: '2026-06-22T08:00:00Z',
        image: 'https://placecats.com/406/300',
        tags: ['Butuh Foster', '3 Ekor'],
    },
    {
        id: 8, title: 'Kucing sakit dengan mata tertutup nanah',
        category: 'sakit', urgency: 'sedang', status: 'selesai',
        location: 'Perumahan Bintaro Sektor 7, Tangerang Selatan',
        description: 'Kucing kampung hitam, kedua matanya tertutup dan bernanah. Sudah berlangsung 3 hari. Sepertinya infeksi parah. Kucing masih mau makan sedikit tapi sangat lemas.',
        reporter: 'Agus Prasetyo', contact: '08890123456',
        comments: 4, createdAt: '2026-06-21T15:00:00Z',
        image: 'https://placecats.com/407/300',
        tags: ['Infeksi Mata', 'Perlu Obat'],
    },
    {
        id: 9, title: 'Anak kucing tertinggal sendirian di basement parkir',
        category: 'terlantar', urgency: 'sedang', status: 'aktif',
        location: 'Mall Grand Indonesia, Jakarta Pusat',
        description: 'Seekor anak kucing kecil sekitar 1 bulan terjebak di basement parkir mall. Sudah mengeong terus sejak kemarin malam. Security sudah tahu tapi tidak bisa menangani.',
        reporter: 'Putri Handayani', contact: '08901234567',
        comments: 18, createdAt: '2026-06-26T06:00:00Z',
        image: 'https://placecats.com/408/300',
        tags: ['Bayi Kucing', 'Terjebak'],
    },
    {
        id: 10, title: 'Kucing hamil butuh tempat melahirkan yang aman',
        category: 'lainnya', urgency: 'sedang', status: 'aktif',
        location: 'Jl. Kemang Raya, Jakarta Selatan',
        description: 'Kucing calico perut besar sudah mendekati waktu melahirkan. Berkeliaran di jalanan. Butuh tempat yang hangat dan aman untuk melahirkan. Kucing sudah jinak.',
        reporter: 'Eko Budiono', contact: '08012345678',
        comments: 6, createdAt: '2026-06-25T20:00:00Z',
        image: 'https://placecats.com/409/300',
        tags: ['Hamil', 'Butuh Segera'],
    },
    {
        id: 11, title: 'Kucing luka di telinga akibat berkelahi',
        category: 'terluka', urgency: 'rendah', status: 'aktif',
        location: 'Jl. Tebet Raya, Jakarta Selatan',
        description: 'Kucing lokal berwarna coklat dengan telinga kanan robek. Kemungkinan habis berkelahi dengan kucing lain. Masih aktif tapi terlihat kesakitan. Butuh perawatan telinga.',
        reporter: 'Lina Sari', contact: '08112345678',
        comments: 3, createdAt: '2026-06-24T18:00:00Z',
        image: 'https://placecats.com/410/300',
        tags: ['Luka Telinga'],
    },
    {
        id: 12, title: 'Kucing tua terlantar tak berdaya di pinggir jalan',
        category: 'terlantar', urgency: 'rendah', status: 'selesai',
        location: 'Jl. Asia Afrika, Bandung',
        description: 'Kucing tua berwarna putih abu tampak sangat lemah di pinggir jalan. Usia diperkirakan lebih dari 10 tahun. Tidak ada tanda pemilik. Perlu adopsi atau perawatan intensif.',
        reporter: 'Bambang Surya', contact: '08212345678',
        comments: 11, createdAt: '2026-06-22T12:00:00Z',
        image: 'https://placecats.com/411/300',
        tags: ['Kucing Tua', 'Butuh Adopsi'],
    },
];

// ─── Constants ────────────────────────────────────────────────────────────────
const CATEGORIES = [
    { id: 'semua',    label: 'Semua',            emoji: '🐾' },
    { id: 'terlantar', label: 'Terlantar',        emoji: '🐱' },
    { id: 'terluka',  label: 'Terluka',           emoji: '🩹' },
    { id: 'sakit',    label: 'Sakit',             emoji: '🤒' },
    { id: 'terjebak', label: 'Terjebak',          emoji: '😿' },
    { id: 'darurat',  label: 'Darurat',           emoji: '🚨' },
    { id: 'lainnya',  label: 'Lainnya',           emoji: '📋' },
];

const STATUS_FILTERS = [
    { id: 'semua',   label: 'Semua Status' },
    { id: 'aktif',   label: 'Aktif' },
    { id: 'selesai', label: 'Selesai' },
];

const SORT_OPTIONS = [
    { id: 'terbaru',   label: 'Terbaru' },
    { id: 'terlama',   label: 'Terlama' },
    { id: 'komentar',  label: 'Terbanyak Komentar' },
    { id: 'urgensi',   label: 'Urgensi Tertinggi' },
];

const URGENCY_ORDER = { tinggi: 0, sedang: 1, rendah: 2 };
const PER_PAGE = 8;

const urgencyConfig = {
    tinggi: { label: 'Darurat',  bg: 'bg-red-100',     text: 'text-red-700',     dot: 'bg-red-500',     badge: 'bg-red-500/10 text-red-600 border-red-200' },
    sedang: { label: 'Sedang',   bg: 'bg-yellow-100',  text: 'text-yellow-700',  dot: 'bg-yellow-500',  badge: 'bg-yellow-500/10 text-yellow-700 border-yellow-200' },
    rendah: { label: 'Rendah',   bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500', badge: 'bg-emerald-500/10 text-emerald-700 border-emerald-200' },
};

const categoryConfig = {
    terlantar: { bg: 'bg-orange-100', text: 'text-orange-700' },
    terluka:   { bg: 'bg-red-100',    text: 'text-red-700' },
    sakit:     { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    terjebak:  { bg: 'bg-blue-100',   text: 'text-blue-700' },
    darurat:   { bg: 'bg-rose-100',   text: 'text-rose-700' },
    lainnya:   { bg: 'bg-purple-100', text: 'text-purple-700' },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function timeAgo(iso) {
    const diff = (Date.now() - new Date(iso).getTime()) / 1000;
    if (diff < 60)   return 'Baru saja';
    if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
    return `${Math.floor(diff / 86400)} hari lalu`;
}

// ─── Report Card ──────────────────────────────────────────────────────────────
function ReportCard({ report, onClick }) {
    const u = urgencyConfig[report.urgency];
    const cat = categoryConfig[report.category] ?? { bg: 'bg-gray-100', text: 'text-gray-700' };
    const catInfo = CATEGORIES.find(c => c.id === report.category);
    const isDone = report.status === 'selesai';

    return (
        <div
            onClick={() => onClick(report)}
            className="group bg-white rounded-2xl border border-gray-100 hover:border-teal-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
        >
            {/* Image */}
            <div className="relative h-44 overflow-hidden">
                <img
                    src={report.image}
                    alt={report.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={e => { e.target.src = `https://placehold.co/400x300/0d9488/ffffff?text=${encodeURIComponent('🐱')}`; }}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Status badge */}
                <div className="absolute top-3 left-3">
                    {isDone ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold shadow">
                            <CheckCircle2 className="w-3 h-3" /> Selesai
                        </span>
                    ) : (
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold shadow ${u.bg} ${u.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${u.dot} animate-pulse`} />
                            {u.label}
                        </span>
                    )}
                </div>

                {/* Category badge */}
                <div className="absolute top-3 right-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${cat.bg} ${cat.text}`}>
                        {catInfo?.emoji} {catInfo?.label ?? report.category}
                    </span>
                </div>
            </div>

            {/* Body */}
            <div className="p-4 flex flex-col flex-1 gap-2">
                <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-teal-700 transition-colors">
                    {report.title}
                </h3>

                <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                    <MapPin className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" />
                    <span className="truncate">{report.location}</span>
                </div>

                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 flex-1">
                    {report.description}
                </p>

                {/* Tags */}
                {report.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                        {report.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 text-xs font-medium border border-teal-100">
                                {tag}
                            </span>
                        ))}
                        {report.tags.length > 2 && (
                            <span className="px-2 py-0.5 rounded-full bg-gray-50 text-gray-500 text-xs border border-gray-100">
                                +{report.tags.length - 2}
                            </span>
                        )}
                    </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 mt-auto border-t border-gray-50">
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{timeAgo(report.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{report.comments} komentar</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────
function ReportModal({ report, onClose }) {
    const u = urgencyConfig[report.urgency];
    const cat = categoryConfig[report.category] ?? { bg: 'bg-gray-100', text: 'text-gray-700' };
    const catInfo = CATEGORIES.find(c => c.id === report.category);
    const isDone = report.status === 'selesai';

    const [fullReport, setFullReport] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    const [isLoadingDetails, setIsLoadingDetails] = useState(true);

    const fetchDetails = async () => {
        try {
            const res = await fetch(`/api/reports/${report.id}`);
            if (res.ok) {
                const data = await res.json();
                setFullReport(data);
            }
        } catch (e) {
            console.error("Gagal memuat detail laporan", e);
        } finally {
            setIsLoadingDetails(false);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [report.id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        const token = localStorage.getItem('user_token');
        if (!token) {
            Swal.fire({
                icon: 'warning',
                title: 'Perlu Login 🔒',
                text: 'Kamu harus masuk terlebih dahulu untuk ikut berdiskusi.',
                confirmButtonColor: '#0d9488',
                confirmButtonText: 'Mengerti',
            });
            return;
        }

        setIsSubmittingComment(true);
        try {
            const res = await fetch(`/api/reports/${report.id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ comment_text: commentText }),
            });

            if (res.ok) {
                setCommentText('');
                fetchDetails(); // Reload comments
            } else {
                const errData = await res.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: errData.message || 'Gagal mengirim komentar.',
                    confirmButtonColor: '#0d9488',
                });
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: 'Terjadi kesalahan saat mengirim komentar.',
                confirmButtonColor: '#0d9488',
            });
        } finally {
            setIsSubmittingComment(false);
        }
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKey);
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-up"
                onClick={e => e.stopPropagation()}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
                >
                    <X className="w-4 h-4" />
                </button>

                {/* Image */}
                <div className="relative h-52 overflow-hidden rounded-t-2xl">
                    <img
                        src={report.image}
                        alt={report.title}
                        className="w-full h-full object-cover"
                        onError={e => { e.target.src = `https://placehold.co/600x300/0d9488/ffffff?text=%F0%9F%90%B1`; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Badges on image */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        {isDone ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-lg">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Sudah Selesai
                            </span>
                        ) : (
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-lg ${u.bg} ${u.text}`}>
                                <span className={`w-2 h-2 rounded-full ${u.dot} animate-pulse`} />
                                Urgensi {u.label}
                            </span>
                        )}
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cat.bg} ${cat.text}`}>
                            {catInfo?.emoji} {catInfo?.label}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 leading-snug">{report.title}</h2>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-teal-500" />
                            <span>{report.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-teal-500" />
                            <span>{timeAgo(report.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MessageCircle className="w-4 h-4 text-teal-500" />
                            <span>{fullReport ? fullReport.comments_count : report.comments} komentar</span>
                        </div>
                    </div>

                    {/* Tags */}
                    {report.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {report.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold border border-teal-100">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Description */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <p className="text-gray-700 text-sm leading-relaxed">{report.description}</p>
                    </div>

                    {/* Reporter */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-teal-50 border border-teal-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white font-bold text-sm shadow">
                                {report.reporter ? report.reporter.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : 'A'}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">{report.reporter}</p>
                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                    <User className="w-3 h-3" /> Pelapor
                                </p>
                            </div>
                        </div>
                        {report.contact && (
                            <a
                                href={`tel:${report.contact}`}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 transition-colors"
                            >
                                <Phone className="w-4 h-4" />
                                Hubungi
                            </a>
                        )}
                    </div>

                    {/* Comments section */}
                    <div className="border-t border-gray-100 pt-5 space-y-4">
                        <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                            <MessageCircle className="w-4 h-4 text-teal-600" />
                            Diskusi & Bantuan Komunitas
                        </h3>

                        {isLoadingDetails ? (
                            <div className="flex items-center justify-center py-4 text-gray-400 text-xs">
                                <Loader2 className="w-4 h-4 animate-spin text-teal-500 mr-2" />
                                Memuat diskusi...
                            </div>
                        ) : (
                            <>
                                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                                    {fullReport?.comments?.length === 0 ? (
                                        <p className="text-gray-400 text-xs italic text-center py-4">
                                            Belum ada diskusi. Tulis tanggapan atau kesediaanmu membantu!
                                        </p>
                                    ) : (
                                        fullReport?.comments?.map((c) => (
                                            <div key={c.id} className="bg-gray-50 rounded-xl p-3 border border-gray-100/50 space-y-1">
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="font-semibold text-teal-800">{c.name}</span>
                                                    <span className="text-gray-400 text-[10px]">{timeAgo(c.createdAt)}</span>
                                                </div>
                                                <p className="text-gray-700 text-xs leading-relaxed">{c.comment_text}</p>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <form onSubmit={handleCommentSubmit} className="flex gap-2 pt-1">
                                    <input
                                        type="text"
                                        placeholder="Tulis tanggapan atau koordinasi bantuan..."
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        disabled={isSubmittingComment}
                                        className="flex-1 px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400/50 bg-white"
                                    />
                                    <Button
                                        type="submit"
                                        disabled={isSubmittingComment || !commentText.trim()}
                                        className="bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-xs px-4"
                                    >
                                        {isSubmittingComment ? (
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                        ) : (
                                            'Kirim'
                                        )}
                                    </Button>
                                </form>
                            </>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="flex-1 border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer"
                        >
                            Tutup
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ReportsPage() {
    const [search, setSearch]           = useState('');
    const [category, setCategory]       = useState('semua');
    const [statusFilter, setStatus]     = useState('semua');
    const [sortBy, setSortBy]           = useState('terbaru');
    const [page, setPage]               = useState(1);
    const [selectedReport, setSelected] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [isLoading, setIsLoading]     = useState(true);

    const [reports, setReports] = useState([]);
    const [stats, setStats] = useState({ total: 0, aktif: 0, selesai: 0, darurat: 0 });
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    // Fetch data from API
    const fetchReports = async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams({
                search,
                category,
                status: statusFilter,
                sortBy,
                page,
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

    // Reset page when filter/search changes
    useEffect(() => { setPage(1); }, [search, category, statusFilter, sortBy]);

    // Fetch reports when dependencies change
    useEffect(() => {
        fetchReports();
    }, [search, category, statusFilter, sortBy, page]);

    // Compatible variables with the JSX rendering
    const filtered = { length: totalItems };
    const paginated = reports;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* ── Hero Banner ── */}
            <section className="relative h-72 sm:h-80 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img src={HeroImage} alt="Hero" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-teal-950/85 via-cyan-950/80 to-teal-950/90" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-teal-200 text-xs font-semibold mb-4 backdrop-blur-sm">
                        <Compass className="w-3.5 h-3.5" />
                        LAPORAN KOMUNITAS
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                        Jelajahi Laporan
                        <span className="block bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                            Kucing Butuh Bantuan
                        </span>
                    </h1>
                    <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
                        Temukan laporan di sekitarmu dan bantu selamatkan nyawa kucing.
                    </p>

                    {/* Search bar */}
                    <div className="mt-6 relative max-w-lg mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari laporan, lokasi, atau nama pelapor..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/95 backdrop-blur-md text-gray-900 placeholder:text-gray-400 text-sm font-medium shadow-xl border border-white/50 focus:outline-none focus:ring-2 focus:ring-teal-400/50 transition-all"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* ── Stats Strip ── */}
            <div className="bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            { label: 'Total Laporan',  value: stats.total,   color: 'text-teal-700',    bg: 'bg-teal-50' },
                            { label: 'Butuh Bantuan',  value: stats.aktif,   color: 'text-blue-700',    bg: 'bg-blue-50' },
                            { label: 'Sudah Selesai',  value: stats.selesai, color: 'text-emerald-700', bg: 'bg-emerald-50' },
                            { label: 'Kondisi Darurat',value: stats.darurat, color: 'text-red-700',     bg: 'bg-red-50' },
                        ].map(s => (
                            <div key={s.label} className={`${s.bg} rounded-xl px-4 py-3 text-center`}>
                                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                                <p className="text-xs text-gray-500 font-medium mt-0.5">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Main Content ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* ── Category Pills ── */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide mb-6">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setCategory(cat.id)}
                            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer ${
                                category === cat.id
                                    ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-500/25'
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-teal-300 hover:text-teal-700'
                            }`}
                        >
                            <span>{cat.emoji}</span>
                            <span>{cat.label}</span>
                        </button>
                    ))}
                </div>

                {/* ── Toolbar ── */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                    <p className="text-sm text-gray-500 font-medium">
                        Menampilkan <span className="text-gray-900 font-bold">{filtered.length}</span> laporan
                        {search && <span> untuk "<span className="text-teal-600">{search}</span>"</span>}
                    </p>

                    <div className="flex items-center gap-2">
                        {/* Status filter */}
                        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1">
                            {STATUS_FILTERS.map(s => (
                                <button
                                    key={s.id}
                                    onClick={() => setStatus(s.id)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                        statusFilter === s.id
                                            ? 'bg-teal-600 text-white shadow-sm'
                                            : 'text-gray-500 hover:text-gray-800'
                                    }`}
                                >
                                    {s.label}
                                </button>
                            ))}
                        </div>

                        {/* Sort */}
                        <div className="relative">
                            <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            <select
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value)}
                                className="appearance-none pl-9 pr-8 py-2 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400/50 cursor-pointer"
                            >
                                {SORT_OPTIONS.map(o => (
                                    <option key={o.id} value={o.id}>{o.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* ── Grid ── */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
                        <Loader2 className="w-10 h-10 animate-spin text-teal-500" />
                        <p className="text-sm font-medium">Memuat laporan...</p>
                    </div>
                ) : paginated.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                            <Cat className="w-10 h-10 text-gray-300" />
                        </div>
                        <div className="text-center">
                            <p className="font-semibold text-gray-600 text-lg">Tidak ada laporan ditemukan</p>
                            <p className="text-sm mt-1">Coba ubah kata kunci pencarian atau filter kategori</p>
                        </div>
                        <Button
                            onClick={() => { setSearch(''); setCategory('semua'); setStatus('semua'); }}
                            variant="outline"
                            className="border-teal-300 text-teal-700 hover:bg-teal-50 cursor-pointer"
                        >
                            Reset Filter
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {paginated.map(report => (
                            <ReportCard key={report.id} report={report} onClick={setSelected} />
                        ))}
                    </div>
                )}

                {/* ── Pagination ── */}
                {!isLoading && totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-10">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:border-teal-400 hover:text-teal-600 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all bg-white"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`w-9 h-9 rounded-xl border text-sm font-bold cursor-pointer transition-all ${
                                    page === p
                                        ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-500/25'
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-teal-400 hover:text-teal-600'
                                }`}
                            >
                                {p}
                            </button>
                        ))}

                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:border-teal-400 hover:text-teal-600 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all bg-white"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {/* ── CTA Banner ── */}
                <div className="mt-14 rounded-3xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600" />
                    <div className="absolute inset-0 opacity-10"
                        style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}
                    />
                    <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-10">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-1">
                                Temukan kucing yang butuh bantuan?
                            </h3>
                            <p className="text-teal-100 text-sm">
                                Buat laporan sekarang dan gerakkan komunitas untuk membantu 🐾
                            </p>
                        </div>
                        <Link to="/report/create" className="flex-shrink-0">
                            <Button className="bg-white text-teal-700 hover:bg-teal-50 font-bold px-6 py-5 rounded-xl shadow-lg cursor-pointer group">
                                <PenLine className="w-4 h-4 mr-2" />
                                Buat Laporan
                                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* ── Detail Modal ── */}
            {selectedReport && (
                <ReportModal report={selectedReport} onClose={() => setSelected(null)} />
            )}
        </div>
    );
}
