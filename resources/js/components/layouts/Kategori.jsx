import { Layers, Home, BriefcaseMedical, Search, Heart, AlarmClock, ArrowRight } from 'lucide-react';

export default function Kategori() {
    const categories = [
        {
            icon: Home,
            title: 'Kucing Terlantar',
            subtitle: 'Lihat semua laporan',
            bgColor: 'bg-teal-50',
            iconColor: 'text-teal-600',
        },
        {
            icon: BriefcaseMedical,
            title: 'Kucing Sakit',
            subtitle: 'Lihat semua laporan',
            bgColor: 'bg-cyan-50',
            iconColor: 'text-cyan-600',
        },
        {
            icon: Search,
            title: 'Kucing Hilang',
            subtitle: 'Lihat semua laporan',
            bgColor: 'bg-teal-50',
            iconColor: 'text-teal-600',
        },
        {
            icon: Heart,
            title: 'Adopsi',
            subtitle: 'Lihat semua laporan',
            bgColor: 'bg-cyan-50',
            iconColor: 'text-cyan-600',
        },
        {
            icon: AlarmClock,
            title: 'Darurat',
            subtitle: 'Lihat semua laporan',
            bgColor: 'bg-emerald-50',
            iconColor: 'text-emerald-600',
        },
    ];

    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-50 border border-teal-100 mb-4">
                            <span className="inline-flex items-center text-teal-700 text-xs font-bold tracking-wider">
                                <Layers className="mr-2 w-3.5 h-3.5" /> KATEGORI
                            </span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                            Jelajahi berdasarkan kategori
                        </h2>
                        <p className="text-lg text-gray-600">
                            Pilih kategori yang paling sesuai dengan kondisi kucing yang kamu temukan.
                        </p>
                    </div>

                    <a
                        href="#"
                        className="inline-flex items-center text-teal-700 font-semibold hover:text-teal-600 transition-colors group whitespace-nowrap"
                    >
                        Lihat semua kategori
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {categories.map((category, index) => (
                        <a
                            key={index}
                            href="#"
                            className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-teal-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >
                            {/* Icon */}
                            <div className={`w-12 h-12 ${category.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                <category.icon className={`w-6 h-6 ${category.iconColor}`} />
                            </div>

                            {/* Title */}
                            <div className="text-lg font-bold text-gray-900 mb-1">
                                {category.title}
                            </div>

                            {/* Subtitle */}
                            <div className="text-sm text-gray-500 group-hover:text-teal-600 transition-colors">
                                {category.subtitle}
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}