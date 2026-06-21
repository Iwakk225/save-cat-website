import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Lock, ArrowLeft, ArrowRight } from 'lucide-react';
import Swal from 'sweetalert2';

import '../css/Register.css';
import BgImage from '@/assets/imageskitten.jpeg';
import Logo from '@/assets/savecatlogo.png';
import CatLoader from '../vfx/Loading';

export default function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const code = location.state?.code;

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });
    const [focusedField, setFocusedField] = useState(null);

    if (!email || !code) {
        navigate('/forgot-password');
        return null;
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Password Tidak Cocok',
                text: 'Password dan konfirmasi password harus sama.',
                confirmButtonColor: '#10b981',
            });
            return;
        }

        if (formData.password.length < 8) {
            Swal.fire({
                icon: 'error',
                title: 'Password Terlalu Pendek',
                text: 'Password minimal 8 karakter.',
                confirmButtonColor: '#10b981',
            });
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    code,
                    password: formData.password,
                    password_confirmation: formData.confirmPassword,
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Password Berhasil Diubah!',
                    text: data.message,
                    confirmButtonColor: '#10b981',
                    timer: 2500,
                    showConfirmButton: false,
                });

                setTimeout(() => {
                    navigate('/login');
                }, 2500);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal Mengubah Password',
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
                to="/verify-reset-code"
                state={{ email }}
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
                            Buat Password Baru
                        </h1>
                        <p className="text-gray-300 text-sm">
                            Password baru Anda harus berbeda dari password sebelumnya
                        </p>
                    </div>

                    {/* Form Container */}
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Password Baru */}
                            <div className="space-y-2 animate-input-delay-1">
                                <Label htmlFor="password" className="text-white/90 text-sm font-medium">
                                    Password Baru
                                </Label>
                                <div className={`relative transition-all duration-300 ${focusedField === 'password' ? 'scale-[1.02]' : ''}`}>
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Minimal 8 karakter"
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

                            {/* Konfirmasi Password Baru */}
                            <div className="space-y-2 animate-input-delay-2">
                                <Label htmlFor="confirmPassword" className="text-white/90 text-sm font-medium">
                                    Konfirmasi Password Baru
                                </Label>
                                <div className={`relative transition-all duration-300 ${focusedField === 'confirmPassword' ? 'scale-[1.02]' : ''}`}>
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Ulangi password baru"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('confirmPassword')}
                                        onBlur={() => setFocusedField(null)}
                                        className="pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-emerald-400 focus:ring-emerald-400/20"
                                        required
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                        disabled={loading}
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
                                    {loading ? 'Menyimpan...' : 'Simpan Password Baru'}
                                    {!loading && <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}