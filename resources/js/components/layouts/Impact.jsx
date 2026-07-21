import { FileText, Heart, MapPin, MoveUpRight } from 'lucide-react';

export default function Impact() {
    const stats = [
        {
            icon: FileText,
            value: '128',
            label: 'Laporan Masuk',
            description: 'Laporan pertama dari warga yang peduli',
            bgColor: 'bg-teal-50',
            iconColor: 'text-teal-600',
            gradient: 'from-teal-500 to-teal-600',
        },
        {
            icon: Heart,
            value: '34',
            label: 'Kucing Terselamatkan',
            description: 'Berhasil dievakuasi & menemukan rumah',
            bgColor: 'bg-cyan-50',
            iconColor: 'text-cyan-600',
            gradient: 'from-cyan-500 to-cyan-600',
        },
        {
            icon: MapPin,
            value: '6',
            label: 'Kota Terjangkau',
            description: 'Area operasional awal kami',
            bgColor: 'bg-emerald-50',
            iconColor: 'text-emerald-600',
            gradient: 'from-emerald-500 to-emerald-600',
        },
    ];

    return (
        <section className="relative py-20 bg-linear-to-b from-green-700 via-green-700 to-green-700/95 backdrop-blur-md overflow-hidden">
            {/* ===== DECORATIVE BACKGROUND ELEMENTS ===== */}

            {/* Soft glowing orbs */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Floating leaves - top left */}
            <svg
                className="absolute top-8 left-12 w-16 h-16 text-emerald-400/20 rotate-12 pointer-events-none"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
            </svg>

            {/* Floating leaves - top right */}
            <svg
                className="absolute top-20 right-16 w-12 h-12 text-green-300/20 -rotate-45 pointer-events-none"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
            </svg>

            {/* Floating leaf - bottom left */}
            <svg
                className="absolute bottom-16 left-24 w-10 h-10 text-teal-300/15 rotate-45 pointer-events-none"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
            </svg>

            {/* Floating leaf - bottom right */}
            <svg
                className="absolute bottom-24 right-32 w-14 h-14 text-emerald-300/20 rotate-120 pointer-events-none"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
            </svg>

            {/* Cat silhouette - sitting, top right area */}
            <svg
                className="absolute top-12 right-1/4 w-20 h-20 text-green-900/10 pointer-events-none"
                viewBox="0 0 100 100"
                fill="currentColor"
            >
                <path d="M30 85 L30 55 Q30 45 35 40 L32 25 L40 35 Q45 32 50 32 Q55 32 60 35 L68 25 L65 40 Q70 45 70 55 L70 85 L60 85 L60 70 L40 70 L40 85 Z" />
                <circle cx="42" cy="48" r="2" />
                <circle cx="58" cy="48" r="2" />
                <path d="M48 54 Q50 56 52 54" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>

            {/* Cat silhouette - walking, bottom left */}
            <svg
                className="absolute bottom-8 left-1/4 w-24 h-16 text-green-900/10 pointer-events-none"
                viewBox="0 0 120 60"
                fill="currentColor"
            >
                <path d="M20 50 L20 35 Q20 25 30 22 L28 12 L36 20 Q42 18 48 18 Q54 18 60 20 L68 12 L66 22 Q76 25 80 30 L95 30 Q105 30 105 35 L105 40 Q105 45 100 45 L95 45 L95 50 L88 50 L88 45 L35 45 L35 50 L28 50 L28 45 L20 45 Z" />
                <path d="M105 35 Q115 32 118 38 Q115 40 105 40" />
            </svg>

            {/* Paw prints scattered */}
            <svg
                className="absolute top-32 left-1/3 w-6 h-6 text-white/10 rotate-12 pointer-events-none"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <ellipse cx="12" cy="16" rx="5" ry="4" />
                <circle cx="7" cy="10" r="2" />
                <circle cx="17" cy="10" r="2" />
                <circle cx="10" cy="7" r="1.5" />
                <circle cx="14" cy="7" r="1.5" />
            </svg>

            <svg
                className="absolute bottom-32 right-1/3 w-5 h-5 text-white/10 -rotate-12 pointer-events-none"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <ellipse cx="12" cy="16" rx="5" ry="4" />
                <circle cx="7" cy="10" r="2" />
                <circle cx="17" cy="10" r="2" />
                <circle cx="10" cy="7" r="1.5" />
                <circle cx="14" cy="7" r="1.5" />
            </svg>

            <svg
                className="absolute top-1/2 right-12 w-4 h-4 text-white/10 rotate-45 pointer-events-none"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <ellipse cx="12" cy="16" rx="5" ry="4" />
                <circle cx="7" cy="10" r="2" />
                <circle cx="17" cy="10" r="2" />
                <circle cx="10" cy="7" r="1.5" />
                <circle cx="14" cy="7" r="1.5" />
            </svg>

            <svg
                className="absolute top-2/3 left-16 w-5 h-5 text-white/8 rotate-30 pointer-events-none"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <ellipse cx="12" cy="16" rx="5" ry="4" />
                <circle cx="7" cy="10" r="2" />
                <circle cx="17" cy="10" r="2" />
                <circle cx="10" cy="7" r="1.5" />
                <circle cx="14" cy="7" r="1.5" />
            </svg>

            {/* Tree/branch silhouette - left side */}
            <svg
                className="absolute left-0 top-1/4 w-32 h-64 text-green-900/10 pointer-events-none"
                viewBox="0 0 100 200"
                fill="currentColor"
            >
                <path d="M50 200 L50 100 Q30 90 20 70 Q15 55 25 45 Q20 30 35 25 Q40 10 50 5 Q60 10 65 25 Q80 30 75 45 Q85 55 80 70 Q70 90 50 100" />
            </svg>

            {/* Tree/branch silhouette - right side */}
            <svg
                className="absolute right-0 bottom-1/4 w-24 h-48 text-green-900/8 pointer-events-none"
                viewBox="0 0 100 200"
                fill="currentColor"
            >
                <path d="M50 200 L50 120 Q35 110 28 95 Q22 80 32 72 Q28 58 40 52 Q45 38 50 30 Q55 38 60 52 Q72 58 68 72 Q78 80 72 95 Q65 110 50 120" />
            </svg>

            {/* Small dots / fireflies */}
            <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-yellow-200/30 rounded-full pointer-events-none animate-pulse"></div>
            <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-yellow-100/20 rounded-full pointer-events-none animate-pulse delay-700"></div>
            <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-emerald-200/25 rounded-full pointer-events-none animate-pulse delay-1000"></div>
            <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-green-200/20 rounded-full pointer-events-none animate-pulse delay-500"></div>
            <div className="absolute bottom-1/4 right-1/5 w-1.5 h-1.5 bg-teal-200/20 rounded-full pointer-events-none animate-pulse delay-300"></div>

            {/* ===== MAIN CONTENT ===== */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-teal-200 mb-4">
                        <span className="inline-flex items-center text-teal-700 text-sm font-semibold">
                            <MoveUpRight className="mr-2 w-4 h-4" /> PERJALANAN KAMI
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-200 mb-4 tracking-tight">
                        Langkah kecil untuk
                        <br />
                        perubahan besar
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Awal perjalanan kami membangun komunitas peduli kucing di Indonesia. Setiap bantuan sangat berarti.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 md:hover:shadow-xl md:hover:-translate-y-1 transition-all duration-500 overflow-hidden"
                        >
                            {/* Decorative gradient background */}
                            <div className={`absolute inset-0 bg-linear-to-br ${stat.gradient} opacity-0 md:group-hover:opacity-5 transition-opacity duration-500`}></div>
                            
                            {/* Content */}
                            <div className="relative">
                                {/* Icon with ring */}
                                <div className="relative inline-flex mb-4">
                                    <div className={`absolute inset-0 ${stat.bgColor} rounded-xl blur-lg opacity-60 md:group-hover:opacity-100 transition-opacity duration-500`}></div>
                                    <div className={`relative w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center md:group-hover:scale-110 md:group-hover:rotate-3 transition-all duration-500`}>
                                        <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                                    </div>
                                </div>

                                {/* Number */}
                                <div className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">
                                    {stat.value}
                                </div>

                                {/* Label */}
                                <div className="text-base font-semibold text-gray-900 mb-1">
                                    {stat.label}
                                </div>

                                {/* Description */}
                                <div className="text-sm text-gray-500 leading-relaxed">
                                    {stat.description}
                                </div>

                                {/* Decorative line */}
                                <div className={`mt-4 h-0.5 w-10 bg-linear-to-r ${stat.gradient} rounded-full opacity-60 md:group-hover:w-full transition-all duration-500`}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}