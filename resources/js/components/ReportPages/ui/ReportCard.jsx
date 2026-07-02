import { MapPin, Clock, MessageCircle, CheckCircle2 } from 'lucide-react';
import { CATEGORIES, urgencyConfig, categoryConfig } from '../constants/reports';
import { timeAgo } from '../utils/timeAgo';

export default function ReportCard({ report, onClick }) {
    const u = urgencyConfig[report.urgency];
    const cat = categoryConfig[report.category] ?? { bg: 'bg-gray-100', text: 'text-gray-700' };
    const catInfo = CATEGORIES.find(c => c.id === report.category);
    const isDone = report.status === 'selesai';

    return (
        <div
            onClick={() => onClick(report)}
            className="group bg-white rounded-2xl border border-gray-100 hover:border-teal-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
        >
            {/* Image */}
            <div className="relative h-44 overflow-hidden">
                <img
                    src={report.image}
                    alt={report.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={e => { e.target.src = `https://placehold.co/400x300/0d9488/ffffff?text=${encodeURIComponent('🐱')}`; }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

                <div className="absolute top-3 left-3">
                    {isDone ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold shadow">
                            <CheckCircle2 className="w-3 h-3" /> Selesai
                        </span>
                    ) : (
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold shadow ${u.bg} ${u.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${u.dot} animate-pulse`} />
                            {u.label}
                        </span>
                    )}
                </div>

                <div className="absolute top-3 right-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${cat.bg} ${cat.text}`}>
                        {catInfo?.emoji} {catInfo?.label ?? report.category}
                    </span>
                </div>
            </div>

            {/* Body */}
            <div className="p-4 flex flex-col flex-1 gap-2">
                <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-teal-700 transition-colors">
                    {report.title}
                </h3>
                <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                    <MapPin className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                    <span className="truncate">{report.location}</span>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 flex-1">
                    {report.description}
                </p>

                {report.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                        {report.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 text-xs font-medium border border-teal-100">
                                {tag}
                            </span>
                        ))}
                        {report.tags.length > 2 && (
                            <span className="px-2 py-0.5 rounded-full bg-gray-50 text-gray-500 text-xs border border-gray-100">
                                +{report.tags.length - 2}
                            </span>
                        )}
                    </div>
                )}

                <div className="flex items-center justify-between pt-2 mt-auto border-t border-gray-50">
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{timeAgo(report.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{report.comments} komentar</span>
                    </div>
                </div>
            </div>
        </div>
    );
}