import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import '../globals.css'

const inter = Inter({ 
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
})

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Azure Solar - Energia słoneczna dla Twojego domu',
  description: 'Profesjonalne instalacje fotowoltaiczne z pełnym wsparciem. Bezpłatna wycena i doradztwo.',
  keywords: 'fotowoltaika, panele słoneczne, energia słoneczna, instalacje PV, Azure Solar',
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()

  return (
    <html lang={locale} className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
