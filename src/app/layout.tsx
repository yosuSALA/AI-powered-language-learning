import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "AI Language Learning",
    template: "%s | AI Language Learning",
  },
  description: "Aprende idiomas con flashcards, lectura bilingue y AI coaching",
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}>
        <div className="flex min-h-screen">
          <Navigation />
          <main className="flex-1 p-6 md:p-10 ml-0 md:ml-72">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
