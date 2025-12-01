"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import localFont from "next/font/local";
const MSFont = localFont({ src: "../../../public/fonts/ms-sans-serif.ttf" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <div className={"flex flex-col w-dvw h-dvh " + MSFont.className}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </div>
  );
}
