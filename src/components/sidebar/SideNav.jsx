import { NavLink } from "react-router-dom";

const navLinks = [
    { icon: "dashboard", label: "Dashboard", path: "/dashboard" },
    { icon: "menu_book", label: "My Courses", path: "/dashboard/courses" },
    { icon: "add_circle", label: "Create New", path: "/dashboard/courses/new" },
    {
        icon: "leaderboard",
        label: "Leaderboard",
        path: "/dashboard/leaderboard",
    },
];

const bottomLinks = [
    { icon: "settings", label: "Settings", path: "/dashboard/settings" },
    { icon: "logout", label: "Logout", path: "/login" },
];

export default function SideNav() {
    return (
        <nav className="fixed left-0 top-0 bottom-0 w-[280px] h-full z-50 bg-slate-950 border-r border-slate-800 shadow-2xl flex flex-col p-4 font-medium text-sm">
            {/* Header */}
            <div className="px-4 py-6 mb-2 select-none">
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white font-bold">
                        <span
                            className="material-symbols-outlined"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            school
                        </span>
                    </div>
                    <h1 className="text-2xl font-extrabold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                        AZ Learn
                    </h1>
                </div>
                <p className="text-slate-400 text-xs tracking-wide uppercase font-bold">
                    Pro Academy
                </p>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 flex flex-col gap-0.5">
                {navLinks.map((link) => (
                    <NavLink
                        key={link.label}
                        to={link.path}
                        end
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2.5 rounded-lg no-underline transition-all duration-200 ease-in-out relative group ${
                                isActive
                                    ? "bg-violet-500/10 text-violet-400 shadow-[inset_0_0_12px_rgba(139,92,246,0.1)]"
                                    : "text-slate-400 hover:text-slate-100 hover:bg-white/5 hover:translate-x-1"
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <div className="absolute left-0 inset-y-0 my-auto w-1 h-6 bg-violet-500 rounded-r-full shadow-[0_0_10px_rgba(139,92,246,0.3)]" />
                                )}
                                <span
                                    className="material-symbols-outlined text-[20px]"
                                    style={
                                        isActive
                                            ? {
                                                  fontVariationSettings:
                                                      "'FILL' 1",
                                              }
                                            : {}
                                    }
                                >
                                    {link.icon}
                                </span>
                                {link.label}
                            </>
                        )}
                    </NavLink>
                ))}
            </div>

            {/* CTA & Footer */}
            <div className="mt-auto flex flex-col gap-0.5">
                <div className="p-4 bg-white/5 rounded-xl mb-2 border border-white/10">
                    <p className="text-slate-300 text-xs mb-3">
                        Unlock advanced AI tools and unlimited courses.
                    </p>
                    <NavLink
                        to="/dashboard/upgrade"
                        className="w-full py-2 bg-gradient-to-r from-violet-500 to-blue-500 text-white rounded-lg text-sm font-bold hover:shadow-lg transition-all text-center block no-underline"
                    >
                        Upgrade to Pro
                    </NavLink>
                </div>

                {bottomLinks.map((link) => (
                    <NavLink
                        key={link.label}
                        to={link.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2.5 rounded-lg no-underline transition-all duration-200 ease-in-out ${
                                isActive
                                    ? "bg-violet-500/10 text-violet-400"
                                    : "text-slate-400 hover:text-slate-100 hover:bg-white/5 hover:translate-x-1"
                            }`
                        }
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            {link.icon}
                        </span>
                        {link.label}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}
