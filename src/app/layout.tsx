import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/AuthContext";
import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Providers } from "./providers";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TailAdmin - Next.js Admin Dashboard Template",
  description: "Free Next.js Tailwind CSS Admin Dashboard Template",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <AuthProvider>
          <Providers>
            <ThemeProvider>
              <SidebarProvider>{children}</SidebarProvider>
            </ThemeProvider>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
