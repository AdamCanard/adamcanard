import "../globals.css";
import localFont from "next/font/local";
import ErrorProvider from "./desktop/errorprovider";
// import DynamicBackground from "./components/dynamicbackground";

const MSFont = localFont({ src: "../../../public/fonts/ms-sans-serif.ttf" });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className={MSFont.className}>
      <ErrorProvider> {children}</ErrorProvider>
    </body>
  );
}
