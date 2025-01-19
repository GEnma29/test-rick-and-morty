'use client'
import React from 'react'
import { EpisodeProvider } from './context/episode.context'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <EpisodeProvider>
            <main>{children}</main>
        </EpisodeProvider>
    )
}

export default Layout
