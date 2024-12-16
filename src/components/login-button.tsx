import { LogIn } from 'lucide-react';
import { SignInButton } from '@clerk/nextjs';

export default function LoginButton() {
  return (
    <SignInButton mode="modal">
      <button className="flex items-center gap-2 px-2 sm:px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200 font-medium shadow-lg shadow-blue-500/20">
        <LogIn className="w-4 h-4 transition-transform" />
        <span className="hidden sm:inline-block">Sign In</span>
      </button>
    </SignInButton>
  );
}
