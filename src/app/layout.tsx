import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'traffik — AI Websites & SEO. Intro Audit $159.',
  description: 'AI-driven websites & SEO engineered to rank & convert. Get a full website audit for $159 — delivered in 48 hours.',
  keywords: 'SEO, website audit, AI websites, digital marketing, New Zealand',
  authors: [{ name: 'traffik' }],
  creator: 'traffik',
  publisher: 'traffik',
  openGraph: {
    type: 'website',
    locale: 'en_NZ',
    url: 'https://traffik.nz',
    title: 'traffik — AI Websites & SEO',
    description: 'AI-driven websites & SEO engineered to rank & convert.',
    siteName: 'traffik',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'traffik — AI Websites & SEO',
    description: 'AI-driven websites & SEO engineered to rank & convert.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}