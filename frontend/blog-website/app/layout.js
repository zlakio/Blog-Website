import Navbar from "@/components/Navbar";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cabinetGrotesk = localFont({
  src: "../fonts/CabinetGrotesk-Bold.woff",
  variable: "--font-cabinet",
});

export const metadata = {
  title: "Zlakio | Blog",
  description: "A blog about my projects and learnings",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cabinetGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-neutral-950 text-neutral-100">
        <Navbar />
        {children}
      </body>
    </html>
  );
}