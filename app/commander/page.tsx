// app/commander/page.tsx
"use client";

import { useMemo, useState } from "react";

const SHAPES = [
  { id: "rond", label: "Rond (10€)", price: 10 },
  { id: "coeur", label: "Cœur (12€)", price: 12 },
] as const;

const GENOISES = ["Nature", "Chocolat", "Citron", "Pistache"] as const;
const CREAMS = ["Speculoos", "Chocolat", "Vanille", "Nutella"] as const;
const TOPPINGS = ["Fraise", "Framboise", "Lemon curd", "Kinder", "Mangue / fruit de la passion"] as const;

type ShapeId = (typeof SHAPES)[number]["id"];

// ⚠️ Numéro WhatsApp OFFICIEL (format international sans +) : 07 49 07 55 79 -> 33749075579
const WA_NUMBER = "33749075579";

function Chip({
  active, disabled, onClick, children,
}: { active?: boolean; disabled?: boolean; onClick?: () => void; children: React.ReactNode; }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={[
        "rounded-full px-3 py-1 text-sm transition",
        active ? "bg-rose-500 text-white shadow"
               : "bg-white text-stone-700 ring-1 ring-rose-100 hover:bg-rose-50",
        disabled ? "opacity-50 cursor-not-allowed" : "",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-white/90 p-4 shadow ring-1 ring-rose-100 backdrop-blur">
      <h2 className="mb-3 text-lg font-semibold text-stone-800">{title}</h2>
      {children}
    </section>
  );
}

export default function Page() {
  const [shape, setShape] = useState<ShapeId>("rond");
  const [genoise, setGenoise] = useState<(typeof GENOISES)[number]>("Nature");
  const [cream, setCream] = useState<(typeof CREAMS)[number]>("Speculoos");
  const [toppings, setToppings] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  const [inscription, setInscription] = useState("");
  const [inscriptionColor, setInscriptionColor] = useState("Rouge fraise");
  const [allergies, setAllergies] = useState("");

  const [dateStr, setDateStr] = useState("");
  const [timeStr, setTimeStr] = useState("18:00");

  const [payMode, setPayMode] = useState<"acompte" | "total">("acompte");

  const unitPrice = useMemo(() => SHAPES.find((s) => s.id === shape)!.price, [shape]);
  const subTotal = unitPrice * quantity;
  const total = subTotal;
  const dueNow = payMode === "acompte" ? Math.min(5 * quantity, total) : total;
  const dueLater = Math.max(total - dueNow, 0);

  function toggleTopping(t: string) {
    setToppings((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : prev.length >= 3 ? prev : [...prev, t]);
  }

  function openWhatsApp() {
    const shapeLabel = SHAPES.find((s) => s.id === shape)!.label;

    const msg =
`🧁 *Nouvelle commande — Bento Bliss*

👤 *Client*
• (à compléter dans WhatsApp)

📦 *Détails*
• Forme : ${shapeLabel}
• Génoise : ${genoise}
• Crème : ${cream}
• Toppings : ${toppings.length ? toppings.join(", ") : "—"}
• Quantité : ${quantity}
• Date/Heure : ${dateStr || "—"} ${timeStr || ""}

🎨 *Personnalisation*
• Inscription : ${inscription || "—"}
• Couleur inscription : ${inscriptionColor}

⚠️ *Allergies / précisions*
${allergies || "—"}

💶 *Prix*
• Sous-total : ${subTotal.toFixed(2)} €
• Total : ${total.toFixed(2)} €
• À régler maintenant : ${dueNow.toFixed(2)} € (${payMode === "acompte" ? "Acompte 5€/bento" : "Total"})
• À la remise : ${dueLater.toFixed(2)} €

Merci 🙏`;

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  }

  return (
    <main className="relative mx-auto max-w-6xl px-4 py-10">
      <div className="mx-auto mb-6 max-w-6xl text-center text-xs">
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-stone-600 shadow ring-1 ring-rose-100">
          <span className="font-semibold text-stone-700">Info :</span> Livraison arrive bientôt. Pour l’instant : retrait à Essonne (91) ✨
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_360px]">
        {/* Col gauche */}
        <div className="space-y-6">
          <Section title="Forme">
            <div className="flex flex-wrap gap-2">
              {SHAPES.map((s) => (
                <Chip key={s.id} active={shape === s.id} onClick={() => setShape(s.id)}>
                  {s.label}
                </Chip>
              ))}
            </div>
          </Section>

          <Section title="1) Goûts">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-1">
                <label className="text-sm text-stone-600">Génoise</label>
                <select
                  value={genoise}
                  onChange={(e) => setGenoise(e.target.value as any)}
                  className="rounded-xl border border-rose-100 bg-white px-3 py-2 text-stone-700 outline-none ring-rose-200 focus:ring"
                >
                  {GENOISES.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div className="grid gap-1">
                <label className="text-sm text-stone-600">Crème</label>
                <select
                  value={cream}
                  onChange={(e) => setCream(e.target.value as any)}
                  className="rounded-xl border border-rose-100 bg-white px-3 py-2 text-stone-700 outline-none ring-rose-200 focus:ring"
                >
                  {CREAMS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-3 grid gap-2">
              <div className="text-sm text-stone-600">Toppings (jusqu’à 3)</div>
              <div className="flex flex-wrap gap-2">
                {TOPPINGS.map((t) => (
                  <Chip key={t} active={toppings.includes(t)} onClick={() => toggleTopping(t)}>
                    {t}
                  </Chip>
                ))}
              </div>
            </div>
          </Section>

          <Section title="Quantité">
            <div className="grid max-w-xs gap-1">
              <input
                type="number"
                min={1}
                max={4}
                step={1}
                value={quantity}
                onChange={(e) => setQuantity(Math.min(4, Math.max(1, Number(e.target.value) || 1)))}
                className="rounded-xl border border-rose-100 bg-white px-3 py-2 text-stone-700 outline-none ring-rose-200 focus:ring"
              />
              <p className="text-xs text-stone-500">De 1 à 4 par commande.</p>
            </div>
          </Section>

          <Section title="Réception">
            <div className="flex flex-wrap gap-2">
              <Chip active>Retrait (Essonne 91)</Chip>
              <Chip disabled>Livraison (bientôt)</Chip>
            </div>
            <p className="mt-2 text-xs text-stone-500">
              La livraison sera activée bientôt (gratuite dès 20€). Pour l’instant, retrait uniquement.
            </p>
          </Section>

          <Section title="Date & heure">
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="date"
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value)}
                className="rounded-xl border border-rose-100 bg-white px-3 py-2 text-stone-700 outline-none ring-rose-200 focus:ring"
              />
              <input
                type="time"
                value={timeStr}
                onChange={(e) => setTimeStr(e.target.value)}
                className="rounded-xl border border-rose-100 bg-white px-3 py-2 text-stone-700 outline-none ring-rose-200 focus:ring"
              />
            </div>
          </Section>

          <Section title="Personnalisation">
            <div className="grid gap-2">
              <input
                value={inscription}
                onChange={(e) => setInscription(e.target.value)}
                placeholder='Inscription (ex : "Happy Birthday")'
                className="rounded-xl border border-rose-100 bg-white px-3 py-2 text-stone-700 outline-none ring-rose-200 focus:ring"
              />
              <div className="text-sm text-stone-600">Couleur de l’inscription</div>
              <div className="flex flex-wrap gap-2">
                {["Nature (blanc)", "Chocolat", "Citron", "Pistache", "Rose doux", "Rouge fraise", "Bleu ciel"].map((c) => (
                  <Chip key={c} active={inscriptionColor === c} onClick={() => setInscriptionColor(c)}>
                    {c}
                  </Chip>
                ))}
              </div>
            </div>
          </Section>

          <Section title="Allergies / précisions (facultatif)">
            <textarea
              rows={3}
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              placeholder="ex : sans noisette, peu sucré, etc."
              className="w-full rounded-xl border border-rose-100 bg-white px-3 py-2 text-stone-700 outline-none ring-rose-200 focus:ring"
            />
          </Section>
        </div>

        {/* Col droite (récap + paiement) */}
        <div className="space-y-4">
          <Section title="Récapitulatif">
            <dl className="grid grid-cols-2 gap-y-1 text-sm">
              <dt className="text-stone-500">Forme</dt>
              <dd className="text-right text-stone-700">{SHAPES.find((s) => s.id === shape)!.label}</dd>

              <dt className="text-stone-500">Génoise</dt>
              <dd className="text-right text-stone-700">{genoise}</dd>

              <dt className="text-stone-500">Crème</dt>
              <dd className="text-right text-stone-700">{cream}</dd>

              <dt className="text-stone-500">Toppings</dt>
              <dd className="text-right text-stone-700">{toppings.length ? toppings.join(", ") : "—"}</dd>

              <dt className="text-stone-500">Quantité</dt>
              <dd className="text-right text-stone-700">{quantity}</dd>

              <dt className="text-stone-500">Date / Heure</dt>
              <dd className="text-right text-stone-700">{dateStr ? `${dateStr} — ${timeStr}` : "—"}</dd>
            </dl>

            <div className="my-4 h-px bg-rose-100" />

            <div className="grid gap-1 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-500">Sous-total</span>
                <span className="font-medium text-stone-800">{subTotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Total</span>
                <span className="font-semibold text-rose-700">{total.toFixed(2)} €</span>
              </div>
            </div>

            <div className="my-4 h-px bg-rose-100" />

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPayMode("acompte")}
                className={`rounded-full px-3 py-1 text-sm ${
                  payMode === "acompte" ? "bg-rose-500 text-white" : "bg-white text-stone-700 ring-1 ring-rose-100"
                }`}
              >
                Acompte (5€ / bento)
              </button>
              <button
                onClick={() => setPayMode("total")}
                className={`rounded-full px-3 py-1 text-sm ${
                  payMode === "total" ? "bg-rose-500 text-white" : "bg-white text-stone-700 ring-1 ring-rose-100"
                }`}
              >
                Total
              </button>
            </div>

            <div className="mt-4 grid gap-1 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-500">À régler maintenant</span>
                <span className="text-stone-800">{dueNow.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">À la remise</span>
                <span className="text-stone-800">{dueLater.toFixed(2)} €</span>
              </div>
            </div>

            <button
              onClick={openWhatsApp}
              className="mt-6 w-full rounded-xl bg-emerald-500 px-4 py-3 font-medium text-white shadow hover:bg-emerald-600 active:translate-y-px"
            >
              Confirmer sur WhatsApp — {dueNow.toFixed(2)} €
            </button>

            <p className="mt-2 text-center text-xs text-stone-500">
              Un message récapitulatif s’ouvre dans WhatsApp (modif possible avant envoi).
            </p>
          </Section>

          <Section title="Infos">
            <ul className="list-disc pl-5 text-sm text-stone-600">
              <li>Commande 24–48h à l’avance</li>
              <li>Acompte 5€ / bento</li>
              <li>Retard +30 min facturé</li>
            </ul>
          </Section>
        </div>
      </div>
    </main>
  );
}
