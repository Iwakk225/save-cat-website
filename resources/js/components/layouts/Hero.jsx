import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PenLine, Compass } from 'lucide-react';
import SimpleParallax from "simple-parallax-js";

import HeroImage from '@/assets/hero.webp';
import HeroImageMobile from '@/assets/hero-mobile.webp';
import HeroImageTablet from '@/assets/hero-tablet.webp';

export default function Hero() {
    const [screenSize, setScreenSize] = useState('desktop');

    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            if (width < 900) {
                setScreenSize('mobile');
            } else if (width < 901) {
                setScreenSize('tablet');
            } else if (width < 1300) {
                setScreenSize('tablet2');
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
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <SimpleParallax scale={1.2} orientation="down" delay={1.2}>
                    <img
                        src={currentImage}
                        alt="Cat background"
                        className="w-full h-full object-cover"
                    />
                </SimpleParallax>
                
                {/* ===== OVERLAY GRADIENT — untuk transisi smooth ke section Impact ===== */}
                {/* Gradient atas (gelap) */}
                <div className="absolute inset-0 bg-linear-to-b from-teal-900/80 via-cyan-900/70 to-emerald-900/80" />
                
                {/* Gradient bawah — TRANSISI ke green-700 (Impact section) */}
                <div className="absolute bottom-0 left-0 right-0 h-125 bg-linear-to-t from-green-700 via-green-800/60  to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Heading - Responsive margin top */}
                <h1 className="animate-fade-in-up mt-16 sm:mt-20 md:mt-28 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                    Bersama Selamatkan
                    <br />
                    <span className="bg-linear-to-r from-emerald-200 via-cyan-200 to-teal-200 bg-clip-text text-transparent">
                        Kucing yang Membutuhkan
                    </span>
                </h1>

                {/* Description */}
                <p className="animate-fade-in-up-delay-1 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed tracking-wide">
                    Platform komunitas untuk melaporkan kucing terlantar, sakit, hilang, atau yang membutuhkan adopsi.
                    Dengan satu laporan, Anda menggerakkan ratusan relawan di sekitar Anda.
                </p>

                {/* CTA Buttons */}
                <div className="animate-fade-in-up-delay-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link to="/report/create">
                        <Button
                            size="lg"
                            className="bg-linear-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 cursor-pointer text-white px-8 py-6 text-lg font-semibold w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <PenLine className="w-5 h-5 mr-2" />
                            Buat Laporan
                        </Button>
                    </Link>
                    <Link to="/reports">
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-2 border-white/30 text-white bg-transparent hover:bg-white/10 hover:border-white/50 cursor-pointer px-8 py-6 text-lg font-semibold w-full sm:w-auto backdrop-blur-sm transition-all duration-300"
                        >
                            <Compass className="w-5 h-5 mr-2" />
                            Jelajahi Laporan
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}