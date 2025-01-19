import { Episode } from "../models/episode.models";

interface EpisodeInfo {
    name: string;
    airDate: string;
    episodeCode: string;
    charactersCount: number;
    characters: string[];
    createdDate: string;
  }
  
  export const episodeAdapter = (episode: Episode | null): EpisodeInfo => {
    if (!episode) {
      return {
        name: 'Unknown',
        airDate: 'Unknown',
        episodeCode: 'Unknown',
        charactersCount: 0,
        characters: [],
        createdDate: 'Unknown',
      };
    }
  
    return {
      name: episode.name || 'Unknown',
      airDate: episode.air_date || 'Unknown',
      episodeCode: episode.episode || 'Unknown',
      charactersCount: episode.characters.length || 0,
      characters: episode.characters || [],
      createdDate: new Date(episode.created).toLocaleDateString() || 'Unknown',
    };
  };

  interface ApiResponse {
    info: {
      pages: number;
    };
    results: Episode[];
  }

 interface EpisodeAdapterResponse {
    episodes: Episode[]; 
    totalPages: number; 
  }
  
  export const getEpisodesListData = (data: ApiResponse | null): EpisodeAdapterResponse => {
    const episodes = data?.results || [];
    const totalPages = data?.info?.pages || 1; 
    
    return { episodes, totalPages };
  };