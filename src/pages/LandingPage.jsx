import { NavLink } from "react-router-dom";

const features = [
    {
        icon: "summarize",
        title: "AI Summarization",
        desc: "Distills hours of video into concise, readable summaries focusing on core concepts.",
        aiBadge: true,
        glowCard: true,
    },
    {
        icon: "view_module",
        title: "Smart Modules",
        desc: "Automatically breaks down monolithic playlists into logical chapters and digestible lessons.",
    },
    {
        icon: "monitoring",
        title: "Progress Tracking",
        desc: "Visual dashboards to monitor your completion rates and understanding across topics.",
    },
    {
        icon: "edit_note",
        title: "Integrated Notes",
        desc: "Rich-text editor tied to video timestamps. Export to Markdown or Notion instantly.",
    },
    {
        icon: "leaderboard",
        title: "Leaderboards",
        desc: "Gamify your learning experience. Compete with peers studying the same subjects.",
    },
    {
        icon: "groups",
        title: "Study Groups",
        desc: "Join public cohorts tackling specific playlists. Share notes and discuss concepts.",
    },
];

const stats = [
    { value: "10K+", label: "Courses Created" },
    { value: "50K+", label: "Videos Analyzed" },
    { value: "4.9/5", label: "Average Rating" },
];

const steps = [
    {
        icon: "link",
        title: "Paste Link",
        desc: "Drop any YouTube playlist or video URL directly into the engine.",
        highlight: false,
    },
    {
        icon: "auto_awesome",
        title: "AI Analyzes",
        desc: "Our intelligence maps the curriculum, extracts key concepts, and generates quizzes.",
        highlight: true,
    },
    {
        icon: "school",
        title: "Start Learning",
        desc: "Dive into a clean, structured syllabus with built-in notes and tracking.",
        highlight: false,
    },
];

