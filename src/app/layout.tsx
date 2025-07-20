import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "PDF İşlemleri - PDF Birleştirme, Ayırma, Sıkıştırma ve Daha Fazlası",
    template: "%s | PDF İşlemleri"
  },
  description: "PDF dosyalarınızı ücretsiz olarak birleştirin, ayırın, sıkıştırın, şifreleyin ve dönüştürün. PDF'den Word, Excel, JPG'ye ve daha fazlası. OCR teknolojisi ile metin tanıma.",
  keywords: [
    "PDF birleştirme",
    "PDF ayırma",
    "PDF sıkıştırma",
    "PDF dönüştürme",
    "PDF şifreleme",
    "PDF imzalama",
    "OCR",
    "PDF'den Word",
    "Word'den PDF",
    "PDF'den Excel",
    "PDF form doldurma",
    "ücretsiz PDF işlemleri"
  ],
  authors: [{ name: "PDF İşlemleri" }],
  creator: "PDF İşlemleri",
  publisher: "PDF İşlemleri",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://pdfislemleri.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "PDF İşlemleri - Ücretsiz PDF Araçları",
    description: "PDF dosyalarınızı ücretsiz olarak birleştirin, ayırın, sıkıştırın ve dönüştürün. Profesyonel PDF işlemleri için güvenilir platform.",
    url: 'https://pdfislemleri.com',
    siteName: 'PDF İşlemleri',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PDF İşlemleri - Ücretsiz PDF Araçları',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "PDF İşlemleri - Ücretsiz PDF Araçları",
    description: "PDF dosyalarınızı ücretsiz olarak birleştirin, ayırın, sıkıştırın ve dönüştürün.",
    images: ['/og-image.jpg'],
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="language" content="Turkish" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="PDF İşlemleri" />
        <meta name="copyright" content="PDF İşlemleri" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="referrer" content="no-referrer-when-downgrade" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  );
}
