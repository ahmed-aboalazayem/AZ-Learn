import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-surface-container font-body-md text-body-md text-on-surface">
            {/* Decorative Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-container/20 blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary-container/20 blur-[100px] pointer-events-none"></div>

            {/* Error Card */}
            <main className="w-full max-w-[440px] bg-surface-container-lowest rounded-[16px] soft-elevation p-8 relative z-10 flex flex-col gap-6 items-center text-center">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center shadow-sm select-none">
                    <span className="material-symbols-outlined text-[36px]">error</span>
                </div>

                <div className="space-y-2">
                    <h1 className="text-6xl font-extrabold text-primary">404</h1>
                    <h2 className="text-xl font-bold text-on-surface">Page Not Found</h2>
                    <p className="text-sm text-on-surface-variant max-w-xs leading-relaxed">
                        The syllabus or dashboard link you are trying to access doesn't exist or has been moved.
                    </p>
                </div>

                <Link 
                    to="/dashboard" 
                    className="w-full h-11 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-on-primary-fixed-variant transition-colors duration-200 flex items-center justify-center shadow-sm cursor-pointer no-underline font-semibold"
                >
                    Back to Dashboard
                </Link>
            </main>
        </div>
    );
}
