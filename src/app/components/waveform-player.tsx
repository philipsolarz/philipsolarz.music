'use client'

import { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'
import { useAudioPlayer } from '../context/audio-player-context'
import { Button } from '@/components/ui/button'
import * as SliderPrimitive from "@radix-ui/react-slider"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import Image from 'next/image'
import { ShareButton } from './share-button'

export function WaveformPlayer() {
    const { state, togglePlayPause, updateProgress } = useAudioPlayer()
    const waveformRef = useRef<HTMLDivElement>(null)
    const wavesurfer = useRef<WaveSurfer | null>(null)
    const [volume, setVolume] = useState(0.25)
    const [isMuted, setIsMuted] = useState(false)
    const [isVolumeOpen, setIsVolumeOpen] = useState(false)

    const toggleMute = () => {
        setIsMuted(!isMuted);
    }

    const handleVolumeMouseEnter = () => {
        setIsVolumeOpen(true)
    }

    const handleVolumeMouseLeave = () => {
        setIsVolumeOpen(false)
    }

    useEffect(() => {
        if (!waveformRef.current) return

        wavesurfer.current = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: '#4a5568',
            progressColor: '#ffffff',
            cursorColor: '#ffffff',
            barWidth: 2,
            barGap: 3,
            height: 48,
            cursorWidth: 0,
            normalize: true,
        })

        wavesurfer.current.on('ready', () => {
            wavesurfer.current?.setVolume(isMuted ? 0 : volume)
            if (state.isPlaying) {
                wavesurfer.current?.play()
            }
        })

        wavesurfer.current.on('audioprocess', () => {
            updateProgress(wavesurfer.current?.getCurrentTime() || 0)
        })

        return () => {
            wavesurfer.current?.destroy()
            wavesurfer.current = null
        }
    }, [isMuted, volume, updateProgress, state.isPlaying])

    useEffect(() => {
        if (!wavesurfer.current || !state.currentTrack) return
        wavesurfer.current.load(state.currentTrack.audioUrl)
    }, [state.currentTrack])

    useEffect(() => {
        if (!wavesurfer.current) return
        state.isPlaying ? wavesurfer.current.play() : wavesurfer.current.pause()
    }, [state.isPlaying])

    useEffect(() => {
        if (!wavesurfer.current) return
        wavesurfer.current.setVolume(isMuted ? 0 : volume)
    }, [isMuted, volume])

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${minutes}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <div className={`fixed bottom-0 left-0 right-0 bg-black/90 border-t border-white/10 backdrop-blur-lg ${!state.currentTrack ? 'hidden' : ''}`}>
            <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 shrink-0 bg-gray-600">
                            {state.currentTrack?.coverArt ? (
                                <Image
                                    src={state.currentTrack.coverArt}
                                    alt={state.currentTrack.title || "No title"}
                                    fill
                                    className="object-cover rounded-md"
                                />
                            ) : (
                                <div className="w-full h-full rounded-md" />
                            )}
                        </div>
                        <div className="hidden sm:block">
                            <h3 className="font-medium text-sm">
                                {state.currentTrack?.title || "Unknown Track"}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                                <span>{state.currentTrack?.bpm ? `${state.currentTrack.bpm} BPM` : "BPM Unavailable"}</span>
                                <span>•</span>
                                <span>Key: {state.currentTrack?.key || "Unknown"}</span>
                                <span>•</span>
                                <span className="w-[7ch] inline-block text-right">
                                    {formatTime(state.progress || 0)}
                                </span>
                                <span>/</span>
                                <span className="w-[7ch] inline-block">
                                    {formatTime(state.currentTrack?.duration || 0)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => state.currentTrack && togglePlayPause(state.currentTrack)}
                            >
                                {state.isPlaying ? (
                                    <Pause className="h-4 w-4" />
                                ) : (
                                    <Play className="h-4 w-4" />
                                )}
                            </Button>

                            <div className="flex-1" ref={waveformRef} />

                            <div className="flex items-center gap-2">
                                <Popover open={isVolumeOpen} onOpenChange={setIsVolumeOpen}>
                                    <PopoverTrigger
                                        asChild
                                        onMouseEnter={handleVolumeMouseEnter}
                                        onMouseLeave={handleVolumeMouseLeave}
                                    >
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 hover:bg-white/10"
                                            onClick={toggleMute}
                                        >
                                            {isMuted ? (
                                                <VolumeX className="h-4 w-4" />
                                            ) : (
                                                <Volume2 className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-8 p-2 bg-black/90 border-white/10"
                                        side="top"
                                        align="center"
                                        sideOffset={0}
                                        onMouseEnter={handleVolumeMouseEnter}
                                        onMouseLeave={handleVolumeMouseLeave}
                                    >
                                        <SliderPrimitive.Root
                                            defaultValue={[volume]}
                                            max={1}
                                            step={0.01}
                                            orientation="vertical"
                                            className="group relative flex h-24 touch-none select-none items-center"
                                            onValueChange={([value]) => setVolume(value)}
                                        >
                                            <SliderPrimitive.Track className="relative h-full w-2 grow rounded-full bg-secondary">
                                                <SliderPrimitive.Range className="absolute w-full rounded-full bg-primary group-hover:bg-primary/80" />
                                            </SliderPrimitive.Track>
                                            <SliderPrimitive.Thumb className="hidden h-4 w-4 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
                                        </SliderPrimitive.Root>

                                    </PopoverContent>
                                </Popover>

                                {state.currentTrack?.id && (
                                    <ShareButton
                                        url={`${window.location.origin}/tracks/${state.currentTrack.id}`}
                                        title={`Listen to ${state.currentTrack?.title || "this track"}`}
                                        size="sm"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

