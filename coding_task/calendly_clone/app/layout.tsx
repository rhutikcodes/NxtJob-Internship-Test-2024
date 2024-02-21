import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageSelector } from "@/components/LanguageSelector";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Calendly Clone",
  description:
    "Calendly is a scheduling app that makes it easy to book meetings with others. This is a clone of the app.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={inter.className}>
        <LanguageSelector />
        <NavBar />
        <main className="relative flex-grow flex-col min-h-screen">
          <div className="flex-grow flex-1">{children}</div>
        </main>
      </body>
    </html>
  );
}
