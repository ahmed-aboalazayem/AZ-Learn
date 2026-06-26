import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col font-body-md text-body-md bg-background text-on-background">
            {/* Simple Marketing Header */}
            <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-surface-container">
                <div className="max-w-[1200px] mx-auto px-gutter h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 no-underline">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary font-h3 text-h3 leading-none">
                            A
                        </div>
                        <span className="font-h3 text-h3 text-on-surface tracking-tight">
                            AZ Learn
                        </span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-stack_md">
                        <a
                            className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors no-underline"
                            href="#features"
                        >
                            Features
                        </a>
                        <a
                            className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors no-underline"
                            href="#how-it-works"
                        >
                            How It Works
                        </a>
                        <Link
                            className="font-label-md text-label-md text-primary bg-primary-container/20 px-4 py-2 rounded-full hover:bg-primary-container/30 transition-colors no-underline font-semibold"
                            to="/login"
                        >
                            Sign In
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="flex-grow pt-24 pb-stack_lg">
                {/* Hero Section */}
                <section className="max-w-[1200px] mx-auto px-gutter py-12 md:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Hero Content */}
                        <div className="flex flex-col items-start gap-stack_md">
                            {/* AI Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm ai-glow border border-primary/10">
                                <span>✨</span>
                                <span>AI Powered Learning</span>
                            </div>
                            <h1 className="font-h1 text-h1 text-on-surface mt-2 max-w-2xl lg:text-[56px] lg:leading-[1.1]">
                                Learn Anything, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                    From A to Z
                                </span>
                            </h1>
                            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mt-2">
                                Paste a YouTube playlist. Get a full structured course in seconds. Turn passive watching into active mastery with personalized AI generation.
                            </p>
                            <div className="flex flex-wrap items-center gap-4 mt-6">
                                <Link
                                    to="/register"
                                    className="font-label-md text-label-md px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-on-primary shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 no-underline font-semibold"
                                >
                                    Get Started Free
                                </Link>
                                <button className="font-label-md text-label-md px-6 py-3 rounded-full bg-surface-container-lowest text-primary border border-outline-variant hover:bg-surface-container hover:text-on-surface transition-colors flex items-center gap-2 shadow-sm font-semibold">
                                    <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                                        play_circle
                                    </span>
                                    See How It Works
                                </button>
                            </div>
                        </div>

                        {/* Hero Image/Mockup */}
                        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-surface-container-highest group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 z-0"></div>
                            <div className="absolute inset-0 w-full h-full bg-[#1e1e1e] font-mono text-[13px] md:text-sm p-4 overflow-hidden z-10">
                                {/* macOS Window Controls */}
                                <div className="flex gap-2 mb-6">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                </div>
                                {/* Code Content */}
                                <div className="leading-relaxed">
                                    <div className="flex">
                                        <span className="text-[#d4d4d4]">{`{`}</span>
                                    </div>
                                    <div className="flex pl-4">
                                        <span className="text-[#9cdcfe]">"platform"</span>
                                        <span className="text-[#d4d4d4]">:</span>
                                        <span className="text-[#ce9178] ml-2">"AZ Learn"</span>
                                        <span className="text-[#d4d4d4]">,</span>
                                    </div>
                                    <div className="flex pl-4">
                                        <span className="text-[#9cdcfe]">"features"</span>
                                        <span className="text-[#d4d4d4]">: [</span>
                                    </div>
                                    <div className="flex pl-8">
                                        <span className="text-[#ce9178]">"AI Summary"</span>
                                        <span className="text-[#d4d4d4]">,</span>
                                    </div>
                                    <div className="flex pl-8">
                                        <span className="text-[#ce9178]">"Smart Modules"</span>
                                        <span className="text-[#d4d4d4]">,</span>
                                    </div>
                                    <div className="flex pl-8">
                                        <span className="text-[#ce9178]">"Progress Tracking"</span>
                                        <span className="text-[#d4d4d4]">,</span>
                                    </div>
                                    <div className="flex pl-8">
                                        <span className="text-[#ce9178]">"Notes &amp; Insights"</span>
                                    </div>
                                    <div className="flex pl-4">
                                        <span className="text-[#d4d4d4]">],</span>
                                    </div>
                                    <div className="flex pl-4">
                                        <span className="text-[#9cdcfe]">"status"</span>
                                        <span className="text-[#d4d4d4]">:</span>
                                        <span className="text-[#ce9178] ml-2">"Ready to Learn"</span>
                                        <span className="text-[#d4d4d4]">,</span>
                                    </div>
                                    <div className="flex pl-4">
                                        <span className="text-[#9cdcfe]">"engine"</span>
                                        <span className="text-[#d4d4d4]">:</span>
                                        <span className="text-[#ce9178] ml-2">"GPT-4o Learning Model"</span>
                                        <span className="text-[#d4d4d4]">,</span>
                                    </div>
                                    <div className="flex pl-4">
                                        <span className="text-[#9cdcfe]">"timestamp"</span>
                                        <span className="text-[#d4d4d4]">:</span>
                                        <span className="text-[#ce9178] ml-2">"2024-05-20T10:30:00Z"</span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-[#d4d4d4]">{`}`}</span>
                                    </div>
                                </div>
                                {/* Decorative Cursor */}
                                <div className="w-2 h-5 bg-[#569cd6] animate-pulse mt-4 ml-4"></div>
                            </div>
                            {/* Decorative floating UI element */}
                            <div className="absolute bottom-6 left-6 z-20 bg-surface-container-lowest/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-outline-variant/50 flex items-center gap-4 animate-pulse">
                                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
                                    <span className="material-symbols-outlined">auto_awesome</span>
                                </div>
                                <div>
                                    <p className="font-label-sm text-label-sm text-on-surface-variant">Course Generated</p>
                                    <p className="font-label-md text-label-md text-on-surface">React Mastery in 12s</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Row */}
                <section className="border-y border-surface-container bg-surface-container-lowest py-8 my-12">
                    <div className="max-w-[1200px] mx-auto px-gutter flex flex-col sm:flex-row justify-center items-center gap-12 sm:gap-24">
                        <div className="text-center">
                            <p className="font-h2 text-h2 text-primary">10K+</p>
                            <p className="font-label-md text-label-md text-on-surface-variant mt-1">Courses Created</p>
                        </div>
                        <div className="hidden sm:block w-px h-12 bg-surface-container-highest"></div>
                        <div className="text-center">
                            <p className="font-h2 text-h2 text-primary">50K+</p>
                            <p className="font-label-md text-label-md text-on-surface-variant mt-1">Videos Analyzed</p>
                        </div>
                        <div className="hidden sm:block w-px h-12 bg-surface-container-highest"></div>
                        <div className="text-center">
                            <p className="font-h2 text-h2 text-primary">4.9/5</p>
                            <p className="font-label-md text-label-md text-on-surface-variant mt-1">Average Rating</p>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section id="how-it-works" className="max-w-[1200px] mx-auto px-gutter py-16">
                    <div className="text-center mb-12">
                        <h2 className="font-h2 text-h2 text-on-surface">How It Works</h2>
                        <p className="font-body-lg text-body-lg text-on-surface-variant mt-4 max-w-2xl mx-auto">
                            From raw video content to structured mastery in three simple steps.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center text-center p-6">
                            <div className="w-16 h-16 rounded-2xl bg-surface-container-high flex items-center justify-center mb-6 text-primary shadow-sm">
                                <span className="material-symbols-outlined" style={{ fontSize: "32px" }}>
                                    link
                                </span>
                            </div>
                            <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm mb-3">
                                1
                            </div>
                            <h3 className="font-h3 text-h3 text-on-surface mb-2">Paste Link</h3>
                            <p className="font-body-md text-body-md text-on-surface-variant">
                                Drop any YouTube playlist or video URL directly into the engine.
                            </p>
                        </div>
                        {/* Step 2 */}
                        <div className="flex flex-col items-center text-center p-6 relative">
                            {/* Connector Line (Desktop) */}
                            <div className="hidden md:block absolute top-14 left-0 w-full h-px bg-gradient-to-r from-transparent via-outline-variant to-transparent -z-10"></div>
                            <div className="w-16 h-16 rounded-2xl bg-primary-container flex items-center justify-center mb-6 text-on-primary-container shadow-md ai-glow relative">
                                <span className="material-symbols-outlined" style={{ fontSize: "32px" }}>
                                    auto_awesome
                                </span>
                                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-tertiary-container animate-pulse"></span>
                            </div>
                            <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm mb-3">
                                2
                            </div>
                            <h3 className="font-h3 text-h3 text-on-surface mb-2">AI Analyzes</h3>
                            <p className="font-body-md text-body-md text-on-surface-variant">
                                Our intelligence maps the curriculum, extracts key concepts, and generates quizzes.
                            </p>
                        </div>
                        {/* Step 3 */}
                        <div className="flex flex-col items-center text-center p-6">
                            <div className="w-16 h-16 rounded-2xl bg-surface-container-high flex items-center justify-center mb-6 text-primary shadow-sm">
                                <span className="material-symbols-outlined" style={{ fontSize: "32px" }}>
                                    school
                                </span>
                            </div>
                            <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm mb-3">
                                3
                            </div>
                            <h3 className="font-h3 text-h3 text-on-surface mb-2">Start Learning</h3>
                            <p className="font-body-md text-body-md text-on-surface-variant">
                                Dive into a clean, structured syllabus with built-in notes and tracking.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section id="features" className="max-w-[1200px] mx-auto px-gutter py-16 bg-surface-container-lowest rounded-3xl shadow-sm border border-surface-container mt-8">
                    <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
                        <div>
                            <h2 className="font-h2 text-h2 text-on-surface">Powerful Features</h2>
                            <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
                                Everything you need to master new topics faster.
                            </p>
                        </div>
                        <button className="font-label-md text-label-md text-primary hover:text-primary-fixed-variant flex items-center gap-1 transition-colors border-none bg-transparent cursor-pointer font-semibold">
                            View All Features{" "}
                            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                                arrow_forward
                            </span>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Card 1: AI Summarization */}
                        <div className="bg-surface rounded-xl p-6 border border-outline-variant/50 hover:border-primary-container transition-all hover:shadow-md group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-primary-container/20 transition-all"></div>
                            <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    summarize
                                </span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-h3 text-[20px] text-on-surface">AI Summarization</h3>
                                <span className="text-xs bg-primary-container/20 text-primary px-2 py-0.5 rounded-full font-semibold">
                                    ✨ AI
                                </span>
                            </div>
                            <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                                Distills hours of video into concise, readable summaries focusing on core concepts.
                            </p>
                        </div>
                        {/* Card 2: Smart Modules */}
                        <div className="bg-surface rounded-xl p-6 border border-outline-variant/50 hover:border-outline transition-all hover:shadow-sm group">
                            <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    view_module
                                </span>
                            </div>
                            <h3 className="font-h3 text-[20px] text-on-surface mb-2">Smart Modules</h3>
                            <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                                Automatically breaks down monolithic playlists into logical chapters and digestible lessons.
                            </p>
                        </div>
                        {/* Card 3: Progress Tracking */}
                        <div className="bg-surface rounded-xl p-6 border border-outline-variant/50 hover:border-outline transition-all hover:shadow-sm group">
                            <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    monitoring
                                </span>
                            </div>
                            <h3 className="font-h3 text-[20px] text-on-surface mb-2">Progress Tracking</h3>
                            <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                                Visual dashboards to monitor your completion rates and understanding across topics.
                            </p>
                        </div>
                        {/* Card 4: Notes */}
                        <div className="bg-surface rounded-xl p-6 border border-outline-variant/50 hover:border-outline transition-all hover:shadow-sm group">
                            <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    edit_note
                                </span>
                            </div>
                            <h3 className="font-h3 text-[20px] text-on-surface mb-2">Integrated Notes</h3>
                            <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                                Rich-text editor tied to video timestamps. Export to Markdown or Notion instantly.
                            </p>
                        </div>
                        {/* Card 5: Leaderboards */}
                        <div className="bg-surface rounded-xl p-6 border border-outline-variant/50 hover:border-outline transition-all hover:shadow-sm group">
                            <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    leaderboard
                                </span>
                            </div>
                            <h3 className="font-h3 text-[20px] text-on-surface mb-2">Leaderboards</h3>
                            <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                                Gamify your learning experience. Compete with peers studying the same subjects.
                            </p>
                        </div>
                        {/* Card 6: Study Groups */}
                        <div className="bg-surface rounded-xl p-6 border border-outline-variant/50 hover:border-outline transition-all hover:shadow-sm group">
                            <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    groups
                                </span>
                            </div>
                            <h3 className="font-h3 text-[20px] text-on-surface mb-2">Study Groups</h3>
                            <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                                Join public cohorts tackling specific playlists. Share notes and discuss concepts.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-surface-container-lowest w-full py-12 mt-auto border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-[1200px] mx-auto px-gutter flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="font-h3 text-[18px] font-bold text-on-surface">
                        AZ Learn
                    </div>
                    <div className="flex flex-wrap justify-center gap-6">
                        <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-all no-underline" href="#">
                            Privacy Policy
                        </a>
                        <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-all no-underline" href="#">
                            Terms of Service
                        </a>
                        <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-all no-underline" href="#">
                            Contact Support
                        </a>
                        <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-all no-underline" href="#">
                            Careers
                        </a>
                    </div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant">
                        © 2024 AZ Learn Academy. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
