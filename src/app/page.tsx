'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ParticleBackground } from "./components/particle-background"

export default function LandingPage() {
  return (
    <main className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="space-y-6 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-600">
            Philip Solarz
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 font-light tracking-wide">
            Pulsing Beats, Techno Dreams
          </p>
          <div className="pt-8">
            <Link href="/tracks">
              <Button
                size="lg"
                className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20"
              >
                Explore Tracks
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

