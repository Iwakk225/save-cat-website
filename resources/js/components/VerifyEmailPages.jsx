import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';
import Swal from 'sweetalert2';

import './css/Register.css';
import BgImage from '@/assets/imageskitten.jpeg';
import Logo from '@/assets/savecatlogo.png';
import CatLoader from './vfx/Loading';

export default function VerifyEmail() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState('');
    const [countdown, setCountdown] = useState(600); // 10 menit 

    useEffect(() => {
        // Jika tidak ada email, redirect ke register
        if (!email) {
            navigate('/register');
            return;
        }

        // Countdown timer
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [email, navigate]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (code.length !== 6) {
            Swal.fire({
                icon: 'error',
                title: 'Kode Tidak Valid',
                text: 'Kode verifikasi harus 6 digit.',
                confirmButtonColor: '#10b981',
            });
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/verify-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    code: code,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Verifikasi Berhasil!',
                    text: data.message,
                    confirmButtonColor: '#10b981',
                    timer: 2000,
                    showConfirmButton: false,
                });

                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Verifikasi Gagal',
                    text: data.message || 'Kode verifikasi tidak valid.',
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

    const handleResendCode = async () => {
        setLoading(true);

        try {
            const response = await fetch('/api/resend-verification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Kode Baru Terkirim!',
                    text: data.message,
                    confirmButtonColor: '#10b981',
                    timer: 2000,
                    showConfirmButton: false,
                });
                setCountdown(600); // Reset countdown
                setCode(''); // Clear input
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal Mengirim Ulang',
                    text: data.message || 'Terjadi kesalahan.',
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
                to="/register"
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
                            Verifikasi Email
                        </h1>
                        <p className="text-gray-300 text-sm">
                            Masukkan kode verifikasi yang telah dikirim ke
                        </p>
                        <p className="text-emerald-300 font-semibold mt-1">
                            {email}
                        </p>
                    </div>

                    {/* Form Container */}
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Verification Code Input */}
                            <div className="space-y-2">
                                <Label htmlFor="code" className="text-white/90 text-sm font-medium">
                                    Kode Verifikasi (6 digit)
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="code"
                                        type="text"
                                        placeholder="Masukkan 6 digit kode"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                        maxLength={6}
                                        className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-emerald-400 focus:ring-emerald-400/20 text-center text-2xl tracking-widest font-mono"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {/* Countdown Timer */}
                            <div className="text-center">
                                <p className="text-gray-300 text-sm">
                                    Kode berlaku dalam:
                                </p>
                                <p className={`text-2xl font-bold mt-1 ${countdown <= 60 ? 'text-red-400' : 'text-emerald-400'}`}>
                                    {formatTime(countdown)}
                                </p>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="cursor-pointer w-full bg-linear-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold py-6 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 group"
                                disabled={loading || code.length !== 6}
                            >
                                {loading ? 'Memverifikasi...' : 'Verifikasi Email'}
                                {!loading && <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />}
                            </Button>
                        </form>

                        {/* Resend Code */}
                        <div className="mt-6 text-center">
                            <p className="text-gray-400 text-sm mb-3">
                                Tidak menerima kode?
                            </p>
                            <button
                                onClick={handleResendCode}
                                className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-200 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={loading || countdown > 540}
                            >
                                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                                Kirim Ulang Kode
                            </button>
                            {countdown <= 540 && countdown > 0 && (
                                <p className="text-gray-500 text-xs mt-2">
                                    Tunggu {formatTime(countdown)} untuk mengirim ulang
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}