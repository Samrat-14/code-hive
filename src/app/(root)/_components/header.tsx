import { currentUser } from '@clerk/nextjs/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';
import { SignedIn } from '@clerk/nextjs';

import Logo from '@/components/logo';
import { ProButton, SnippetsButton } from '@/components/navigation-header';
import ThemeSelector from '@/app/(root)/_components/theme-selector';
import LanguageSelector from '@/app/(root)/_components/language-selector';
import RunButton from '@/app/(root)/_components/run-button';
import HeaderProfileBtn from '@/app/(root)/_components/header-profile-btn';

export default async function Header() {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const user = await currentUser();

  const convexUser = await convex.query(api.users.getUser, {
    userId: user?.id || '',
  });

  return (
    <div className="relative z-10">
      <div className="flex items-center justify-between bg-[#0a0a0f]/80 backdrop-blur-xl px-4 sm:px-6 py-4 mb-4 rounded-lg">
        <div className="flex items-center gap-4 sm:gap-8">
          <Logo />
          <SnippetsButton />
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeSelector />
            <LanguageSelector hasAccess={Boolean(convexUser?.isPro)} />
          </div>

          {!convexUser?.isPro && <ProButton />}

          <SignedIn>
            <RunButton />
          </SignedIn>

          <div className="pl-3 border-l border-gray-800 flex items-center justify-center">
            <HeaderProfileBtn />
          </div>
        </div>
      </div>
    </div>
  );
}
