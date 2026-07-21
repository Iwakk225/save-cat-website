import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PenLine, Compass, HeartHandshake } from 'lucide-react';
import SimpleParallax from "simple-parallax-js";

import HeroImage from '@/assets/hero.webp';
import HeroImageMobile from '@/assets/hero-mobile.webp';
import HeroImageTablet from '@/assets/hero-tablet.webp';
import HeroImageTablet2 from '@/assets/hero-tablet2.webp';

export default function Hero() {
    const [screenSize, setScreenSize] = useState('desktop');

    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            if (width < 900) {
                setScreenSize('mobile');
            } else if (width < 901) {
                setScreenSize('tablet2');
            } else if (width < 1300) {
                setScreenSize('tablet');
            } else {
                setScreenSize('desktop');
            }
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const currentImage = screenSize === 'mobile'
        ? HeroImageMobile
        : screenSize === 'tablet'
            ? HeroImageTablet
            : screenSize === 'tablet2'
                ? HeroImageTablet2
                : HeroImage;

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <SimpleParallax scale={1.2} orientation="down" delay={1.2}>
                    <img
                        src={currentImage}
                        alt="Cat background"
                        className="w-full h-full object-cover"
                    />
                </SimpleParallax>

                {/* Background gradient */}
                <div className="absolute inset-0 bg-linear-to-b from-teal-950/85 via-cyan-900/75 to-emerald-900/85" />

                {/* Wave separator - gunakan warna yang SAMA dengan Impact */}
                <div className="absolute -bottom-1 -left-5 right-0">
                    <svg
                        viewBox="0 0 1440 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-auto text-green-700"
                    >
                        <path
                            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                            fill="currentColor"
                        />
                    </svg>
                </div>

                {/* Decorative elements */}
                <div className="absolute left-[-10%] top-[-8%] h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />
                <div className="absolute bottom-12 right-[-5%] h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-4 py-24 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-28">
                <div className="max-w-2xl text-center lg:text-left">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-teal-100 backdrop-blur-sm">
                        <HeartHandshake className="h-4 w-4" />
                        Komunitas peduli kucing Indonesia
                    </div>

                    <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                        Bersama Selamatkan
                        <br />
                        <span className="bg-linear-to-r from-emerald-200 via-cyan-200 to-teal-200 bg-clip-text text-transparent">
                            Kucing yang Membutuhkan
                        </span>
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-gray-200 sm:text-xl">
                        Platform komunitas untuk melaporkan kucing terlantar, sakit, hilang, atau yang membutuhkan adopsi.
                        Dengan satu laporan, Anda menggerakkan ratusan relawan di sekitar Anda.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                        <Link to="/report/create">
                            <Button
                                size="lg"
                                className="cursor-pointer w-full rounded-full bg-linear-to-r from-teal-600 to-cyan-600 px-7 py-6 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:from-teal-700 hover:to-cyan-700 hover:shadow-xl sm:w-auto"
                            >
                                <PenLine className="mr-2 h-5 w-5" />
                                Buat Laporan
                            </Button>
                        </Link>
                        <Link to="/reports">
                            <Button
                                size="lg"
                                variant="outline"
                                className="cursor-pointer w-full rounded-full border-2 border-white/30 bg-transparent px-7 py-6 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/50 sm:w-auto"
                            >
                                <Compass className="mr-2 h-5 w-5" />
                                Jelajahi Laporan
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}