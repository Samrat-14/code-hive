import Link from 'next/link';
import { SignedOut } from '@clerk/nextjs';
import { Code2, Sparkles } from 'lucide-react';

import Logo from '@/components/logo';
import HeaderProfileBtn from '@/app/(root)/_components/header-profile-btn';

export default function NavigationHeader() {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative h-16 flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-8">
            <Logo />
            <SnippetsButton />
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <SignedOut>
              <ProButton />
            </SignedOut>

            <HeaderProfileBtn />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SnippetsButton() {
  return (
    <Link
      href="/snippets"
      className="relative group flex items-center gap-2 px-2 sm:px-4 py-2 rounded-lg text-gray-300 bg-gray-800/50 hover:bg-blue-500/10 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <Code2 className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform" />
      <span className="hidden sm:inline-block text-sm font-medium relative z-10 group-hover:text-white transition-colors">
        Snippets
      </span>
    </Link>
  );
}

export function ProButton() {
  return (
    <Link
      href="/pricing"
      className="flex items-center gap-2 px-2 sm:px-4 py-2 rounded-lg border border-amber-500/20 hover:border-amber-500/40 bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 transition-all duration-300"
    >
      <Sparkles className="w-4 h-4 text-amber-400 hover:text-amber-300" />
      <span className="hidden sm:inline-block text-sm font-medium text-amber-400/90 hover:text-amber-300">Pro</span>
    </Link>
  );
}
