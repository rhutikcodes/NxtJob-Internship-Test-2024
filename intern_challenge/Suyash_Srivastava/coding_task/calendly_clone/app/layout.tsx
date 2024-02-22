import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageSelector } from "@/components/LanguageSelector";
import NavBar from "@/components/NavBar";
import React from "react";
import { LanguageSelectorWrapper, NavBarWrapper } from "@/components/ComponentWrapper";
import { ClerkProvider } from "@clerk/nextjs";

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

        <LanguageSelectorWrapper >
        <LanguageSelector />
        </LanguageSelectorWrapper>
        <NavBarWrapper>
        <NavBar />
        </NavBarWrapper>
        <main className="relative">
          <div className="relative -z-100">
            <ClerkProvider>
            {children}
            </ClerkProvider></div>
        </main>
      </body>
      </html>
  );
}
