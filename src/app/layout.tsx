import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/AuthContext";
import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { TimerProvider } from '@/context/TimerContext';

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adora AI - AI-Powered Business Intelligence Platform",
  description: "Adora AI is a platform that uses AI to help businesses make better decisions.",
  icons: {
    icon: [
      {
        url: '/images/logo/adora-ai-logo.png',
        sizes: 'any',
      },
    ],
  },
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
          <ThemeProvider>
            <SidebarProvider>
              <TimerProvider>
                {children}
              </TimerProvider>
            </SidebarProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
