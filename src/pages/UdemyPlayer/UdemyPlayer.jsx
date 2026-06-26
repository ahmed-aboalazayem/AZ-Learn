import React, { useState, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import VideoPlayer from "./VideoPlayer";
import Sidebar from "./Sidebar";
import CourseTabs from "./CourseTabs";
import { useCourses } from "../../store/courseStore";

const UdemyPlayer = () => {
    const { id: courseId } = useParams();
    const navigate = useNavigate();
    const { getCourse, updateProgress, setCurrentLesson } = useCourses();

    const course = getCourse(courseId);

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Flatten all lessons for navigation
    const allLessons = useMemo(() => {
        if (!course) return [];
        return course.sections.flatMap((s) =>
            s.lessons.map((l) => ({ ...l, sectionTitle: s.title })),
        );
    }, [course]);

    // Determine starting lesson
    const startLessonId = useMemo(() => {
        if (!course) return null;
        if (course.progress.currentLessonId) return course.progress.currentLessonId;
        return allLessons.length > 0 ? allLessons[0].id : null;
    }, [course, allLessons]);

    const [currentLessonId, setCurrentLessonIdLocal] = useState(startLessonId);

    const currentLesson = useMemo(
        () => allLessons.find((l) => l.id === currentLessonId) || allLessons[0],
        [allLessons, currentLessonId],
    );

    const currentIndex = useMemo(
        () => allLessons.findIndex((l) => l.id === currentLessonId),
        [allLessons, currentLessonId],
    );

    // Use the course's persisted progress for done status
    const doneStatus = course?.progress?.completedLessons || {};
    const completedCount = Object.values(doneStatus).filter(Boolean).length;
    const progressPct =
        allLessons.length > 0
            ? Math.round((completedCount / allLessons.length) * 100)
            : 0;

    const handleLessonSelect = useCallback(
        (id) => {
            setCurrentLessonIdLocal(id);
            setCurrentLesson(courseId, id);
            if (window.innerWidth < 1024) setIsSidebarOpen(false);
        },
        [courseId, setCurrentLesson],
    );

    const handleToggleDone = useCallback(
        (id) => {
            const newDone = !doneStatus[id];
            updateProgress(courseId, id, newDone);
        },
        [courseId, doneStatus, updateProgress],
    );

    const handleVideoEnded = useCallback(() => {
        updateProgress(courseId, currentLessonId, true);
        if (currentIndex < allLessons.length - 1) {
            const nextId = allLessons[currentIndex + 1].id;
            setCurrentLessonIdLocal(nextId);
            setCurrentLesson(courseId, nextId);
        }
    }, [currentIndex, allLessons, currentLessonId, courseId, updateProgress, setCurrentLesson]);

    // Course not found
    if (!course) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-white gap-6">
                <span className="material-symbols-outlined text-6xl text-on-surface-variant/30">
                    error
                </span>
                <h2 className="text-2xl font-bold text-on-surface">
                    Course not found
                </h2>
                <p className="text-on-surface-variant">
                    This course may have been deleted.
                </p>
                <button
                    onClick={() => navigate("/dashboard/courses")}
                    className="px-6 py-2.5 rounded-lg bg-primary text-on-primary font-semibold cursor-pointer border-none"
                >
                    Back to Courses
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen bg-[#ffffff] text-[#1c1d1f] font-sans overflow-hidden">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        :root { font-family: 'DM Sans', sans-serif; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f7f9fa; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d7dc; border-radius: 99px; border: 1px solid #f7f9fa; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #6a6f73; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

            <Header
                courseTitle={course.title}
                progressPct={progressPct}
                sidebarOpen={isSidebarOpen}
                onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />

            <div className="flex flex-1 overflow-hidden relative">
                <main
                    className={`flex flex-col overflow-y-auto custom-scrollbar transition-all duration-500 ease-in-out bg-[#1c1d1f] ${isSidebarOpen ? "lg:w-[70%]" : "w-full"}`}
                >
                    <div className="flex-shrink-0 bg-black shadow-2xl z-10">
                        <VideoPlayer
                            key={currentLesson?.id}
                            video={currentLesson}
                            onEnded={handleVideoEnded}
                        />
                    </div>

                    <div className="border-t border-[#d1d7dc] bg-white">
                        <CourseTabs
                            courseId={courseId}
                            lessonId={currentLesson?.id}
                            video={currentLesson}
                            course={course}
                        />
                    </div>
                </main>

                <div
                    className={`
          fixed inset-0 z-40 lg:relative lg:inset-auto lg:z-auto transition-all duration-500 ease-in-out
          ${isSidebarOpen ? "translate-x-0 w-full lg:w-[30%]" : "translate-x-full w-0 lg:hidden"}
          flex justify-end
        `}
                >
                    <div
                        className={`absolute inset-0 bg-black/40 backdrop-blur-sm lg:hidden transition-opacity duration-500 ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                        onClick={() => setIsSidebarOpen(false)}
                    />

                    <div className="relative w-full h-full bg-white shadow-2xl lg:shadow-none">
                        <Sidebar
                            sections={course.sections}
                            currentLessonId={currentLessonId}
                            doneStatus={doneStatus}
                            onLessonSelect={handleLessonSelect}
                            onToggleDone={handleToggleDone}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UdemyPlayer;
