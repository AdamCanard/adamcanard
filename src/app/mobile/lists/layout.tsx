import ListBar from "./listbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div id="mobile" className={"h-full flex-col"}>
      <ListBar />
      {children}
    </div>
  );
}
