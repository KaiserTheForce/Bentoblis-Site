import Image from "next/image";

const images = [
  "/media/Bento1.jpeg",
  "/media/Bento2.jpeg",
  "/media/Bento3.jpeg",
  "/media/Bento4.jpeg",
  "/media/new1.jpeg",
  "/media/new2.jpeg",
  "/media/new3.jpeg",
  "/media/new4.jpeg",
];

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Galerie</h1>
      <p className="mt-1 text-stone-600">Clique sur une photo pour l’ouvrir en grand.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {images.map((src) => (
          <a key={src} href={src} target="_blank" className="block overflow-hidden rounded-xl ring-1 ring-stone-200/60">
            <div className="relative aspect-[4/3]">
              <Image src={src} alt="Bento cake" fill className="object-cover transition-all hover:scale-105" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
