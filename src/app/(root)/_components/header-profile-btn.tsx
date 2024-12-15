'use client';

import { User } from 'lucide-react';
import { SignedOut, UserButton } from '@clerk/nextjs';

import LoginButton from '@/components/login-button';

export default function HeaderProfileBtn() {
  return (
    <>
      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Link label="Profile" labelIcon={<User className="size-4" />} href="/profile" />
        </UserButton.MenuItems>
      </UserButton>

      <SignedOut>
        <LoginButton />
      </SignedOut>
    </>
  );
}
