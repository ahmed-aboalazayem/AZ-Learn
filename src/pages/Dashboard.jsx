import { Link, useNavigate } from "react-router-dom";
import { useCourses } from "../store/courseStore";

export default function Dashboard() {
    const navigate = useNavigate();
    const { courses, getStats } = useCourses();
    const stats = getStats();

    // Get the last 2 courses for the dashboard
    const recentCourses = courses.slice(0, 2);

    // Calculate progress for a course
    const getCourseProgress = (course) => {
        const allLessons = course.sections.flatMap((s) => s.lessons);
        const totalLessons = allLessons.length;
        const completedCount = Object.values(course.progress.completedLessons).filter(Boolean).length;
        const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

        let remainingSec = 0;
        allLessons.forEach((l) => {
            if (!course.progress.completedLessons[l.id]) {
                const parts = String(l.duration).split(":");
                if (parts.length === 2) remainingSec += parseInt(parts[0]) * 60 + parseInt(parts[1]);
                if (parts.length === 3) remainingSec += parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
            }
        });
        const h = Math.floor(remainingSec / 3600);
        const m = Math.floor((remainingSec % 3600) / 60);
        const timeLeft = progress === 100 ? "Completed" : h > 0 ? `${h}h ${m}m left` : `${m}m left`;

        return { progress, timeLeft, lessonsDisplay: `${completedCount}/${totalLessons}` };
    };

    return (
        <div className="p-8 flex gap-8 w-full font-['Plus_Jakarta_Sans']">
            {/* Left Content Area */}
            <div className="flex-1 flex flex-col gap-8 max-w-container_max_width">
                {/* Welcome Section */}
                <section className="bg-gradient-to-r from-primary-container/30 to-secondary-container/20 rounded-xl p-8 border border-outline-variant/50 relative overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
                    <div className="relative z-10 flex flex-col gap-2">
                        <h2 className="font-h2 text-h2 text-on-surface">Welcome back, Ahmed 👋</h2>
                        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                            {courses.length > 0
                                ? `You have ${courses.length} course${courses.length > 1 ? "s" : ""} in your library. Keep up the momentum!`
                                : "Get started by importing your first course from YouTube!"}
                        </p>
                    </div>
                    <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#6C63FF]/10 to-transparent pointer-events-none"></div>
                    <span
                        className="material-symbols-outlined absolute -right-4 -bottom-4 text-[120px] text-primary/5 rotate-[-15deg] pointer-events-none select-none"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                        school
                    </span>
                </section>

                {/* Stats Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col gap-1 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 text-on-surface-variant mb-2">
                            <span className="material-symbols-outlined text-xl text-primary">play_circle</span>
                            <span className="font-label-md text-label-md">Total Videos</span>
                        </div>
                        <span className="font-h2 text-[28px] font-bold text-on-surface">{stats.totalVideos}</span>
                    </div>

                    <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col gap-1 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 text-on-surface-variant mb-2">
                            <span className="material-symbols-outlined text-xl text-[#3B82F6]">schedule</span>
                            <span className="font-label-md text-label-md">Total Hours</span>
                        </div>
                        <span className="font-h2 text-[28px] font-bold text-on-surface">{stats.totalHours}</span>
                    </div>

                    <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col gap-1 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 text-on-surface-variant mb-2">
                            <span className="material-symbols-outlined text-xl text-emerald-500">task_alt</span>
                            <span className="font-label-md text-label-md">Completed</span>
                        </div>
                        <span className="font-h2 text-[28px] font-bold text-on-surface">{stats.completedVideos}</span>
                    </div>

                    <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col gap-1 hover:shadow-md transition-shadow relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-16 h-16 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-bl-full pointer-events-none"></div>
                        <div className="flex items-center gap-2 text-on-surface-variant mb-2">
                            <span className="material-symbols-outlined text-xl text-amber-500">library_books</span>
                            <span className="font-label-md text-label-md">Courses</span>
                        </div>
                        <span className="font-h2 text-[28px] font-bold text-on-surface">{stats.totalCourses}</span>
                    </div>
                </section>

                {/* My Courses Section */}
                <section className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h3 className="font-h3 text-h3 text-on-surface">My Courses</h3>
                        {courses.length > 0 && (
                            <Link
                                to="/dashboard/courses"
                                className="font-label-md text-label-md text-primary hover:text-[#3B82F6] transition-colors flex items-center gap-1 no-underline font-semibold"
                            >
                                View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </Link>
                        )}
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        {recentCourses.map((course) => {
                            const { progress, timeLeft, lessonsDisplay } = getCourseProgress(course);
                            return (
                                <div
                                    key={course.id}
                                    className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                                        <img
                                            alt={course.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            src={course.thumbnail}
                                        />
                                        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-md font-label-sm text-[10px] flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px]">play_circle</span>
                                            {lessonsDisplay} Lessons
                                        </div>
                                    </div>
                                    <div className="p-5 flex flex-col flex-1 gap-4">
                                        <div>
                                            <h4 className="font-body-lg font-bold text-on-surface leading-tight mb-1 line-clamp-2">
                                                {course.title}
                                            </h4>
                                            <p className="font-label-sm text-label-sm text-on-surface-variant">
                                                By {course.author}
                                            </p>
                                        </div>
                                        <div className="mt-auto flex flex-col gap-2">
                                            <div className="flex justify-between items-center font-label-sm text-label-sm text-on-surface-variant">
                                                <span>{progress}% Complete</span>
                                                <span>{timeLeft}</span>
                                            </div>
                                            <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-300 ${progress === 100 ? "bg-emerald-500" : "bg-gradient-to-r from-indigo-500 to-blue-500"}`}
                                                    style={{ width: `${progress}%` }}
                                                ></div>
                                            </div>
                                            <button
                                                onClick={() => navigate(`/dashboard/courses/${course.id}`)}
                                                className="mt-3 w-full py-2.5 rounded-lg bg-surface-container border border-outline-variant text-on-surface font-label-md text-label-md hover:bg-gradient-to-r hover:from-[#6C63FF] hover:to-[#3B82F6] hover:text-white hover:border-transparent transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[#6C63FF] group-hover:to-[#3B82F6] group-hover:text-white group-hover:border-transparent cursor-pointer font-semibold"
                                            >
                                                {progress === 100 ? "Review Course" : "Continue Learning"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Add New Course Dotted Button */}
                        <div
                            onClick={() => navigate("/dashboard/courses/new")}
                            className="bg-surface-container-lowest rounded-xl border-2 border-dashed border-outline-variant hover:border-primary hover:bg-primary/5 transition-all duration-300 flex flex-col items-center justify-center min-h-[340px] group cursor-pointer shadow-sm select-none"
                        >
                            <div className="w-16 h-16 rounded-full bg-surface-variant group-hover:bg-primary-container flex items-center justify-center mb-4 transition-colors">
                                <span className="material-symbols-outlined text-3xl text-on-surface-variant group-hover:text-primary transition-colors">
                                    add
                                </span>
                            </div>
                            <span className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors font-semibold">
                                Add New Course
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant mt-2 text-center px-6">
                                Import a YouTube playlist or video
                            </span>
                        </div>
                    </div>
                </section>
            </div>

            {/* Right Activity Sidebar */}
            <aside className="w-80 shrink-0 hidden lg:flex flex-col gap-6">
                <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-6 flex flex-col h-full max-h-[800px]">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-h3 text-xl font-bold text-on-surface">Recent Activity</h3>
                        <button className="p-1.5 rounded-md hover:bg-surface-container text-on-surface-variant transition-colors border-none bg-transparent cursor-pointer flex items-center">
                            <span className="material-symbols-outlined text-sm">more_horiz</span>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                        {courses.length > 0 ? (
                            courses.slice(0, 4).map((course, idx) => (
                                <div key={course.id} className="flex gap-4 relative">
                                    {idx < Math.min(courses.length, 4) - 1 && (
                                        <div className="absolute left-[19px] top-10 bottom-[-24px] w-px bg-outline-variant/50"></div>
                                    )}
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 z-10 border-4 border-surface-container-lowest">
                                        <span className="material-symbols-outlined text-blue-600 text-sm">play_arrow</span>
                                    </div>
                                    <div className="flex flex-col pt-1">
                                        <p className="font-body-md text-[14px] text-on-surface leading-snug">
                                            Added{" "}
                                            <span className="font-semibold text-primary">{course.title}</span>
                                        </p>
                                        <span className="font-label-sm text-xs text-on-surface-variant mt-1">
                                            {new Date(course.createdAt).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <span className="material-symbols-outlined text-4xl text-on-surface-variant/20 mb-3">
                                    history
                                </span>
                                <p className="text-sm text-on-surface-variant">
                                    No activity yet. Create your first course to get started!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </div>
    );
}
