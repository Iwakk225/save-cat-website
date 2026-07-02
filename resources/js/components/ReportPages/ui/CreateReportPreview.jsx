import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, MapPin, AlertCircle, Cat, Phone, Info } from 'lucide-react';

export default function CreateReportPreview(props) {
    const { form, loading, selectedCategory, selectedUrgency, urgencyBadgeClass, setStep, handleSubmit } = props;

    return (
        <div className="space-y-4 animate-slide-up">
            <div className="bg-teal-950/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                {form.images.length > 0 && (
                    <div className="grid grid-cols-3 gap-0.5">
                        {form.images.slice(0, 3).map((img, i) => (
                            <div key={i} className={`relative overflow-hidden ${i === 0 && form.images.length === 1 ? 'col-span-3' : i === 0 && form.images.length === 2 ? 'col-span-2' : ''}`}
                                style={{ aspectRatio: i === 0 && form.images.length === 1 ? '16/7' : '1' }}>
                                <img src={img.preview} alt="" className="w-full h-full object-cover" />
                                {i === 2 && form.images.length > 3 && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                        <span className="text-white text-xl font-bold">+{form.images.length - 3}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {form.images.length === 0 && (
                    <div className="h-28 bg-white/5 flex items-center justify-center gap-2 text-gray-500">
                        <Cat className="w-8 h-8" />
                        <span className="text-sm">Tidak ada foto</span>
                    </div>
                )}

                <div className="p-6 space-y-4">
                    <div className="flex flex-wrap gap-2">
                        {selectedCategory && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-xs text-white font-semibold">
                                {selectedCategory.emoji} {selectedCategory.label}
                            </span>
                        )}
                        {selectedUrgency && (
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${urgencyBadgeClass}`}>
                                <AlertCircle className="w-3 h-3" /> Urgensi {selectedUrgency.label}
                            </span>
                        )}
                    </div>

                    <h2 className="text-xl font-bold text-white">{form.title}</h2>

                    <div className="flex items-center gap-2 text-white text-sm font-medium">
                        <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{form.location}</span>
                    </div>

                    <div className="bg-white/8 rounded-xl p-4 border border-white/15">
                        <p className="text-gray-100 text-sm leading-relaxed whitespace-pre-wrap">{form.description}</p>
                    </div>

                    {form.contact && (
                        <div className="flex items-center gap-2 text-white text-sm font-medium">
                            <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>{form.contact}</span>
                        </div>
                    )}

                    <div className="pt-2 border-t border-white/10 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white text-xs font-bold">
                            {(() => {
                                try {
                                    const u = JSON.parse(localStorage.getItem('user') || '{}');
                                    return (u.name || 'U').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
                                } catch { return 'U'; }
                            })()}
                        </div>
                        <div>
                            <p className="text-white text-xs font-semibold">
                                {(() => { try { return JSON.parse(localStorage.getItem('user') || '{}').name || 'Pengguna'; } catch { return 'Pengguna'; } })()}
                            </p>
                            <p className="text-gray-300 text-xs">Pelapor</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-teal-900/60 border border-teal-400/40">
                <Info className="w-5 h-5 text-teal-300 shrink-0 mt-0.5" />
                <p className="text-teal-100 text-sm leading-relaxed font-medium">
                    Pastikan semua informasi sudah benar sebelum mengirim. Laporan yang dikirim akan ditinjau oleh admin dan komunitas.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <Button
                    type="button" onClick={() => setStep(1)} variant="outline"
                    className="border-white/20 bg-white/5 text-white hover:bg-white/15 hover:text-white py-6 cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Edit Kembali
                </Button>
                <Button
                    type="button" onClick={handleSubmit} disabled={loading}
                    className="bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 group cursor-pointer"
                >
                    {loading ? 'Mengirim...' : 'Kirim Laporan'}
                    {!loading && <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />}
                </Button>
            </div>

            <p className="text-center text-gray-400 text-xs pb-4">
                © 2026 Save Cat Indonesia. Semua hak dilindungi.
            </p>
        </div>
    );
}