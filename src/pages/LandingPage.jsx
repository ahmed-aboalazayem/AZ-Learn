import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col font-['Plus_Jakarta_Sans'] bg-slate-50 text-slate-900 overflow-x-hidden">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 no-underline group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                            AZ
                        </div>
                        <span className="font-bold text-xl tracking-tight text-slate-800">
                            Learn
                        </span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors no-underline">
                            Features
                        </a>
                        <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors no-underline">
                            How It Works
                        </a>
                        <div className="flex items-center gap-4 ml-4">
                            <Link to="/login" className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors no-underline">
                                Log in
                            </Link>
                            <Link to="/register" className="text-sm font-semibold bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-slate-800 transition-all no-underline hover:shadow-md hover:-translate-y-0.5">
                                Get Started
                            </Link>
                        </div>
                    </nav>
                </div>
            </header>

            <main className="flex-grow pt-20">
                {/* Hero Section */}
                <section className="relative pt-20 pb-32 overflow-hidden">
                    {/* Background decorations */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-indigo-100/40 to-blue-50/40 rounded-full blur-3xl -z-10"></div>
                    <div className="absolute top-20 right-10 w-72 h-72 bg-purple-100/40 rounded-full blur-3xl -z-10"></div>
                    
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium mb-8 animate-fade-in-up">
                                <span className="flex h-2 w-2 rounded-full bg-indigo-500"></span>
                                Now with AI Course Comparison
                            </div>
                            
                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
                                Transform YouTube into your <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
                                    personal learning platform
                                </span>
                            </h1>
                            
                            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
                                Import any YouTube playlist and turn it into a structured, trackable course. Compare curriculums with AI, take notes, and track your progress offline.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <Link to="/register" className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold text-lg shadow-xl shadow-indigo-500/25 hover:shadow-2xl hover:shadow-indigo-500/30 hover:-translate-y-1 transition-all no-underline">
                                    Start Learning Free
                                </Link>
                                <a href="#how-it-works" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-700 border border-slate-200 font-semibold text-lg hover:bg-slate-50 transition-colors no-underline flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-[20px]">play_circle</span>
                                    See How it Works
                                </a>
                            </div>
                        </div>

                        {/* App Preview Mockup */}
                        <div className="mt-20 relative mx-auto max-w-5xl">
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent z-10 pointer-events-none h-full w-full top-1/2"></div>
                            <div className="rounded-2xl border border-slate-200/60 bg-white shadow-2xl shadow-slate-200/50 overflow-hidden transform perspective-1000 rotate-x-2 scale-100 md:scale-105 transition-transform duration-700 hover:rotate-x-0">
                                {/* Browser Header */}
                                <div className="h-12 border-b border-slate-100 bg-slate-50 flex items-center px-4 gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    </div>
                                    <div className="mx-auto bg-white border border-slate-200 rounded-md px-4 py-1 flex items-center gap-2 text-xs text-slate-400 w-1/2 justify-center shadow-sm">
                                        <span className="material-symbols-outlined text-[14px]">lock</span>
                                        az-learn.app/dashboard
                                    </div>
                                </div>
                                {/* Mockup Content */}
                                <div className="p-8 bg-slate-50/50 flex flex-col md:flex-row gap-6">
                                    {/* Sidebar mock */}
                                    <div className="hidden md:flex flex-col gap-4 w-48 border-r border-slate-200 pr-6">
                                        <div className="h-8 bg-slate-200 rounded-md w-3/4 mb-4"></div>
                                        <div className="h-4 bg-indigo-100 rounded w-full"></div>
                                        <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                                        <div className="h-4 bg-slate-200 rounded w-4/5"></div>
                                    </div>
                                    {/* Main content mock */}
                                    <div className="flex-1 flex flex-col gap-6">
                                        <div className="flex justify-between items-center">
                                            <div className="h-8 bg-slate-200 rounded-md w-1/3"></div>
                                            <div className="h-8 bg-indigo-500 rounded-md w-24"></div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-3">
                                                    <div className="h-24 bg-slate-100 rounded-lg w-full"></div>
                                                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                                                    <div className="h-2 bg-slate-100 rounded-full w-full overflow-hidden mt-2">
                                                        <div className={`h-full bg-indigo-500 w-${i*3}/4 rounded-full`}></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to master new skills</h2>
                            <p className="text-lg text-slate-600">Built for self-taught developers and lifelong learners who want more than just a video player.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined text-[24px]">playlist_add_check</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">YouTube to Course</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Paste any YouTube playlist URL and instantly convert it into a beautifully structured course with sections, lessons, and time tracking.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-50">
                                    <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-md">AI POWERED</span>
                                </div>
                                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined text-[24px]">compare_arrows</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">AI Course Analyzer</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Can't decide between two playlists? Our AI analyzes their curriculums side-by-side to recommend the best learning path for you.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined text-[24px]">database</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Offline & Private</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Your data stays yours. Powered by IndexedDB, all your progress, notes, and courses are stored locally on your device for fast, private access.
                                </p>
                            </div>

                            {/* Feature 4 */}
                            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined text-[24px]">monitoring</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Visual Progress Tracking</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Stay motivated with visual progress bars. See exactly how many hours are left and pick up right where you left off.
                                </p>
                            </div>

                            {/* Feature 5 */}
                            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined text-[24px]">edit_note</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Integrated Notes</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Take notes right alongside the video player. Your thoughts are saved instantly and organized by lesson.
                                </p>
                            </div>

                            {/* Feature 6 */}
                            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                                <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined text-[24px]">devices</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Custom Video Player</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Enjoy a distraction-free learning environment with our custom embedded player, tailored for studying without YouTube recommendations.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="how-it-works" className="py-24 bg-slate-50 border-t border-slate-200/50">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Start learning in seconds</h2>
                            <p className="text-lg text-slate-600">No complicated setup. Just bring your desire to learn.</p>
                        </div>

                        <div className="flex flex-col md:flex-row gap-12 relative">
                            {/* Connecting Line */}
                            <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-indigo-200 via-blue-200 to-indigo-200 -z-10"></div>
                            
                            {/* Step 1 */}
                            <div className="flex-1 flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-white border-4 border-indigo-100 flex items-center justify-center text-xl font-bold text-indigo-600 mb-6 shadow-sm">
                                    1
                                </div>
                                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500 mb-4">
                                    <span className="material-symbols-outlined text-[32px]">content_copy</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Find a Playlist</h3>
                                <p className="text-slate-600">Copy the URL of any educational YouTube playlist or compare two playlists using AI.</p>
                            </div>

                            {/* Step 2 */}
                            <div className="flex-1 flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-indigo-600 border-4 border-indigo-100 flex items-center justify-center text-xl font-bold text-white mb-6 shadow-lg shadow-indigo-500/30">
                                    2
                                </div>
                                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500 mb-4">
                                    <span className="material-symbols-outlined text-[32px]">auto_fix_high</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Import & Generate</h3>
                                <p className="text-slate-600">We automatically fetch all videos, metadata, and durations to generate a beautiful course interface.</p>
                            </div>

                            {/* Step 3 */}
                            <div className="flex-1 flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-white border-4 border-indigo-100 flex items-center justify-center text-xl font-bold text-indigo-600 mb-6 shadow-sm">
                                    3
                                </div>
                                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500 mb-4">
                                    <span className="material-symbols-outlined text-[32px]">school</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Master the Topic</h3>
                                <p className="text-slate-600">Watch without distractions, take markdown notes, and track your progress to 100%.</p>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* CTA Section */}
                <section className="py-24">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="bg-primary rounded-3xl p-10 md:p-16 text-center text-on-primary shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/40 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/30 rounded-full blur-3xl"></div>
                            
                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-on-primary">Ready to upgrade your learning?</h2>
                                <p className="text-primary-fixed text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                                    Join AZ Learn today. It's completely free, private, and runs entirely in your browser.
                                </p>
                                <Link to="/register" className="inline-block px-8 py-4 rounded-full bg-white text-primary font-bold text-lg hover:bg-slate-50 hover:scale-105 transition-all shadow-xl no-underline">
                                    Create Your Free Account
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 py-12">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                            AZ
                        </div>
                        <span className="font-bold text-slate-900">AZ Learn</span>
                    </div>
                    
                    <div className="flex gap-6">
                        <a href="#" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors no-underline">Privacy</a>
                        <a href="#" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors no-underline">Terms</a>
                        <a href="https://github.com/ahmed-aboalazayem/AZ-Learn" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors no-underline">GitHub</a>
                    </div>
                    
                    <div className="text-sm text-slate-400">
                        &copy; {new Date().getFullYear()} AZ Learn. Created for self-learners.
                    </div>
                </div>
            </footer>
        </div>
    );
}
