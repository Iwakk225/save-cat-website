import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    ArrowLeft, ArrowRight, MapPin, FileText, Tag,
    Upload, X, ImagePlus, AlertCircle, CheckCircle2,
    Cat, Phone, Info
} from 'lucide-react';
import Swal from 'sweetalert2';

import './../css/Register.css';
import BgImage from '@/assets/imageskitten.jpeg';
import Logo from '@/assets/savecatlogo.png';
import CatLoader from '../vfx/Loading';

const CATEGORIES = [
    { id: 'terlantar',   label: 'Kucing Terlantar',   emoji: '🐱', color: 'from-orange-400 to-amber-500' },
    { id: 'terluka',     label: 'Kucing Terluka',      emoji: '🩹', color: 'from-red-400 to-rose-500' },
    { id: 'sakit',       label: 'Kucing Sakit',         emoji: '🤒', color: 'from-yellow-400 to-orange-400' },
    { id: 'terjebak',   label: 'Kucing Terjebak',     emoji: '😿', color: 'from-blue-400 to-cyan-500' },
    { id: 'darurat',    label: 'Kondisi Darurat',      emoji: '🚨', color: 'from-red-500 to-pink-600' },
    { id: 'lainnya',    label: 'Lainnya',              emoji: '📋', color: 'from-purple-400 to-violet-500' },
];

const URGENCY_LEVELS = [
    { id: 'rendah',    label: 'Rendah',   desc: 'Kondisi stabil, tidak mendesak', color: 'emerald', ring: 'ring-emerald-400' },
    { id: 'sedang',   label: 'Sedang',   desc: 'Perlu bantuan dalam 24 jam',      color: 'yellow',  ring: 'ring-yellow-400' },
    { id: 'tinggi',   label: 'Tinggi',   desc: 'Butuh bantuan segera!',           color: 'red',     ring: 'ring-red-400' },
];

const MAX_IMAGES = 5;
const MAX_SIZE_MB = 5;

