import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    return (
        <header className="fixed top-0 right-0 left-[280px] h-16 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm flex justify-between items-center px-8 font-['Plus_Jakarta_Sans']">
            {/* Search Bar */}
            <div className="flex-1 max-w-md relative focus-within:ring-2 focus-within:ring-indigo-500/20 rounded-full transition-shadow">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                    search
                </span>
                <input
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:border-indigo-500 text-sm font-body-md text-on-surface placeholder:text-outline"
                    placeholder="Search courses, skills, or mentors..."
                    type="text"
                />
            </div>

            {/* Actions & Profile */}
            <div className="flex items-center gap-4">
                <Link
                    to="/dashboard/courses/new"
                    className="hidden md:flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-indigo-600 font-['Plus_Jakarta_Sans'] text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm no-underline"
                >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    Create New
                </Link>
                <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-['Plus_Jakarta_Sans'] font-medium bg-gradient-to-r from-[#6C63FF]/10 to-[#3B82F6]/10 text-indigo-600 border border-indigo-200/50 hover:bg-indigo-50 transition-colors cursor-pointer">
                    ✨ AI Assistant
                </button>
                <button className="p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors relative cursor-pointer border-none bg-transparent flex items-center justify-center">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error border border-white"></span>
                </button>
                <button className="p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer border-none bg-transparent flex items-center justify-center">
                    <span className="material-symbols-outlined">apps</span>
                </button>
                <div className="h-8 w-px bg-outline-variant mx-2"></div>
                <img
                    onClick={() => navigate("/dashboard/settings")}
                    alt="User Profile"
                    className="w-9 h-9 rounded-full border-2 border-surface-container cursor-pointer hover:border-primary transition-colors object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEKDX_CUn-5ufodH3V5TrmHJuVEvrXklTdi64BP2M31BbrErfcnnWr8SKlA4vlYSBtdvHXrdrwt9wNKvIdqIstjhbvVsYEkF2VAhomCo9Uqw5SFq_kghrM4YjTadVvAloUukVKClulYH93EM06fIomh2Vgs3KziHCfFtMUEB4mR0PkVCsApKQLq4Yp1PYqboGK5vJS3IeDKB49AtP2-jAG5lbzUQuljxQ2ANlXGBznMQhDNezwUrIFCPgdG-4WA6PZnZRDk-yZYhOf"
                />
            </div>
        </header>
    );
}
