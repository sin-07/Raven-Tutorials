import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { AdminProvider } from '@/context/AdminContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RAVEN Tutorials - Empowering Education',
  description: 'RAVEN Tutorials provides quality education for students from Class 1 to Class 12 with experienced teachers and comprehensive study materials.',
  keywords: 'tutoring, education, coaching, online classes, study materials, RAVEN Tutorials',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AdminProvider>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                style: {
                  background: '#10B981',
                },
              },
              error: {
                style: {
                  background: '#EF4444',
                },
              },
            }}
          />
        </AdminProvider>
      </body>
    </html>
  );
}
