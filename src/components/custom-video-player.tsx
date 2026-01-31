"use client";

import { useState, useRef } from "react";

interface CustomVideoPlayerProps {
  src: string;
  poster?: string;
}

export function CustomVideoPlayer({ src, poster }: CustomVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (!videoSrc) {
        setVideoSrc(src);
      }
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative w-full h-full rounded-[32px] overflow-hidden">
      {/* Video - Only loads when user clicks play */}
      <video
        ref={videoRef}
        src={videoSrc || undefined}
        poster={poster}
        className="w-full h-full object-cover"
        preload="none"
        onEnded={() => {
          setIsPlaying(false);
          setVideoSrc(null);
        }}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />

      {/* Big Play Button - Center */}
      {!isPlaying && !videoSrc && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
        >
          <div className="w-32 h-32 rounded-[40px] bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl hover:scale-105 transition-transform">
            <svg
              width="56"
              height="56"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 5.14v13.72a1 1 0 001.5.86l10-6.86a1 1 0 000-1.72l-10-6.86a1 1 0 00-1.5.86z" />
            </svg>
          </div>
        </button>
      )}

      {/* Controls - Bottom, spaced out max */}
      {isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-t from-black/60 to-transparent">
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          </button>

          <button
            onClick={toggleMute}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            {isMuted ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
