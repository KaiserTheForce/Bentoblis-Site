// app/commander/success/page.tsx
import Link from "next/link";

export default function Success() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 text-center">
      <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl">
        ✅
      </div>
      <h1 className="mb-2 text-2xl font-semibold">Commande envoyée !</h1>
      <p className="text-stone-600">
        Merci 🙏 Vous allez recevoir un récapitulatif par email (si indiqué).  
        Nous revenons vers vous très vite pour confirmer l’horaire exact.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          className="rounded-xl border border-stone-300 px-4 py-2"
          href="/"
        >
          Retour à l’accueil
        </Link>
        <Link
          className="rounded-xl bg-rose-500 px-4 py-2 text-white"
          href="/galerie"
        >
          Voir la galerie
        </Link>
      </div>
    </main>
  );
}
