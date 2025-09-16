// /components/Configurator.tsx
"use client";

import { useMemo, useState } from "react";
import QuantityStepper from "./QuantityStepper";
import { makeWhatsAppUrl, OrderPayload } from "@/lib/whatsapp";

const SHAPES = [
  { id: "rond", label: "Rond (10€)", price: 10 },
  { id: "coeur", label: "Cœur (12€)", price: 12 },
];
const GENOISES = ["Nature", "Chocolat", "Citron", "Pistache"];
const CREAMS = ["Speculoos", "Chantilly mascarpone", "Nutella", "Vanille"];
const TOPPINGS = ["Fraise", "Framboise", "Lemon curd", "Kinder", "Mangue / fruit de la passion"];

export default function Configurator() {
  const [shape, setShape] = useState(SHAPES[0]);
  const [genoise, setGenoise] = useState("Nature");
  const [cream, setCream] = useState("Speculoos");
  const [toppings, setToppings] = useState<string[]>([]);
  const [qty, setQty] = useState(1);
  const [reception] = useState<"retrait" | "livraison">("retrait");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("18:00");
  const [inscription, setInscription] = useState("");
  const [inscriptionColor, setInscriptionColor] = useState("");
  const [allergies, setAllergies] = useState("");

  const toggleTopping = (t: string) =>
    setToppings((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t].slice(0, 3)
    );

  const priceUnit = useMemo(() => shape.price, [shape]);
  const subtotal = priceUnit * qty;
  const rushFee = 0;
  const total = subtotal + rushFee;
  const payNow = Math.min(5 * qty, total); // acompte 5€/bento
  const payLater = total - payNow;

  const sendToWhatsapp = () => {
    const payload: OrderPayload = {
      shape: shape.label,
      genoise,
      cream,
      toppings,
      qty,
      reception,
      date,
      time,
      inscription,
      inscriptionColor,
      allergies,
      subtotal,
      rushFee,
      payNow,
      payLater,
    };
    window.open(makeWhatsAppUrl(payload), "_blank");
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_420px]">
      <div className="space-y-6">
        <section className="rounded-2xl border border-stone-200 bg-white/80 p-4 shadow-sm">
          <h3 className="mb-3 text-sm font-semibold text-stone-700">Forme</h3>
          <div className="flex flex-wrap gap-3">
            {SHAPES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setShape(s)}
                className={[
                  "rounded-full px-4 py-2 text-sm",
                  shape.id === s.id
                    ? "bg-rose-500 text-white shadow-sm"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200",
                ].join(" ")}
              >
                {s.label}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white/80 p-4 shadow-sm">
          <h3 className="mb-3 text-sm font-semibold text-stone-700">1) Goûts</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-stone-600">Génoise</label>
              <select
                value={genoise}
                onChange={(e) => setGenoise(e.target.value)}
                className="h-11 w-full rounded-xl border border-stone-200 bg-white px-3 outline-none focus:ring-2 focus:ring-rose-300"
              >
                {GENOISES.map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm text-stone-600">Crème</label>
              <select
                value={cream}
                onChange={(e) => setCream(e.target.value)}
                className="h-11 w-full rounded-xl border border-stone-200 bg-white px-3 outline-none focus:ring-2 focus:ring-rose-300"
              >
                {CREAMS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <p className="mb-2 text-sm text-stone-600">Toppings (jusqu’à 3)</p>
            <div className="flex flex-wrap gap-2">
              {TOPPINGS.map((t) => {
                const active = toppings.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleTopping(t)}
                    className={[
                      "rounded-full border px-3 py-1 text-sm",
                      active
                        ? "border-rose-400 bg-rose-50 text-rose-700"
                        : "border-stone-300 bg-white text-stone-700 hover:bg-stone-50",
                    ].join(" ")}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white/80 p-4 shadow-sm">
          <h3 className="mb-3 text-sm font-semibold text-stone-700">Quantité</h3>
          <QuantityStepper value={qty} onChange={setQty} min={1} max={4} />
          <p className="mt-2 text-xs text-stone-500">De 1 à 4 par commande.</p>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white/80 p-4 shadow-sm">
          <h3 className="mb-3 text-sm font-semibold text-stone-700">Réception</h3>
          <div className="flex gap-3">
            <button
              type="button"
              className="rounded-full bg-rose-500 px-4 py-2 text-sm text-white shadow-sm"
              disabled
            >
              Retrait (Essonne 91)
            </button>
            <button
              type="button"
              className="cursor-not-allowed rounded-full bg-stone-100 px-4 py-2 text-sm text-stone-400"
              title="La livraison arrive très bientôt 🥳"
              disabled
            >
              Livraison (bientôt)
            </button>
          </div>
          <p className="mt-2 text-xs text-stone-500">
            La livraison sera disponible très bientôt. Merci pour votre patience ✨
          </p>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white/80 p-4 shadow-sm">
          <h3 className="mb-3 text-sm font-semibold text-stone-700">Date & heure</h3>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-11 rounded-xl border border-stone-200 bg-white px-3 outline-none focus:ring-2 focus:ring-rose-300"
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="h-11 rounded-xl border border-stone-200 bg-white px-3 outline-none focus:ring-2 focus:ring-rose-300"
            />
          </div>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white/80 p-4 shadow-sm">
          <h3 className="mb-3 text-sm font-semibold text-stone-700">Personnalisation</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              value={inscription}
              onChange={(e) => setInscription(e.target.value)}
              placeholder='ex : "Happy Birthday"'
              className="h-11 w-full rounded-xl border border-stone-200 bg-white px-3 outline-none focus:ring-2 focus:ring-rose-300"
            />
            <input
              value={inscriptionColor}
              onChange={(e) => setInscriptionColor(e.target.value)}
              placeholder="ex : Rouge fraise"
              className="h-11 w-full rounded-xl border border-stone-200 bg-white px-3 outline-none focus:ring-2 focus:ring-rose-300"
            />
          </div>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white/80 p-4 shadow-sm">
          <h3 className="mb-3 text-sm font-semibold text-stone-700">Allergies / précisions</h3>
          <textarea
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            rows={3}
            placeholder="ex : sans noisette, peu sucré, etc."
            className="w-full rounded-xl border border-stone-200 bg-white p-3 outline-none focus:ring-2 focus:ring-rose-300"
          />
        </section>
      </div>

      <aside className="h-fit rounded-2xl border border-stone-200 bg-white/90 p-4 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold text-stone-700">Récapitulatif</h3>

        <dl className="space-y-1 text-sm">
          <div className="flex justify-between"><dt className="text-stone-500">Forme</dt><dd className="font-medium">{shape.label}</dd></div>
          <div className="flex justify-between"><dt className="text-stone-500">Génoise</dt><dd className="font-medium">{genoise}</dd></div>
          <div className="flex justify-between"><dt className="text-stone-500">Crème</dt><dd className="font-medium">{cream}</dd></div>
          <div className="flex justify-between"><dt className="text-stone-500">Toppings</dt><dd className="font-medium">{toppings.length ? toppings.join(", ") : "—"}</dd></div>
          <div className="flex justify-between"><dt className="text-stone-500">Quantité</dt><dd className="font-medium">{qty}</dd></div>
          <div className="flex justify-between"><dt className="text-stone-500">Réception</dt><dd className="font-medium">{reception}</dd></div>
        </dl>

        <hr className="my-4 border-stone-200" />

        <div className="space-y-1 text-sm">
          <div className="flex justify-between"><span className="text-stone-500">Sous-total</span><span className="font-semibold">{subtotal.toFixed(2)} €</span></div>
          <div className="flex justify-between"><span className="text-stone-500">Urgence &lt; 24h</span><span className="font-semibold">{rushFee.toFixed(2)} €</span></div>

          <div className="mt-2 flex items-center gap-2">
            <button type="button" className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700" disabled title="Acompte 5€ / bento — déjà inclus">
              Acompte (5€ / bento)
            </button>
            <button type="button" className="cursor-not-allowed rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-400" disabled>
              Total
            </button>
          </div>

          <div className="mt-2 flex justify-between text-base">
            <span className="font-semibold">Total</span>
            <span className="font-extrabold">{total.toFixed(2)} €</span>
          </div>

          <div className="mt-2 space-y-1 text-xs text-stone-600">
            <div className="flex justify-between"><span>À régler maintenant</span><span className="font-semibold">{payNow.toFixed(2)} €</span></div>
            <div className="flex justify-between"><span>À la remise</span><span className="font-semibold">{payLater.toFixed(2)} €</span></div>
          </div>
        </div>

        <button
          type="button"
          onClick={sendToWhatsapp}
          className="mt-4 w-full rounded-2xl bg-rose-500 py-3 font-semibold text-white shadow-sm transition hover:bg-rose-600 active:scale-[0.99]"
        >
          Commander maintenant
        </button>
      </aside>
    </div>
  );
}
