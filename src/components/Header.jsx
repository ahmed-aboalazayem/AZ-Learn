import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useUser } from "../store/userStore.jsx";

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const { profile } = useUser();

    const isCoursesPage = location.pathname === "/dashboard/courses";
    const searchQuery = searchParams.get("search") || "";

    return (
        <header className="fixed top-0 right-0 left-[280px] h-16 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm flex justify-between items-center px-8 font-['Plus_Jakarta_Sans']">
            {/* Search Bar */}
            {isCoursesPage ? (
                <div className="flex-1 max-w-md relative focus-within:ring-2 focus-within:ring-indigo-500/20 rounded-full transition-shadow">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-[45%] text-outline-variant group-focus-within:text-primary transition-colors">
                        search
                    </span>
                    <input
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:border-indigo-500 text-sm font-body-md text-on-surface placeholder:text-outline"
                        placeholder="Search courses..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (val) {
                                setSearchParams({ search: val });
                            } else {
                                setSearchParams({});
                            }
                        }}
                    />
                </div>
            ) : (
                <div className="flex-1" />
            )}

            {/* Actions & Profile */}
            <div className="flex items-center gap-4">
                <Link
                    to="/dashboard/courses/new"
                    className="hidden md:flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-indigo-600 font-['Plus_Jakarta_Sans'] text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm no-underline"
                >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    Create New
                </Link>

                <div className="h-8 w-px bg-outline-variant mx-2"></div>
                <img
                    onClick={() => navigate("/dashboard/settings")}
                    alt="User Profile"
                    className="w-9 h-9 rounded-full border-2 border-surface-container cursor-pointer hover:border-primary transition-colors object-cover"
                    src={profile.avatar}
                />
            </div>
        </header>
    );
}
