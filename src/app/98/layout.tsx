"use client";
import "../globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TaskbarContextWrapper from "./taskbarcontext";
import localFont from "next/font/local";
const MSFont = localFont({ src: "../../../public/fonts/ms-sans-serif.ttf" });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <div id="desktop" className={"h-full flex-col " + MSFont.className}>
      <TaskbarContextWrapper>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </TaskbarContextWrapper>
    </div>
  );
}
