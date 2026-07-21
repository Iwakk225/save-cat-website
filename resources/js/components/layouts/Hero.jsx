import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PenLine, Compass, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';
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

                <div className="absolute inset-0 bg-linear-to-b from-teal-950/85 via-cyan-900/75 to-emerald-900/85" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-green-700 via-green-800/60 to-transparent" />
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
                                className="w-full rounded-full bg-linear-to-r from-teal-600 to-cyan-600 px-7 py-6 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:from-teal-700 hover:to-cyan-700 hover:shadow-xl sm:w-auto"
                            >
                                <PenLine className="mr-2 h-5 w-5" />
                                Buat Laporan
                            </Button>
                        </Link>
                        <Link to="/reports">
                            <Button
                                size="lg"
                                variant="outline"
                                className="w-full rounded-full border-2 border-white/30 bg-transparent px-7 py-6 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/50 sm:w-auto"
                            >
                                <Compass className="mr-2 h-5 w-5" />
                                Jelajahi Laporan
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                        {['Laporan cepat', 'Relawan lokal', 'Komunitas peduli'].map((item) => (
                            <span key={item} className="rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm text-teal-50 backdrop-blur-sm">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="w-full max-w-md rounded-[28px] border border-white/15 bg-white/10 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl">
                    <div className="rounded-[24px] bg-slate-950/60 p-6">
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal-200">Hari ini</p>
                        <h2 className="mt-3 text-2xl font-semibold text-white">Ada banyak kucing yang butuh bantuan</h2>
                        <div className="mt-6 space-y-3">
                            {[
                                {
                                    icon: ShieldCheck,
                                    title: 'Laporan aman',
                                    text: 'Semua pelaporan diarahkan dengan pertimbangan keselamatan.',
                                },
                                {
                                    icon: Sparkles,
                                    title: 'Respons cepat',
                                    text: 'Komunitas dapat melihat laporan yang paling butuh perhatian.',
                                },
                                {
                                    icon: HeartHandshake,
                                    title: 'Dukungan nyata',
                                    text: 'Bantuan bisa datang dari relawan, tetangga, dan donatur.',
                                },
                            ].map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div key={item.title} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/10 p-3">
                                        <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
                                            <Icon className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white">{item.title}</p>
                                            <p className="mt-1 text-sm text-slate-300">{item.text}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}