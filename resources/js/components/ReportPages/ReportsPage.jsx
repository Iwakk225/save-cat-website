import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, X, Loader2, Cat, Compass, PenLine, ArrowRight, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '../layouts/Navbar';
import HeroImage from '@/assets/hero.webp';
import useReports from './hooks/useReports';
import ReportCard from './ui/ReportCard';
import ReportModal from './ui/ReportModal';
import { CATEGORIES, STATUS_FILTERS, SORT_OPTIONS } from './constants/reports';

export default function ReportsPage() {
    const {
        search, setSearch,
        category, setCategory,
        statusFilter, setStatus,
        sortBy, setSortBy,
        page, setPage,
        reports, stats, totalPages, totalItems, isLoading,
        resetFilters
    } = useReports();

    const [selectedReport, setSelected] = useState(null);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* ── Hero Banner ── */}
            <section className="relative min-h-72 sm:h-80 pt-8 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img src={HeroImage} alt="Hero" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-linear-to-b from-teal-950/85 via-cyan-950/80 to-teal-950/90" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                        Jelajahi Laporan
                        <span className="block bg-linear-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">Kucing Butuh Bantuan</span>
                    </h1>
                    <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto">Temukan laporan di sekitarmu dan bantu selamatkan nyawa kucing.</p>

                    <div className="mt-6 relative max-w-lg mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text" placeholder="Cari laporan, lokasi, atau nama pelapor..." value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/95 backdrop-blur-md text-gray-900 placeholder:text-gray-400 text-sm font-medium shadow-xl border border-white/50 focus:outline-none focus:ring-2 focus:ring-teal-400/50 transition-all"
                        />
                        {search && (
                            <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* ── Stats Strip ── */}
            <div className="bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            { label: 'Total Laporan', value: stats.total, color: 'text-teal-700', bg: 'bg-teal-50' },
                            { label: 'Butuh Bantuan', value: stats.aktif, color: 'text-blue-700', bg: 'bg-blue-50' },
                            { label: 'Sudah Selesai', value: stats.selesai, color: 'text-emerald-700', bg: 'bg-emerald-50' },
                            { label: 'Kondisi Darurat', value: stats.darurat, color: 'text-red-700', bg: 'bg-red-50' },
                        ].map(s => (
                            <div key={s.label} className={`${s.bg} rounded-xl px-4 py-3 text-center`}>
                                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                                <p className="text-xs text-gray-500 font-medium mt-0.5">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Main Content ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* ── Category Pills ── */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide mb-6">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id} onClick={() => setCategory(cat.id)}
                            className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer ${category === cat.id ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-500/25' : 'bg-white text-gray-600 border-gray-200 hover:border-teal-300 hover:text-teal-700'}`}
                        >
                            <span>{cat.emoji}</span><span>{cat.label}</span>
                        </button>
                    ))}
                </div>

                {/* ── Toolbar ── */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                    <p className="text-sm text-gray-500 font-medium">
                        Menampilkan <span className="text-gray-900 font-bold">{totalItems}</span> laporan
                        {search && <span> untuk "<span className="text-teal-600">{search}</span>"</span>}
                    </p>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1">
                            {STATUS_FILTERS.map(s => (
                                <button
                                    key={s.id} onClick={() => setStatus(s.id)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${statusFilter === s.id ? 'bg-teal-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                                >
                                    {s.label}
                                </button>
                            ))}
                        </div>

                        <div className="relative">
                            <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            <select
                                value={sortBy} onChange={e => setSortBy(e.target.value)}
                                className="appearance-none pl-9 pr-8 py-2 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400/50 cursor-pointer"
                            >
                                {SORT_OPTIONS.map(o => (<option key={o.id} value={o.id}>{o.label}</option>))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* ── Grid ── */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
                        <Loader2 className="w-10 h-10 animate-spin text-teal-500" />
                        <p className="text-sm font-medium">Memuat laporan...</p>
                    </div>
                ) : reports.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center"><Cat className="w-10 h-10 text-gray-300" /></div>
                        <div className="text-center">
                            <p className="font-semibold text-gray-600 text-lg">Tidak ada laporan ditemukan</p>
                            <p className="text-sm mt-1">Coba ubah kata kunci pencarian atau filter kategori</p>
                        </div>
                        <Button onClick={resetFilters} variant="outline" className="border-teal-300 text-teal-700 hover:bg-teal-50 cursor-pointer">Reset Filter</Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {reports.map(report => (<ReportCard key={report.id} report={report} onClick={setSelected} />))}
                    </div>
                )}

                {/* ── Pagination ── */}
                {!isLoading && totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-10">
                        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:border-teal-400 hover:text-teal-600 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all bg-white">
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                            <button key={p} onClick={() => setPage(p)} className={`w-9 h-9 rounded-xl border text-sm font-bold cursor-pointer transition-all ${page === p ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-500/25' : 'bg-white border-gray-200 text-gray-600 hover:border-teal-400 hover:text-teal-600'}`}>
                                {p}
                            </button>
                        ))}

                        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:border-teal-400 hover:text-teal-600 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all bg-white">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {/* ── CTA Banner ── */}
                <div className="mt-14 rounded-3xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-linear-to-r from-teal-600 to-emerald-600" />
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                    <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-10">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-1">Temukan kucing yang butuh bantuan?</h3>
                            <p className="text-teal-100 text-sm">Buat laporan sekarang dan gerakkan komunitas untuk membantu 🐾</p>
                        </div>
                        <Link to="/report/create" className="shrink-0">
                            <Button className="bg-white text-teal-700 hover:bg-teal-50 font-bold px-6 py-5 rounded-xl shadow-lg cursor-pointer group">
                                <PenLine className="w-4 h-4 mr-2" /> Buat Laporan
                                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* ── Detail Modal ── */}
            {selectedReport && (<ReportModal report={selectedReport} onClose={() => setSelected(null)} />)}
        </div>
    );
}