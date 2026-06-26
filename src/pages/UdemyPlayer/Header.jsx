import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Star, Share2, Menu } from "lucide-react";

const NavButton = ({
    icon: Icon,
    label,
    onClick,
    active,
    variant = "ghost",
}) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-[4px] text-[12px] font-bold transition-all cursor-pointer ${
            variant === "outline"
                ? "border border-[#d1d7dc] text-[#3c4045] hover:bg-[#f7f9fa]"
                : active
                  ? "bg-[#f5eeff] border border-[#a435f0] text-[#a435f0]"
                  : "text-[#3c4045] hover:bg-[#f7f9fa]"
        }`}
    >
        <Icon size={14} />
        <span className="hidden sm:inline">{label}</span>
    </button>
);

const Header = ({ courseTitle, progressPct, onToggleSidebar, sidebarOpen }) => {
    const navigate = useNavigate();

    return (
        <header className="flex items-center justify-between px-4 h-14 bg-white border-b border-[#d1d7dc] sticky top-0 z-[100] shadow-[0_1px_6px_rgba(0,0,0,0.07)] font-sans select-none">
            <div className="flex items-center gap-3 overflow-hidden">
                <button
                    onClick={() => navigate("/dashboard/courses")}
                    className="flex items-center gap-1 px-2 py-1.5 rounded-[4px] text-[12px] font-bold text-[#3c4045] hover:bg-[#f7f9fa] transition-all cursor-pointer border border-[#d1d7dc] shrink-0"
                    title="Back to courses"
                >
                    <ChevronLeft size={16} />
                    <span className="hidden md:inline">Back</span>
                </button>
                <div className="h-5 w-px bg-[#d1d7dc] hidden sm:block shrink-0" />
                <h1 className="text-[13px] font-bold text-[#1c1d1f] truncate max-w-[300px] md:max-w-[400px]">
                    {courseTitle}
                </h1>
            </div>

            <div className="flex items-center gap-3">
                {/* Progress Display */}
                <div className="hidden lg:flex items-center gap-3 px-4 py-1 border-r border-[#d1d7dc]">
                    <div className="w-24 h-1.5 bg-[#d1d7dc] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#a435f0]"
                            style={{ width: `${progressPct}%` }}
                        />
                    </div>
                    <span className="text-[12px] font-medium text-[#6a6f73]">
                        {progressPct}% complete
                    </span>
                </div>

                <div className="flex items-center gap-1.5">
                    <NavButton icon={Star} label="Rating" variant="outline" />
                    <NavButton icon={Share2} label="Share" variant="outline" />
                    <button
                        onClick={onToggleSidebar}
                        className={`p-2 rounded-[4px] transition-all cursor-pointer ${sidebarOpen ? "bg-[#f5eeff] text-[#a435f0] border border-[#a435f0]" : "text-[#6a6f73] border border-[#d1d7dc] hover:bg-[#f7f9fa]"}`}
                    >
                        <Menu size={18} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
