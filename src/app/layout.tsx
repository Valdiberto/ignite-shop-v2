import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import { CartContextProvider } from '@/context/cart-context'
import { ToastProvider } from '@/context/toast-provider'

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400', '700'], // ajuste os pesos conforme necessário
})

export const metadata: Metadata = {
  title: {
    template: '%s | Ignite Shop',
    default: 'Ignite Shop',
  },
  icons: {
    icon: '/assets/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <body className={`antialiased`}>
        <ToastProvider>
          <CartContextProvider>
            <Header />
            <main className="font-roboto min-h-screen">{children}</main>
          </CartContextProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
