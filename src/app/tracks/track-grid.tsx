'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Play, Pause } from 'lucide-react'
import { SiSoundcloud, SiSpotify, SiYoutube } from '@icons-pack/react-simple-icons';
import Image from "next/image"
import Link from "next/link"
import type { Track } from "./types"
import { useAudioPlayer } from "../context/audio-player-context"
import { ShareButton } from "../components/share-button"
// import ShineBorder from "@/components/ui/shine-border";

export function TrackGrid({ tracks }: { tracks: Track[] }) {
    const { state, togglePlayPause } = useAudioPlayer()

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tracks.map((track) => {
                // const shareUrl = `${window.location.origin}/tracks/${track.id}`
                return (

                    <Card key={track.id} className="bg-black/50 border-white/10 backdrop-blur-sm overflow-hidden">
                        <CardContent className="p-0">
                            <div className="relative aspect-video group">
                                <Image
                                    src={track.coverArt}
                                    alt={`${track.title} cover art`}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="opacity-50 group-hover:opacity-100 transition-opacity">
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

                            <div className="p-4 space-y-4">
                                <div className="flex justify-between items-center gap-4">
                                    <Link href={`/tracks/${track.id}`} className="hover:opacity-80">
                                        <div>
                                            <h3 className="font-semibold text-lg">{track.title}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {new Date(track.releaseDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </Link>

                                    <div className="flex items-center gap-2 shrink-0">
                                        {/* <ShareButton
                                            url={shareUrl}
                                            title={`Listen to ${track.title} by Philip Solarz`}
                                            size="sm"
                                        /> */}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 hover:bg-white/10"
                                            asChild
                                        >
                                            <a
                                                href={track.soundCloud}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="Listen on SoundCloud"
                                            >
                                                <SiSoundcloud className="h-4 w-4" />
                                            </a>
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 hover:bg-white/10"
                                            asChild
                                        >
                                            <a
                                                href={track.youTube}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="Watch on YouTube"
                                            >
                                                {/* <Youtube className="h-4 w-4" /> */}
                                                <SiYoutube className="h-4 w-4" />
                                            </a>
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 hover:bg-white/10"
                                            asChild
                                        >
                                            <a
                                                href={track.spotify}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="Listen on Spotify"
                                            >
                                                <SiSpotify className="h-4 w-4" />
                                            </a>
                                        </Button>
                                    </div>
                                </div>

                                <p className="text-sm text-muted-foreground">
                                    {track.description}
                                </p>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full bg-white/5 border-white/10 hover:bg-white/10"
                                    asChild
                                >
                                    <a href={track.downloadUrl} download>
                                        <Download className="h-4 w-4 mr-2" />
                                        Download
                                    </a>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                )
            })}
        </div>
    )
}

