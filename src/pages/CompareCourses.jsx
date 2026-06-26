import { useState } from "react";
import { fetchCourseFromUrl, parseYouTubeUrl } from "../services/youtubeService";
import { compareCoursesWithAi } from "../services/aiService";

export default function CompareCourses() {
    const [coursesData, setCoursesData] = useState([
        { url: "", data: null, loading: false, progress: { pct: 0, message: "" }, error: "" },
        { url: "", data: null, loading: false, progress: { pct: 0, message: "" }, error: "" }
    ]);
    const [aiLoading, setAiLoading] = useState(false);
    const [aiResult, setAiResult] = useState("");
    const [aiError, setAiError] = useState("");
    const [copied, setCopied] = useState(false);

    const updateUrlField = (index, value) => {
        setCoursesData(prev => {
            const next = [...prev];
            next[index] = { ...next[index], url: value, error: "" };
            return next;
        });
    };

    const addUrlField = () => {
        setCoursesData(prev => [
            ...prev,
            { url: "", data: null, loading: false, progress: { pct: 0, message: "" }, error: "" }
        ]);
    };

    const removeUrlField = (index) => {
        if (coursesData.length <= 2) return;
        setCoursesData(prev => prev.filter((_, idx) => idx !== index));
    };

    const handleFetchAll = async (e) => {
        e.preventDefault();

        // 1. Validation
        let hasError = false;
        const validatedData = coursesData.map(item => {
            if (!item.url.trim()) {
                hasError = true;
                return { ...item, error: "URL cannot be empty." };
            }
            const parsed = parseYouTubeUrl(item.url);
            if (!parsed) {
                hasError = true;
                return { ...item, error: "Invalid YouTube link. Provide a valid video or playlist URL." };
            }
            return { ...item, error: "" };
        });

        if (hasError) {
            setCoursesData(validatedData);
            return;
        }

        // Reset results and error before fetching
        setAiResult("");
        setAiError("");

        // 2. Parallel Fetch
        const fetchPromises = coursesData.map(async (item, idx) => {
            setCoursesData(prev => {
                const next = [...prev];
                next[idx] = {
                    ...next[idx],
                    loading: true,
                    data: null,
                    error: "",
                    progress: { pct: 0, message: "Initializing fetch..." }
                };
                return next;
            });

            try {
                const fetchedData = await fetchCourseFromUrl(item.url, (prog) => {
                    setCoursesData(prev => {
                        const next = [...prev];
                        next[idx] = {
                            ...next[idx],
                            progress: { pct: prog.pct || 0, message: prog.message || "" }
                        };
                        return next;
                    });
                });

                setCoursesData(prev => {
                    const next = [...prev];
                    next[idx] = {
                        ...next[idx],
                        loading: false,
                        data: fetchedData,
                        error: ""
                    };
                    return next;
                });
            } catch (err) {
                setCoursesData(prev => {
                    const next = [...prev];
                    next[idx] = {
                        ...next[idx],
                        loading: false,
                        error: err.message || "Failed to retrieve details."
                    };
                    return next;
                });
            }
        });

        await Promise.all(fetchPromises);
    };

    const handleCompareWithAi = async () => {
        // Collect courses that have valid data
        const validCourses = coursesData
            .filter(item => item.data)
            .map(item => item.data);

        if (validCourses.length < 2) {
            setAiError("Please fetch at least two courses successfully before comparing.");
            return;
        }

        setAiLoading(true);
        setAiError("");
        setAiResult("");

        try {
            const result = await compareCoursesWithAi(validCourses);
            setAiResult(result);
        } catch (err) {
            setAiError(err.message || "Failed to compare courses using AI.");
        } finally {
            setAiLoading(false);
        }
    };

    const handleCopyReport = () => {
        if (!aiResult) return;
        navigator.clipboard.writeText(aiResult);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Helper to render bold text inside custom markdown renderer
    const parseInlineMarkdown = (text) => {
        const parts = [];
        let current = text;

        while (current.includes("**")) {
            const firstIdx = current.indexOf("**");
            const secondIdx = current.indexOf("**", firstIdx + 2);

            if (secondIdx === -1) break;

            if (firstIdx > 0) {
                parts.push(current.substring(0, firstIdx));
            }
            parts.push(
                <strong key={parts.length} className="font-extrabold text-slate-100">
                    {current.substring(firstIdx + 2, secondIdx)}
                </strong>
            );

            current = current.substring(secondIdx + 2);
        }

        if (current) {
            parts.push(current);
        }

        return parts.length > 0 ? parts : text;
    };

    // Lightweight custom Markdown renderer styled beautifully
    const renderMarkdown = (md) => {
        if (!md) return null;

        // Clean carriage returns
        const normalized = md.replace(/\r/g, "");
        const blocks = normalized.split(/\n\n+/);

        return blocks.map((block, bIdx) => {
            const trimmed = block.trim();
            if (!trimmed) return null;

            // 1. Heading 1
            if (trimmed.startsWith("# ")) {
                return (
                    <h1 key={bIdx} className="text-2xl md:text-3xl font-[800] text-violet-400 mt-8 mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
                        {parseInlineMarkdown(trimmed.slice(2))}
                    </h1>
                );
            }
            // 2. Heading 2
            if (trimmed.startsWith("## ")) {
                return (
                    <h2 key={bIdx} className="text-xl md:text-2xl font-bold text-blue-400 mt-6 mb-3 border-b border-slate-800/50 pb-1">
                        {parseInlineMarkdown(trimmed.slice(3))}
                    </h2>
                );
            }
            // 3. Heading 3
            if (trimmed.startsWith("### ")) {
                return (
                    <h3 key={bIdx} className="text-lg md:text-xl font-semibold text-slate-200 mt-5 mb-2">
                        {parseInlineMarkdown(trimmed.slice(4))}
                    </h3>
                );
            }

            // 4. Tables
            if (trimmed.includes("|") && trimmed.split("\n")[1]?.includes("-")) {
                const lines = trimmed.split("\n").map(l => l.trim()).filter(Boolean);
                const headers = lines[0].split("|").map(h => h.trim()).filter(h => h !== "");
                const rows = lines.slice(2).map(line => {
                    return line.split("|").map(c => c.trim()).filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
                });
                return (
                    <div key={bIdx} className="overflow-x-auto my-6 rounded-xl border border-slate-800 bg-slate-900/30">
                        <table className="w-full text-left border-collapse text-[14px]">
                            <thead>
                                <tr className="bg-slate-900 border-b border-slate-800">
                                    {headers.map((h, hIdx) => (
                                        <th key={hIdx} className="p-3.5 font-bold text-slate-200">{parseInlineMarkdown(h)}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                {rows.map((row, rIdx) => (
                                    <tr key={rIdx} className="hover:bg-slate-800/20 transition-colors">
                                        {row.map((cell, cIdx) => (
                                            <td key={cIdx} className="p-3.5 text-slate-300 font-medium">{parseInlineMarkdown(cell)}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            }

            // 5. Bullet List
            if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                const items = trimmed.split("\n").map(item => {
                    const text = item.replace(/^[-*]\s+/, "");
                    return parseInlineMarkdown(text);
                });
                return (
                    <ul key={bIdx} className="list-disc pl-6 space-y-2.5 my-4 text-slate-300 text-sm md:text-[15px]">
                        {items.map((item, iIdx) => <li key={iIdx}>{item}</li>)}
                    </ul>
                );
            }

            // 6. Numbered List
            if (/^\d+\.\s+/.test(trimmed)) {
                const items = trimmed.split("\n").map(item => {
                    const text = item.replace(/^\d+\.\s+/, "");
                    return parseInlineMarkdown(text);
                });
                return (
                    <ol key={bIdx} className="list-decimal pl-6 space-y-2.5 my-4 text-slate-300 text-sm md:text-[15px]">
                        {items.map((item, iIdx) => <li key={iIdx}>{item}</li>)}
                    </ol>
                );
            }

            // 7. Callout / Blockquote
            if (trimmed.startsWith(">")) {
                const text = trimmed.replace(/^>\s*/gm, "");
                return (
                    <blockquote key={bIdx} className="border-l-4 border-violet-500 bg-violet-950/10 px-5 py-4 rounded-r-xl my-5 text-slate-300 italic text-[15px] leading-relaxed shadow-inner">
                        {parseInlineMarkdown(text)}
                    </blockquote>
                );
            }

            // Default paragraph
            return (
                <p key={bIdx} className="text-slate-300 leading-[1.65] my-3.5 text-sm md:text-[15px]">
                    {parseInlineMarkdown(trimmed)}
                </p>
            );
        });
    };

    const successfullyFetchedCount = coursesData.filter(item => item.data).length;

    return (
        <div className="p-8 w-full max-w-[1200px] mx-auto flex flex-col gap-10 font-['Plus_Jakarta_Sans'] text-on-surface">
            {/* Header */}
            <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-500/10 text-violet-400 rounded-full text-xs font-bold tracking-wide mx-auto">
                    <span className="material-symbols-outlined text-[16px]">compare_arrows</span>
                    COURSE COMPARER
                </div>
                <h1 style={{ color: "#000" }} className="text-[36px] font-[800] leading-[1.2] tracking-tight text-white bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                    Compare Learning Pathways
                </h1>
                <p className="text-[16px] text-slate-400 max-w-xl mx-auto">
                    Input two or more course links to map their video curriculum side-by-side, analyze their content using AI, and identify the better option.
                </p>
            </div>

            {/* URL Input Dashboard Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-56 h-56 bg-violet-500/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

                <form onSubmit={handleFetchAll} className="space-y-5 relative z-10">
                    <div className="space-y-4">
                        {coursesData.map((item, idx) => (
                            <div key={idx} className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                                    Course URL {idx + 1}
                                </label>
                                <div className="flex gap-3 items-center">
                                    <div className="relative flex-1 group">
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-[45%] text-outline-variant group-focus-within:text-primary transition-colors">
                                            link
                                        </span>
                                        <input
                                            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-800 bg-slate-900/60 text-white placeholder:text-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all text-[14px]"
                                            placeholder="Paste YouTube video or playlist link..."
                                            type="url"
                                            value={item.url}
                                            onChange={(e) => updateUrlField(idx, e.target.value)}
                                            disabled={item.loading}
                                            required
                                        />
                                    </div>
                                    {coursesData.length > 2 && (
                                        <button
                                            type="button"
                                            onClick={() => removeUrlField(idx)}
                                            className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-red-500/10 hover:border-red-500/30 text-slate-400 hover:text-red-400 transition-all cursor-pointer flex items-center justify-center flex-shrink-0"
                                            title="Remove URL field"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                        </button>
                                    )}
                                </div>

                                {/* Loading / Error States for each course input */}
                                {item.loading && (
                                    <div className="mt-1 flex flex-col gap-1.5 px-1">
                                        <div className="flex justify-between text-xs text-slate-400">
                                            <span className="flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping"></span>
                                                {item.progress.message || "Fetching details..."}
                                            </span>
                                            <span className="font-bold text-violet-400">{item.progress.pct}%</span>
                                        </div>
                                        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800/50">
                                            <div
                                                className="bg-gradient-to-r from-violet-500 to-blue-500 h-full rounded-full transition-all duration-300"
                                                style={{ width: `${item.progress.pct}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}

                                {item.error && (
                                    <div className="mt-1 text-xs text-red-400 flex items-center gap-1.5 px-1 font-medium">
                                        <span className="material-symbols-outlined text-[14px]">error</span>
                                        {item.error}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Actions Row */}
                    <div className="flex flex-wrap justify-between items-center gap-4 pt-2 border-t border-slate-800/50">
                        <button
                            type="button"
                            onClick={addUrlField}
                            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-[16px]">add</span>
                            Add Course URL
                        </button>

                        <button
                            type="submit"
                            disabled={coursesData.some(item => item.loading)}
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 text-white font-bold text-sm shadow-md hover:shadow-lg hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer border-none disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                {coursesData.some(item => item.loading) ? "autorenew" : "sync"}
                            </span>
                            {coursesData.some(item => item.loading) ? "Loading..." : "Fetch Course Data"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Course Previews (rendered once fetched) */}
            {successfullyFetchedCount > 0 && (
                <div className="flex flex-col gap-6 animate-[fadeIn_0.5s_ease-out]">
                    <h3 style={{ color: "#000" }} className="text-lg font-bold text-white flex items-center gap-2">
                        <span style={{ color: "#000" }} className="material-symbols-outlined text-violet-400">library_books</span>
                        Retrieved Course Outlines ({successfullyFetchedCount})
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {coursesData
                            .filter(item => item.data)
                            .map((item, idx) => {
                                const course = item.data;
                                const topics = course.sections.flatMap(s => s.lessons);
                                return (
                                    <div
                                        key={idx}
                                        className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col h-[550px] w-[350px]"
                                    >
                                        <div className="relative h-48 flex-shrink-0 bg-slate-900 border-b border-slate-800">
                                            <img
                                                src={course.thumbnail}
                                                alt={course.title}
                                                className="w-full h-full object-cover opacity-80"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                                            <div className="absolute bottom-3 left-3 right-3">
                                                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-violet-500/20 text-violet-400 px-2 py-0.5 rounded border border-violet-500/30">
                                                    Course {idx + 1}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-4 flex-1 flex flex-col min-h-0">
                                            <h4
                                                className="text-[15px] font-bold text-white line-clamp-1 leading-snug"
                                                title={course.title}
                                            >
                                                {course.title}
                                            </h4>

                                            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px]">
                                                    person
                                                </span>
                                                {course.author}
                                            </p>

                                            <div className="flex gap-4 border-y border-slate-800/50 py-2.5 my-3 text-[11px] text-slate-400 font-medium">
                                                <span className="flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[13px]">
                                                        format_list_numbered
                                                    </span>
                                                    {course.sections.length} Sections
                                                </span>

                                                <span className="flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[13px]">
                                                        play_circle
                                                    </span>
                                                    {course.totalLessons} Videos
                                                </span>
                                            </div>

                                            {/* Scrollable list of titles */}
                                            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin scrollbar-thumb-slate-800">
                                                {topics.map((topic, tIdx) => (
                                                    <div
                                                        key={tIdx}
                                                        className="text-xs text-slate-400 bg-slate-900/40 border border-slate-900 px-2.5 py-1.5 rounded flex items-center gap-2"
                                                    >
                                                        <span className="font-mono text-slate-600 font-bold flex-shrink-0 w-4 text-right">
                                                            {tIdx + 1}
                                                        </span>

                                                        <span className="truncate flex-1">
                                                            {topic.title}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>

                    {/* AI Comparison Button (Active if 2+ successfully fetched) */}
                    {successfullyFetchedCount >= 2 && !aiResult && !aiLoading && (
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={handleCompareWithAi}
                                className="px-8 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 text-white font-extrabold shadow-lg hover:shadow-xl hover:scale-[1.01] hover:brightness-105 active:scale-100 transition-all flex items-center gap-2 cursor-pointer border-none"
                            >
                                <span className="material-symbols-outlined">psychology</span>
                                Compare with AI Analyst
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* AI Comparison Loading Screen */}
            {aiLoading && (
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-12 flex flex-col items-center justify-center gap-6 text-center animate-[pulse_2s_infinite]">
                    <div className="w-20 h-20 bg-violet-500/10 text-violet-400 rounded-full flex items-center justify-center shadow-lg border border-violet-500/20">
                        <span className="material-symbols-outlined text-4xl animate-pulse">psychology</span>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white">AI Comparing Courses...</h3>
                        <p className="text-slate-400 text-sm max-w-md mx-auto">
                            The AI is parsing curriculum topics, comparing coverage gaps, analyzing structured pathways, and writing a comprehensive verdict report.
                        </p>
                    </div>
                    <div className="w-full max-w-sm flex flex-col gap-1.5">
                        <div className="h-1 bg-slate-900 rounded-full overflow-hidden border border-slate-800/30">
                            <div className="h-full bg-gradient-to-r from-violet-500 to-blue-500 w-2/3 rounded-full animate-[loading_1.5s_ease-in-out_infinite]"></div>
                        </div>
                        <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase animate-pulse">Generating Report...</span>
                    </div>
                </div>
            )}

            {/* AI Comparison Error */}
            {aiError && (
                <div className="flex items-start gap-3 p-5 bg-red-950/20 border border-red-500/30 rounded-xl text-red-300 text-sm font-medium animate-[fadeIn_0.3s_ease-out]">
                    <span className="material-symbols-outlined text-red-400 flex-shrink-0">error</span>
                    <div className="space-y-1">
                        <h4 className="font-bold text-white">Analysis Failed</h4>
                        <p className="text-red-400/80">{aiError}</p>
                    </div>
                </div>
            )}

            {/* AI Comparison Result Display */}
            {aiResult && !aiLoading && (
                <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-[fadeIn_0.6s_ease-out]">
                    {/* Panel Header */}
                    <div className="px-6 py-4.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-violet-400">summarize</span>
                            <h3 className="font-bold text-white text-base">AI Comparison & Verdict Report</h3>
                        </div>
                        <div className="flex gap-2.5">
                            <button
                                onClick={handleCopyReport}
                                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[16px]">
                                    {copied ? "check" : "content_copy"}
                                </span>
                                {copied ? "Copied!" : "Copy Report"}
                            </button>
                        </div>
                    </div>

                    {/* Rich Styled Report Body */}
                    <div className="p-6 md:p-8 overflow-y-auto leading-relaxed max-h-[800px] scrollbar-thin scrollbar-thumb-slate-800">
                        <div className="prose prose-invert max-w-none">
                            {renderMarkdown(aiResult)}
                        </div>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {successfullyFetchedCount === 0 && !aiLoading && (
                <div className="bg-slate-950 border border-dashed border-slate-800 rounded-2xl p-16 flex flex-col items-center justify-center gap-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800/80 flex items-center justify-center text-slate-500">
                        <span className="material-symbols-outlined text-3xl">compare</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-300">Compare YouTube Course Curriculum</h3>
                    <p className="text-sm text-slate-500 max-w-sm">
                        Enter at least two YouTube video or playlist links above and fetch their data to begin analyzing curriculum differences.
                    </p>
                </div>
            )}
        </div>
    );
}
