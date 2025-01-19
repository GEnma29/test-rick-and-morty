import * as React from 'react'
import { Character } from '../models/character.model'

type CharacterState = {
    character: Character | null;
}

type CharacterAction =
    | { type: 'setCharacter'; payload: Character }
    | { type: 'clearCharacter' }

const CharacterContext = React.createContext<
    { state: CharacterState; dispatch: React.Dispatch<CharacterAction> } | undefined
>(undefined)

function characterReducer(state: CharacterState, action: CharacterAction): CharacterState {
    switch (action.type) {
        case 'setCharacter':
            return { ...state, character: action.payload }
        case 'clearCharacter':
            return { ...state, character: null }
        default:
            return state
    }
}

function CharacterProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = React.useReducer(characterReducer, { character: null })
    const value = { state, dispatch }
    return <CharacterContext.Provider value={value}>{children}</CharacterContext.Provider>
}

function useCharacter() {
    const context = React.useContext(CharacterContext)
    if (context === undefined) {
        throw new Error('useCharacter must be used within a CharacterProvider')
    }
    const { state, dispatch } = context
    const setCharacter = (character: Character) => {
        dispatch({ type: 'setCharacter', payload: character })
    }
    const clearCharacter = () => {
        dispatch({ type: 'clearCharacter' })
    }
    return {
        state,
        setCharacter,
        clearCharacter,
    }
}

export { CharacterProvider, useCharacter }
