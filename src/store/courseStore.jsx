import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getDbCourses, saveDbCourse, deleteDbCourse } from "../services/dbService";

const CourseContext = createContext(null);

const STORAGE_KEY = "az_learn_courses";

export function CourseProvider({ children }) {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. Initial Load: Load courses from IndexedDB (with LocalStorage migration fallback)
    useEffect(() => {
        const initCourses = async () => {
            try {
                let dbList = await getDbCourses();

                // If DB is empty, check if we have legacy courses in LocalStorage to migrate
                if (dbList.length === 0) {
                    const legacyRaw = localStorage.getItem(STORAGE_KEY);
                    if (legacyRaw) {
                        try {
                            const legacyList = JSON.parse(legacyRaw);
                            if (Array.isArray(legacyList) && legacyList.length > 0) {
                                for (const course of legacyList) {
                                    await saveDbCourse(course);
                                }
                                dbList = legacyList;
                                console.log("Migrated courses from LocalStorage to IndexedDB successfully.");
                            }
                        } catch (e) {
                            console.error("Failed to parse legacy LocalStorage courses:", e);
                        }
                        // Clear the legacy key to avoid re-migration
                        localStorage.removeItem(STORAGE_KEY);
                    }
                }

                setCourses(dbList);
            } catch (err) {
                console.error("Failed to load courses from IndexedDB:", err);
            } finally {
                setLoading(false);
            }
        };

        initCourses();
    }, []);

    const addCourse = useCallback(async (courseData) => {
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

        try {
            await saveDbCourse(newCourse);
            setCourses((prev) => [newCourse, ...prev]);
            return newCourse.id;
        } catch (err) {
            console.error("Failed to save new course to IndexedDB:", err);
            // Fallback: still add to state so UI functions, even if DB fails
            setCourses((prev) => [newCourse, ...prev]);
            return newCourse.id;
        }
    }, []);

    const deleteCourse = useCallback(async (id) => {
        try {
            await deleteDbCourse(id);
            setCourses((prev) => prev.filter((c) => c.id !== id));
        } catch (err) {
            console.error("Failed to delete course from IndexedDB:", err);
            setCourses((prev) => prev.filter((c) => c.id !== id));
        }
    }, []);

    const getCourse = useCallback(
        (id) => {
            return courses.find((c) => c.id === id) || null;
        },
        [courses],
    );

    const updateProgress = useCallback(async (courseId, lessonId, done) => {
        setCourses((prev) =>
            prev.map((c) => {
                if (c.id !== courseId) return c;
                const completedLessons = {
                    ...c.progress.completedLessons,
                    [lessonId]: done,
                };
                // Clean up false entries
                if (!done) delete completedLessons[lessonId];

                const updated = {
                    ...c,
                    progress: {
                        ...c.progress,
                        completedLessons,
                        currentLessonId: lessonId,
                    },
                };

                // Save to IndexedDB asynchronously
                saveDbCourse(updated).catch((err) => {
                    console.error("Failed to sync course progress to IndexedDB:", err);
                });

                return updated;
            }),
        );
    }, []);

    const setCurrentLesson = useCallback(async (courseId, lessonId) => {
        setCourses((prev) =>
            prev.map((c) => {
                if (c.id !== courseId) return c;
                const updated = {
                    ...c,
                    progress: { ...c.progress, currentLessonId: lessonId },
                };

                // Save to IndexedDB asynchronously
                saveDbCourse(updated).catch((err) => {
                    console.error("Failed to sync current lesson to IndexedDB:", err);
                });

                return updated;
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
        loading,
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
