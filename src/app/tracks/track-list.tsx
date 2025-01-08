'use client'

import { Button } from "@/components/ui/button"
import { Download, Music2, Youtube, Play, Pause } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import type { Track } from "./types"
import { useAudioPlayer } from "../context/audio-player-context"
import { ShareButton } from "../components/share-button"
import { SiSoundcloud, SiSpotify, SiYoutube } from "@icons-pack/react-simple-icons"
import ShineBorder from "../../components/ui/shine-border";

export function TrackList({ tracks }: { tracks: Track[] }) {
    const { state, togglePlayPause } = useAudioPlayer()

    return (
        <div className="space-y-2">
            {tracks.map((track) => {
                const shareUrl = `${window.location.origin}/tracks/${track.id}`
                return (
                    <div
                        key={track.id}
                        className="flex items-center gap-4 p-3 bg-black/50 border border-white/10 rounded-lg backdrop-blur-sm hover:bg-white/5 transition-colors overflow-x-auto min-w-[min-content]"
                    >

                        <button
                            onClick={() => togglePlayPause(track)}
                            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                            aria-label={state.isPlaying && state.currentTrack?.id === track.id ? "Pause track" : "Play track"}
                        >
                            {state.isPlaying && state.currentTrack?.id === track.id ? (
                                <Pause className="h-4 w-4" />
                            ) : (
                                <Play className="h-4 w-4" />
                            )}
                        </button>

                        <div className="relative w-12 h-12 shrink-0">
                            <Image
                                src={track.coverArt}
                                alt={`${track.title} cover art`}
                                fill
                                className="object-cover rounded-md"
                            />
                        </div>

                        <Link href={`/tracks/${track.id}`} className="min-w-[200px] flex-1 hover:opacity-80">
                            <h3 className="font-medium truncate">{track.title}</h3>
                            <p className="text-xs text-muted-foreground">
                                {new Date(track.releaseDate).toLocaleDateString()}
                            </p>
                        </Link>

                        <div className="flex items-center gap-2 shrink-0">
                            <ShareButton
                                url={shareUrl}
                                title={`Listen to ${track.title} by Philip Solarz`}
                                size="sm"
                            />
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 shrink-0"
                                asChild
                            >
                                <a href={track.soundCloud} target="_blank" rel="noopener noreferrer" aria-label="Listen on SoundCloud">
                                    <SiSoundcloud className="h-4 w-4" />
                                </a>
                            </Button>

                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 shrink-0"
                                asChild
                            >
                                <a href={track.youTube} target="_blank" rel="noopener noreferrer" aria-label="Watch on YouTube">
                                    {/* <Youtube className="h-4 w-4" /> */}
                                    <SiYoutube className="h-4 w-4" />
                                </a>
                            </Button>

                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 shrink-0"
                                asChild
                            >
                                <a href={track.spotify} target="_blank" rel="noopener noreferrer" aria-label="Listen on Spotify">
                                    <SiSpotify className="h-4 w-4" />
                                </a>
                            </Button>

                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 shrink-0"
                                asChild
                            >
                                <a href={track.downloadUrl} download aria-label="Download track">
                                    <Download className="h-4 w-4" />
                                </a>
                            </Button>
                        </div>

                    </div>
                )
            })}
        </div >
    )
}

