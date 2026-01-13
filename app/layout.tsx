import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css"; // This imports your Tailwind styles

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TubeNote-by-DJK",
  description: "AI-powered YouTube Study Companion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}