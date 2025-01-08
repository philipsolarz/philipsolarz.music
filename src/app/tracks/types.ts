export interface Track {
    id: number
    title: string
    releaseDate: string
    coverArt: string
    audioUrl: string
    soundCloud: string
    youTube: string
    spotify: string
    downloadUrl: string
    bpm: number
    key: string
    duration: number
    description: string
}

export interface PlayerState {
    currentTrack: Track | null
    isPlaying: boolean
    progress: number
}

