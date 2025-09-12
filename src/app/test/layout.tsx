"use client";

import WindowProvider from "./windowprovider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={"h-full flex-col"}>
      <WindowProvider>{children}</WindowProvider>
    </div>
  );
}
