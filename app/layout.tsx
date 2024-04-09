import type { Metadata } from "next";
import { Inter, Nunito_Sans } from "next/font/google";
import "./globals.css";
import Header from "../components/navbar/Header";
import FilterModal from "../components/modals/FilterModal";

const inter = Inter({ subsets: ["latin"] });
const font = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reside",
  description: "Real estate website fitted for college students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} bg-neutral-800`}>
        <Header />
        <FilterModal />
        {children}
      </body>
    </html>
  );
}
