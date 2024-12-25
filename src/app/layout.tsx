import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './global.css';

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
              <nav className="flex items-center gap-4">
              </nav>
            </div>
          </header>

          <main className="flex-grow">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
