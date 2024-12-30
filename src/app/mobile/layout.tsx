"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TabBar from "./tabbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <div id="mobile" className={"h-full flex-col"}>
      <QueryClientProvider client={queryClient}>
        <TabBar />
        {children}
      </QueryClientProvider>
    </div>
  );
}
