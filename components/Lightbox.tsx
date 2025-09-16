"use client";

import Image from "next/image";
import { useState } from "react";

export default function Lightbox({ images }: { images: string[] }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src) => (
          <button
            key={src}
            onClick={() => setActive(src)}
            className="group rounded-2xl overflow-hidden ring-1 ring-stone-100 bg-white"
          >
            <Image
              src={src}
              alt="Bento cake"
              width={1200}
              height={900}
              className="aspect-[4/3] object-cover group-hover:scale-[1.02] transition"
            />
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setActive(null)}
        >
          <Image
            src={active}
            alt="Bento cake"
            width={1400}
            height={1000}
            className="max-h-[80vh] w-auto rounded-xl shadow-2xl"
          />
        </div>
      )}
    </>
  );
}
