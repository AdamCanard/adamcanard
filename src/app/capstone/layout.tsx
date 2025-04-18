"use client";

import CapstoneHeader from "./components/capstoneheader";

export default function CapstoneLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div id="capstone" className={"h-full w-full bg-[#FEFEFE]"}>
      <CapstoneHeader />
      {children}
    </div>
  );
}