const footerLinks = [
    "Privacy Policy",
    "Terms of Service",
    "Contact Support",
    "Careers",
];

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen font-body-md text-body-md bg-background text-on-background">
            {/* ── Header ── */}
            <header className="fixed top-0 z-50 w-full border-b bg-surface/80 backdrop-blur-md border-surface-container">
                <div className="max-w-[1200px] mx-auto px-gutter h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3 select-none">
                        <div className="flex items-center justify-center w-8 h-8 font-bold text-white rounded-lg shadow-lg bg-gradient-to-br from-violet-500 to-blue-500 shadow-violet-500/20">
                            <span
                                className="material-symbols-outlined text-[20px]"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                school
                            </span>
                        </div>
                        <div className="flex flex-col -gap-1">
                            <h1 className="text-xl font-extrabold leading-none text-transparent bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text">
                                AZ Learn
                            </h1>
                            <p className="text-slate-400 text-[10px] tracking-wide uppercase font-bold leading-none mt-1">
                                Pro Academy
                            </p>
                        </div>
                    </div>
                    <nav className="items-center hidden gap-6 md:flex">
                        <a
                            href="#"
                            className="transition-colors font-label-md text-label-md text-on-surface-variant hover:text-primary"
                        >
                            Features
                        </a>

                        <a
                            href="#"
                            className="transition-colors font-label-md text-label-md text-on-surface-variant hover:text-primary"
                        >
                            Pricing
                        </a>

                        <NavLink
                            to="/register"
                            className="px-4 py-2 transition-colors rounded-full font-label-md text-label-md text-primary bg-primary-container/20 hover:bg-primary-container/30"
                        >
                            Sign In
                        </NavLink>
                    </nav>
                </div>
            </header>

            {/* ── Main ── */}
            <main className="flex-grow pt-24 pb-stack_lg">
                {/* Hero Section */}
                <section className="max-w-[1200px] mx-auto px-gutter py-12 md:py-24">
                    <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
                        {/* Hero Content */}
                        <div className="flex flex-col items-start gap-stack_md">
                            {/* AI Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm ai-glow border border-primary/10">
                                <span>✨</span>
                                <span>AI Powered Learning</span>
                            </div>

                            <h1 className="font-h1 font-bold text-h1 text-on-surface mt-2 max-w-2xl lg:text-[56px] lg:leading-[1.1]">
                                Learn Anything, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                    From A to Z
                                </span>
                            </h1>

                            <p className="max-w-xl mt-2 font-body-lg text-body-lg text-on-surface-variant">
                                Paste a YouTube playlist. Get a full structured
                                course in seconds. Turn passive watching into
                                active mastery with personalized AI generation.
                            </p>

                            <div className="flex flex-wrap items-center gap-4 mt-6">
                                <button className="font-label-md text-label-md px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-on-primary shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
                                    Get Started Free
                                </button>
                                <button className="flex items-center gap-2 px-6 py-3 transition-colors border rounded-full shadow-sm font-label-md text-label-md bg-surface-container-lowest text-primary border-outline-variant hover:bg-surface-container hover:text-on-surface">
                                    <span
                                        className="material-symbols-outlined"
                                        style={{ fontSize: "18px" }}
                                    >
                                        play_circle
                                    </span>
                                    See How It Works
                                </button>
                            </div>
                        </div>

                        {/* Hero Mockup — Code Window */}
                        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-surface-container-highest group">
                            <div className="absolute inset-0 z-0 bg-gradient-to-tr from-primary/5 to-secondary/5" />
                            <div className="absolute inset-0 w-full h-full bg-[#1e1e1e] font-mono text-[13px] md:text-sm p-4 overflow-hidden z-10">
                                {/* macOS dots */}
                                <div className="flex gap-2 mb-6">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                                </div>
                                {/* JSON code */}
                                <div className="leading-relaxed">
                                    <Line text="{" />
                                    <KV k='"platform"' v='"AZ Learn"' comma />
                                    <Line text={`  "features": [`} />
                                    <Val v='"AI Summary"' comma indent={8} />
                                    <Val v='"Smart Modules"' comma indent={8} />
                                    <Val
                                        v='"Progress Tracking"'
                                        comma
                                        indent={8}
                                    />
                                    <Val v='"Notes & Insights"' indent={8} />
                                    <Line text="  ]," indent={4} />
                                    <KV
                                        k='"status"'
                                        v='"Ready to Learn"'
                                        comma
                                    />
                                    <KV
                                        k='"engine"'
                                        v='"GPT-4o Learning Model"'
                                        comma
                                    />
                                    <KV
                                        k='"timestamp"'
                                        v='"2026-04-29T17:17:05.241Z"'
                                    />
                                    <Line text="}" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Row */}
                <section className="py-8 my-12 border-y border-surface-container bg-surface-container-lowest">
                    <div className="max-w-[1200px] mx-auto px-gutter flex flex-col sm:flex-row justify-center items-center gap-12 sm:gap-24">
                        {stats.map((s, i) => (
                            <div
                                key={s.label}
                                className="flex items-center gap-12 sm:gap-24"
                            >
                                <div className="text-center">
                                    <p className="text-4xl font-bold font-h2 text-h2 text-primary">
                                        {s.value}
                                    </p>
                                    <p className="mt-1 font-label-md text-label-md text-on-surface-variant">
                                        {s.label}
                                    </p>
                                </div>
                                {i < stats.length - 1 && (
                                    <div className="hidden w-px h-12 sm:block bg-surface-container-highest" />
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* How It Works */}
                <section className="max-w-[1200px] mx-auto px-gutter py-16">
                    <div className="mb-12 text-center">
                        <h2 className="font-h2 text-h2 text-on-surface">
                            How It Works
                        </h2>
                        <p className="max-w-2xl mx-auto mt-4 font-body-lg text-body-lg text-on-surface-variant">
                            From raw video content to structured mastery in
                            three simple steps.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {steps.map((step, i) => (
                            <div
                                key={step.title}
                                className="relative flex flex-col items-center p-6 text-center"
                            >
                                {step.highlight && (
                                    <div className="absolute left-0 hidden w-full h-px md:block top-14 bg-gradient-to-r from-transparent via-outline-variant to-transparent -z-10" />
                                )}
                                <div
                                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${
                                        step.highlight
                                            ? "bg-primary-container text-on-primary-container shadow-md ai-glow relative"
                                            : "bg-surface-container-high text-primary"
                                    }`}
                                >
                                    <span
                                        className="material-symbols-outlined"
                                        style={{ fontSize: "32px" }}
                                    >
                                        {step.icon}
                                    </span>
                                    {step.highlight && (
                                        <span className="absolute w-4 h-4 rounded-full -top-2 -right-2 bg-tertiary-container animate-pulse" />
                                    )}
                                </div>
                                <div className="inline-flex items-center justify-center w-6 h-6 mb-3 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm">
                                    {i + 1}
                                </div>
                                <h3 className="mb-2 font-h3 text-h3 text-on-surface">
                                    {step.title}
                                </h3>
                                <p className="font-body-md text-body-md text-on-surface-variant">
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Features Grid */}
                <section className="max-w-[1200px] mx-auto px-gutter p-16 bg-surface-container-lowest rounded-3xl shadow-sm border border-surface-container mt-8">
                    <div className="flex flex-col items-end justify-between gap-6 mb-12 md:flex-row">
                        <div>
                            <h2 className="font-h2 text-h2 text-on-surface">
                                Powerful Features
                            </h2>
                            <p className="mt-2 font-body-lg text-body-lg text-on-surface-variant">
                                Everything you need to master new topics faster.
                            </p>
                        </div>
                        <button className="flex items-center gap-1 transition-colors font-label-md text-label-md text-primary hover:text-primary-fixed-variant">
                            View All Features
                            <span
                                className="material-symbols-outlined"
                                style={{ fontSize: "16px" }}
                            >
                                arrow_forward
                            </span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((f) => (
                            <div
                                key={f.title}
                                className={`bg-surface rounded-xl p-6 border border-outline-variant/50 transition-all group ${
                                    f.glowCard
                                        ? "hover:border-primary-container hover:shadow-md relative overflow-hidden"
                                        : "hover:border-outline hover:shadow-sm"
                                }`}
                            >
                                {f.glowCard && (
                                    <div className="absolute top-0 right-0 w-32 h-32 -mt-10 -mr-10 transition-all rounded-full bg-primary-container/10 blur-2xl group-hover:bg-primary-container/20" />
                                )}
                                <div className="flex items-center justify-center w-10 h-10 mb-4 transition-transform rounded-lg bg-surface-container-highest text-primary group-hover:scale-110">
                                    <span
                                        className="material-symbols-outlined"
                                        style={{
                                            fontVariationSettings: "'FILL' 1",
                                        }}
                                    >
                                        {f.icon}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-h3 text-[20px] text-on-surface">
                                        {f.title}
                                    </h3>
                                    {f.aiBadge && (
                                        <span className="text-xs bg-primary-container/20 text-primary px-2 py-0.5 rounded-full font-semibold">
                                            ✨ AI
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm font-body-md text-body-md text-on-surface-variant">
                                    {f.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* ── Footer ── */}
            <footer className="w-full py-12 mt-auto border-t bg-surface-container-lowest border-surface-container">
                <div className="max-w-[1200px] mx-auto px-gutter flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3 select-none">
                        <div className="flex items-center justify-center font-bold text-white rounded-lg w-7 h-7 bg-gradient-to-br from-violet-500 to-blue-500">
                            <span
                                className="material-symbols-outlined text-[18px]"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                school
                            </span>
                        </div>
                        <div className="flex flex-col -gap-1">
                            <h1 className="text-lg font-extrabold leading-none text-transparent bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text">
                                AZ Learn
                            </h1>
                            <p className="text-slate-400 text-[9px] tracking-wide uppercase font-bold leading-none mt-1">
                                Pro Academy
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6">
                        {footerLinks.map((link) => (
                            <a
                                key={link}
                                href="#"
                                className="transition-all font-label-sm text-label-sm text-on-surface-variant hover:text-primary"
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant">
                        © {new Date().getFullYear()} AZ Learn Academy. All
                        rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}

/* ── Tiny helper components for the code window ── */
function Line({ text, indent = 0 }) {
    return (
        <div className="flex" style={{ paddingLeft: indent }}>
            <span className="text-[#d4d4d4]">{text}</span>
        </div>
    );
}

function KV({ k, v, comma }) {
    return (
        <div className="flex pl-4">
            <span className="text-[#9cdcfe]">{k}</span>
            <span className="text-[#d4d4d4]">:</span>
            <span className="text-[#ce9178] ml-2">{v}</span>
            {comma && <span className="text-[#d4d4d4]">,</span>}
        </div>
    );
}

function Val({ v, comma, indent = 0 }) {
    return (
        <div className="flex" style={{ paddingLeft: indent }}>
            <span className="text-[#ce9178]">{v}</span>
            {comma && <span className="text-[#d4d4d4]">,</span>}
        </div>
    );
}
