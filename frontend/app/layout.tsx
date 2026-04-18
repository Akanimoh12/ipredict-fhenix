import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "@/components/providers/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TxStatusToast } from "@/components/ui/TxStatusToast";
import { MoonBackground } from "@/components/ui/MoonBackground";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "iPredict | Privacy-First Prediction Markets",
  description: "Predict the future with fully encrypted stakes powered by Fhenix FHE",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="min-h-screen bg-vault-bg font-sans antialiased">
        <Providers>
          <MoonBackground />
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 pt-20">{children}</main>
            <Footer />
          </div>
          <TxStatusToast />
        </Providers>
      </body>
    </html>
  );
}
