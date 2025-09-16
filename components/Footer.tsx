// components/Footer.tsx
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-rose-100 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex items-center gap-3">
            <Image
              src="/media/logo.png"
              width={44}
              height={44}
              alt="Bento Bliss logo"
              className="rounded-full ring-1 ring-rose-200"
            />
            <div>
              <div className="text-base font-bold text-stone-900">Bento Bliss</div>
              <div className="text-xs text-stone-500">Essonne (91) — Sans crème au beurre · Fait maison</div>
            </div>
          </div>

          <div>
            <div className="mb-2 text-sm font-semibold text-stone-700">Contact</div>
            <ul className="space-y-1 text-sm text-stone-600">
              <li>
                📞 <a className="hover:underline" href="https://wa.me/33749075579" target="_blank">
                  07&nbsp;49&nbsp;07&nbsp;55&nbsp;79 (WhatsApp)
                </a>
              </li>
              <li>
                ✉️ <a className="hover:underline" href="mailto:bento.bliss91@gmail.com">
                  bento.bliss91@gmail.com
                </a>
              </li>
              <li>
                📷 <a className="hover:underline" href="https://instagram.com/_bentobliss_" target="_blank">
                  @_bentobliss_
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="mb-2 text-sm font-semibold text-stone-700">Liens utiles</div>
            <div className="flex flex-wrap gap-2 text-sm">
              <Link href="/commander" className="rounded-full bg-white px-3 py-1 ring-1 ring-rose-200 hover:bg-rose-50">
                Commander
              </Link>
              <Link href="/galerie" className="rounded-full bg-white px-3 py-1 ring-1 ring-rose-200 hover:bg-rose-50">
                Galerie
              </Link>
              <Link href="/faq" className="rounded-full bg-white px-3 py-1 ring-1 ring-rose-200 hover:bg-rose-50">
                FAQ
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-rose-100 pt-4 text-xs text-stone-500">
          <span>© {new Date().getFullYear()} Bento Bliss — Tous droits réservés.</span>
          <span className="opacity-80">
            Created by <b>Yassine Dahmane</b>
          </span>
        </div>
      </div>
    </footer>
  );
}
