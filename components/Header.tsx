// components/Header.tsx
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-rose-100">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Logo + nom bien visible */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/media/logo.png"
            alt="Bento Bliss"
            width={36}
            height={36}
            className="rounded-full ring-1 ring-rose-200"
            priority
          />
          <div className="leading-tight">
            <span className="block text-lg font-extrabold tracking-tight text-stone-900">
              Bento Bliss
            </span>
            <span className="block -mt-1 text-[11px] text-stone-500">Essonne (91)</span>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/galerie" className="text-stone-700 hover:text-stone-900">
            Galerie
          </Link>
          <Link href="/faq" className="text-stone-700 hover:text-stone-900">
            FAQ
          </Link>
          <Link
            href="/commander"
            className="rounded-xl bg-rose-500 px-3 py-2 font-medium text-white shadow hover:bg-rose-600"
          >
            Commander
          </Link>
        </nav>
      </div>
    </header>
  );
}
  