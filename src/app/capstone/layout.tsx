"use client";

import CapstoneHeader from "./components/capstoneheader";

export default function CapstoneLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={"h-dvh w-dvw flex flex-col"}>
      <CapstoneHeader />
      {children}{" "}
    </div>
  );
}
