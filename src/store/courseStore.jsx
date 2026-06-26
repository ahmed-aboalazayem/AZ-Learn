import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const CourseContext = createContext(null);

const STORAGE_KEY = "az_learn_courses";

function loadCourses() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function saveCourses(courses) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
}

export function CourseProvider({ children }) {
    const [courses, setCourses] = useState(loadCourses);

    // Persist on every change
    useEffect(() => {
        saveCourses(courses);
    }, [courses]);

    const addCourse = useCallback((courseData) => {
        const newCourse = {
            ...courseData,
            id: courseData.id || crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            status: "in-progress",
            progress: {
                completedLessons: {},
                currentLessonId: null,
            },
        };
        setCourses((prev) => [newCourse, ...prev]);
        return newCourse.id;
    }, []);

    const deleteCourse = useCallback((id) => {
        setCourses((prev) => prev.filter((c) => c.id !== id));
    }, []);

    const getCourse = useCallback(
        (id) => {
            return courses.find((c) => c.id === id) || null;
        },
        [courses],
    );

    const updateProgress = useCallback((courseId, lessonId, done) => {
        setCourses((prev) =>
            prev.map((c) => {
                if (c.id !== courseId) return c;
                const completedLessons = {
                    ...c.progress.completedLessons,
                    [lessonId]: done,
                };
                // Clean up false entries
                if (!done) delete completedLessons[lessonId];

                return {
                    ...c,
                    progress: {
                        ...c.progress,
                        completedLessons,
                        currentLessonId: lessonId,
                    },
                };
            }),
        );
    }, []);

    const setCurrentLesson = useCallback((courseId, lessonId) => {
        setCourses((prev) =>
            prev.map((c) => {
                if (c.id !== courseId) return c;
                return {
                    ...c,
                    progress: { ...c.progress, currentLessonId: lessonId },
                };
            }),
        );
    }, []);

    const getStats = useCallback(() => {
        let totalVideos = 0;
        let completedVideos = 0;
        let totalDurationSeconds = 0;

        courses.forEach((course) => {
            const allLessons = course.sections.flatMap((s) => s.lessons);
            totalVideos += allLessons.length;
            completedVideos += Object.values(
                course.progress.completedLessons,
            ).filter(Boolean).length;

            allLessons.forEach((lesson) => {
                const parts = String(lesson.duration).split(":");
                if (parts.length === 2) {
                    totalDurationSeconds +=
                        parseInt(parts[0]) * 60 + parseInt(parts[1]);
                } else if (parts.length === 3) {
                    totalDurationSeconds +=
                        parseInt(parts[0]) * 3600 +
                        parseInt(parts[1]) * 60 +
                        parseInt(parts[2]);
                }
            });
        });

        return {
            totalCourses: courses.length,
            totalVideos,
            completedVideos,
            totalHours: (totalDurationSeconds / 3600).toFixed(1),
        };
    }, [courses]);

    const value = {
        courses,
        addCourse,
        deleteCourse,
        getCourse,
        updateProgress,
        setCurrentLesson,
        getStats,
    };

    return (
        <CourseContext.Provider value={value}>
            {children}
        </CourseContext.Provider>
    );
}

export function useCourses() {
    const ctx = useContext(CourseContext);
    if (!ctx)
        throw new Error("useCourses must be used within a CourseProvider");
    return ctx;
}
