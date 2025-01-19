'use client'
import React from 'react'
import { CharacterProvider } from './context/character.context'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <CharacterProvider>
            <main>{children}</main>
        </CharacterProvider>
    )
}

export default Layout
