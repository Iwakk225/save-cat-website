import { useState, useEffect } from 'react';
import { Megaphone, PenLine, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

import CtaImage from '@/assets/kitten.png';

export default function CallToAction() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuth = () => {
        const token = localStorage.getItem('user_token');
        setIsAuthenticated(!!token);
    };

    useEffect(() => {

        checkAuth();

        window.addEventListener('auth-change', checkAuth);

        return () => {
            window.removeEventListener('auth-change', checkAuth);
        };
    }, []);

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative rounded-3xl overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <img
                            src={CtaImage}
                            alt="Kucing-kucing yang membutuhkan pertolongan"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-900/75 to-slate-900/60"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 px-8 sm:px-12 md:px-16 py-16 md:py-20 lg:py-24">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Left: Text */}
                            <div>
                                {/* Badge */}
                                <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                                    <Megaphone className="w-4 h-4 text-white mr-2" />
                                    <span className="text-white text-sm font-semibold tracking-wide">
                                        SAATNYA BERGERAK
                                    </span>
                                </div>

                                {/* Heading */}
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                                    Satu laporanmu bisa menyelamatkan hidup seekor kucing.
                                </h2>

                                {/* Description */}
                                <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl">
                                    Gabung sekarang dan jadi bagian dari komunitas penyelamat kucing terbesar di Indonesia. Gratis, mudah, dan dampaknya nyata.
                                </p>
                            </div>

                            {/* Right: Buttons */}
                            <div className="flex flex-col gap-4 lg:justify-end lg:items-end">
                                {isAuthenticated ? (
                                    <Link to="/report/create" className="w-full lg:w-auto">
                                        <Button
                                            size="lg"
                                            className="w-full lg:w-auto bg-white text-slate-900 hover:bg-gray-100 cursor-pointer px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                        >
                                            <PenLine className="w-5 h-5 mr-2" />
                                            Buat Laporan Sekarang
                                        </Button>
                                    </Link>
                                ) : (
                                    <>
                                        <Link to="/register?redirect=/report/create" className="w-full lg:w-auto">
                                            <Button
                                                size="lg"
                                                className="w-full lg:w-auto bg-white text-slate-900 hover:bg-gray-100 cursor-pointer px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                            >
                                                <PenLine className="w-5 h-5 mr-2" />
                                                Buat Laporan Sekarang
                                            </Button>
                                        </Link>
                                        <Link to="/register" className="w-full lg:w-auto">
                                            <Button
                                                size="lg"
                                                variant="outline"
                                                className="w-full lg:w-auto border-2 border-white/40 text-white bg-transparent hover:bg-white/10 hover:border-white/70 cursor-pointer px-8 py-6 text-base font-semibold backdrop-blur-sm transition-all duration-300"
                                            >
                                                <UserPlus className="w-5 h-5 mr-2" />
                                                Daftar Gratis
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}