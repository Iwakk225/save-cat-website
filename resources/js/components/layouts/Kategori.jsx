import { Cat, HeartCrack, Thermometer, Lock, Siren, ClipboardList, Layers, ArrowRight } from 'lucide-react';

export default function Kategori() {
    const categories = [
        {
            id: 'terlantar',
            icon: Cat,
            title: 'Kucing Terlantar',
            subtitle: 'Butuh tempat tinggal & makanan',
            bgColor: 'bg-orange-50',
            iconColor: 'text-orange-600',
            borderColor: 'hover:border-orange-200',
            shadowColor: 'hover:shadow-orange-100',
        },
        {
            id: 'terluka',
            icon: HeartCrack,
            title: 'Kucing Terluka',
            subtitle: 'Butuh pertolongan medis segera',
            bgColor: 'bg-red-50',
            iconColor: 'text-red-600',
            borderColor: 'hover:border-red-200',
            shadowColor: 'hover:shadow-red-100',
        },
        {
            id: 'sakit',
            icon: Thermometer,
            title: 'Kucing Sakit',
            subtitle: 'Perlu perawatan & obat-obatan',
            bgColor: 'bg-yellow-50',
            iconColor: 'text-yellow-600',
            borderColor: 'hover:border-yellow-200',
            shadowColor: 'hover:shadow-yellow-100',
        },
        {
            id: 'terjebak',
            icon: Lock,
            title: 'Kucing Terjebak',
            subtitle: 'Terperangkap di tempat sulit',
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-600',
            borderColor: 'hover:border-blue-200',
            shadowColor: 'hover:shadow-blue-100',
        },
        {
            id: 'darurat',
            icon: Siren,
            title: 'Kondisi Darurat',
            subtitle: 'Nyawa terancam, butuh segera!',
            bgColor: 'bg-rose-50',
            iconColor: 'text-rose-600',
            borderColor: 'hover:border-rose-200',
            shadowColor: 'hover:shadow-rose-100',
        },
        {
            id: 'lainnya',
            icon: ClipboardList,
            title: 'Lainnya',
            subtitle: 'Kasus lain yang butuh bantuan',
            bgColor: 'bg-purple-50',
            iconColor: 'text-purple-600',
            borderColor: 'hover:border-purple-200',
            shadowColor: 'hover:shadow-purple-100',
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
                        href="/reports"
                        className="inline-flex items-center text-teal-700 font-semibold hover:text-teal-600 transition-colors group whitespace-nowrap"
                    >
                        Lihat semua laporan
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((category, index) => (
                        <a
                            key={index}
                            href={`/reports?category=${category.id}`}
                            className={`group bg-white rounded-2xl p-6 border border-gray-100 ${category.borderColor} ${category.shadowColor} hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
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
                            <div className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                                {category.subtitle}
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}