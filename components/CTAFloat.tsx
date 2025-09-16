"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CTAFloat() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 400);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  if (!show) return null;

  return (
    <div className="fixed bottom-6 inset-x-0 flex justify-center z-40">
      <Link
        href="/commander"
        className="px-6 py-3 rounded-full bg-rose-400 text-white font-semibold shadow-lg hover:opacity-90"
      >
        Commander maintenant
      </Link>
    </div>
  );
}
