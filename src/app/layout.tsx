import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './global.css';
import { Heart } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Star Wars Characters',
  description: 'Explore Star Wars characters and manage your favorites',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
              <img src="/star.jpeg" alt="Star Wars" className="h-8" />
              <nav className="flex items-center gap-4">
                <a href="/" className="text-white hover:text-blue-200">Home</a>
                <a href="/favorites" className="text-white hover:text-blue-200">
                  <Heart className="w-6 h-6" />
                </a>
              </nav>
            </div>
          </header>

          <main className="flex-grow">
            {children}
          </main>

          <footer className="bg-blue-600 p-4 mt-8">
            <div className="container mx-auto text-center text-white">
              © 2024 Star Wars App. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
