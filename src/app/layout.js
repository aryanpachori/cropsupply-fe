import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['400', '500'] })

export const metadata = {
  title: 'CropSupply Harvest Intelligence',
  description: 'Live harvest prediction and supply intelligence for East Africa',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0F6E56" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} bg-[#F5F4F0] min-h-screen antialiased text-gray-900`}>
        {children}
      </body>
    </html>
  )
}
