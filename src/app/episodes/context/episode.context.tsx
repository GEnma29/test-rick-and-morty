import * as React from 'react';
import { Episode } from '../models/episode.models';

type EpisodeState = {
    episode: Episode | null;
};

type EpisodeAction =
    | { type: 'setEpisode'; payload: Episode }
    | { type: 'clearEpisode' };

const EpisodeContext = React.createContext<
    { state: EpisodeState; dispatch: React.Dispatch<EpisodeAction> } | undefined
>(undefined);

function episodeReducer(state: EpisodeState, action: EpisodeAction): EpisodeState {
    switch (action.type) {
        case 'setEpisode':
            return { ...state, episode: action.payload };
        case 'clearEpisode':
            return { ...state, episode: null };
        default:
            return state;
    }
}

function EpisodeProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = React.useReducer(episodeReducer, { episode: null });
    const value = { state, dispatch };
    return <EpisodeContext.Provider value={value}>{children}</EpisodeContext.Provider>;
}

function useEpisode() {
    const context = React.useContext(EpisodeContext);
    if (context === undefined) {
        throw new Error('useEpisode must be used within an EpisodeProvider');
    }
    const { state, dispatch } = context;
    const setEpisode = (episode: Episode) => {
        dispatch({ type: 'setEpisode', payload: episode });
    };
    const clearEpisode = () => {
        dispatch({ type: 'clearEpisode' });
    };
    return {
        state,
        setEpisode,
        clearEpisode,
    };
}

export { EpisodeProvider, useEpisode };
