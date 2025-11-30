"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TaskbarContextWrapper from "./taskbarcontext";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <div id="desktop" className={"h-full flex-col"}>
      <TaskbarContextWrapper>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </TaskbarContextWrapper>
    </div>
  );
}
