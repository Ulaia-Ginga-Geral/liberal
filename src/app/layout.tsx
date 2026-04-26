import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import AppContent from "@/components/AppContent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Partido Liberal - Sistema de Gestão Juvenil",
  description: "Sistema de gestão de membros da juventude do Partido Liberal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`${inter.variable} antialiased min-h-screen bg-gray-50`}
      >
        <AppContent>{children}</AppContent>
      </body>
    </html>
  );
}