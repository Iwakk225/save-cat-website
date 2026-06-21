import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, ArrowLeft, ArrowRight } from 'lucide-react';
import Swal from 'sweetalert2';

import './css/Register.css';
import BgImage from '@/assets/imageskitten.jpeg';
import Logo from '@/assets/savecatlogo.png';
import CatLoader from './vfx/Loading';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Kode Terkirim!',
                    text: data.message,
                    confirmButtonColor: '#10b981',
                    timer: 2000,
                    showConfirmButton: false,
                });

                setTimeout(() => {
                    navigate('/verify-reset-code', { state: { email } });
                }, 2000);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal Mengirim Kode',
                    text: data.message || 'Terjadi kesalahan. Silakan coba lagi.',
                    confirmButtonColor: '#10b981',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Tidak dapat terhubung ke server. Silakan coba lagi.',
                confirmButtonColor: '#10b981',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container pb-5">
            {/* Loading Overlay */}
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
                    <CatLoader />
                </div>
            )}

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={BgImage}
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-br from-teal-900/85 via-cyan-900/80 to-emerald-900/85 backdrop-blur-sm" />
            </div>

            <Link
                to="/login"
                className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group animate-fade-in"
            >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span className="text-sm font-medium">Kembali</span>
            </Link>

            {/* Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-md animate-slide-up">
                    {/* Logo & Title */}
                    <div className="text-center mb-8 animate-fade-in">
                        <div className="inline-flex items-center justify-center w-26 h-26 rounded-full">
                            <div className="rounded-lg flex items-center justify-center">
                                <img
                                    src={Logo}
                                    alt="Save Cat"
                                    className="w-24 h-24 object-contain"
                                />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Lupa Password?
                        </h1>
                        <p className="text-gray-300 text-sm">
                            Masukkan email Anda untuk menerima kode verifikasi
                        </p>
                    </div>

                    {/* Form Container */}
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email */}
                            <div className="space-y-2 animate-input-delay-1">
                                <Label htmlFor="email" className="text-white/90 text-sm font-medium">
                                    Email
                                </Label>
                                <div className={`relative transition-all duration-300 ${focusedField === 'email' ? 'scale-[1.02]' : ''}`}>
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="contoh@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                        className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-emerald-400 focus:ring-emerald-400/20"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2 animate-input-delay-2">
                                <Button
                                    type="submit"
                                    className="cursor-pointer w-full bg-linear-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold py-6 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 group"
                                    disabled={loading}
                                >
                                    {loading ? 'Mengirim...' : 'Kirim Kode Verifikasi'}
                                    {!loading && <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />}
                                </Button>
                            </div>
                        </form>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/20"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-3 text-gray-400 bg-transparent">Ingat password?</span>
                            </div>
                        </div>

                        {/* Login Link */}
                        <Link
                            to="/login"
                            className="block text-center text-emerald-300 hover:text-emerald-200 font-medium transition-colors"
                        >
                            Masuk di sini
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}