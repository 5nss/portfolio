"use client";

import { useEffect, useRef } from "react";

/** A short muted clip that plays while its project card is hovered, then rewinds. */
export default function PreviewVideo({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    const card = video?.closest(".item");
    if (!video || !card) return;

    const play = () => void video.play().catch(() => {});
    const stop = () => {
      video.pause();
      video.currentTime = 0;
    };
    card.addEventListener("pointerenter", play);
    card.addEventListener("pointerleave", stop);
    return () => {
      card.removeEventListener("pointerenter", play);
      card.removeEventListener("pointerleave", stop);
    };
  }, []);

  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload={poster ? "none" : "metadata"} />;
}
