import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import ErrorProvider from "./desktop/errorprovider";
// import DynamicBackground from "./components/dynamicbackground";

const MSFont = localFont({ src: "../../public/fonts/ms-sans-serif.ttf" });
export const metadata: Metadata = {
  title: "Adam Cunard Portfolio",
  description: "Reject Modernity. Embrace Tradition",
  icons: {
    icon: [
      {
        url: "/Windows/Windows.png",
        href: "/Windows/Windows.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={MSFont.className}>
      <body className=" w-full">
        <ErrorProvider> {children}</ErrorProvider>
      </body>
    </html>
  );
}
