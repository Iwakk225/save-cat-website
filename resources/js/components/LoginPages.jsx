import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import Swal from 'sweetalert2';

import './../components/css/Register.css';
import BgImage from '@/assets/imageskitten.jpeg';
import Logo from '@/assets/savecatlogo.png';
import CatLoader from './vfx/Loading';

export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [focusedField, setFocusedField] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('user_token', data.user_token);
                localStorage.setItem('user', JSON.stringify(data.user));

                window.dispatchEvent(new Event('storage-change'));

                Swal.fire({
                    icon: 'success',
                    title: 'Login Berhasil!',
                    text: `Selamat datang, ${data.user.name}!`,
                    confirmButtonColor: '#10b981',
                    timer: 1500,
                    showConfirmButton: false,
                });

                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Gagal',
                    text: data.message || 'Email atau password salah.',
                    confirmButtonColor: '#10b981',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Tidak dapat terhubung ke server.',
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
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
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
                to="/"
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
                            Selamat Datang Kembali
                        </h1>
                        <p className="text-gray-300 text-sm">
                            Masuk ke akun Save Cat Anda
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
                                        value={formData.email}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                        className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-emerald-400 focus:ring-emerald-400/20"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2 animate-input-delay-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-white/90 text-sm font-medium">
                                        Password
                                    </Label>
                                    <Link
                                        to="/forgot-password"
                                        className="text-xs text-emerald-300 hover:text-emerald-200 transition-colors"
                                    >
                                        Lupa password?
                                    </Link>
                                </div>
                                <div className={`relative transition-all duration-300 ${focusedField === 'password' ? 'scale-[1.02]' : ''}`}>
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Masukkan password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('password')}
                                        onBlur={() => setFocusedField(null)}
                                        className="pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-emerald-400 focus:ring-emerald-400/20"
                                        required
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                        disabled={loading}
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2 animate-input-delay-3">
                                <Button
                                    type="submit"
                                    className="cursor-pointer w-full bg-linear-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold py-6 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 group"
                                    disabled={loading}
                                >
                                    {loading ? 'Memproses...' : 'Masuk'}
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
                                <span className="px-3 text-gray-400 bg-transparent">Belum punya akun?</span>
                            </div>
                        </div>

                        {/* Register Link */}
                        <Link
                            to="/register"
                            className="block text-center text-emerald-300 hover:text-emerald-200 font-medium transition-colors"
                        >
                            Daftar di sini
                        </Link>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-gray-400 text-xs mt-6 animate-fade-in">
                        © 2026 Save Cat Indonesia. Semua hak dilindungi.
                    </p>
                </div>
            </div>
        </div>
    );
}