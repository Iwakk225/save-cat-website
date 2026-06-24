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
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-teal-200 mb-4">
                        <span className="inline-flex items-center text-teal-700 text-sm font-semibold">
                            <MoveUpRight className="mr-2 w-4 h-4" /> PERJALANAN KAMI
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                        Langkah kecil untuk
                        <br />
                        perubahan besar
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Awal perjalanan kami membangun komunitas peduli kucing di Indonesia. Setiap bantuan sangat berarti.
                    </p>
                </div>

                {/* Stats Grid - Size lebih compact */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden"
                        >
                            {/* Decorative gradient background */}
                            <div className={`absolute inset-0 bg-linear-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                            
                            {/* Content */}
                            <div className="relative">
                                {/* Icon with ring */}
                                <div className="relative inline-flex mb-4">
                                    <div className={`absolute inset-0 ${stat.bgColor} rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500`}></div>
                                    <div className={`relative w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
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
                                <div className={`mt-4 h-0.5 w-10 bg-linear-to-r ${stat.gradient} rounded-full opacity-60 group-hover:w-full transition-all duration-500`}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}