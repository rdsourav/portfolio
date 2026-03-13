import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "600", "700"] });

export const metadata: Metadata = {
  title: "Creative Developer Portfolio",
  description: "Scrollytelling technical portfolio showcasing creative development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased selection:bg-white/30`}>
        {children}
      </body>
    </html>
  );
}
