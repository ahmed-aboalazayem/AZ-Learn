import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
    getDbNotes,
    saveDbNote,
    deleteDbNote,
    getDbUser,
    saveDbUser,
    getDbSession,
    saveDbSession,
    deleteDbSession
} from "../services/dbService";

const UserContext = createContext(null);

const LEGACY_PROFILE_KEY = "az_learn_user_profile";
const LEGACY_NOTES_KEY = "az_learn_notes";

const DEFAULT_PROFILE = {
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@example.com",
    bio: "",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuASWI6xF7t4wSDBcXWozYtwo8m2rfDvcaM_mJSXZDRemDl6GNI2duf9wHUTdAZOALt9MCldwmlT-Zx9v4ecGo2D2kh7SlC7CNf7g-webg2jzBkpRWdruRXtOf1WHwAnbTmMIONa7ySLE2Lvz-as7_p6BzMypLOcdijxgJ5vzzkT3iv3GUuVPM95sPkmWK6fHNBAuj717ejct8cPAVrxcWOp-OuJ6XTqzxokD6XTqzxokD6XP0LyElyc_5ZJ4I_PzcVtFrCpnETTYbbmPFTbW4mDQ",
    theme: "light",
};

export function UserProvider({ children }) {
    const [profile, setProfile] = useState(DEFAULT_PROFILE);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState("");

    // Load active session profile & notes (with LocalStorage migration fallback)
    useEffect(() => {
        const initUserStore = async () => {
            try {
                // 1. Check active session email
                let activeEmail = await getDbSession("current_user_email");

                // Legacy migration check
                if (!activeEmail) {
                    const legacyProfileRaw = localStorage.getItem(LEGACY_PROFILE_KEY);
                    if (legacyProfileRaw) {
                        try {
                            const legacyProfile = JSON.parse(legacyProfileRaw);
                            activeEmail = legacyProfile.email || "alex.johnson@example.com";

                            // Register this default account in the users store
                            await saveDbUser({
                                name: `${legacyProfile.firstName || "Alex"} ${legacyProfile.lastName || "Johnson"}`,
                                email: activeEmail,
                                password: "password"
                            });

                            await saveDbSession("current_user_email", activeEmail);
                            await saveDbSession(`profile_${activeEmail}`, legacyProfile);

                            // Migrate legacy notes
                            const legacyNotesRaw = localStorage.getItem(LEGACY_NOTES_KEY);
                            if (legacyNotesRaw) {
                                try {
                                    const legacyNotes = JSON.parse(legacyNotesRaw);
                                    if (Array.isArray(legacyNotes)) {
                                        for (const note of legacyNotes) {
                                            await saveDbNote({
                                                ...note,
                                                userEmail: activeEmail
                                            });
                                        }
                                    }
                                } catch (e) {
                                    console.error("Failed to parse legacy notes:", e);
                                }
                                localStorage.removeItem(LEGACY_NOTES_KEY);
                            }
                            console.log("Migrated legacy user profile and notes to IndexedDB successfully.");
                        } catch (e) {
                            console.error("Failed to parse legacy user profile:", e);
                        }
                        localStorage.removeItem(LEGACY_PROFILE_KEY);
                    }
                }

                // If active email is found, load profile & notes
                if (activeEmail) {
                    const savedProfile = await getDbSession(`profile_${activeEmail}`);
                    if (savedProfile) {
                        setProfile(savedProfile);
                    } else {
                        const userAccount = await getDbUser(activeEmail);
                        if (userAccount) {
                            const names = userAccount.name.split(" ");
                            const fallbackProfile = {
                                firstName: names[0] || "User",
                                lastName: names.slice(1).join(" ") || "",
                                email: activeEmail,
                                bio: "",
                                avatar: DEFAULT_PROFILE.avatar,
                                theme: "light"
                            };
                            await saveDbSession(`profile_${activeEmail}`, fallbackProfile);
                            setProfile(fallbackProfile);
                        }
                    }

                    // Load notes for active email
                    const allNotes = await getDbNotes();
                    const userNotes = allNotes.filter((note) => note.userEmail === activeEmail);
                    setNotes(userNotes);
                } else {
                    // Default guest state
                    setProfile(DEFAULT_PROFILE);
                    setNotes([]);
                }
            } catch (err) {
                console.error("Failed to load user session from IndexedDB:", err);
            } finally {
                setLoading(false);
            }
        };

        initUserStore();
    }, []);

    // Manage theme class on HTML element
    useEffect(() => {
        if (!profile) return;
        const root = window.document.documentElement;
        if (profile.theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [profile?.theme]);

    const updateProfile = useCallback(async (updates) => {
        setProfile((prev) => {
            const updated = { ...prev, ...updates };

            if (updated.email) {
                saveDbSession(`profile_${updated.email}`, updated).catch((err) => {
                    console.error("Failed to persist updated profile in IndexedDB:", err);
                });
            }

            return updated;
        });
    }, []);

    // Register new user account
    const registerUser = useCallback(async (name, email, password) => {
        setAuthError("");
        try {
            const existing = await getDbUser(email);
            if (existing) {
                throw new Error("An account with this email is already registered.");
            }

            // Create account
            await saveDbUser({ name, email, password });

            // Create default profile
            const names = name.split(" ");
            const newProfile = {
                firstName: names[0] || "User",
                lastName: names.slice(1).join(" ") || "",
                email,
                bio: "",
                avatar: DEFAULT_PROFILE.avatar,
                theme: "light"
            };

            await saveDbSession("current_user_email", email);
            await saveDbSession(`profile_${email}`, newProfile);

            setProfile(newProfile);
            setNotes([]); // Starts clean
            return true;
        } catch (err) {
            setAuthError(err.message);
            throw err;
        }
    }, []);

    // Login user account
    const loginUser = useCallback(async (email, password) => {
        setAuthError("");
        try {
            const user = await getDbUser(email);
            if (!user) {
                throw new Error("No account registered with this email.");
            }
            if (user.password !== password) {
                throw new Error("Incorrect password. Please verify your credentials.");
            }

            // Set current session
            await saveDbSession("current_user_email", email);

            // Fetch profile
            let userProfile = await getDbSession(`profile_${email}`);
            if (!userProfile) {
                const names = user.name.split(" ");
                userProfile = {
                    firstName: names[0] || "User",
                    lastName: names.slice(1).join(" ") || "",
                    email,
                    bio: "",
                    avatar: DEFAULT_PROFILE.avatar,
                    theme: "light"
                };
                await saveDbSession(`profile_${email}`, userProfile);
            }

            // Fetch notes
            const allNotes = await getDbNotes();
            const filteredNotes = allNotes.filter((note) => note.userEmail === email);

            setProfile(userProfile);
            setNotes(filteredNotes);
            return true;
        } catch (err) {
            setAuthError(err.message);
            throw err;
        }
    }, []);

    // Clear session & reset profile
    const logoutUser = useCallback(async () => {
        try {
            await deleteDbSession("current_user_email");
            setProfile(DEFAULT_PROFILE);
            setNotes([]);
        } catch (err) {
            console.error("Failed to delete session key from database:", err);
        }
    }, []);

    const addNote = useCallback(async (noteData) => {
        const activeEmail = profile?.email || "alex.johnson@example.com";
        const newNote = {
            id: Date.now(),
            text: noteData.text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            lessonTitle: noteData.lessonTitle,
            courseId: noteData.courseId,
            lessonId: noteData.lessonId,
            userEmail: activeEmail
        };

        try {
            await saveDbNote(newNote);
            setNotes((prev) => [newNote, ...prev]);
            return newNote;
        } catch (err) {
            console.error("Failed to save note to IndexedDB:", err);
            setNotes((prev) => [newNote, ...prev]);
            return newNote;
        }
    }, [profile?.email]);

    const deleteNote = useCallback(async (noteId) => {
        try {
            await deleteDbNote(noteId);
            setNotes((prev) => prev.filter((note) => note.id !== noteId));
        } catch (err) {
            console.error("Failed to delete note from IndexedDB:", err);
            setNotes((prev) => prev.filter((note) => note.id !== noteId));
        }
    }, []);

    const getNotesForLesson = useCallback((courseId, lessonId) => {
        return notes.filter((n) => n.courseId === courseId && n.lessonId === lessonId);
    }, [notes]);

    const value = {
        profile,
        updateProfile,
        notes,
        addNote,
        deleteNote,
        getNotesForLesson,
        registerUser,
        loginUser,
        logoutUser,
        authError,
        loading
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
    const ctx = useContext(UserContext);
    if (!ctx) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return ctx;
}
