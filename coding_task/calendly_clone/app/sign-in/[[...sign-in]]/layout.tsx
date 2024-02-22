import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LanguageSelector } from "@/components/LanguageSelector";
import SimpleNavBar from "@/components/SimpleNavBar";
import React from "react";
import { LanguageSelectorWrapper, NavBarWrapper } from "@/components/ComponentWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Welcome to back (Sign in)",
  description:
    "This is the sign in page for the Calendly clone.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={inter.className}>

        <LanguageSelectorWrapper >
        <LanguageSelector />
        </LanguageSelectorWrapper>
        <NavBarWrapper>
        <SimpleNavBar />
        </NavBarWrapper>
        <main className="relative">
          <div className="relative -z-100">
            {children}
    </div>
        </main>
      </body>
      </html>
  );
}
