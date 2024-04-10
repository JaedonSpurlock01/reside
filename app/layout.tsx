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
      <body className={`${font.className} bg-neutral-800 overflow-x-hidden`}>
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-800 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(102,9,24,0.3),rgba(255,255,255,0))]">
          <Header />
          <FilterModal />
          {children}
        </div>
      </body>
    </html>
  );
}
