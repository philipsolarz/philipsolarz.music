'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Download, Music2, Youtube, Play, Pause } from 'lucide-react'
import { ShareButton } from "../../components/share-button"
import tracksData from '@/data/tracks.json'
import { notFound } from 'next/navigation'
import { useAudioPlayer } from "@/app/context/audio-player-context"
import { use } from 'react'
import { ParticleBackground } from "@/app/components/particle-background"
import { SiSoundcloud, SiSpotify, SiYoutube } from '@icons-pack/react-simple-icons'

export default function TrackPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const track = tracksData.tracks.find(t => t.id === parseInt(id))
    const { state, togglePlayPause } = useAudioPlayer()

    if (!track) {
        notFound()
    }

    const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL || ''}/tracks/${track.id}`

    return (
        <main className="relative min-h-screen w-full bg-black text-white p-4 md:p-8 pb-24">
            <ParticleBackground />

            <div className="relative z-10 max-w-7xl mx-auto space-y-8">
                <div className="flex items-center gap-4">
                    <Link href="/tracks">
                        <Button variant="ghost" size="icon" className="hover:bg-white/10">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-4xl font-bold tracking-tighter">Track Details</h1>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="relative aspect-square">
                            <Image
                                src={track.coverArt}
                                alt={`${track.title} cover art`}
                                fill
                                className="object-cover rounded-lg"
                                priority
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <div className="opacity-50 hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => togglePlayPause(track)}
                                        className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors transform hover:scale-105"
                                        aria-label={state.isPlaying && state.currentTrack?.id === track.id ? "Pause track" : "Play track"}
                                    >
                                        {state.isPlaying && state.currentTrack?.id === track.id ? (
                                            <Pause className="h-8 w-8" />
                                        ) : (
                                            <Play className="h-8 w-8" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold">{track.title}</h2>
                                <p className="text-muted-foreground">
                                    Released {new Date(track.releaseDate).toLocaleDateString()}
                                </p>
                            </div>
                            <ShareButton
                                url={shareUrl}
                                title={`Listen to ${track.title} by Philip Solarz`}
                            />
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">About this track</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {track.description}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Track Information</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">BPM</p>
                                    <p className="font-medium">{track.bpm}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Key</p>
                                    <p className="font-medium">{track.key}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Duration</p>
                                    <p className="font-medium">
                                        {Math.floor(track.duration / 60)}:
                                        {(track.duration % 60).toString().padStart(2, '0')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Listen & Download</h3>
                            <div className="flex flex-col gap-3">
                                <Button
                                    variant="outline"
                                    className="w-full justify-start bg-white/5 border-white/10 hover:bg-white/10"
                                    asChild
                                >
                                    <a href={track.soundCloud} target="_blank" rel="noopener noreferrer">
                                        <SiSoundcloud className="h-4 w-4 mr-2" />
                                        Listen on SoundCloud
                                    </a>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start bg-white/5 border-white/10 hover:bg-white/10"
                                    asChild
                                >
                                    <a href={track.youTube} target="_blank" rel="noopener noreferrer">
                                        <SiYoutube className="h-4 w-4 mr-2" />
                                        Watch on YouTube
                                    </a>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start bg-white/5 border-white/10 hover:bg-white/10"
                                    asChild
                                >
                                    <a href={track.spotify} target="_blank" rel="noopener noreferrer">
                                        <SiSpotify className="h-4 w-4 mr-2" />
                                        Listen on Spotify
                                    </a>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start bg-white/5 border-white/10 hover:bg-white/10"
                                    asChild
                                >
                                    <a href={track.downloadUrl} download>
                                        <Download className="h-4 w-4 mr-2" />
                                        Download Track
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

