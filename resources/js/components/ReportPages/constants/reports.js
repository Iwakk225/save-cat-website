export const CATEGORIES = [
    { id: 'semua', label: 'Semua', emoji: '🐾' },
    { id: 'terlantar', label: 'Terlantar', emoji: '🐱' },
    { id: 'terluka', label: 'Terluka', emoji: '🩹' },
    { id: 'sakit', label: 'Sakit', emoji: '🤒' },
    { id: 'terjebak', label: 'Terjebak', emoji: '😿' },
    { id: 'darurat', label: 'Darurat', emoji: '🚨' },
    { id: 'lainnya', label: 'Lainnya', emoji: '📋' },
];

export const STATUS_FILTERS = [
    { id: 'semua', label: 'Semua Status' },
    { id: 'aktif', label: 'Aktif' },
    { id: 'selesai', label: 'Selesai' },
];

export const SORT_OPTIONS = [
    { id: 'terbaru', label: 'Terbaru' },
    { id: 'terlama', label: 'Terlama' },
    { id: 'komentar', label: 'Terbanyak Komentar' },
    { id: 'urgensi', label: 'Urgensi Tertinggi' },
];

export const urgencyConfig = {
    tinggi: { label: 'Darurat', bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500', badge: 'bg-red-500/10 text-red-600 border-red-200' },
    sedang: { label: 'Sedang', bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500', badge: 'bg-yellow-500/10 text-yellow-700 border-yellow-200' },
    rendah: { label: 'Rendah', bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500', badge: 'bg-emerald-500/10 text-emerald-700 border-emerald-200' },
};

export const categoryConfig = {
    terlantar: { bg: 'bg-orange-100', text: 'text-orange-700' },
    terluka: { bg: 'bg-red-100', text: 'text-red-700' },
    sakit: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    terjebak: { bg: 'bg-blue-100', text: 'text-blue-700' },
    darurat: { bg: 'bg-rose-100', text: 'text-rose-700' },
    lainnya: { bg: 'bg-purple-100', text: 'text-purple-700' },
};