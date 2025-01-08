import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AudioPlayerProvider } from './context/audio-player-context'
import { WaveformPlayer } from './components/waveform-player'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Philip Solarz | Techno Artist',
  description: 'Experience the pulsing beats and techno dreams of Philip Solarz',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <AudioPlayerProvider>
          {children}
          <WaveformPlayer />
        </AudioPlayerProvider>
      </body>
    </html>
  )
}

