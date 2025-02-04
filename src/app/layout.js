'use client';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/partials/Sidebar';
import './globals.css';
import { usePathname } from 'next/navigation';
import Head from 'next/head';
import { Toaster } from '@/components/UI/toaster';

const inter = Inter({
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <head>
        <title>Spotify Portal</title>
        <link
          rel="icon"
          href="/spotify_logo.png"
        />
        <meta
          property="og:description"
          content="Spotify Portal - A Spotify Clone"
          key="description"
        />
      </head>
      <body className={`h-screen ${inter.className}`}>
        {pathname === '/login' ? (
          children
        ) : (
          <main className="flex w-full h-full">
            <Sidebar />
            <section className="flex-1 overflow-y-auto p-8">{children}</section>
          </main>
        )}
        <Toaster />
      </body>
    </html>
  );
}
