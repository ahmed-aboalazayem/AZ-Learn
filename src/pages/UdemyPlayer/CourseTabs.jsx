import React, { useState } from 'react';
import { Info, FileText, Layout, User, Globe, Clock, Plus, Trash2 } from 'lucide-react';
import { useUser } from '../../store/userStore.jsx';

const TabButton = ({ active, icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2.5 px-6 py-4 border-b-2 transition-all cursor-pointer bg-transparent whitespace-nowrap ${
      active 
        ? 'border-[#1c1d1f] text-[#1c1d1f] font-bold' 
        : 'border-transparent text-[#6a6f73] hover:text-[#1c1d1f] hover:border-[#d1d7dc]'
    }`}
  >
    <Icon size={18} />
    <span className="text-[13px] tracking-tight">{label}</span>
  </button>
);

const getDeterministicStudents = (title) => {
  if (!title) return "12,500";
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  const count = Math.abs(hash % 98000) + 1200;
  return count.toLocaleString();
};

const CourseTabs = ({ courseId, lessonId, video, course }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [noteInput, setNoteInput] = useState('');
  const { getNotesForLesson, addNote, deleteNote } = useUser();

  const notes = getNotesForLesson(courseId, lessonId);

  const handleAddNote = () => {
    if (!noteInput.trim()) return;
    addNote({
      text: noteInput,
      lessonTitle: video.title,
      courseId,
      lessonId,
    });
    setNoteInput('');
  };

  const handleDeleteNote = (id) => {
    deleteNote(id);
  };

  return (
    <div className="flex flex-col bg-white font-sans">
      {/* Tabs Header */}
      <div className="flex border-b border-[#d1d7dc] px-4 overflow-x-auto no-scrollbar">
        <TabButton active={activeTab === 'overview'} icon={Info} label="Overview" onClick={() => setActiveTab('overview')} />
        <TabButton active={activeTab === 'notes'} icon={FileText} label="Notes" onClick={() => setActiveTab('notes')} />
      </div>

      {/* Tab Content */}
      <div className="p-8 max-w-5xl">
        {activeTab === 'overview' && (
          <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <h2 className="text-[24px] font-bold text-[#1c1d1f] mb-6 tracking-tight">About this course</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-[#eaecee] mb-8">
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-[#6a6f73] uppercase tracking-wider">Skill level</p>
                <div className="flex items-center gap-2 text-[#1c1d1f] text-sm font-bold">
                  <Layout size={14} className="text-[#6a6f73]" /> All Levels
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-[#6a6f73] uppercase tracking-wider">Students</p>
                <div className="flex items-center gap-2 text-[#1c1d1f] text-sm font-bold">
                  <User size={14} className="text-[#6a6f73]" /> {course ? getDeterministicStudents(course.title) : "1,200"}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-[#6a6f73] uppercase tracking-wider">Languages</p>
                <div className="flex items-center gap-2 text-[#1c1d1f] text-sm font-bold">
                  <Globe size={14} className="text-[#6a6f73]" /> English [Auto]
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-[#6a6f73] uppercase tracking-wider">Lectures</p>
                <div className="flex items-center gap-2 text-[#1c1d1f] text-sm font-bold">
                  <Clock size={14} className="text-[#6a6f73]" /> {course ? course.totalLessons : 0}
                </div>
              </div>
            </div>
            
            <div className="space-y-6 text-[#3c4045] leading-[1.8]">
              <div>
                <h3 className="text-xl font-bold text-[#1c1d1f] mb-2">{video.title}</h3>
                <p className="text-[#6a6f73] text-sm font-medium italic">Section: {video.sectionTitle}</p>
              </div>
              
              <div className="prose prose-sm max-w-none">
                <p className="text-lg text-[#1c1d1f] font-medium leading-relaxed">
                  Master the foundational concepts of <strong>{video.title}</strong> in this comprehensive lesson. 
                  Taught by <strong>{course ? course.author : "the instructor"}</strong>, this section provides deep technical insights and practical examples 
                  to help you build high-performance applications.
                </p>
                {course && course.description && (
                  <div className="mt-6 border-t border-[#eaecee] pt-6">
                    <h4 className="text-[16px] font-bold text-[#1c1d1f] mb-3">Course Overview</h4>
                    <p className="text-sm text-[#6a6f73] leading-relaxed whitespace-pre-wrap">{course.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div style={{ animation: 'fadeSlideUp 0.3s ease-out' }}>
            {/* Note Input */}
            <div className="mb-10 bg-[#f7f9fa] p-6 rounded-lg border border-[#d1d7dc]">
              <h3 className="text-sm font-bold text-[#1c1d1f] mb-4">Create a new note</h3>
              <div className="flex flex-col gap-3">
                <textarea
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder="Type your note here..."
                  className="w-full min-h-[120px] p-4 rounded-md border border-[#d1d7dc] focus:border-[#a435f0] focus:ring-1 focus:ring-[#a435f0] outline-none text-sm transition-all resize-none"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleAddNote}
                    disabled={!noteInput.trim()}
                    className="flex items-center gap-2 bg-[#1c1d1f] hover:bg-black disabled:bg-[#d1d7dc] text-white px-6 py-2.5 rounded-md text-sm font-bold transition-colors cursor-pointer"
                  >
                    <Plus size={18} /> Save Note
                  </button>
                </div>
              </div>
            </div>

            {/* Notes List */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-[#1c1d1f] border-b border-[#eaecee] pb-3">Your Notes ({notes.length})</h3>
              {notes.length === 0 ? (
                <div className="py-12 text-center text-[#6a6f73]">
                  <FileText size={48} strokeWidth={1} className="mx-auto mb-3 opacity-20" />
                  <p className="text-sm font-medium">Click above to create your first note for this lesson.</p>
                </div>
              ) : (
                notes.map((note) => (
                  <div key={note.id} className="group p-5 bg-white border border-[#d1d7dc] rounded-lg hover:shadow-md transition-shadow relative">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold bg-[#f5eeff] text-[#a435f0] px-2 py-0.5 rounded">
                        {note.timestamp} · {note.lessonTitle}
                      </span>
                      <button 
                        onClick={() => handleDeleteNote(note.id)}
                        className="text-[#6a6f73] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1 bg-transparent border-none cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-[#3c4045] leading-relaxed whitespace-pre-wrap">{note.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseTabs;
