import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import ErrorProvider from "./desktop/errorprovider";

const FranklinGothic = localFont({
  variable: "--font-franklin-gothic",
  src: "../../public/fonts/FranklinGothic.ttf",
});
const Tahoma = localFont({
  variable: "--font-tahoma",
  src: "../../public/fonts/Tahoma.ttf",
});
const Verdana = localFont({
  variable: "--font-verdana",
  src: "../../public/fonts/Verdana.ttf",
});
const TrebuchetMS = localFont({
  variable: "--font-trebuchet",
  src: "../../public/fonts/Trebuc.ttf",
});

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
    <html
      lang="en"
      className={`${FranklinGothic.variable} ${Tahoma.variable} ${Verdana.variable} ${TrebuchetMS.variable}`}
    >
      <body className=" w-full">
        <ErrorProvider> {children}</ErrorProvider>
      </body>
    </html>
  );
}
