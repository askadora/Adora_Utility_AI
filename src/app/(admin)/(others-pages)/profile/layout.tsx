import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | Adora AI - AI-Powered Business Intelligence Platform",
  description: "User profile page for Adora AI platform",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 