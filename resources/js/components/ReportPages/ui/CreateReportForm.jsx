import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    ArrowRight, MapPin, FileText, Tag, Upload, X, ImagePlus, AlertCircle, CheckCircle2, Phone, Info
} from 'lucide-react';
import { REPORT_CATEGORIES, URGENCY_LEVELS, MAX_IMAGES, MAX_SIZE_MB } from '../constants/reportForm';

export default function CreateReportForm(props) {
    const {
        form, errors, focusedField, setFocusedField, dragOver, setDragOver,
        fileInputRef, handleChange, addImages, removeImage, handleDrop, handleNext,
        userData // <-- Tambahkan userData di sini (dikirim dari parent component)
    } = props;

    // Fallback: Ambil dari userData prop, atau langsung dari localStorage jika prop kosong
    const autoFilledContact = form.contact || userData?.telp || JSON.parse(localStorage.getItem('user') || '{}')?.telp || '';

    return (
        <div className="bg-teal-950/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-8 space-y-6">
            {/* Judul */}
            <div className="space-y-2 animate-input-delay-1">
                <Label className="text-white text-sm font-semibold flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" /> Judul Laporan
                </Label>
                <div className={`relative transition-all duration-300 ${focusedField === 'title' ? 'scale-[1.01]' : ''}`}>
                    <Input
                        id="report-title" placeholder="Contoh: Kucing terluka di dekat pasar malam"
                        value={form.title} onChange={e => handleChange('title', e.target.value)}
                        onFocus={() => setFocusedField('title')} onBlur={() => setFocusedField(null)}
                        className="bg-white/10 border-white/25 text-white placeholder:text-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20 font-medium"
                        maxLength={100}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">{form.title.length}/100</span>
                </div>
                {errors.title && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.title}</p>}
            </div>

            {/* Kategori */}
            <div className="space-y-2 animate-input-delay-2">
                <Label className="text-white text-sm font-semibold flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-400" /> Kategori
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {REPORT_CATEGORIES.map(cat => (
                        <button
                            key={cat.id} type="button" onClick={() => handleChange('category', cat.id)}
                            className={`relative flex items-center gap-2 p-3 rounded-xl border text-left transition-all duration-200 group cursor-pointer ${
                                form.category === cat.id
                                    ? 'border-emerald-400 bg-emerald-500/25 shadow-lg shadow-emerald-500/20'
                                    : 'border-white/20 bg-white/8 hover:border-white/35 hover:bg-white/12'
                            }`}
                        >
                            <span className="text-xl">{cat.emoji}</span>
                            <span className={`text-xs font-semibold leading-tight ${form.category === cat.id ? 'text-emerald-300' : 'text-white'}`}>
                                {cat.label}
                            </span>
                            {form.category === cat.id && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 absolute top-2 right-2" />
                            )}
                        </button>
                    ))}
                </div>
                {errors.category && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.category}</p>}
            </div>

            {/* Urgensi */}
            <div className="space-y-2 animate-input-delay-3">
                <Label className="text-white text-sm font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-emerald-400" /> Tingkat Urgensi
                </Label>
                <div className="grid grid-cols-3 gap-2">
                    {URGENCY_LEVELS.map(u => (
                        <button
                            key={u.id} type="button" onClick={() => handleChange('urgency', u.id)}
                            className={`p-3 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                                form.urgency === u.id
                                    ? `border-${u.color}-400 bg-${u.color}-500/20 ring-1 ${u.ring}`
                                    : 'border-white/20 bg-white/8 hover:border-white/35 hover:bg-white/12'
                            }`}
                        >
                            <p className={`text-sm font-bold ${
                                form.urgency === u.id
                                    ? u.color === 'emerald' ? 'text-emerald-300'
                                    : u.color === 'yellow'  ? 'text-yellow-300'
                                    : 'text-red-300'
                                    : 'text-white'
                            }`}>{u.label}</p>
                            <p className="text-xs text-gray-300 mt-0.5 leading-tight">{u.desc}</p>
                        </button>
                    ))}
                </div>
                {errors.urgency && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.urgency}</p>}
            </div>

            {/* Lokasi */}
            <div className="space-y-2 animate-input-delay-4">
                <Label className="text-white text-sm font-semibold flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400" /> Lokasi Kejadian
                </Label>
                <div className={`relative transition-all duration-300 ${focusedField === 'location' ? 'scale-[1.01]' : ''}`}>
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        id="report-location" placeholder="Nama jalan, kelurahan, atau landmark terdekat"
                        value={form.location} onChange={e => handleChange('location', e.target.value)}
                        onFocus={() => setFocusedField('location')} onBlur={() => setFocusedField(null)}
                        className="pl-10 bg-white/10 border-white/25 text-white placeholder:text-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20 font-medium"
                    />
                </div>
                {errors.location && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.location}</p>}
            </div>

            {/* Deskripsi */}
            <div className="space-y-2 animate-input-delay-5">
                <Label className="text-white text-sm font-semibold flex items-center gap-2">
                    <Info className="w-4 h-4 text-emerald-400" /> Deskripsi Situasi
                </Label>
                <div className={`relative transition-all duration-300 ${focusedField === 'description' ? 'scale-[1.005]' : ''}`}>
                    <textarea
                        id="report-description" rows={5}
                        placeholder="Ceritakan kondisi kucing secara detail: tampilan fisik, perilaku, kondisi sekitar, dll."
                        value={form.description} onChange={e => handleChange('description', e.target.value)}
                        onFocus={() => setFocusedField('description')} onBlur={() => setFocusedField(null)}
                        maxLength={1000}
                        className="w-full px-3 py-2.5 rounded-md bg-white/10 border border-white/25 text-white placeholder:text-gray-400 text-sm font-medium resize-none focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/20 transition-all"
                    />
                    <span className="absolute right-3 bottom-2.5 text-xs text-gray-400 font-medium">{form.description.length}/1000</span>
                </div>
                {errors.description && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.description}</p>}
            </div>

            {/* ===== KONTAK (DIPERBAIKI: AUTO-FILL & DISABLED) ===== */}
            <div className="space-y-2 animate-input-delay-6">
                <Label className="text-white text-sm font-semibold flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-400" /> Nomor Kontak 
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 font-normal">
                        Otomatis
                    </span>
                </Label>
                <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        id="report-contact" 
                        type="tel" 
                        value={autoFilledContact}
                        disabled
                        readOnly
                        placeholder="Memuat nomor..."
                        className="pl-10 bg-white/5 border-white/20 text-gray-300 placeholder:text-gray-500 cursor-not-allowed opacity-70 focus:outline-none font-medium"
                    />
                    {/* Ikon Centang Hijau di kanan input */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                    </div>
                </div>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                    <Info className="w-3 h-3" /> Nomor ini diambil otomatis dari profil akun Anda dan tidak dapat diubah.
                </p>
            </div>
            {/* ===== AKHIR BAGIAN KONTAK ===== */}

            {/* Upload Foto */}
            <div className="space-y-3">
                <Label className="text-white text-sm font-semibold flex items-center gap-2">
                    <ImagePlus className="w-4 h-4 text-emerald-400" />
                    Foto Pendukung <span className="text-gray-400 font-normal">({form.images.length}/{MAX_IMAGES})</span>
                </Label>

                <div
                    onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
                        dragOver
                            ? 'border-emerald-400 bg-emerald-500/15 scale-[1.01]'
                            : 'border-white/25 bg-white/8 hover:border-white/40 hover:bg-white/12'
                    }`}
                >
                    <Upload className={`w-8 h-8 transition-colors ${dragOver ? 'text-emerald-400' : 'text-gray-300'}`} />
                    <p className="text-sm text-white text-center font-medium">
                        <span className="text-emerald-400 font-semibold">Klik untuk unggah</span> atau seret foto ke sini
                    </p>
                    <p className="text-xs text-gray-300">PNG, JPG, WEBP — Maks. {MAX_SIZE_MB} MB per foto</p>
                    <input
                        ref={fileInputRef} type="file" accept="image/*" multiple className="hidden"
                        onChange={e => addImages(e.target.files)}
                    />
                </div>

                {form.images.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {form.images.map((img, idx) => (
                            <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-white/20">
                                <img src={img.preview} alt={img.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200 flex items-center justify-center">
                                    <button
                                        type="button" onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                                        className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-full bg-red-500 flex items-center justify-center text-white transition-all cursor-pointer"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Button
                type="button" onClick={handleNext}
                className="w-full bg-linear-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold py-6 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 group cursor-pointer"
            >
                Pratinjau Laporan
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
        </div>
    );
}