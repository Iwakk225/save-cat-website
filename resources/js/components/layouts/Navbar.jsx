import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

import Logo from '@/assets/savecatlogo.png';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Beranda', href: '/' },
        { name: 'Jelajahi Laporan', href: '/reports' },
        { name: 'Cara Kerja', href: '/how-it-works' },
        { name: 'Tentang Kami', href: '/about' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-linear-to-b from-gray-950 to-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3">
                        <div className="w-16 h-16 rounded-lg flex items-center justify-center">
                            <img 
                                src={Logo} 
                                alt="Save Cat" 
                                className="w-20 h-20 object-contain"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white font-bold text-lg leading-tight">
                                Save Cat
                            </span>
                            <span className="text-gray-300 text-xs">
                                COMMUNITY
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-gray-200 hover:text-white transition-colors text-sm font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/login">
                            <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10 cursor-pointer">
                                Masuk
                            </Button>
                        </Link>
                        <Link to="/report/create">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                                + Buat Laporan
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-white cursor-pointer"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-black/95 backdrop-blur-lg rounded-lg mt-2 p-4 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="block text-gray-200 hover:text-white transition-colors py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 border-t border-gray-700 space-y-3">
                            <Link
                                to="/login"
                                className="block w-full"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Button variant="outline" className="w-full border-white text-gray-800 hover:bg-white/80 cursor-pointer">
                                    Masuk
                                </Button>
                            </Link>
                            <Link
                                to="/report/create"
                                className="block w-full"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                                    + Buat Laporan
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}