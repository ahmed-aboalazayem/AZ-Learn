import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCourseFromUrl, parseYouTubeUrl } from "../services/youtubeService";
import { useCourses } from "../store/courseStore";

export default function CreateNew() {
    const navigate = useNavigate();
    const { addCourse } = useCourses();
    const [step, setStep] = useState(1);
    const [url, setUrl] = useState("");
    const [progressInfo, setProgressInfo] = useState({ message: "", pct: 0 });
    const [fetchedCourse, setFetchedCourse] = useState(null);
    const [error, setError] = useState("");

    const handleFetch = async (e) => {
        e.preventDefault();
        if (!url) return;

        const parsed = parseYouTubeUrl(url);
        if (!parsed) {
            setError("Invalid YouTube URL. Please paste a valid video or playlist link.");
            return;
        }

        setError("");
        setStep(2);
        setProgressInfo({ message: "Starting...", pct: 0 });

        try {
            const courseData = await fetchCourseFromUrl(url, (progress) => {
                setProgressInfo({
                    message: progress.message || "",
                    pct: progress.pct || 0,
                });
            });
            setFetchedCourse(courseData);
            setTimeout(() => setStep(3), 600);
        } catch (err) {
            setError(err.message || "Failed to fetch content from YouTube.");
            setStep(1);
        }
    };

    const handleLaunch = () => {
        if (!fetchedCourse) return;
        const courseId = addCourse(fetchedCourse);
        navigate(`/dashboard/courses`);
    };

    // Calculate total duration for display
    const totalDuration = fetchedCourse
        ? (() => {
            let totalSec = 0;
            fetchedCourse.sections.forEach((s) =>
                s.lessons.forEach((l) => {
                    const parts = l.duration.split(":");
                    if (parts.length === 2)
                        totalSec += parseInt(parts[0]) * 60 + parseInt(parts[1]);
                    if (parts.length === 3)
                        totalSec +=
                            parseInt(parts[0]) * 3600 +
                            parseInt(parts[1]) * 60 +
                            parseInt(parts[2]);
                }),
            );
            const h = Math.floor(totalSec / 3600);
            const m = Math.floor((totalSec % 3600) / 60);
            return h > 0 ? `${h}h ${m}m` : `${m}m`;
        })()
        : "";

    return (
        <div className="p-8 w-full max-w-[1000px] mx-auto flex flex-col gap-10 font-['Plus_Jakarta_Sans']">
            {/* Header Section */}
            <div className="text-center space-y-4">
                <h1 className="text-[40px] font-[800] leading-[1.2] tracking-tight text-on-surface">
                    Create New Course
                </h1>
                <p className="text-[18px] text-on-surface-variant max-w-2xl mx-auto">
                    Transform any YouTube playlist or video into a structured learning journey.
                </p>
            </div>

            {/* Stepper */}
            <div className="w-full max-w-3xl mx-auto flex items-center justify-between relative mb-8 select-none">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-surface-container-high -z-10 -translate-y-1/2"></div>
                <div
                    className="absolute top-1/2 left-0 h-0.5 bg-primary -z-10 -translate-y-1/2 transition-all duration-500"
                    style={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" }}
                ></div>

                {[
                    { num: 1, label: "Import" },
                    { num: 2, label: "Fetching" },
                    { num: 3, label: "Review & Launch" },
                ].map((s) => (
                    <div key={s.num} className="flex flex-col items-center gap-2 bg-surface-container-low px-4">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${step >= s.num
                                ? "bg-primary text-on-primary shadow-sm"
                                : "bg-surface-container-high text-on-surface-variant border-2 border-surface-container-highest"
                                }`}
                        >
                            {s.num}
                        </div>
                        <span
                            className={`text-sm font-bold tracking-wide transition-colors ${step >= s.num ? "text-primary" : "text-on-surface-variant"}`}
                        >
                            {s.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* Content Switcher */}
            <div className="w-full bg-surface-container-lowest rounded-[16px] shadow-soft border border-surface-variant p-8 md:p-10 relative">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

                {/* STEP 1: Import */}
                {step === 1 && (
                    <div className="flex flex-col gap-6 relative z-10">
                        <div className="flex items-center justify-between">
                            <label className="text-[16px] font-semibold text-on-surface flex items-center gap-2" htmlFor="youtube-url">
                                <span className="material-symbols-outlined text-red-500">play_circle</span>
                                YouTube Playlist or Video URL
                            </label>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary-container/50 text-primary border border-secondary-container rounded-full text-[12px] font-bold tracking-wide">
                                ✨ AI Powered
                            </span>
                        </div>

                        <form onSubmit={handleFetch} className="flex flex-col md:flex-row gap-4 items-start md:items-stretch">
                            <div className="relative flex-1 w-full group">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-[45%] text-outline-variant group-focus-within:text-primary transition-colors">
                                    link
                                </span>
                                <input
                                    className="w-full pl-12 pr-4 py-4 rounded-[8px] border border-outline-variant bg-surface text-on-surface placeholder:text-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-[16px]"
                                    id="youtube-url"
                                    placeholder="https://www.youtube.com/playlist?list=... or video URL"
                                    type="url"
                                    value={url}
                                    onChange={(e) => {
                                        setUrl(e.target.value);
                                        setError("");
                                    }}
                                    required
                                />
                            </div>
                            <button
                                style={{ color: "#000" }}
                                type="submit"
                                className="w-full md:w-auto px-8 py-4 rounded-[8px] bg-gradient-to-r from-primary to-surface-tint text-on-primary font-bold shadow-md hover:opacity-90 hover:shadow-lg transition-all flex justify-center items-center gap-2 whitespace-nowrap cursor-pointer border-none"
                            >
                                <span className="material-symbols-outlined">auto_awesome</span>
                                Fetch Content
                            </button>
                        </form>

                        {error && (
                            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">
                                <span className="material-symbols-outlined text-red-500">error</span>
                                {error}
                            </div>
                        )}

                        <p className="text-[14px] text-outline mt-1">
                            Paste a single video for a micro-course, or a full playlist for a comprehensive module.
                        </p>

                        <div className="h-px w-full bg-surface-variant my-4"></div>

                        {/* Preview Placeholder */}
                        <div className="w-full rounded-[16px] border-2 border-dashed border-outline-variant bg-surface-container-low/50 p-16 flex flex-col items-center justify-center gap-4 transition-colors hover:bg-surface-container-low">
                            <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center text-outline">
                                <span className="material-symbols-outlined text-3xl">view_kanban</span>
                            </div>
                            <h3 className="text-[18px] font-bold text-on-surface-variant">
                                Your course preview will appear here
                            </h3>
                            <p className="text-[14px] text-outline text-center max-w-sm">
                                Once fetched, the content will be automatically structured into sections and lessons.
                            </p>
                        </div>
                    </div>
                )}

                {/* STEP 2: Fetching */}
                {step === 2 && (
                    <div className="flex flex-col items-center justify-center py-16 gap-6 relative z-10">
                        <div className="w-20 h-20 bg-primary-container text-primary rounded-full flex items-center justify-center shadow-lg animate-pulse">
                            <span className="material-symbols-outlined text-4xl animate-spin">auto_awesome</span>
                        </div>
                        <div className="text-center space-y-2">
                            <h3 className="text-2xl font-bold text-on-surface">Fetching from YouTube...</h3>
                            <p className="text-on-surface-variant text-sm max-w-md">
                                {progressInfo.message || "Connecting to YouTube API..."}
                            </p>
                        </div>

                        <div className="w-full max-w-md mt-4">
                            <div className="flex justify-between text-xs text-on-surface-variant mb-2">
                                <span>{progressInfo.message}</span>
                                <span className="font-bold">{progressInfo.pct}%</span>
                            </div>
                            <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-300"
                                    style={{ width: `${progressInfo.pct}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 3: Review & Launch */}
                {step === 3 && fetchedCourse && (
                    <div className="flex flex-col gap-6 relative z-10">
                        <div className="flex items-center justify-between border-b border-surface-variant pb-4">
                            <div>
                                <h3 className="text-2xl font-bold text-on-surface">Course Ready</h3>
                                <p className="text-on-surface-variant text-sm">Review the content before adding to My Courses.</p>
                            </div>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-[12px] font-bold tracking-wide">
                                Ready to Launch
                            </span>
                        </div>

                        {/* Course Preview Card */}
                        <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant flex flex-col md:flex-row gap-6 items-start">
                            <img
                                alt={fetchedCourse.title}
                                className="w-full md:w-48 h-32 rounded-lg object-cover bg-slate-100 shadow-sm flex-shrink-0"
                                src={fetchedCourse.thumbnail}
                            />
                            <div className="flex-1 space-y-2">
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded font-bold">
                                        {fetchedCourse.totalLessons} Videos
                                    </span>
                                    <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded font-bold">
                                        {totalDuration}
                                    </span>
                                </div>
                                <h4 className="text-xl font-bold text-on-surface leading-snug">
                                    {fetchedCourse.title}
                                </h4>
                                <p className="text-on-surface-variant text-sm">
                                    By {fetchedCourse.author}
                                </p>
                                {fetchedCourse.description && (
                                    <p className="text-on-surface-variant text-sm line-clamp-2">
                                        {fetchedCourse.description}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Sections List */}
                        <div className="space-y-4">
                            <h5 className="font-bold text-on-surface text-lg uppercase tracking-wide">
                                Course Content
                            </h5>
                            <div className="border border-outline-variant rounded-xl divide-y divide-outline-variant bg-surface-container-lowest max-h-[400px] overflow-y-auto">
                                {fetchedCourse.sections.map((section, sIdx) => (
                                    <div key={section.id}>
                                        {/* Section Header */}
                                        <div className="p-4 bg-surface-container-low/50 flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                                                    {sIdx + 1}
                                                </span>
                                                <span className="font-semibold text-on-surface">{section.title}</span>
                                            </div>
                                            <span className="text-xs text-on-surface-variant">
                                                {section.lessons.length} lessons
                                            </span>
                                        </div>
                                        {/* Lesson List */}
                                        {section.lessons.map((lesson) => (
                                            <div
                                                key={lesson.id}
                                                className="px-4 py-3 pl-14 flex justify-between items-center hover:bg-slate-50 transition-colors"
                                            >
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <span className="material-symbols-outlined text-sm text-on-surface-variant shrink-0">
                                                        play_circle
                                                    </span>
                                                    <span className="text-sm text-on-surface truncate">{lesson.title}</span>
                                                </div>
                                                <span className="text-xs text-on-surface-variant whitespace-nowrap ml-3">
                                                    {lesson.duration}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-surface-variant mt-4">
                            <button
                                onClick={() => {
                                    setStep(1);
                                    setFetchedCourse(null);
                                }}
                                className="px-6 py-2.5 rounded-lg border border-outline-variant text-on-surface-variant font-semibold hover:bg-slate-50 transition-colors cursor-pointer bg-white"
                            >
                                Back to Import
                            </button>
                            <button
                                onClick={handleLaunch}
                                className="px-8 py-2.5 rounded-lg bg-gradient-to-r from-primary to-surface-tint text-on-primary font-bold shadow-md hover:opacity-90 hover:shadow-lg transition-all cursor-pointer border-none"
                            >
                                Launch Course 🚀
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
