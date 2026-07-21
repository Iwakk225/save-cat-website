import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MoveUpRight, Heart, Shield, Zap, PenLine, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';

import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';

const stats = [
    {
        label: 'Laporan terbantu',
        value: '120+',
        icon: Heart,
        bgColor: 'bg-rose-50',
        iconColor: 'text-rose-600',
        gradient: 'from-rose-500 to-rose-600',
    },
    {
        label: 'Relawan aktif',
        value: '500+',
        icon: Shield,
        bgColor: 'bg-teal-50',
        iconColor: 'text-teal-600',
        gradient: 'from-teal-500 to-teal-600',
    },
    {
        label: 'Kota terjangkau',
        value: '15+',
        icon: Zap,
        bgColor: 'bg-amber-50',
        iconColor: 'text-amber-600',
        gradient: 'from-amber-500 to-amber-600',
    },
];

const values = [
    {
        title: 'Empati',
        description: 'Kami percaya setiap kucing yang membutuhkan bantuan layak mendapat perhatian dan perlakuan manusiawi.',
    },
    {
        title: 'Keamanan',
        description: 'Setiap laporan kami prioritaskan keselamatan baik untuk kucing, relawan, maupun masyarakat sekitar.',
    },
    {
        title: 'Aksi Cepat',
        description: 'Kami mendorong respons yang cepat agar bantuan bisa sampai sebelum situasi menjadi lebih parah.',
    },
];

