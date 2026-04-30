import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center p-6">
            <div className="relative">
                <h1 className="text-[12rem] font-black text-white/5 select-none">404</h1>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="material-symbols-outlined text-6xl text-violet-500 mb-4 animate-bounce">
                        sentiment_very_dissatisfied
                    </span>
                    <h2 className="text-3xl font-bold text-white mb-2">Page Not Found</h2>
                    <p className="text-slate-400 max-w-md mb-8">
                        Oops! The page you're looking for has drifted into deep space. Let's get you back to safety.
                    </p>
                    <Link
                        to="/"
                        className="px-8 py-3 bg-gradient-to-r from-violet-500 to-blue-500 text-white rounded-full font-bold hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all transform hover:-translate-y-1"
                    >
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
