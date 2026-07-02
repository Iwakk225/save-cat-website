export const REPORT_CATEGORIES = [
    { id: 'terlantar', label: 'Kucing Terlantar', emoji: '🐱', color: 'from-orange-400 to-amber-500' },
    { id: 'terluka',   label: 'Kucing Terluka',   emoji: '🩹', color: 'from-red-400 to-rose-500' },
    { id: 'sakit',     label: 'Kucing Sakit',     emoji: '🤒', color: 'from-yellow-400 to-orange-400' },
    { id: 'terjebak',  label: 'Kucing Terjebak',  emoji: '😿', color: 'from-blue-400 to-cyan-500' },
    { id: 'darurat',   label: 'Kondisi Darurat',  emoji: '🚨', color: 'from-red-500 to-pink-600' },
    { id: 'lainnya',   label: 'Lainnya',          emoji: '📋', color: 'from-purple-400 to-violet-500' },
];

export const URGENCY_LEVELS = [
    { id: 'rendah', label: 'Rendah', desc: 'Kondisi stabil, tidak mendesak', color: 'emerald', ring: 'ring-emerald-400' },
    { id: 'sedang', label: 'Sedang', desc: 'Perlu bantuan dalam 24 jam',     color: 'yellow',  ring: 'ring-yellow-400' },
    { id: 'tinggi', label: 'Tinggi', desc: 'Butuh bantuan segera!',          color: 'red',     ring: 'ring-red-400' },
];

export const MAX_IMAGES = 5;
export const MAX_SIZE_MB = 5;