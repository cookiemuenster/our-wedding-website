import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-display-cinzel",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "'Til Death Do Us Part",
  description: "Blaine and Leo's wedding site.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cinzel.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
