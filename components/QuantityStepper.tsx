// /components/QuantityStepper.tsx
"use client";
import { useId } from "react";

type Props = {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
};

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 4,
}: Props) {
  const id = useId();
  const clamp = (n: number) => Math.max(min, Math.min(max, n));
  const set = (n: number) => onChange(clamp(n));

  return (
    <div className="flex items-center">
      <button
        type="button"
        aria-label="Diminuer"
        onClick={() => set(value - 1)}
        className="mr-2 rounded-lg bg-rose-100 px-3 py-2 text-rose-700 hover:bg-rose-200 active:scale-95"
      >
        −
      </button>

      <input
        id={id}
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onChange={(e) => {
          const only = e.target.value.replace(/\D/g, "");
          if (only === "") set(min);
          else set(parseInt(only, 10));
        }}
        onBlur={() => set(value)}
        className="h-11 w-24 rounded-xl border border-stone-200 bg-white px-3 text-center text-lg font-medium outline-none focus:ring-2 focus:ring-rose-300"
      />

      <button
        type="button"
        aria-label="Augmenter"
        onClick={() => set(value + 1)}
        className="ml-2 rounded-lg bg-rose-100 px-3 py-2 text-rose-700 hover:bg-rose-200 active:scale-95"
      >
        +
      </button>
    </div>
  );
}
