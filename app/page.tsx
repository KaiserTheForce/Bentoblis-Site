// /app/page.tsx
import Image from "next/image";
import Link from "next/link";
import IntroVideo from "@/components/IntroVideo";

export default function Page() {
  return (
    <>
      {/* vidéo de fond */}
      <IntroVideo />

      <main className="mx-auto max-w-6xl px-4 py-10">
        {/* Hero */}
        <section className="grid items-center gap-8 sm:grid-cols-2">
          <div className="rounded-3xl border border-rose-100/70 bg-white/80 p-6 shadow-sm backdrop-blur">
            <div className="mb-2 text-xs text-stone-500">
              Bento Bliss · Essonne (91)
            </div>
            <h1 className="text-3xl font-extrabold leading-tight text-stone-800 sm:text-4xl">
              <span className="block">Bento cakes légers,</span>
              <span className="text-rose-600">sans crème au beurre.</span>
            </h1>
            <p className="mt-3 text-stone-600">
              Personnalise ton bento en 60 secondes. Retrait local. Livraison bientôt
              disponible.
            </p>

            {/* puces saveurs */}
            <div className="mt-4 flex flex-wrap gap-2">
              {["Nature", "Chocolat", "Citron", "Pistache"].map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-stone-200 bg-white px-3 py-1 text-sm text-stone-700"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-5 flex gap-3">
              <Link
                href="/commander"
                className="rounded-2xl bg-rose-500 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-rose-600"
              >
                Je commande
              </Link>
              <Link
                href="/galerie"
                className="rounded-2xl border border-stone-200 bg-white px-5 py-3 font-semibold text-stone-700 hover:bg-stone-50"
              >
                Voir la galerie
              </Link>
            </div>
          </div>

          {/* visuel droit */}
          <div className="rounded-3xl border border-rose-100/70 bg-white/70 p-2 shadow-sm backdrop-blur">
            <Image
              src="/media/new1.jpeg"
              alt="Bento Bliss"
              width={1280}
              height={960}
              className="h-[340px] w-full rounded-2xl object-cover"
              priority
            />
          </div>
        </section>

        {/* cartes sections rapides */}
        <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Personnalisation express",
              desc: "Inscription, couleur, déco : crée ton modèle en 60s.",
              img: "/media/new2.jpeg",
            },
            {
              title: "Ingrédients de qualité",
              desc: "Génoise légère, chantilly mascarpone, toppings au choix.",
              img: "/media/new3.jpeg",
            },
            {
              title: "Retrait local (91)",
              desc: "Livraison bientôt — offerte dès 20€.",
              img: "/media/new4.jpeg",
            },
            {
              title: "Sur-mesure & déco",
              desc: "Papillons, nœuds, paillettes… à la carte.",
              img: "/media/Bento4.jpeg",
            },
          ].map((c) => (
            <article
              key={c.title}
              className="overflow-hidden rounded-2xl border border-stone-200 bg-white/80 shadow-sm backdrop-blur"
            >
              <Image
                src={c.img}
                alt={c.title}
                width={800}
                height={600}
                className="h-44 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-stone-800">{c.title}</h3>
                <p className="mt-1 text-sm text-stone-600">{c.desc}</p>
              </div>
            </article>
          ))}
        </section>
      </main>

      {/* footer / crédits */}
      <footer className="border-t border-stone-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-stone-600">
            <div className="font-semibold text-stone-800">Bento Bliss</div>
            <div>Essonne (91) — Sans crème au beurre · Fait maison</div>
            <div className="mt-1 flex flex-wrap gap-3">
              <span>Instagram : <a className="underline" href="https://instagram.com/_bentobliss_">@_bentobliss_</a></span>
              <span>Email : <a className="underline" href="mailto:bento.bliss91@gmail.com">bento.bliss91@gmail.com</a></span>
              <span>WhatsApp : <a className="underline" href="https://wa.me/33749075579">07 49 07 55 79</a></span>
            </div>
          </div>

          <div className="text-xs text-stone-500">
            Created by{" "}
            <a
              className="font-medium underline"
              href="https://www.linkedin.com/in/yassinedahmane"
              target="_blank"
              rel="noreferrer"
            >
              Yassine Dahmane
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
