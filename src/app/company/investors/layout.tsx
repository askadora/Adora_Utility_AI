import { Metadata } from 'next';
import InvestorPasswordProtection from '@/components/auth/InvestorPasswordProtection';

export const metadata: Metadata = {
  title: "Investor Data Room | Adora AI",
  description: "Access Adora AI's comprehensive data room for investors, including pitch deck, financials, legal documents, and market analysis.",
};

export default function InvestorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <InvestorPasswordProtection>
      {children}
    </InvestorPasswordProtection>
  );
} 