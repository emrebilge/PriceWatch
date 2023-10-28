import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Deals',
  description: 'Browse the best deals from Amazon warehouse, and more.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-bg-primary dark:bg-bg-primary-dark h-full min-h-screen">
        <Navbar />
          {/* <header>
            <div className="mx-auto max-w-7xl  sm:px-6 lg:px-8 flex flex-col gap-1">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Browse</h1>
            </div>
          </header> */}
          <div className="mx-auto max-w-7xl py-6 px-1 sm:px-6 lg:px-8 h-full">
            {children}
          </div>
      </body>
    </html>
  )
}
