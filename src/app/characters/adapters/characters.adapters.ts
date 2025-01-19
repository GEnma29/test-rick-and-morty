import { Character } from "../models/character.model";

export interface CharacterInfo {
    name: string;
    status: string;
    species: string;
    gender: string;
    image: string;
    origin: string;
    location: string;
    episodeCount: number;
    episodes: string[];
    createdDate: string;
  }

export const characterAdapter = (character: Character | null): CharacterInfo => {
    if (!character) {
      return {
        name: "Unknown",
        status: "Unknown",
        species: "Unknown",
        gender: "Unknown",
        image: "/placeholder.svg",
        origin: "Unknown",
        location: "Unknown",
        episodeCount: 0,
        episodes: [],
        createdDate: "Unknown"
      };
    }
  
    return {
      name: character.name || "Unknown",
      status: character.status || "Unknown",
      species: character.species || "Unknown",
      gender: character.gender || "Unknown",
      image: character.image || "/placeholder.svg",
      origin: character.origin?.name || "Unknown", 
      location: character.location?.name || "Unknown", 
      episodeCount: character.episode?.length || 0,
      episodes: character.episode?.slice(0, 3) || [], 
      createdDate: new Date(character.created || '').toLocaleDateString() || "Unknown"
    };
  };

  interface ApiResponse {
    results: Character[]; 
    info: {
      pages: number; 
    };
  }
  
  interface CharacterAdapterResponse {
    characters: Character[]; 
    totalPages: number; 
  }
  
  export const charactersAdapter = (data: ApiResponse | null): CharacterAdapterResponse => {
    const characters = data?.results || [];
    const totalPages = data?.info?.pages || 1; 
    
    return { characters, totalPages };
  };
  