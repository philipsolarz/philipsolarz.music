'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'
import type { Track, PlayerState } from '../tracks/types'

type PlayerAction =
    | { type: 'SET_TRACK'; payload: Track }
    | { type: 'PLAY' }
    | { type: 'PAUSE' }
    | { type: 'SET_PROGRESS'; payload: number }
    | { type: 'RESET' }

type PlayerContextType = {
    state: PlayerState
    playTrack: (track: Track) => void
    pauseTrack: () => void
    togglePlayPause: (track: Track) => void
    updateProgress: (progress: number) => void
}

const initialState: PlayerState = {
    currentTrack: null,
    isPlaying: false,
    progress: 0,
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
    switch (action.type) {
        case 'SET_TRACK':
            return {
                ...state,
                currentTrack: action.payload,
                isPlaying: true,
                progress: 0,
            }
        case 'PLAY':
            return { ...state, isPlaying: true }
        case 'PAUSE':
            return { ...state, isPlaying: false }
        case 'SET_PROGRESS':
            return { ...state, progress: action.payload }
        case 'RESET':
            return initialState
        default:
            return state
    }
}

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(playerReducer, initialState)

    const playTrack = (track: Track) => {
        dispatch({ type: 'SET_TRACK', payload: track })
    }

    const pauseTrack = () => {
        dispatch({ type: 'PAUSE' })
    }

    const togglePlayPause = (track: Track) => {
        if (state.currentTrack?.id === track.id) {
            dispatch({ type: state.isPlaying ? 'PAUSE' : 'PLAY' })
        } else {
            dispatch({ type: 'SET_TRACK', payload: track })
        }
    }

    const updateProgress = (progress: number) => {
        dispatch({ type: 'SET_PROGRESS', payload: progress })
    }

    return (
        <PlayerContext.Provider
            value={{
                state,
                playTrack,
                pauseTrack,
                togglePlayPause,
                updateProgress,
            }}
        >
            {children}
        </PlayerContext.Provider>
    )
}

export function useAudioPlayer() {
    const context = useContext(PlayerContext)
    if (context === undefined) {
        throw new Error('useAudioPlayer must be used within an AudioPlayerProvider')
    }
    return context
}

