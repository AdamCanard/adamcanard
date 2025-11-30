"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <div id="mobile" className={"h-full flex-col"}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </div>
  );
}
