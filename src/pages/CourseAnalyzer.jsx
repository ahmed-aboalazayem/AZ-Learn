import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCourseFromUrl, parseYouTubeUrl } from "../services/youtubeService";
import { useCourses } from "../store/courseStore";

export default function CourseAnalyzer() {
    const navigate = useNavigate();
    const { addCourse } = useCourses();
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [progressInfo, setProgressInfo] = useState({ message: "", pct: 0 });
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);
    const [expandedSections, setExpandedSections] = useState({});

    const handleAnalyze = async (e) => {
        e.preventDefault();
        if (!url.trim()) return;

        const parsed = parseYouTubeUrl(url);
        if (!parsed) {
            setError("Invalid YouTube URL. Please paste a valid video or playlist link.");
            return;
        }

        setError("");
        setLoading(true);
        setResult(null);
        setProgressInfo({ message: "Starting...", pct: 0 });

        try {
            const courseData = await fetchCourseFromUrl(url, (progress) => {
                setProgressInfo({
                    message: progress.message || "",
                    pct: progress.pct || 0,
                });
            });
            setResult(courseData);

            // Auto-expand all sections
            const expanded = {};
            courseData.sections.forEach((_, idx) => {
                expanded[idx] = true;
            });
            setExpandedSections(expanded);
        } catch (err) {
            setError(err.message || "Failed to fetch from YouTube.");
        } finally {
            setLoading(false);
        }
    };

    const handleImport = () => {
        if (!result) return;
        addCourse(result);
        navigate("/dashboard/courses");
    };

    const handleCopy = () => {
        if (!result) return;
        let text = `📚 ${result.title}\n👤 ${result.author}\n\n`;
        result.sections.forEach((section, sIdx) => {
            text += `\n── Section ${sIdx + 1}: ${section.title} ──\n`;
            section.lessons.forEach((lesson, lIdx) => {
                text += `  ${lIdx + 1}. ${lesson.title}  [${lesson.duration}]\n`;
            });
        });
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const toggleSection = (idx) => {
        setExpandedSections((prev) => ({ ...prev, [idx]: !prev[idx] }));
    };

    // --- Compute statistics ---
    const stats = (() => {
        if (!result) return null;
        const allLessons = result.sections.flatMap((s) => s.lessons);
        let totalSec = 0;
        allLessons.forEach((l) => {
            const parts = l.duration.split(":");
            if (parts.length === 2) totalSec += parseInt(parts[0]) * 60 + parseInt(parts[1]);
            if (parts.length === 3)
                totalSec += parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
        });
        const avgSec = allLessons.length > 0 ? Math.round(totalSec / allLessons.length) : 0;
        const fmtDur = (sec) => {
            const h = Math.floor(sec / 3600);
            const m = Math.floor((sec % 3600) / 60);
            const s = sec % 60;
            if (h > 0) return `${h}h ${m}m`;
            if (m > 0) return `${m}m ${s}s`;
            return `${s}s`;
        };
        return {
            totalSections: result.sections.length,
            totalVideos: allLessons.length,
            totalDuration: fmtDur(totalSec),
            avgDuration: fmtDur(avgSec),
            author: result.author,
        };
    })();

    return (
        <div className="p-8 w-full max-w-[1100px] mx-auto flex flex-col gap-10 font-['Plus_Jakarta_Sans']">
            {/* Header */}
            <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-500/10 text-violet-600 rounded-full text-xs font-bold tracking-wide mx-auto">
                    <span className="material-symbols-outlined text-[16px]">analytics</span>
                    COURSE ANALYZER
                </div>
                <h1 className="text-[36px] font-[800] leading-[1.2] tracking-tight text-on-surface">
                    Get Course Titles
                </h1>
                <p className="text-[16px] text-on-surface-variant max-w-xl mx-auto">
                    Paste any YouTube playlist or video URL to instantly analyze its structure, topics, and time breakdown.
                </p>
            </div>

            {/* Input Card */}
            <div className="bg-surface-container-lowest rounded-2xl shadow-soft border border-surface-variant p-6 md:p-8 relative">
                <div className="absolute -top-20 -right-20 w-56 h-56 bg-violet-500/5 rounded-full blur-3xl pointer-events-none"></div>

                <form onSubmit={handleAnalyze} className="flex flex-col md:flex-row gap-4 items-start md:items-stretch relative z-10">
                    <div className="relative flex-1 w-full group">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-[45%] text-outline-variant group-focus-within:text-primary transition-colors">
                            link
                        </span>
                        <input
                            className="w-full pl-12 pr-4 py-4 rounded-xl border border-outline-variant bg-surface text-on-surface placeholder:text-outline-variant focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all text-[15px]"
                            placeholder="https://www.youtube.com/playlist?list=... or video URL"
                            type="url"
                            value={url}
                            onChange={(e) => {
                                setUrl(e.target.value);
                                setError("");
                            }}
                            disabled={loading}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full md:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 text-white font-bold shadow-md hover:shadow-lg hover:opacity-90 transition-all flex justify-center items-center gap-2 whitespace-nowrap cursor-pointer border-none disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        <span className="material-symbols-outlined">{loading ? "hourglass_top" : "query_stats"}</span>
                        {loading ? "Analyzing..." : "Analyze"}
                    </button>
                </form>

                {error && (
                    <div className="flex items-center gap-3 p-4 mt-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">
                        <span className="material-symbols-outlined text-red-500">error</span>
                        {error}
                    </div>
                )}
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex flex-col items-center justify-center py-12 gap-5">
                    <div className="w-16 h-16 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="material-symbols-outlined text-3xl animate-spin">autorenew</span>
                    </div>
                    <div className="text-center space-y-1">
                        <h3 className="text-xl font-bold text-on-surface">Analyzing Course...</h3>
                        <p className="text-on-surface-variant text-sm">{progressInfo.message}</p>
                    </div>
                    <div className="w-full max-w-md">
                        <div className="flex justify-between text-xs text-on-surface-variant mb-1.5">
                            <span>{progressInfo.message}</span>
                            <span className="font-bold">{progressInfo.pct}%</span>
                        </div>
                        <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-violet-500 to-blue-500 h-full rounded-full transition-all duration-300"
                                style={{ width: `${progressInfo.pct}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Results */}
            {result && !loading && (
                <div className="flex flex-col gap-8 animate-[fadeIn_0.5s_ease-out]">
                    {/* Course Title Bar */}
                    <div className="bg-gradient-to-r from-violet-600 to-blue-500 rounded-2xl p-6 text-white flex flex-col md:flex-row items-start md:items-center gap-4 shadow-lg">
                        <img
                            src={result.thumbnail}
                            alt={result.title}
                            className="w-24 h-16 rounded-lg object-cover shadow-md flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                            <h2 className="text-xl font-bold leading-snug truncate">{result.title}</h2>
                            <p className="text-white/70 text-sm mt-0.5">By {result.author}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                            <button
                                onClick={handleCopy}
                                className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm text-white text-sm font-semibold hover:bg-white/30 transition-all cursor-pointer border border-white/20 flex items-center gap-1.5"
                            >
                                <span className="material-symbols-outlined text-[16px]">
                                    {copied ? "check" : "content_copy"}
                                </span>
                                {copied ? "Copied!" : "Copy Layout"}
                            </button>
                            <button
                                onClick={handleImport}
                                className="px-4 py-2 rounded-lg bg-white text-violet-700 text-sm font-bold hover:bg-white/90 transition-all cursor-pointer border-none flex items-center gap-1.5 shadow-sm"
                            >
                                <span className="material-symbols-outlined text-[16px]">add_circle</span>
                                Import Course
                            </button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    {stats && (
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {[
                                { icon: "category", label: "Sections", value: stats.totalSections, bgColor: "#ede9fe", iconColor: "#7c3aed" },
                                { icon: "play_circle", label: "Videos", value: stats.totalVideos, bgColor: "#dbeafe", iconColor: "#2563eb" },
                                { icon: "schedule", label: "Total Duration", value: stats.totalDuration, bgColor: "#d1fae5", iconColor: "#059669" },
                                { icon: "avg_pace", label: "Avg. Length", value: stats.avgDuration, bgColor: "#fef3c7", iconColor: "#d97706" },
                                { icon: "person", label: "Creator", value: stats.author, bgColor: "#ffe4e6", iconColor: "#e11d48" },
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4 flex flex-col gap-2 hover:shadow-md transition-shadow"
                                >
                                    <div
                                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                                        style={{ backgroundColor: stat.bgColor }}
                                    >
                                        <span
                                            className="material-symbols-outlined text-[20px]"
                                            style={{ color: stat.iconColor }}
                                        >
                                            {stat.icon}
                                        </span>
                                    </div>
                                    <span className="text-[11px] uppercase tracking-wider font-bold text-on-surface-variant">
                                        {stat.label}
                                    </span>
                                    <span className="text-[18px] font-extrabold text-on-surface leading-none truncate" title={String(stat.value)}>
                                        {stat.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Sections Accordion */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                                <span className="material-symbols-outlined text-violet-500">list_alt</span>
                                Course Structure
                            </h3>
                            <button
                                onClick={() => {
                                    const allExpanded = Object.values(expandedSections).every(Boolean);
                                    const next = {};
                                    result.sections.forEach((_, idx) => {
                                        next[idx] = !allExpanded;
                                    });
                                    setExpandedSections(next);
                                }}
                                className="text-xs font-bold text-violet-600 hover:text-violet-800 cursor-pointer bg-transparent border-none flex items-center gap-1"
                            >
                                <span className="material-symbols-outlined text-[16px]">
                                    {Object.values(expandedSections).every(Boolean) ? "unfold_less" : "unfold_more"}
                                </span>
                                {Object.values(expandedSections).every(Boolean) ? "Collapse All" : "Expand All"}
                            </button>
                        </div>

                        <div className="border border-outline-variant rounded-xl overflow-hidden bg-surface-container-lowest">
                            {result.sections.map((section, sIdx) => {
                                // Calculate section duration
                                let secDur = 0;
                                section.lessons.forEach((l) => {
                                    const parts = l.duration.split(":");
                                    if (parts.length === 2) secDur += parseInt(parts[0]) * 60 + parseInt(parts[1]);
                                    if (parts.length === 3)
                                        secDur += parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
                                });
                                const h = Math.floor(secDur / 3600);
                                const m = Math.floor((secDur % 3600) / 60);
                                const sectionTime = h > 0 ? `${h}h ${m}m` : `${m}m`;

                                return (
                                    <div key={sIdx} className={sIdx > 0 ? "border-t border-outline-variant" : ""}>
                                        {/* Section Header */}
                                        <button
                                            onClick={() => toggleSection(sIdx)}
                                            className="w-full p-4 flex items-center justify-between bg-surface-container-low/50 hover:bg-surface-container-low transition-colors cursor-pointer border-none text-left"
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <span className="w-7 h-7 rounded-full bg-violet-500/10 text-violet-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                                                    {sIdx + 1}
                                                </span>
                                                <span className="font-semibold text-on-surface text-sm truncate">
                                                    {section.title}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                                                <span className="text-xs text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded-full">
                                                    {section.lessons.length} videos · {sectionTime}
                                                </span>
                                                <span
                                                    className={`material-symbols-outlined text-on-surface-variant text-[20px] transition-transform duration-200 ${expandedSections[sIdx] ? "rotate-180" : ""}`}
                                                >
                                                    expand_more
                                                </span>
                                            </div>
                                        </button>

                                        {/* Lessons */}
                                        {expandedSections[sIdx] && (
                                            <div className="divide-y divide-outline-variant/50">
                                                {section.lessons.map((lesson, lIdx) => (
                                                    <div
                                                        key={lesson.id}
                                                        className="px-4 py-3 pl-16 flex items-center justify-between hover:bg-slate-50/50 transition-colors group"
                                                    >
                                                        <div className="flex items-center gap-3 min-w-0">
                                                            <span className="text-xs text-on-surface-variant/60 font-mono w-5 text-right flex-shrink-0">
                                                                {lIdx + 1}
                                                            </span>
                                                            <span className="material-symbols-outlined text-[16px] text-on-surface-variant/50 flex-shrink-0">
                                                                play_circle
                                                            </span>
                                                            <span className="text-sm text-on-surface truncate">
                                                                {lesson.title}
                                                            </span>
                                                        </div>
                                                        <span className="text-xs text-on-surface-variant font-mono whitespace-nowrap ml-3 bg-surface-container-high px-2 py-0.5 rounded">
                                                            {lesson.duration}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {!result && !loading && (
                <div className="bg-surface-container-lowest rounded-2xl border-2 border-dashed border-outline-variant p-16 flex flex-col items-center justify-center gap-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center text-outline">
                        <span className="material-symbols-outlined text-3xl">query_stats</span>
                    </div>
                    <h3 className="text-lg font-bold text-on-surface-variant">
                        Course analysis will appear here
                    </h3>
                    <p className="text-sm text-outline max-w-sm">
                        Paste a YouTube video or playlist URL above and click Analyze to see the full course structure, topics, and time breakdown.
                    </p>
                </div>
            )}
        </div>
    );
}
