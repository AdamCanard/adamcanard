import ListBar from "./listbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ListBar />
      {children}
    </>
  );
}
