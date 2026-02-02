import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Container from "@/components/global/Container";
import Header from "@/components/header/header";
import Providers from "./providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MCommerce",
  description: "An e-commerce platform for all your shopping needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={inter.className}
      >
        <Providers>
          <Header />
          <main className="min-h-screen bg-background text-foreground mb-5 pt-20">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
