import './globals.css'

import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'

export const metadata = {
  title: 'SWBC Announcement Screens',
  description: 'Church information displays',
}

export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          ' bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <main className=" bg-background flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  )
}
