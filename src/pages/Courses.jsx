import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCourses } from "../store/courseStore";

export default function Courses() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { courses, deleteCourse } = useCourses();
    const [filter, setFilter] = useState("all");
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const searchQuery = (searchParams.get("search") || "").toLowerCase();

    // Calculate progress for each course
    const coursesWithProgress = courses.map((course) => {
        const allLessons = course.sections.flatMap((s) => s.lessons);
        const totalLessons = allLessons.length;
        const completedCount = Object.values(
            course.progress.completedLessons,
        ).filter(Boolean).length;
        const progress =
            totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

        // Calculate remaining time
        let remainingSec = 0;
        allLessons.forEach((l) => {
            if (!course.progress.completedLessons[l.id]) {
                const parts = String(l.duration).split(":");
                if (parts.length === 2)
                    remainingSec += parseInt(parts[0]) * 60 + parseInt(parts[1]);
                if (parts.length === 3)
                    remainingSec +=
                        parseInt(parts[0]) * 3600 +
                        parseInt(parts[1]) * 60 +
                        parseInt(parts[2]);
            }
        });
        const h = Math.floor(remainingSec / 3600);
        const m = Math.floor((remainingSec % 3600) / 60);
        const timeLeft =
            progress === 100
                ? "Completed"
                : h > 0
                  ? `${h}h ${m}m left`
                  : `${m}m left`;

        return {
            ...course,
            lessonsDisplay: `${completedCount}/${totalLessons}`,
            progress,
            timeLeft,
            computedStatus: progress === 100 ? "completed" : "in-progress",
        };
    });

    const filteredCourses = coursesWithProgress.filter((course) => {
        // Status filter
        if (filter === "in-progress" && course.computedStatus !== "in-progress") return false;
        if (filter === "completed" && course.computedStatus !== "completed") return false;

        // Search filter
        if (searchQuery) {
            const matchesTitle = course.title.toLowerCase().includes(searchQuery);
            const matchesAuthor = course.author.toLowerCase().includes(searchQuery);
            return matchesTitle || matchesAuthor;
        }

        return true;
    });

    const handleDelete = (id) => {
        deleteCourse(id);
        setDeleteConfirm(null);
    };

    return (
        <div className="p-8 w-full max-w-container_max_width mx-auto flex flex-col gap-8 font-['Plus_Jakarta_Sans']">
            {/* Header & Toggle */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="font-h1 text-h1 text-on-surface">My Courses</h1>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                        Browse and manage all the courses you have imported.
                    </p>
                </div>
                <div className="flex bg-surface-container-highest p-1 rounded-lg select-none">
                    {["all", "in-progress", "completed"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-6 py-2 rounded-md text-sm font-semibold transition-all cursor-pointer border-none ${
                                filter === f
                                    ? "bg-white text-primary shadow-sm"
                                    : "text-on-surface-variant hover:text-on-surface bg-transparent"
                            }`}
                        >
                            {f === "all" ? "All" : f === "in-progress" ? "In Progress" : "Completed"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                    <div
                        key={course.id}
                        className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative"
                    >
                        {/* Delete button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setDeleteConfirm(course.id);
                            }}
                            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer border-none hover:bg-red-500"
                            title="Delete course"
                        >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>

                        <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                            <img
                                alt={course.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                src={course.thumbnail}
                            />
                            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-md font-label-sm text-[10px] flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">play_circle</span>
                                {course.lessonsDisplay} Lessons
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
                                    <span>{course.progress}% Complete</span>
                                    <span>{course.timeLeft}</span>
                                </div>
                                <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${course.progress === 100 ? "bg-emerald-500" : "bg-gradient-to-r from-[#6C63FF] to-[#3B82F6]"}`}
                                        style={{ width: `${course.progress}%` }}
                                    ></div>
                                </div>
                                <button
                                    onClick={() => navigate(`/dashboard/courses/${course.id}`)}
                                    className="mt-3 w-full py-2.5 rounded-lg bg-surface-container border border-outline-variant text-on-surface font-label-md text-label-md hover:bg-gradient-to-r hover:from-[#6C63FF] hover:to-[#3B82F6] hover:text-white hover:border-transparent transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[#6C63FF] group-hover:to-[#3B82F6] group-hover:text-white group-hover:border-transparent cursor-pointer font-semibold"
                                >
                                    {course.progress === 100 ? "Review Course" : "Continue Learning"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Add New Course Button */}
                {filter !== "completed" && (
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
                )}
            </div>

            {/* Empty State */}
            {filteredCourses.length === 0 && filter !== "all" && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4">
                        {filter === "completed" ? "task_alt" : "school"}
                    </span>
                    <h3 className="text-xl font-bold text-on-surface-variant mb-2">
                        No {filter === "completed" ? "completed" : "in-progress"} courses
                    </h3>
                    <p className="text-on-surface-variant text-sm">
                        {filter === "completed"
                            ? "Complete a course to see it here."
                            : "Start learning a course to see it here."}
                    </p>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-xl p-8 max-w-sm w-full mx-4 shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                <span className="material-symbols-outlined text-red-500">delete</span>
                            </div>
                            <h3 className="text-lg font-bold text-on-surface">Delete Course?</h3>
                        </div>
                        <p className="text-on-surface-variant text-sm mb-6">
                            This will permanently remove the course and all progress. This action cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="px-5 py-2 rounded-lg border border-outline-variant text-on-surface-variant font-semibold hover:bg-slate-50 cursor-pointer bg-white text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(deleteConfirm)}
                                className="px-5 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 cursor-pointer border-none text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
