import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, ArrowRight, PawPrint, Send } from 'lucide-react';

import { SiInstagram, SiX, SiFacebook, SiYoutube } from 'react-icons/si';
import Logo from '@/assets/savecatlogo.png';

const QUICK_LINKS = [
    { label: 'Beranda', href: '/' },
    { label: 'Jelajahi Laporan', href: '/reports' },
    { label: 'Cara Kerja', href: '/how-it-works' },
    { label: 'Tentang Kami', href: '/about' },
    { label: 'Buat Laporan', href: '/report/create' },
];

const CATEGORIES = [
    { label: 'Kucing Terlantar', href: '/reports?category=terlantar' },
    { label: 'Kucing Terluka', href: '/reports?category=terluka' },
    { label: 'Kucing Sakit', href: '/reports?category=sakit' },
    { label: 'Kondisi Darurat', href: '/reports?category=darurat' },
    { label: 'Kucing Terjebak', href: '/reports?category=terjebak' },
];


const SOCIALS = [
    { name: 'Instagram', icon: SiInstagram, href: '#', color: 'hover:bg-pink-500' },
    { name: 'Twitter', icon: SiX, href: '#', color: 'hover:bg-black' },
    { name: 'Facebook', icon: SiFacebook, href: '#', color: 'hover:bg-blue-600' },
    { name: 'Youtube', icon: SiYoutube, href: '#', color: 'hover:bg-red-600' },
];

export default function Footer() {

    return (
        <footer className="relative bg-teal-950 text-gray-300 overflow-hidden">
            {/* Decorative top wave */}
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-teal-400/50 to-transparent" />

            {/* Paw prints decoration */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <PawPrint className="absolute top-10 left-10 w-16 h-16 text-white rotate-12" />
                <PawPrint className="absolute top-40 right-20 w-20 h-20 text-white -rotate-12" />
                <PawPrint className="absolute bottom-20 left-1/3 w-14 h-14 text-white rotate-45" />
                <PawPrint className="absolute bottom-40 right-1/3 w-24 h-24 text-white -rotate-45" />
            </div>

            {/* Main footer content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

                    {/* Brand Column */}
                    <div className="lg:col-span-1 space-y-5">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-24 h-24 flex items-center justify-center ">
                                <img src={Logo} alt="Save Cat" className="w-24 h-24 object-contain" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Save Cat</h3>
                                <p className="text-xs text-teal-300/70 tracking-wider">COMMUNITY</p>
                            </div>
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-400">
                            Platform komunitas untuk menyelamatkan kucing yang membutuhkan pertolongan. Bersama kita bisa membuat perbedaan.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-2 pt-2">
                            {SOCIALS.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    aria-label={social.name}
                                    className={`w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color} hover:text-white hover:border-transparent hover:shadow-lg hover:-translate-y-0.5`}
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-5 flex items-center gap-2">
                            <span className="w-1 h-5 bg-linear-to-b from-teal-400 to-emerald-500 rounded-full" />
                            Navigasi Cepat
                        </h4>
                        <ul className="space-y-3">
                            {QUICK_LINKS.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.href}
                                        className="group flex items-center gap-2 text-sm text-gray-400 hover:text-teal-300 transition-colors"
                                    >
                                        <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        <span>{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-white font-semibold mb-5 flex items-center gap-2">
                            <span className="w-1 h-5 bg-linear-to-b from-teal-400 to-emerald-500 rounded-full" />
                            Kategori Laporan
                        </h4>
                        <ul className="space-y-3">
                            {CATEGORIES.map((cat) => (
                                <li key={cat.label}>
                                    <Link
                                        to={cat.href}
                                        className="group flex items-center gap-2 text-sm text-gray-400 hover:text-teal-300 transition-colors"
                                    >
                                        <span className="text-base"></span>
                                        <span>{cat.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="">
                        <h4 className="text-white font-semibold mb-5 flex items-center gap-2">
                            <span className="w-1 h-5 bg-linear-to-b from-teal-400 to-emerald-500 rounded-full" />
                            Hubungi Kami
                        </h4>
                        <div className="space-y-2.5">
                            <a href="mailto:savecatcommunity@gmail.com" className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-teal-300 transition-colors">
                                <Mail className="w-4 h-4 text-teal-400" />
                                savecatcommunity@gmail.com
                            </a>
                            <a href="tel:+6285330745126" className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-teal-300 transition-colors">
                                <Phone className="w-4 h-4 text-teal-400" />
                                +62 853-3074-5126
                            </a>
                            <div className="flex items-start gap-2.5 text-sm text-gray-400">
                                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                                <span>Jl. Kucing Bahagia No. 12, Jakarta</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-500 text-center sm:text-left">
                        © {new Date().getFullYear()} Save Cat Community. Dibuat dengan{' '}
                        <Heart className="w-3 h-3 inline text-pink-500 fill-pink-500 -mt-0.5" />{' '}
                        untuk kucing Indonesia.
                    </p>
                    <div className="flex items-center gap-5 text-xs text-gray-500">
                        <p>Website Built by Averant Team</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}