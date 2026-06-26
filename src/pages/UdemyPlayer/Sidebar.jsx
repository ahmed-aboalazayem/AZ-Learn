import React, { useState } from "react";
import {
    ChevronDown,
    ChevronRight,
    FileText,
    HelpCircle,
    Code,
    PlayCircle,
    Check,
    Trophy,
    Settings,
} from "lucide-react";

const TypeIcon = ({ type, size = 14, color = "currentColor" }) => {
    switch (type) {
        case "article":
            return <FileText size={size} color={color} />;
        case "quiz":
            return <HelpCircle size={size} color={color} />;
        case "coding":
            return <Code size={size} color={color} />;
        default:
            return <PlayCircle size={size} color={color} />;
    }
};

const PlaylistItem = ({ lesson, isActive, isDone, onSelect, onToggleDone }) => {
    return (
        <div
            onClick={onSelect}
            className={`group flex items-start gap-3 px-4 py-3 cursor-pointer transition-all border-b border-[#eaecee] ${
                isActive
                    ? "bg-[#f5eeff] border-l-[3px] border-l-[#a435f0]"
                    : "bg-white hover:bg-[#f7f9fa]"
            }`}
        >
            {/* Custom Checkbox */}
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleDone(lesson.id);
                }}
                className={`shrink-0 w-4 h-4 mt-1 rounded-[2px] border-2 transition-all flex items-center justify-center ${
                    isDone
                        ? "bg-[#a435f0] border-[#a435f0]"
                        : "bg-white border-[#d1d7dc]"
                }`}
            >
                {isDone && <Check size={10} color="white" strokeWidth={4} />}
            </div>

            <div className="flex-1 min-w-0">
                <p
                    className={`text-[13px] leading-snug mb-1.5 ${isActive ? "text-[#1c1d1f] font-bold" : "text-[#1c1d1f]"}`}
                >
                    {lesson.title}
                </p>
                <div className="flex items-center gap-1.5 text-[#6a6f73]">
                    <TypeIcon type={lesson.type} size={12} />
                    <span className="text-[11px] font-medium">
                        {lesson.duration}
                    </span>
                </div>
            </div>
        </div>
    );
};

const Sidebar = ({
    sections,
    currentLessonId,
    doneStatus,
    onLessonSelect,
    onToggleDone,
}) => {
    const [expandedSections, setExpandedSections] = useState(() => {
        const initial = {};
        sections.forEach((s, idx) => {
            initial[s.id] = idx === 0;
        });
        return initial;
    });

    const toggleSection = (id) => {
        setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const totalLessons = sections.flatMap((s) => s.lessons).length;
    const completedCount = Object.values(doneStatus).filter(Boolean).length;
    const progressPct = Math.round((completedCount / totalLessons) * 100);

    return (
        <aside className="w-full h-full bg-white flex flex-col overflow-hidden border-l border-[#d1d7dc] font-sans">
            {/* Progress Header */}
            <div className="p-4 bg-[#f7f9fa] border-b border-[#d1d7dc] flex-shrink-0">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-[#1c1d1f]">
                        Course Content
                    </h3>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex-1 h-1 bg-[#d1d7dc] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#a435f0] transition-all duration-500"
                            style={{ width: `${progressPct}%` }}
                        />
                    </div>
                    <span className="text-[11px] font-bold text-[#6a6f73] whitespace-nowrap">
                        {completedCount} / {totalLessons} lessons
                    </span>
                </div>
            </div>

            {/* Sections List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {sections.map((section, idx) => {
                    const isExpanded = expandedSections[section.id];
                    const lessonsInSection = section.lessons.length;
                    const completedInSection = section.lessons.filter(
                        (l) => doneStatus[l.id],
                    ).length;
                    const isSectionComplete =
                        completedInSection === lessonsInSection &&
                        lessonsInSection > 0;

                    return (
                        <div
                            key={section.id}
                            className="border-b border-[#d1d7dc]"
                        >
                            {/* Section Toggle */}
                            <div
                                onClick={() => toggleSection(section.id)}
                                className={`relative flex items-start gap-3 p-4 cursor-pointer transition-all ${
                                    isSectionComplete
                                        ? "bg-[#e7f9e7] border-b-2 border-[#a435f0] py-5"
                                        : "bg-[#f4f5f7] hover:bg-[#eef0f2]"
                                }`}
                            >
                                <div className="mt-1">
                                    {isExpanded ? (
                                        <ChevronDown
                                            size={14}
                                            color={
                                                isSectionComplete
                                                    ? "#1c1d1f"
                                                    : "#6a6f73"
                                            }
                                        />
                                    ) : (
                                        <ChevronRight
                                            size={14}
                                            color={
                                                isSectionComplete
                                                    ? "#1c1d1f"
                                                    : "#6a6f73"
                                            }
                                        />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p
                                        className={`text-[14px] font-bold leading-tight mb-1 ${isSectionComplete ? "text-[#1c1d1f]" : "text-[#1c1d1f]"}`}
                                    >
                                        Section {idx + 1}: {section.title}
                                    </p>
                                    <p
                                        className={`text-[11px] ${isSectionComplete ? "text-[#3c4045] font-medium" : "text-[#6a6f73]"}`}
                                    >
                                        {completedInSection} /{" "}
                                        {lessonsInSection} |{" "}
                                        {section.lessons.reduce(
                                            (acc, l) =>
                                                acc +
                                                (parseInt(l.duration) || 0),
                                            0,
                                        )}
                                        min
                                    </p>
                                </div>
                            </div>

                            {/* Lessons in Section */}
                            {isExpanded && (
                                <div style={{ animation: 'fadeSlideDown 0.2s ease-out' }}>
                                    {section.lessons.map((lesson) => (
                                        <PlaylistItem
                                            key={lesson.id}
                                            lesson={lesson}
                                            isActive={
                                                lesson.id === currentLessonId
                                            }
                                            isDone={doneStatus[lesson.id]}
                                            onSelect={() =>
                                                onLessonSelect(lesson.id)
                                            }
                                            onToggleDone={onToggleDone}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </aside>
    );
};

export default Sidebar;
