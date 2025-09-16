"use client";

import { useEffect, useState } from "react";
import IntroVideo from "./IntroVideo";

export default function Splash() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // cache-buster léger pour éviter le "flicker" au rechargement
    const t = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(t);
  }, []);

  // Choix mobile / desktop via matchMedia
  const isMobile =
    typeof window !== "undefined" ? window.matchMedia("(max-width: 640px)").matches : false;

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#fdeae6]">
      <IntroVideo src={isMobile ? "/media/intro-mobile.mp4" : "/media/intro-desktop.mp4"} />
    </div>
  );
}
