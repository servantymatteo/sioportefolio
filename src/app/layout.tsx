import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Matteo Servanty | Portfolio BTS SIO SISR — Infrastructures & Cybersécurité",
  description:
    "Portfolio IT BTS SIO Option SISR (Solutions d'Infrastructure, Systèmes et Réseaux) : Accueil, BTS SIO, À Propos, Entreprise, Certifications, TCS (E4), Projets d'Infrastructures & Procédures, et Veilles technologiques.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
