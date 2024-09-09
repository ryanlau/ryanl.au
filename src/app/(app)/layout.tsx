import { ThemeProvider } from '@/components/theme-provider'
import { Schibsted_Grotesk, Playfair_Display } from 'next/font/google'

import './globals.css'

const schibsted_grotesk = Schibsted_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-schibsted-grotesk',
  adjustFontFallback: false,
})

const playfair_display = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={`${schibsted_grotesk.variable} ${playfair_display.variable}`}
      style={{ scrollbarGutter: 'stable' }}
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
