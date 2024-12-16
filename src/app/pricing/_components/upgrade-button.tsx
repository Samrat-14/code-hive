import Link from 'next/link';
import { Zap } from 'lucide-react';
import { currentUser } from '@clerk/nextjs/server';

export default async function UpgradeButton() {
  const CHECKOUT_BASE_URL = process.env.NEXT_PUBLIC_LEMON_SQUEEZY_CHECKOUT_URL!;

  const user = await currentUser();
  const userEmail = user?.emailAddresses[0].emailAddress;

  const checkoutUrl = userEmail
    ? `${CHECKOUT_BASE_URL}?checkout[email]=${encodeURIComponent(userEmail)}`
    : CHECKOUT_BASE_URL;

  return (
    <Link
      href={checkoutUrl}
      className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white 
        bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg 
        hover:from-blue-600 hover:to-blue-700 transition-all"
    >
      <Zap className="w-5 h-5" />
      Upgrade to Pro
    </Link>
  );
}
