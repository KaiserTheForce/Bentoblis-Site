const items = [
  {
    q: "Délai : quand faut-il commander ?",
    a: "Idéalement 24–48h à l’avance. Les commandes passées à moins de 24h ont un supplément de 10€.",
  },
  {
    q: "Livraison & retrait",
    a: "Retrait à Essonne (91). La livraison locale arrive bientôt. Offre livraison dès 20€ d’achat.",
  },
  {
    q: "Saveurs & options",
    a: "Génoise : nature, chocolat, citron, pistache. Toppings possibles : fraise, framboise, lemon curd, Kinder, mangue/fruit de la passion. Crèmes : Speculoos, chantilly mascarpone, Nutella, vanille.",
  },
  {
    q: "Personnalisation",
    a: "Couleurs, inscription, papillons, nœuds, paillettes… à la carte.",
  },
  {
    q: "Paiement & acompte",
    a: "Acompte 5€ par bento. Règlement du solde au retrait (ou à la livraison, bientôt).",
  },
  {
    q: "Retard",
    a: "Tout retard de plus de 30 min est facturé.",
  },
];

export default function FAQ() {
  return (
    <div className="divide-y divide-stone-200/70 rounded-2xl bg-white p-2 ring-1 ring-stone-200/70">
      {items.map((it) => (
        <details key={it.q} className="group p-4">
          <summary className="cursor-pointer list-none font-medium text-stone-900">
            {it.q}
          </summary>
          <p className="mt-2 text-stone-700">{it.a}</p>
        </details>
      ))}
    </div>
  );
}
