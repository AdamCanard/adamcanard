import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
// import DynamicBackground from "./components/dynamicbackground";

const MSFont = localFont({ src: "../../public/fonts/ms-sans-serif.ttf" });
export const metadata: Metadata = {
  title: "Beerfluencer Utopia",
  description:
    "Adam Cunard's Beerfluencer Website, Where All Your Beer Needs Are Met",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={MSFont.className}>
      <body className=" w-full">{children}</body>
    </html>
  );
}
