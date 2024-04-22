import type { Metadata } from "next";
import { Inter, Nunito_Sans } from "next/font/google";
import "./globals.css";
import Header from "../components/navbar/Header";
import FilterModal from "../components/modals/FilterModal";
import Footer from "@/components/Footer";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import ErrorModal from "@/components/modals/ErrorModal";

import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import PasswordResetModal from "@/components/modals/PasswordResetModal";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });
const font = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reside",
  description: "Real estate website fitted for college students",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={`${font.className} bg-neutral-800 overflow-x-hidden`}>
          <div className="absolute top-0 z-[-2] h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(23,144,209,0.3),rgba(255,255,255,0))]">
            <Header />
            <FilterModal />
            <LoginModal />
            <RegisterModal />
            <ErrorModal />
            <PasswordResetModal />
            {children}
            <Footer />
            <Analytics /> {/* Measure website analytics such as page visits */}
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
