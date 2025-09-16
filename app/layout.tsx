// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Bento Bliss — Bento cakes 10€",
  description:
    "Bento cakes légers, sans crème au beurre. Personnalisation en 60 secondes. Retrait Essonne (91). Livraison bientôt disponible.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-dvh bg-rose-50 text-stone-900 antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
