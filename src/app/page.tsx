import { SignedIn, SignedOut, SignOutButton, SignUpButton, UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div>
      <SignedOut>
        <SignUpButton />
      </SignedOut>

      <UserButton />

      <SignedIn>
        <SignOutButton />
      </SignedIn>
    </div>
  );
}
