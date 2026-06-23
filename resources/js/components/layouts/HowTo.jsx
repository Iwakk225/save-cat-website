import { Search, PenLine, HandCoins, Waypoints, ArrowRight } from 'lucide-react';

export default function Impact() {
    const steps = [
        {
            step: '01',
            icon: Search,
            label: 'Temukan Kucing',
            description: 'Temui kucing terlantar, sakit, hilang, atau yang butuh diadopsi di sekitarmu. Ambil foto dengan jelas.',
            bgColor: 'bg-teal-50',
            iconColor: 'text-teal-600',
            gradient: 'from-teal-500 to-teal-600',
        },
        {
            step: '02',
            icon: PenLine,
            label: 'Buat Laporan',
            description: 'Isi formulir laporan dengan detail lokasi, kondisi, dan kontak. Hanya butuh waktu 2 menit.',
            bgColor: 'bg-cyan-50',
            iconColor: 'text-cyan-600',
            gradient: 'from-cyan-500 to-cyan-600',
        },
        {
            step: '03',
            icon: HandCoins,
            label: 'Komunitas Membantu',
            description: 'Anggota komunitas terdekat akan merespons laporanmu dan turun langsung ke lokasi.',
            bgColor: 'bg-emerald-50',
            iconColor: 'text-emerald-600',
            gradient: 'from-emerald-500 to-emerald-600',
        },
    ];

    return (
        <section className="py-20 bg-linear-to-b from-teal-50 via-cyan-50 to-emerald-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-teal-200 mb-4">
                        <span className="inline-flex items-center text-teal-700 text-sm font-semibold">
                            <Waypoints className="mr-2 w-4 h-4" /> CARA KERJA
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                        Tiga langkah sederhana untuk menolong
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Mulai dari menemukan kucing hingga komunitas turun tangan—prosesnya cepat, transparan, dan terverifikasi.
                    </p>
                </div>

                {/* Steps Grid - Design lebih modern dengan flow */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
                    {/* Connector line (desktop only) */}
                    <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-linear-to-r from-teal-200 via-cyan-200 to-emerald-200"></div>

                    {steps.map((step, index) => (
                        <div key={index} className="group relative">
                            {/* Card */}
                            <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                                {/* Decorative gradient background */}
                                <div className={`absolute inset-0 bg-linear-to-br ${step.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                                
                                {/* Content */}
                                <div className="relative">
                                    {/* Step number badge */}
                                    <div className="absolute -top-3 -right-3 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-colors duration-500">
                                        <span className="text-sm font-bold text-gray-600 group-hover:text-white">{step.step}</span>
                                    </div>

                                    {/* Icon with glow effect */}
                                    <div className="relative inline-flex mb-5">
                                        <div className={`absolute inset-0 ${step.bgColor} rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500`}></div>
                                        <div className={`relative w-14 h-14 ${step.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                            <step.icon className={`w-7 h-7 ${step.iconColor}`} />
                                        </div>
                                    </div>

                                    {/* Label */}
                                    <div className="text-lg font-bold text-gray-900 mb-2">
                                        {step.label}
                                    </div>

                                    {/* Description */}
                                    <div className="text-sm text-gray-500 leading-relaxed">
                                        {step.description}
                                    </div>

                                    {/* Decorative line */}
                                    <div className={`mt-4 h-1 w-12 bg-linear-to-r ${step.gradient} rounded-full opacity-60 group-hover:w-full transition-all duration-500`}></div>
                                </div>
                            </div>

                            {/* Arrow connector (mobile only) */}
                            {index < steps.length - 1 && (
                                <div className="md:hidden flex justify-center my-4">
                                    <ArrowRight className="w-6 h-6 text-gray-300 rotate-90" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}