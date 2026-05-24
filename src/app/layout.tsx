import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'NIMORI — Santuario Emocional',
  description: 'Una experiencia sensorial viva. Tu compañero digital emocional.',
  keywords: ['emocional', 'bienestar', 'meditación', 'santuario digital', 'nimori'],
  themeColor: '#05030f',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="bg-nimori-void antialiased">
        {children}
      </body>
    </html>
  )
}
