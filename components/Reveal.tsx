"use client";
import { useEffect, useRef } from "react";

export default function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && el.classList.add("opacity-100", "translate-y-0"),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref} className="opacity-0 translate-y-2 transition-all duration-700">{children}</div>;
}
