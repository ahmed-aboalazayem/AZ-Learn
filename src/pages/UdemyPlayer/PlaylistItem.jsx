import React from 'react';
import { Play, Clock } from 'lucide-react';

const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mm = Math.floor(seconds / 60);
  const ss = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mm}:${ss}`;
};

const PlaylistItem = ({ video, index, isActive, progress, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left flex items-start gap-4 px-4 py-4 transition-all border-none cursor-pointer rounded-xl group ${
      isActive 
        ? 'bg-purple-600/15 border border-purple-500/20 shadow-inner' 
        : 'bg-transparent hover:bg-white/[0.03]'
    }`}
  >
    <div className="relative shrink-0 mt-0.5 w-8">
      {isActive ? (
        <div className="w-7 h-7 rounded-full bg-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/40">
          <Play size={10} fill="white" className="translate-x-0.5" />
        </div>
      ) : (
        <span className="text-[13px] font-black text-white/10 group-hover:text-white/30 transition-colors">
          {String(index + 1).padStart(2, '0')}
        </span>
      )}
    </div>
    
    <div className="flex-1 min-w-0">
      <p className={`text-[13px] font-bold leading-relaxed transition-colors ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white/80'}`}>
        {video.title}
      </p>
      <div className="flex items-center gap-3 mt-2">
        <div className="flex items-center gap-1.5 opacity-30">
          <Clock size={11} />
          <span className="text-[11px] font-bold tracking-tight">{formatTime(video.duration)}</span>
        </div>
        {progress > 0 && (
          <div className="flex-1 h-[3px] rounded-full bg-white/5 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${progress >= 90 ? 'bg-emerald-500' : 'bg-purple-500'}`}
              style={{ width: `${progress}%` }} 
            />
          </div>
        )}
      </div>
    </div>
  </button>
);

export default PlaylistItem;
