"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import { Volume2, VolumeX } from "lucide-react";

export default function DraggableSoundButton() {
  const [isMuted, setIsMuted] = useState(true);
  const [position, setPosition] = useState({ x: 20, y: 100 });
  const audioRef = useRef<HTMLAudioElement>(null);
  const { theme } = useTheme();

  const audioSrc = theme === "dark"
    ? "/FEU_DE_CHEMINEE.mp3"
    : "/NATURE.mp3";

  // --- toggle sound ---
  const toggleSound = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      }
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  // --- clamp for screen ---
  const clampPosition = (x: number, y: number) => {
    const btnSize = 50;
    const maxX = window.innerWidth - btnSize;
    const maxY = window.innerHeight - btnSize;
    return {
      x: Math.min(Math.max(x, 0), maxX),
      y: Math.min(Math.max(y, 0), maxY),
    };
  };

  // --- Drag state ---
  const isDragging = useRef(false);

  const handleMouseMove = (e: MouseEvent) => {
    isDragging.current = true;
    setPosition(clampPosition(e.clientX - 25, e.clientY - 25));
  };

  const handleMouseUp = (e: MouseEvent) => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    // si pas de drag, alors clic
    if (!isDragging.current) {
      toggleSound();
    }
    isDragging.current = false;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    isDragging.current = false;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // --- Touch ---
  const handleTouchMove = (e: TouchEvent) => {
    isDragging.current = true;
    setPosition(clampPosition(e.touches[0].clientX - 25, e.touches[0].clientY - 25));
  };

  const handleTouchEnd = () => {
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
    if (!isDragging.current) {
      toggleSound();
    }
    isDragging.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    e.preventDefault();
    isDragging.current = false;
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
  };

  // --- Resize ---
  useEffect(() => {
    const handleResize = () => setPosition((pos) => clampPosition(pos.x, pos.y));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- Theme change (reload music) ---
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioSrc;
      if (!isMuted) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [theme]);

  return (
    <>
      <audio ref={audioRef} src={audioSrc} loop muted={isMuted} />

      <div style={{ left: position.x, top: position.y }} className="fixed z-50">
        <button
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className="group relative w-12 h-12 flex items-center justify-center rounded-full bg-black/70 text-white shadow-lg active:scale-95 cursor-pointer"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}

          {/* Tooltip */}
          <svg
            className="absolute w-20 h-20 -top-4 -left-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
            viewBox="0 0 100 100"
          >
            <defs>
              <path
                id="circlePath"
                d="M 50, 50
         m -35, 0
         a 35,35 0 1,1 70,0
         a 35,35 0 1,1 -70,0"
              />
            </defs>
            <text fill="white" fontSize="25" fontWeight="bold">
              <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
                Move It
              </textPath>
            </text>
          </svg>
        </button>
      </div>
    </>
  );
}
