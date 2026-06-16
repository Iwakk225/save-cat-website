import { FileText, Heart, Users, MapPin } from 'lucide-react';

export default function Impact() {
    // dummy
    const stats = [
        {
            icon: FileText,
            value: '12,847',
            label: 'Total Laporan',
            description: 'Laporan masuk dari seluruh Indonesia',
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-600',
        },
        {
            icon: Heart,
            value: '8,392',
            label: 'Kucing Diselamatkan',
            description: 'Berhasil mendapatkan rumah baru',
            bgColor: 'bg-pink-50',
            iconColor: 'text-pink-600',
        },
        {
            icon: Users,
            value: '26,540',
            label: 'Pengguna Aktif',
            description: 'Komunitas peduli kucing',
            bgColor: 'bg-emerald-50',
            iconColor: 'text-emerald-600',
        },
        {
            icon: MapPin,
            value: '142',
            label: 'Kota Tercover',
            description: 'Kota & kabupaten di Indonesia',
            bgColor: 'bg-indigo-50',
            iconColor: 'text-indigo-600',
        },
    ];

    return (
        <section className="py-20 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-4">
                        <span className="text-blue-600 text-sm font-semibold">
                            DAMPAK KOMUNITAS
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Setiap angka adalah
                        <br />
                        cerita penyelamatan
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Kontribusi nyata dari ribuan anggota komunitas yang peduli pada kesejahteraan kucing di Indonesia.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                        >
                            {/* Icon */}
                            <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                            </div>

                            {/* Number */}
                            <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                                {stat.value}
                            </div>

                            {/* Label */}
                            <div className="text-lg font-semibold text-gray-900 mb-1">
                                {stat.label}
                            </div>

                            {/* Description */}
                            <div className="text-sm text-gray-500">
                                {stat.description}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}