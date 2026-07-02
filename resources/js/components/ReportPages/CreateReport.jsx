import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import BgImage from '@/assets/imageskitten.jpeg';
import Logo from '@/assets/savecatlogo.png';
import CatLoader from '../vfx/Loading';
import useCreateReport from './hooks/useCreateReport';
import CreateReportForm from './ui/CreateReportForm';
import CreateReportPreview from './ui/CreateReportPreview';

export default function CreateReportPage() {

    const reportState = useCreateReport();
    const { loading, step } = reportState;

    return (
        <div className="register-container pb-10">
            {/* Loading Overlay */}
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
                    <CatLoader />
                </div>
            )}

            {/* Background */}
            <div className="absolute inset-0 z-0">
                <img src={BgImage} alt="Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-br from-teal-950/95 via-cyan-950/95 to-emerald-950/95 backdrop-blur-sm" />
            </div>

            {/* Back button */}
            <Link
                to="/"
                className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group animate-fade-in"
            >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span className="text-sm font-medium">Kembali</span>
            </Link>

            {/* Content */}
            <div className="relative z-10 min-h-screen flex items-start justify-center p-4 sm:p-6 lg:p-8 pt-20">
                <div className="w-full max-w-2xl animate-slide-up">

                    {/* Header */}
                    <div className="text-center mb-8 animate-fade-in">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4">
                            <img src={Logo} alt="Save Cat" className="w-14 h-14 object-contain" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-1">Buat Laporan</h1>
                        <p className="text-gray-300 text-sm">Bantu kucing yang membutuhkan pertolongan 🐾</p>

                        {/* Step indicator */}
                        <div className="flex items-center justify-center gap-3 mt-5">
                            {[1, 2].map((s) => (
                                <div key={s} className="flex items-center gap-2">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${step >= s
                                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/40'
                                            : 'bg-white/10 text-gray-400 border border-white/20'
                                        }`}>
                                        {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                                    </div>
                                    {s < 2 && <div className={`w-12 h-0.5 rounded-full transition-all duration-500 ${step > s ? 'bg-emerald-500' : 'bg-white/20'}`} />}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center gap-16 mt-1">
                            <span className={`text-xs font-medium ${step >= 1 ? 'text-emerald-300' : 'text-gray-500'}`}>Detail</span>
                            <span className={`text-xs font-medium ${step >= 2 ? 'text-emerald-300' : 'text-gray-500'}`}>Pratinjau</span>
                        </div>
                    </div>

                    {/* Render Step 1 or Step 2 */}
                    {step === 1 && <CreateReportForm {...reportState} />}
                    {step === 2 && <CreateReportPreview {...reportState} />}
                </div>
            </div>
        </div>
    );
}