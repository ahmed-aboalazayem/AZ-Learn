import React, { useEffect, useRef } from 'react';

const YouTubePlayer = ({ videoId, playing, onReady, onEnded, onProgress, onError, onPlayStateChange, playerRef, playbackRate, muted, volume }) => {
  const iframeRef = useRef(null);
  const playerInstanceRef = useRef(null);
  const progressIntervalRef = useRef(null);

  useEffect(() => {
    if (!videoId) return;
    let destroyed = false;

    const initPlayer = () => {
      if (destroyed || !iframeRef.current) return;
      if (playerInstanceRef.current) {
        playerInstanceRef.current.destroy();
      }
      playerInstanceRef.current = new window.YT.Player(iframeRef.current, {
        videoId,
        playerVars: { 
          autoplay: 0, 
          modestbranding: 1, 
          rel: 0, 
          iv_load_policy: 3, 
          enablejsapi: 1, 
          origin: window.location.origin,
          controls: 1
        },
        events: {
          onReady: (e) => {
            if (destroyed) return;
            if (playerRef) playerRef.current = e.target;
            onReady && onReady();
          },
          onStateChange: (e) => {
            if (destroyed) return;
            if (e.data === window.YT.PlayerState.ENDED) onEnded && onEnded();
            if (e.data === window.YT.PlayerState.PLAYING) onPlayStateChange && onPlayStateChange(true);
            if (e.data === window.YT.PlayerState.PAUSED) onPlayStateChange && onPlayStateChange(false);
          },
          onError: (e) => {
            onError && onError(e);
          }
        }
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
      if (!document.getElementById('yt-iframe-api')) {
        const tag = document.createElement('script');
        tag.id = 'yt-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }
    }

    return () => {
      destroyed = true;
      clearInterval(progressIntervalRef.current);
      if (playerInstanceRef.current) {
        try { playerInstanceRef.current.destroy(); } catch {}
        playerInstanceRef.current = null;
      }
    };
  }, [videoId]);

  // Play / Pause
  useEffect(() => {
    const p = playerInstanceRef.current;
    if (!p || typeof p.playVideo !== 'function') return;
    if (playing) { p.playVideo(); } else { p.pauseVideo(); }
  }, [playing]);

  // Volume / Mute
  useEffect(() => {
    const p = playerInstanceRef.current;
    if (!p || typeof p.setVolume !== 'function') return;
    if (muted) { p.mute(); } else { p.unMute(); p.setVolume(volume * 100); }
  }, [muted, volume]);

  // Playback rate
  useEffect(() => {
    const p = playerInstanceRef.current;
    if (!p || typeof p.setPlaybackRate !== 'function') return;
    p.setPlaybackRate(playbackRate);
  }, [playbackRate]);

  // Progress polling
  useEffect(() => {
    clearInterval(progressIntervalRef.current);
    if (!playing) return;
    progressIntervalRef.current = setInterval(() => {
      const p = playerInstanceRef.current;
      if (!p || typeof p.getCurrentTime !== 'function') return;
      const current = p.getCurrentTime();
      const dur = p.getDuration();
      if (dur > 0) onProgress && onProgress({ played: current / dur, playedSeconds: current, loadedSeconds: dur });
    }, 500);
    return () => clearInterval(progressIntervalRef.current);
  }, [playing, onProgress]);

  return (
    <div className="absolute inset-0 bg-black">
      <div ref={iframeRef} className="w-full h-full" />
    </div>
  );
};

export default YouTubePlayer;