export default function AboutPages() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleProtectedAction = (targetPath) => {
        const token = localStorage.getItem('user_token');

        if (!token) {
            navigate('/login', {
                state: { from: location },
                replace: true
            });
        } else {
            navigate(targetPath);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <Navbar />

            <main>
                {/* ===== HERO SECTION DENGAN STYLE BACKGROUND IMPACT ===== */}
                <section className="relative bg-linear-to-b from-green-800 via-emerald-800 to-green-900 overflow-hidden">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>

                    {/* Floating leaves */}
                    <svg className="absolute top-8 left-12 w-16 h-16 text-emerald-400/20 rotate-12 pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
                    </svg>
                    <svg className="absolute top-20 right-16 w-12 h-12 text-green-300/20 -rotate-45 pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
                    </svg>

                    {/* Cat silhouette - sitting */}
                    <svg className="absolute top-12 right-1/4 w-24 h-24 text-green-900/20 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
                        <path d="M30 85 L30 55 Q30 45 35 40 L32 25 L40 35 Q45 32 50 32 Q55 32 60 35 L68 25 L65 40 Q70 45 70 55 L70 85 L60 85 L60 70 L40 70 L40 85 Z" />
                        <circle cx="42" cy="48" r="2" />
                        <circle cx="58" cy="48" r="2" />
                        <path d="M48 54 Q50 56 52 54" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    </svg>

                    {/* Paw prints */}
                    <svg className="absolute top-32 left-1/3 w-6 h-6 text-white/10 rotate-12 pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
                        <ellipse cx="12" cy="16" rx="5" ry="4" />
                        <circle cx="7" cy="10" r="2" />
                        <circle cx="17" cy="10" r="2" />
                        <circle cx="10" cy="7" r="1.5" />
                        <circle cx="14" cy="7" r="1.5" />
                    </svg>

                    {/* Fireflies */}
                    <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-yellow-200/30 rounded-full pointer-events-none animate-pulse"></div>
                    <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-yellow-100/20 rounded-full pointer-events-none animate-pulse delay-700"></div>
                    <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-emerald-200/25 rounded-full pointer-events-none animate-pulse delay-1000"></div>

                    {/* Main Content Hero */}
                    <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32 z-10">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-emerald-400/30 mb-6">
                                <span className="inline-flex items-center text-emerald-100 text-sm font-semibold">
                                    <MoveUpRight className="mr-2 w-4 h-4" /> TENTANG KAMI
                                </span>
                            </div>

                            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                                Save Cat Community menghubungkan <span className="text-emerald-300">bantuan nyata</span> untuk kucing yang membutuhkan.
                            </h1>

                            <p className="mt-6 text-lg leading-8 text-emerald-100/90 max-w-2xl">
                                Sebuah platform sederhana untuk melaporkan kucing terlantar, sakit, terluka, atau terjebak, lalu menghubungkan pelapor dengan relawan dan komunitas setempat secara cepat dan aman.
                            </p>

                            <div className="mt-10 flex flex-col gap-4 sm:flex-row mb-5">
                                <Button
                                    size="lg"
                                    onClick={() => handleProtectedAction('/report/create')}
                                    className="cursor-pointer w-full rounded-full bg-linear-to-r from-teal-600 to-cyan-600 px-7 py-6 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:from-teal-700 hover:to-cyan-700 hover:shadow-xl sm:w-auto"
                                >
                                    <PenLine className="mr-2 h-5 w-5" />
                                    Laporkan kebutuhan
                                </Button>

                                <Link to="/reports">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="cursor-pointer w-full rounded-full border-2 border-white/30 bg-transparent px-7 py-6 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/50 sm:w-auto"
                                    >
                                        <Compass className="mr-2 h-5 w-5" />
                                        Jelajahi Laporan
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Wave separator ke section bawah */}
                    <div className="absolute -bottom-1 -left-5 right-0">
                        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto text-slate-50">
                            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="currentColor" />
                        </svg>
                    </div>
                </section>

                {/* ===== STATS SECTION ===== */}
                <section className="relative mt-8 pb-16">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="grid gap-6 sm:grid-cols-3">
                            {stats.map((item) => (
                                <div
                                    key={item.label}
                                    className="group relative bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden"
                                >
                                    <div className={`absolute inset-0 bg-linear-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                                    <div className="relative">
                                        <div className="relative inline-flex mb-4">
                                            <div className={`absolute inset-0 ${item.bgColor} rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500`}></div>
                                            <div className={`relative w-12 h-12 ${item.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                                <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                                            </div>
                                        </div>
                                        <div className="text-3xl font-bold text-slate-900 mb-1 tracking-tight">{item.value}</div>
                                        <div className="text-base font-semibold text-slate-900 mb-1">{item.label}</div>
                                        <div className={`mt-4 h-0.5 w-10 bg-linear-to-r ${item.gradient} rounded-full opacity-60 group-hover:w-full transition-all duration-500`}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===== MISSION SECTION ===== */}
                <section className="border-t border-slate-200 bg-white">
                    <div className="mx-auto max-w-6xl px-6 py-16">
                        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                            <div>
                                <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
                                    <span className="text-emerald-700 text-sm font-semibold tracking-wide">MISI KAMI</span>
                                </div>
                                <h2 className="text-3xl font-bold text-slate-900 leading-tight">
                                    Membuat pertolongan datang cepat dan terarah.
                                </h2>
                                <p className="mt-4 text-slate-600 leading-8 text-lg">
                                    Kami merancang proses pelaporan yang mudah dipahami dan bertujuan mempercepat aksi komunitas untuk kucing yang membutuhkan, tanpa birokrasi yang rumit.
                                </p>
                            </div>
                            <div className="space-y-4">
                                {[
                                    'Menghubungkan pelapor dengan relawan lokal secara cepat.',
                                    'Menyediakan pelaporan yang mudah dan dapat dipakai semua orang.',
                                    'Mendorong kerja sama aman dari relawan dan warga sekitar.',
                                ].map((item, idx) => (
                                    <div key={idx} className="group flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 transition-all hover:border-emerald-200 hover:bg-emerald-50/50">
                                        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200">
                                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <p className="text-sm font-medium text-slate-700 group-hover:text-slate-900">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== VALUES SECTION ===== */}
                <section className="border-t border-slate-200 bg-slate-50">
                    <div className="mx-auto max-w-6xl px-6 py-16">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <h2 className="text-3xl font-bold text-slate-900">Nilai yang Kami Pegang</h2>
                            <p className="mt-4 text-slate-600">Prinsip dasar yang memandu setiap langkah dan keputusan dalam komunitas kami.</p>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-3">
                            {values.map((value) => (
                                <div key={value.title} className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md hover:ring-emerald-200">
                                    <h3 className="text-xl font-bold text-slate-900">{value.title}</h3>
                                    <p className="mt-4 text-sm leading-7 text-slate-600">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===== CTA SECTION ===== */}
                <section className="mx-auto max-w-6xl px-6 py-16">
                    <div className="relative overflow-hidden rounded-[2rem] bg-linear-to-br from-emerald-800 to-green-900 p-8 shadow-xl sm:p-16">
                        {/* Decorative elements for CTA */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>
                        <svg className="absolute bottom-4 right-8 w-16 h-16 text-white/5 rotate-12 pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
                        </svg>

                        <div className="relative z-10 max-w-2xl">
                            <h2 className="text-3xl font-bold text-white sm:text-4xl">Bergabung membantu sekarang</h2>
                            <p className="mt-4 text-lg text-emerald-100/90 leading-relaxed">
                                Setiap laporan membantu relawan dan komunitas bertindak lebih cepat. Jika Anda melihat kucing yang membutuhkan, laporkan sekarang dan bantu perubahan nyata.
                            </p>
                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <button
                                    onClick={() => handleProtectedAction('/report/create')}
                                    className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-bold text-emerald-800 transition hover:bg-emerald-50 shadow-lg cursor-pointer"
                                >
                                    Buat laporan sekarang
                                </button>

                                <Link
                                    to="/reports"
                                    className="inline-flex items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-900/30 backdrop-blur-sm px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-800/50"
                                >
                                    Jelajahi laporan
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}