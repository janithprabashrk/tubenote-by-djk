import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TubeNote-by-DJK",
  description: "AI-powered YouTube video to notes converter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Everything inside 'children' is your page.tsx content */}
        {children}
      </body>
    </html>
  );
}