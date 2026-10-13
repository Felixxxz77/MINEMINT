import { useEffect, useRef, useState } from "react";
import song from "../assets/images/oasis ft. D Gerrard - atom chanakan [OFFICIAL MV].mp3";

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.2;

    const startPlayback = () => {
      audio.play()
        .then(() => setNeedsInteraction(false))
        .catch(() => setNeedsInteraction(true));
    };

    const startOnInteraction = (event) => {
      if (playerRef.current?.contains(event.target) || !audio.paused) return;
      startPlayback();
    };

    startPlayback();
    window.addEventListener("pointerdown", startOnInteraction);
    window.addEventListener("keydown", startOnInteraction);

    return () => {
      window.removeEventListener("pointerdown", startOnInteraction);
      window.removeEventListener("keydown", startOnInteraction);
    };
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setNeedsInteraction(false);
      } catch {
        setNeedsInteraction(true);
      }
    } else {
      audio.pause();
    }
  };

  return (
    <div
      ref={playerRef}
      className="fixed bottom-4 right-4 z-[100] w-[min(22rem,calc(100vw-2rem))]"
    >
      <audio
        ref={audioRef}
        src={song}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/90 p-3 text-left shadow-xl backdrop-blur-xl">
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={isPlaying ? "หยุดเพลง" : "เล่นเพลง"}
          title={isPlaying ? "หยุดเพลง" : "เล่นเพลง"}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-rose-500 text-white shadow-md transition-colors hover:bg-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
        >
          <span aria-hidden="true" className="text-lg leading-none">
            {isPlaying ? "Ⅱ" : "▶"}
          </span>
        </button>

        <div className="min-w-0">
          <p className="text-xs font-medium text-rose-600">
            {needsInteraction
              ? "แตะหน้าเว็บเพื่อเริ่มเพลง"
              : isPlaying
                ? "กำลังเล่น"
                : "เพลงประกอบ"}
          </p>
          <p className="truncate text-sm font-semibold text-gray-800">
            Oasis - Atom Chanakan feat. D Gerrard
          </p>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;