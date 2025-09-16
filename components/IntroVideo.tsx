// /components/IntroVideo.tsx
"use client";

import { useEffect, useRef } from "react";

/**
 * Vidéo de fond (desktop + mobile) lecture continue.
 * - autoPlay + muted + playsInline pour iOS
 * - relance play() à canplay, loadeddata, visibilitychange
 * - fallback sur 1er tap (touchstart / pointerdown) si besoin
 */
export default function IntroVideo() {
  const deskRef = useRef<HTMLVideoElement | null>(null);
  const mobRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const vids = [deskRef.current, mobRef.current].filter(
      (v): v is HTMLVideoElement => !!v
    );

    const cleanups: Array<() => void> = [];

    vids.forEach((v) => {
      v.muted = true;
      v.loop = true;
      v.playsInline = true; // iOS
      v.controls = false;

      const tryPlay = () => v.play().catch(() => { /* ignore */ });

      // Relances automatiques fiables
      const onCanPlay = () => tryPlay();
      const onLoaded = () => tryPlay();
      const onVis = () => { if (!document.hidden) tryPlay(); };
      const onUser = () => tryPlay();

      v.addEventListener("canplay", onCanPlay);
      v.addEventListener("loadeddata", onLoaded);
      document.addEventListener("visibilitychange", onVis);
      document.addEventListener("touchstart", onUser, { passive: true, once: true });
      document.addEventListener("pointerdown", onUser, { once: true });

      // Si déjà prêt
      if (v.readyState >= 2) tryPlay();
      // Timers de secours (certains Android/iOS)
      const t1 = setTimeout(tryPlay, 200);
      const t2 = setTimeout(tryPlay, 1000);

      cleanups.push(() => {
        v.removeEventListener("canplay", onCanPlay);
        v.removeEventListener("loadeddata", onLoaded);
        document.removeEventListener("visibilitychange", onVis);
        document.removeEventListener("touchstart", onUser);
        document.removeEventListener("pointerdown", onUser);
        clearTimeout(t1);
        clearTimeout(t2);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* voile pour la cohérence couleur */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-50/70 via-rose-50/60 to-rose-100/70" />
      {/* Desktop */}
      <video
        ref={deskRef}
        className="hidden h-full w-full object-cover blur-[10px] brightness-95 sm:block"
        src="/media/intro-desktop.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
      />
      {/* Mobile */}
      <video
        ref={mobRef}
        className="block h-full w-full object-cover blur-[10px] brightness-95 sm:hidden"
        src="/media/intro-mobile.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
      />
    </div>
  );
}
