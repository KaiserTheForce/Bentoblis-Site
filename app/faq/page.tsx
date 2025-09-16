// app/faq/page.tsx
const items = [
  {
    q: "Délai : quand faut-il commander ?",
    a: "Idéalement 24–48h à l’avance. Les commandes passées à moins de 24h ont un supplément de 10€.",
  },
  {
    q: "Livraison & retrait",
    a: "Pour l’instant : retrait à Essonne (91). La livraison arrive très bientôt (5€ dans le 91, 8€ hors 91, offerte dès 20€).",
  },
  {
    q: "Saveurs & options",
    a: "Génoises : nature, chocolat, citron, pistache. Crèmes : spéculoos, chocolat, vanille, Nutella. Toppings : fraise, framboise, lemon curd, Kinder, mangue/fruit de la passion.",
  },
  {
    q: "Personnalisation",
    a: "Inscription, couleur dominante, déco (papillons, nœuds, paillettes). Indiquez les allergies et les précisions dans le formulaire.",
  },
  {
    q: "Paiement & acompte",
    a: "Acompte 5€ par bento au moment de la commande. Le reste est dû au retrait. Retard +30 min facturé.",
  },
];

export default function FAQPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 md:grid-cols-[1fr_280px]">
        {/* Contenu FAQ */}
        <div>
          <h1 className="mb-4 text-2xl font-bold">FAQ</h1>
          <div className="space-y-3">
            {items.map((it) => (
              <details key={it.q} className="group overflow-hidden rounded-2xl border border-rose-100 bg-white/90 shadow backdrop-blur">
                <summary className="cursor-pointer list-none p-4 font-medium hover:bg-rose-50/70">
                  <span className="mr-2">💬</span>{it.q}
                </summary>
                <div className="border-t border-rose-100 p-4 text-stone-700">{it.a}</div>
              </details>
            ))}
          </div>
        </div>

        {/* Panneau latéral “À quoi sert la FAQ ?” */}
        <aside className="h-fit rounded-2xl border border-rose-100 bg-white/90 p-4 shadow backdrop-blur">
          <div className="mb-2 text-sm font-semibold text-stone-700">À quoi sert cette FAQ ?</div>
          <p className="text-sm text-stone-600">
            Cette page répond aux questions les plus fréquentes : délais, retrait/livraison, goûts, personnalisation
            et paiement. Si tu ne trouves pas la réponse, écris-nous sur WhatsApp :
          </p>
          <a
            href="https://wa.me/33749075579"
            target="_blank"
            className="mt-3 inline-flex rounded-xl bg-emerald-500 px-3 py-2 text-sm font-medium text-white shadow hover:bg-emerald-600"
          >
            Discuter sur WhatsApp
          </a>

          <div className="mt-4 space-y-2 text-sm">
            <div className="font-semibold text-stone-700">Raccourcis</div>
            <ul className="list-disc pl-5 text-stone-600">
              <li>Commander : choix forme, goûts, inscription</li>
              <li>Retrait (Essonne 91), livraison bientôt</li>
              <li>Acompte 5€ / bento, reste à la remise</li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
