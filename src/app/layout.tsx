import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { AdminProvider } from '@/context/AdminContext';
import './globals.css';
import ClientLayout from '@/components/ClientLayout';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: {
    default: 'Raven Tutorials - Learn Smarter, Achieve More',
    template: '%s | Raven Tutorials',
  },
  description: 'Master competitive exams with India\'s top educators. Access 150+ expert courses, live classes, and personalized mentorship for JEE, NEET, and Board exams.',
  keywords: ['online courses', 'JEE preparation', 'NEET coaching', 'board exams', 'competitive exams', 'online learning', 'Raven Tutorials', 'coaching classes', 'Bihar coaching', 'Patna coaching'],
  authors: [{ name: 'Raven Tutorials' }],
  creator: 'Raven Tutorials',
  publisher: 'Raven Tutorials',
  metadataBase: new URL('https://raventutorials.com'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://raventutorials.com',
    siteName: 'Raven Tutorials',
    title: 'Raven Tutorials - Learn Smarter, Achieve More',
    description: 'Master competitive exams with India\'s top educators. Access 150+ expert courses, live classes, and personalized mentorship.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Raven Tutorials - Online Learning Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raven Tutorials - Learn Smarter, Achieve More',
    description: 'Master competitive exams with India\'s top educators.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <AdminProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1e293b',
                color: '#fff',
                borderRadius: '12px',
                padding: '16px',
              },
              success: {
                style: {
                  background: '#059669',
                },
                iconTheme: {
                  primary: '#fff',
                  secondary: '#059669',
                },
              },
              error: {
                style: {
                  background: '#dc2626',
                },
                iconTheme: {
                  primary: '#fff',
                  secondary: '#dc2626',
                },
              },
            }}
          />
        </AdminProvider>
      </body>
    </html>
  );
}
