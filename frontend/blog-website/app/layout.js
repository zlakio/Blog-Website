import localFont from "next/font/local";

const cabinetGrotesk = localFont({
  src: "../fonts/CabinetGrotesk-Bold.woff",
  variable: "--font-cabinet",
});
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