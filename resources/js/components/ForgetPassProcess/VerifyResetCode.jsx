import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Swal from 'sweetalert2';

import '../css/Register.css';
import BgImage from '@/assets/imageskitten.jpeg';
import Logo from '@/assets/savecatlogo.png';
import CatLoader from '../vfx/Loading';

export default function VerifyResetCode() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(null);
    const [canResend, setCanResend] = useState(true);
    const [cooldownTime, setCooldownTime] = useState(0); 
    const inputRefs = useRef([]);
    const cooldownInterval = useRef(null);

    useEffect(() => {
        if (!email) {
            navigate('/forgot-password');
        }
    }, [email, navigate]);

    // Cleanup interval saat component unmount
    useEffect(() => {
        return () => {
            if (cooldownInterval.current) {
                clearInterval(cooldownInterval.current);
            }
        };
    }, []);

    // Start cooldown timer
    const startCooldown = () => {
        setCanResend(false);
        setCooldownTime(600); // 10 menit = 600 detik

        cooldownInterval.current = setInterval(() => {
            setCooldownTime((prev) => {
                if (prev <= 1) {
                    clearInterval(cooldownInterval.current);
                    setCanResend(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // Format countdown ke "Xm Ys"
    const formatCooldown = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    const handleChange = (index, value) => {
        if (value.length > 1) {
            value = value[value.length - 1];
        }

        if (!/^\d*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);

        if (!/^\d+$/.test(pastedData)) return;

        const newCode = [...code];
        for (let i = 0; i < pastedData.length && i < 6; i++) {
            newCode[i] = pastedData[i];
        }
        setCode(newCode);

        const nextIndex = Math.min(pastedData.length, 5);
        inputRefs.current[nextIndex]?.focus();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fullCode = code.join('');
        if (fullCode.length !== 6) {
            Swal.fire({
                icon: 'error',
                title: 'Kode Tidak Lengkap',
                text: 'Silakan masukkan 6 digit kode verifikasi.',
                confirmButtonColor: '#10b981',
            });
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/verify-reset-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ email, code: fullCode }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Kode Valid!',
                    text: 'Silakan buat password baru Anda.',
                    confirmButtonColor: '#10b981',
                    timer: 2000,
                    showConfirmButton: false,
                });

                setTimeout(() => {
                    navigate('/reset-password', { state: { email, code: fullCode } });
                }, 2000);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Kode Tidak Valid',
                    text: data.message || 'Kode verifikasi salah. Silakan coba lagi.',
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
        if (!canResend) return;

        setLoading(true);

        try {
            const response = await fetch('/api/resend-reset-code', {
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
                    title: 'Kode Terkirim Ulang!',
                    text: data.message,
                    confirmButtonColor: '#10b981',
                    timer: 2000,
                    showConfirmButton: false,
                });

                // Start cooldown setelah berhasil kirim
                startCooldown();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal Mengirim Ulang',
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

    if (!email) return null;

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
                to="/forgot-password"
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
                            Verifikasi Kode
                        </h1>
                        <p className="text-gray-300 text-sm">
                            Masukkan 6 digit kode yang dikirim ke
                        </p>
                        <p className="text-emerald-300 text-sm font-medium mt-1">
                            {email}
                        </p>
                    </div>

                    {/* Form Container */}
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Code Input */}
                            <div className="space-y-4 animate-input-delay-1">
                                <div className="flex justify-center gap-2 sm:gap-3">
                                    {code.map((digit, index) => (
                                        <div
                                            key={index}
                                            className={`transition-all duration-300 ${focusedIndex === index ? 'scale-110' : ''}`}
                                        >
                                            <input
                                                ref={(el) => (inputRefs.current[index] = el)}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleChange(index, e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                                onPaste={handlePaste}
                                                onFocus={() => setFocusedIndex(index)}
                                                onBlur={() => setFocusedIndex(null)}
                                                className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold bg-white/5 border-2 border-white/20 text-white rounded-lg focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 outline-none transition-all"
                                                disabled={loading}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2 animate-input-delay-2">
                                <Button
                                    type="submit"
                                    className="cursor-pointer w-full bg-linear-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold py-6 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 group"
                                    disabled={loading}
                                >
                                    {loading ? 'Memverifikasi...' : 'Verifikasi Kode'}
                                    {!loading && <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />}
                                </Button>
                            </div>
                        </form>

                        {/* Resend Code */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/20"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-3 text-gray-400 bg-transparent">Tidak menerima kode?</span>
                            </div>
                        </div>

                        <button
                            onClick={handleResendCode}
                            className={`block w-full text-center font-medium transition-colors ${
                                canResend
                                    ? 'text-emerald-300 hover:text-emerald-200 cursor-pointer'
                                    : 'text-gray-500 cursor-not-allowed'
                            }`}
                            disabled={!canResend || loading}
                        >
                            {canResend ? 'Kirim Ulang Kode' : `Kirim Ulang Kode (${formatCooldown(cooldownTime)})`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}