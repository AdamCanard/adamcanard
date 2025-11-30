import type { Metadata } from "next";
import "./globals.css";

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
  return <html lang="en">{children}</html>;
}
