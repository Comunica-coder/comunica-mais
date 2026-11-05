import type { Metadata } from "next";
import { Tinos, Arimo } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SoPublico from "@/components/SoPublico";

const tinos = Tinos({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-tinos" });
const arimo = Arimo({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-arimo" });

export const metadata: Metadata = {
  title: "Comunica + | Portal de notícias",
  description: "Informação com clareza.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${tinos.variable} ${arimo.variable}`}>
      <body className="bg-papel font-serif text-azul antialiased">
        <SoPublico><Header /></SoPublico>
        <main>{children}</main>
        <SoPublico><Footer /></SoPublico>
      </body>
    </html>
  );
}