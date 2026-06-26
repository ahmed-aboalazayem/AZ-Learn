import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../store/userStore.jsx";

export default function Register() {
    const navigate = useNavigate();
    const { registerUser, loginUser } = useUser();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [localError, setLocalError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError("");

        if (password !== confirmPassword) {
            setLocalError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            // --- فحص الـ LocalStorage للتأكد من عدم تكرار الحساب قبل الإرسال ---
            const currentUsers = JSON.parse(localStorage.getItem("az_users")) || [];
            const isEmailExist = currentUsers.some(user => user.email === email);

            if (isEmailExist) {
                setLocalError("You are already registered with this account!");
                setLoading(false);
                return;
            }

            // إذا لم يكن مسجلاً، نتابع عملية الـ Register الطبيعية من الـ Store
            await registerUser(name, email, password);
            navigate("/dashboard");
        } catch (err) {
            // إذا كان الـ Store يرجع خطأ تكرار أو أي خطأ آخر
            if (err.message && (err.message.includes("exists") || err.message.includes("already"))) {
                setLocalError("You are already registered with this account!");
            } else {
                setLocalError(err.message || "Failed to create account. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleRegister = async () => {
        setLocalError("");
        setLoading(true);
        try {
            const mockGoogleEmail = "google.guest@example.com";
            const mockGoogleName = "Google Guest";
            const mockGooglePass = "google";
            
            try {
                await loginUser(mockGoogleEmail, mockGooglePass);
            } catch {
                await registerUser(mockGoogleName, mockGoogleEmail, mockGooglePass);
                await loginUser(mockGoogleEmail, mockGooglePass);
            }
            navigate("/dashboard");
        } catch (err) {
            setLocalError("Mock Google registration failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-surface-container font-body-md text-body-md text-on-surface">
            {/* Decorative Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-container/20 blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary-container/20 blur-[100px] pointer-events-none"></div>

            {/* Auth Card */}
            <main className="w-full max-w-[440px] bg-surface-container-lowest rounded-[16px] soft-elevation p-8 relative z-10 flex flex-col gap-6">
                {/* Header */}
                <div className="flex flex-col items-center text-center gap-2">
                    <Link to="/" className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-2 shadow-sm no-underline hover:opacity-90">
                        <span 
                            className="material-symbols-outlined text-on-primary text-[28px]" 
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            auto_awesome
                        </span>
                    </Link>
                    <h1 className="font-h2 text-h2 text-on-surface">Create Account</h1>
                    <p className="font-body-md text-body-md text-on-surface-variant">Join AZ Learn Academy today</p>
                </div>

                {/* Form Area */}
                <div className="flex flex-col gap-4">
                    {localError && (
                        <div className="flex items-start gap-3 p-3.5 bg-red-500/10 border border-red-500/25 rounded-lg text-red-500 text-[13px] font-medium leading-snug">
                            <span className="material-symbols-outlined text-[18px] flex-shrink-0">error</span>
                            <span>{localError}</span>
                        </div>
                    )}

                    {/* OAuth */}
                    <button 
                        onClick={handleGoogleRegister}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-surface-container-lowest border border-outline-variant rounded-lg hover:bg-surface-container transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" fill="#EA4335"></path>
                            <path d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" fill="#4285F4"></path>
                            <path d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" fill="#FBBC05"></path>
                            <path d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" fill="#34A853"></path>
                        </svg>
                        <span className="font-label-md text-label-md text-on-surface font-semibold">Sign up with Google</span>
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-4">
                        <div className="h-px bg-outline-variant flex-1"></div>
                        <span className="font-label-sm text-label-sm text-outline">OR</span>
                        <div className="h-px bg-outline-variant flex-1"></div>
                    </div>

                    {/* Registration Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1.5">
                            <label className="font-label-md text-label-md text-on-surface" htmlFor="name">Full Name</label>
                            <input 
                                className="w-full h-11 px-3 rounded-lg border border-outline bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary-container focus:outline-none transition-all duration-200 disabled:opacity-60" 
                                id="name" 
                                name="name" 
                                placeholder="John Doe" 
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={loading}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="font-label-md text-label-md text-on-surface" htmlFor="email">Email address</label>
                            <input 
                                className="w-full h-11 px-3 rounded-lg border border-outline bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary-container focus:outline-none transition-all duration-200 disabled:opacity-60" 
                                id="email" 
                                name="email" 
                                placeholder="you@example.com" 
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="font-label-md text-label-md text-on-surface" htmlFor="password">Password</label>
                            <input 
                                className="w-full h-11 px-3 rounded-lg border border-outline bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary-container focus:outline-none transition-all duration-200 disabled:opacity-60" 
                                id="password" 
                                name="password" 
                                placeholder="••••••••" 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="font-label-md text-label-md text-on-surface" htmlFor="confirmPassword">Confirm Password</label>
                            <input 
                                className="w-full h-11 px-3 rounded-lg border border-outline bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary-container focus:outline-none transition-all duration-200 disabled:opacity-60" 
                                id="confirmPassword" 
                                name="confirmPassword" 
                                placeholder="••••••••" 
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                disabled={loading}
                                required
                            />
                        </div>
                        <button 
                            className="w-full h-11 mt-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-on-primary-fixed-variant transition-colors duration-200 flex items-center justify-center shadow-sm cursor-pointer border-none font-semibold disabled:opacity-60 disabled:cursor-not-allowed" 
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : "Sign Up"}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <div className="text-center">
                    <p className="font-body-md text-body-md text-on-surface-variant">
                        Already have an account? 
                        <Link className="font-label-md text-label-md text-primary hover:text-primary-fixed-variant transition-colors ml-1 no-underline font-semibold" to="/login">Sign in</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}