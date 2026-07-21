import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';

const stats = [
    { label: 'Laporan terbantu', value: '120+' },
    { label: 'Relawan aktif', value: '500+' },
    { label: 'Kota terjangkau', value: '15+' },
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
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <Navbar />

            <main className="pt-24 pb-16">
                <section className="border-b border-slate-200 bg-white">
                    <div className="mx-auto max-w-6xl px-6 py-20">
                        <div className="max-w-3xl">
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Tentang Kami</p>
                            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                                Save Cat Community menghubungkan bantuan nyata untuk kucing yang membutuhkan.
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-slate-600">
                                Sebuah platform sederhana untuk melaporkan kucing terlantar, sakit, terluka, atau terjebak, lalu menghubungkan pelapor dengan relawan dan komunitas setempat.
                            </p>
                        </div>

                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <Link
                                to="/report/create"
                                className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                            >
                                Laporkan kebutuhan
                            </Link>
                            <Link
                                to="/reports"
                                className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white px-6 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50"
                            >
                                Lihat laporan terbaru
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="border-b border-slate-200 bg-slate-50">
                    <div className="mx-auto max-w-6xl px-6 py-16">
                        <div className="grid gap-4 sm:grid-cols-3">
                            {stats.map((item) => (
                                <div key={item.label} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                                    <p className="text-3xl font-semibold text-emerald-800">{item.value}</p>
                                    <p className="mt-2 text-sm text-slate-600">{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="border-b border-slate-200 bg-white">
                    <div className="mx-auto max-w-6xl px-6 py-16">
                        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Misi Kami</p>
                                <h2 className="mt-3 text-3xl font-semibold text-slate-900">Membuat pertolongan datang cepat dan terarah.</h2>
                                <p className="mt-4 text-slate-600 leading-8">
                                    Kami merancang proses pelaporan yang mudah dipahami dan bertujuan mempercepat aksi komunitas untuk kucing yang membutuhkan.
                                </p>
                            </div>
                            <div className="space-y-4">
                                {[
                                    'Menghubungkan pelapor dengan relawan lokal secara cepat.',
                                    'Menyediakan pelaporan yang mudah dan dapat dipakai semua orang.',
                                    'Mendorong kerja sama aman dari relawan dan warga sekitar.',
                                ].map((item) => (
                                    <div key={item} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                                        <p className="text-sm font-medium text-slate-900">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-b border-slate-200 bg-slate-50">
                    <div className="mx-auto max-w-6xl px-6 py-16">
                        <h2 className="text-3xl font-semibold text-slate-900">Nilai Kami</h2>
                        <div className="mt-8 grid gap-4 sm:grid-cols-3">
                            {values.map((value) => (
                                <div key={value.title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                                    <h3 className="text-lg font-semibold text-slate-900">{value.title}</h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-600">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-6xl px-6 py-16">
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                        <h2 className="text-3xl font-semibold text-slate-900">Bergabung membantu</h2>
                        <p className="mt-4 text-slate-600 leading-8">
                            Setiap laporan membantu relawan dan komunitas bertindak lebih cepat. Jika Anda melihat kucing yang membutuhkan, laporkan sekarang dan bantu perubahan nyata.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                to="/report/create"
                                className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                            >
                                Buat laporan sekarang
                            </Link>
                            <Link
                                to="/reports"
                                className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white px-6 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50"
                            >
                                Jelajahi laporan
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
