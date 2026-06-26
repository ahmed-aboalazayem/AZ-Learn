import React, { useState, useRef, useEffect, useCallback } from 'react';
import YouTubePlayer from './YouTubePlayer';
import { Play, AlertCircle, Loader2 } from 'lucide-react';

const VideoPlayer = ({ video, onEnded, onProgressUpdate }) => {
  const [playing, setPlaying] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const ytPlayerRef = useRef(null);
  const containerRef = useRef(null);

  // Synchronize state from native YouTube controls
  const handlePlayStateChange = useCallback((isPlaying) => {
    setPlaying(isPlaying);
  }, []);

  const handleProgress = useCallback((state) => {
    onProgressUpdate && onProgressUpdate(state.played * 100);
  }, [onProgressUpdate]);

  // Reset on video change
  useEffect(() => {
    setPlaying(false);
    setLoadError(false);
    setIsReady(false);
  }, [video.id]); // Use ID for more reliable reset

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none bg-black group/player"
      style={{ aspectRatio: '16/9' }}
    >
      {/* YouTube Player Area */}
      <div className="absolute inset-0 z-0">
        <YouTubePlayer
          videoId={video.url?.match(/[?&]v=([^&]+)/)?.[1]}
          playing={playing}
          playerRef={ytPlayerRef}
          onReady={() => { setIsReady(true); setLoadError(false); }}
          onEnded={onEnded}
          onProgress={handleProgress}
          onError={() => setLoadError(true)}
          onPlayStateChange={handlePlayStateChange}
        />
      </div>

      {/* Error State */}
      {loadError && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#1c1d1f] text-white text-center p-6">
          <AlertCircle size={44} className="text-red-500 mb-4" />
          <p className="font-extrabold text-lg mb-1 tracking-tight">Video Unavailable</p>
          <p className="text-sm text-white/40 max-w-xs leading-relaxed">This video may be restricted or embedding is disabled by the owner.</p>
        </div>
      )}


      {/* Loading State */}
      {!isReady && !loadError && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#1c1d1f] pointer-events-none">
          <Loader2 size={44} className="text-[#a435f0] animate-spin opacity-60" />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;