export default function CreateReport() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1 = detail, 2 = preview
    const [focusedField, setFocusedField] = useState(null);
    const [dragOver, setDragOver] = useState(false);

    const [form, setForm] = useState({
        title: '',
        category: '',
        urgency: '',
        location: '',
        description: '',
        contact: '',
        images: [],        // { file, preview, name }
    });

    const [errors, setErrors] = useState({});

    // ─── Handlers ────────────────────────────────────────────────────────────

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const addImages = (files) => {
        const fileArray = Array.from(files);
        const current = form.images.length;
        const available = MAX_IMAGES - current;

        if (available <= 0) {
            Swal.fire({ icon: 'warning', title: 'Batas Foto', text: `Maksimal ${MAX_IMAGES} foto.`, confirmButtonColor: '#10b981' });
            return;
        }

        const toAdd = fileArray.slice(0, available);
        const oversized = toAdd.filter(f => f.size > MAX_SIZE_MB * 1024 * 1024);
        if (oversized.length > 0) {
            Swal.fire({ icon: 'error', title: 'File Terlalu Besar', text: `Maksimal ukuran tiap foto adalah ${MAX_SIZE_MB} MB.`, confirmButtonColor: '#10b981' });
            return;
        }

        const newImages = toAdd.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            name: file.name,
        }));

        setForm(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
    };

    const removeImage = (idx) => {
        setForm(prev => {
            const imgs = [...prev.images];
            URL.revokeObjectURL(imgs[idx].preview);
            imgs.splice(idx, 1);
            return { ...prev, images: imgs };
        });
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        addImages(e.dataTransfer.files);
    };

    // ─── Validation ──────────────────────────────────────────────────────────

    const validate = () => {
        const e = {};
        if (!form.title.trim())       e.title       = 'Judul laporan wajib diisi.';
        if (!form.category)            e.category    = 'Pilih kategori laporan.';
        if (!form.urgency)             e.urgency     = 'Pilih tingkat urgensi.';
        if (!form.location.trim())    e.location    = 'Lokasi wajib diisi.';
        if (!form.description.trim()) e.description = 'Deskripsi wajib diisi.';
        if (form.description.trim().length < 20) e.description = 'Deskripsi minimal 20 karakter.';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleNext = () => {
        if (validate()) setStep(2);
    };

    // ─── Submit ──────────────────────────────────────────────────────────────

    const handleSubmit = async () => {
        setLoading(true);
        const token = localStorage.getItem('user_token');

        try {
            const formData = new FormData();
            formData.append('title',       form.title);
            formData.append('category',    form.category);
            formData.append('urgency',     form.urgency);
            formData.append('location',    form.location);
            formData.append('description', form.description);
            formData.append('contact',     form.contact);
            form.images.forEach((img, i) => formData.append(`images[${i}]`, img.file));

            const res = await fetch('/api/reports', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                await Swal.fire({
                    icon: 'success',
                    title: 'Laporan Terkirim! 🐱',
                    text: 'Laporan Anda sudah diterima. Tim komunitas akan segera merespons.',
                    confirmButtonColor: '#10b981',
                    confirmButtonText: 'Lihat Laporan',
                });
                navigate(`/reports/${data.id ?? ''}`);
            } else {
                const data = await res.json();
                throw new Error(data.message || 'Gagal mengirim laporan.');
            }
        } catch (err) {
            // Simulasi sukses untuk mode frontend-only (tanpa backend aktif)
            if (!navigator.onLine || err.message === 'Failed to fetch') {
                await Swal.fire({
                    icon: 'success',
                    title: 'Laporan Terkirim! 🐱',
                    html: '<p class="text-sm text-gray-500">(Mode demo — backend belum terhubung)</p>',
                    confirmButtonColor: '#10b981',
                    confirmButtonText: 'Oke',
                });
                navigate('/');
                return;
            }
            Swal.fire({ icon: 'error', title: 'Gagal', text: err.message, confirmButtonColor: '#10b981' });
        } finally {
            setLoading(false);
        }
    };

    // ─── Render Helpers ──────────────────────────────────────────────────────

    const selectedCategory  = CATEGORIES.find(c => c.id === form.category);
    const selectedUrgency   = URGENCY_LEVELS.find(u => u.id === form.urgency);

    const urgencyBadgeClass = {
        rendah: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        sedang: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
        tinggi: 'bg-red-500/20 text-red-300 border-red-500/30',
    }[form.urgency] ?? '';

    // ─── Render ──────────────────────────────────────────────────────────────

    return (
        <div className="register-container pb-10">
            {/* Loading Overlay */}
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
                    <CatLoader />
                </div>
            )}

            {/* Background */}
            <div className="absolute inset-0 z-0">
                <img src={BgImage} alt="Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-teal-950/95 via-cyan-950/95 to-emerald-950/95 backdrop-blur-sm" />
            </div>

            {/* Back button */}
            <Link
                to="/"
                className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group animate-fade-in"
            >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span className="text-sm font-medium">Kembali</span>
            </Link>

            {/* Content */}
            <div className="relative z-10 min-h-screen flex items-start justify-center p-4 sm:p-6 lg:p-8 pt-20">
                <div className="w-full max-w-2xl animate-slide-up">

                    {/* Header */}
                    <div className="text-center mb-8 animate-fade-in">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4">
                            <img src={Logo} alt="Save Cat" className="w-14 h-14 object-contain" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-1">Buat Laporan</h1>
                        <p className="text-gray-300 text-sm">Bantu kucing yang membutuhkan pertolongan 🐾</p>

                        {/* Step indicator */}
                        <div className="flex items-center justify-center gap-3 mt-5">
                            {[1, 2].map((s) => (
                                <div key={s} className="flex items-center gap-2">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                                        step >= s
                                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/40'
                                            : 'bg-white/10 text-gray-400 border border-white/20'
                                    }`}>
                                        {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                                    </div>
                                    {s < 2 && <div className={`w-12 h-0.5 rounded-full transition-all duration-500 ${step > s ? 'bg-emerald-500' : 'bg-white/20'}`} />}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center gap-16 mt-1">
                            <span className={`text-xs font-medium ${step >= 1 ? 'text-emerald-300' : 'text-gray-500'}`}>Detail</span>
                            <span className={`text-xs font-medium ${step >= 2 ? 'text-emerald-300' : 'text-gray-500'}`}>Pratinjau</span>
                        </div>
                    </div>

                    {/* ── STEP 1: Form ── */}
                    {step === 1 && (
                        <div className="bg-teal-950/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-8 space-y-6">

                            {/* Judul */}
                            <div className="space-y-2 animate-input-delay-1">
                                <Label className="text-white text-sm font-semibold flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-emerald-400" /> Judul Laporan
                                </Label>
                                <div className={`relative transition-all duration-300 ${focusedField === 'title' ? 'scale-[1.01]' : ''}`}>
                                    <Input
                                        id="report-title"
                                        placeholder="Contoh: Kucing terluka di dekat pasar malam"
                                        value={form.title}
                                        onChange={e => handleChange('title', e.target.value)}
                                        onFocus={() => setFocusedField('title')}
                                        onBlur={() => setFocusedField(null)}
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
                                    {CATEGORIES.map(cat => (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            onClick={() => handleChange('category', cat.id)}
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
                                            key={u.id}
                                            type="button"
                                            onClick={() => handleChange('urgency', u.id)}
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
                                        id="report-location"
                                        placeholder="Nama jalan, kelurahan, atau landmark terdekat"
                                        value={form.location}
                                        onChange={e => handleChange('location', e.target.value)}
                                        onFocus={() => setFocusedField('location')}
                                        onBlur={() => setFocusedField(null)}
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
                                        id="report-description"
                                        rows={5}
                                        placeholder="Ceritakan kondisi kucing secara detail: tampilan fisik, perilaku, kondisi sekitar, dll."
                                        value={form.description}
                                        onChange={e => handleChange('description', e.target.value)}
                                        onFocus={() => setFocusedField('description')}
                                        onBlur={() => setFocusedField(null)}
                                        maxLength={1000}
                                        className="w-full px-3 py-2.5 rounded-md bg-white/10 border border-white/25 text-white placeholder:text-gray-400 text-sm font-medium resize-none focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/20 transition-all"
                                    />
                                    <span className="absolute right-3 bottom-2.5 text-xs text-gray-400 font-medium">{form.description.length}/1000</span>
                                </div>
                                {errors.description && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.description}</p>}
                            </div>

                            {/* Kontak */}
                            <div className="space-y-2 animate-input-delay-6">
                                <Label className="text-white text-sm font-semibold flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-emerald-400" /> Nomor Kontak <span className="text-gray-400 font-normal">(opsional)</span>
                                </Label>
                                <div className={`relative transition-all duration-300 ${focusedField === 'contact' ? 'scale-[1.01]' : ''}`}>
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="report-contact"
                                        type="tel"
                                        placeholder="08xxxxxxxxxx (agar mudah dihubungi relawan)"
                                        value={form.contact}
                                        onChange={e => handleChange('contact', e.target.value)}
                                        onFocus={() => setFocusedField('contact')}
                                        onBlur={() => setFocusedField(null)}
                                        className="pl-10 bg-white/10 border-white/25 text-white placeholder:text-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20 font-medium"
                                    />
                                </div>
                            </div>

                            {/* Upload Foto */}
                            <div className="space-y-3">
                                <Label className="text-white text-sm font-semibold flex items-center gap-2">
                                    <ImagePlus className="w-4 h-4 text-emerald-400" />
                                    Foto Pendukung <span className="text-gray-400 font-normal">({form.images.length}/{MAX_IMAGES})</span>
                                </Label>

                                {/* Drop zone */}
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
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        className="hidden"
                                        onChange={e => addImages(e.target.files)}
                                    />
                                </div>

                                {/* Preview grid */}
                                {form.images.length > 0 && (
                                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                        {form.images.map((img, idx) => (
                                            <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-white/20">
                                                <img
                                                    src={img.preview}
                                                    alt={img.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200 flex items-center justify-center">
                                                    <button
                                                        type="button"
                                                        onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
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

                            {/* Next button */}
                            <Button
                                type="button"
                                onClick={handleNext}
                                className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold py-6 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 group cursor-pointer"
                            >
                                Pratinjau Laporan
                                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </div>
                    )}

                    {/* ── STEP 2: Preview ── */}
                    {step === 2 && (
                        <div className="space-y-4 animate-slide-up">
                            {/* Preview card */}
                            <div className="bg-teal-950/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                                {/* Image gallery */}
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

                                {/* No image placeholder */}
                                {form.images.length === 0 && (
                                    <div className="h-28 bg-white/5 flex items-center justify-center gap-2 text-gray-500">
                                        <Cat className="w-8 h-8" />
                                        <span className="text-sm">Tidak ada foto</span>
                                    </div>
                                )}

                                <div className="p-6 space-y-4">
                                    {/* Badges */}
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

                                    {/* Title */}
                                    <h2 className="text-xl font-bold text-white">{form.title}</h2>

                                    {/* Location */}
                                    <div className="flex items-center gap-2 text-white text-sm font-medium">
                                        <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                        <span>{form.location}</span>
                                    </div>

                                    {/* Description */}
                                    <div className="bg-white/8 rounded-xl p-4 border border-white/15">
                                        <p className="text-gray-100 text-sm leading-relaxed whitespace-pre-wrap">{form.description}</p>
                                    </div>

                                    {/* Contact */}
                                    {form.contact && (
                                        <div className="flex items-center gap-2 text-white text-sm font-medium">
                                            <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                            <span>{form.contact}</span>
                                        </div>
                                    )}

                                    {/* Pelapor */}
                                    <div className="pt-2 border-t border-white/10 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white text-xs font-bold">
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

                            {/* Info banner */}
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-teal-900/60 border border-teal-400/40">
                                <Info className="w-5 h-5 text-teal-300 flex-shrink-0 mt-0.5" />
                                <p className="text-teal-100 text-sm leading-relaxed font-medium">
                                    Pastikan semua informasi sudah benar sebelum mengirim. Laporan yang dikirim akan ditinjau oleh admin dan komunitas.
                                </p>
                            </div>

                            {/* Action buttons */}
                            <div className="grid grid-cols-2 gap-3">
                                <Button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    variant="outline"
                                    className="border-white/20 bg-white/5 text-white hover:bg-white/15 hover:text-white py-6 cursor-pointer"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" /> Edit Kembali
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 group cursor-pointer"
                                >
                                    {loading ? 'Mengirim...' : 'Kirim Laporan'}
                                    {!loading && <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />}
                                </Button>
                            </div>

                            <p className="text-center text-gray-400 text-xs pb-4">
                                © 2026 Save Cat Indonesia. Semua hak dilindungi.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
