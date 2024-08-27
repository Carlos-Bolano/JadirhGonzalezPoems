import type { Metadata } from "next";
import { Cagliostro, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "./Providers";
import { Toaster } from "@/components/ui/toaster";

const cagliostro = Cagliostro({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-cagliostro",
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
});

export const metadata: Metadata = {
  title: "Jadirh González Poems - A literary journey where every word matters.",
  description:
    "A dynamic blog exploring diverse topics close to my heart, particularly those related to the LGBTQIA+ community. Dive in to discover what sparks your curiosity and ignites your passion. Keep reading and enjoy!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cagliostro.variable} ${cormorantGaramond.variable} flex flex-col min-h-screen`}
      >
        <Providers>
          <Navbar />
          <main className="flex-grow pt-[68px]">{children}</main>
          <Toaster />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
