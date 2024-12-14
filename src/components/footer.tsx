import Link from 'next/link';
import { Blocks } from 'lucide-react';

const footer = [
  { label: 'Support', path: '/support' },
  { label: 'Privacy', path: '/privacy' },
  { label: 'Terms', path: '/terms' },
];

export default function Footer() {
  return (
    <footer className="relative border-4 border-gray-800/50 mt-auto">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gray-900 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Blocks className="size-5" />
            <span>Built for developers, by developers</span>
          </div>
          <div className="flex items-center gap-6">
            {footer.map((item) => (
              <Link key={item.label} href={item.path} className="text-gray-400 hover:text-gray-300 transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
