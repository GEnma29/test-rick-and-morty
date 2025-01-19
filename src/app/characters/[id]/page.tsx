'use client';

import React from 'react';
import Image from 'next/image';
import { useCharacter } from '../context/character.context';
import { characterAdapter, CharacterInfo } from '../adapters/characters.adapters';

const CharacterDetails = () => {
    const { state } = useCharacter();
    const character: CharacterInfo = characterAdapter(state.character);

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                <div className="md:flex">
                    <div className="md:flex-shrink-0">
                        <Image
                            className="h-full w-full object-cover"
                            src={character.image}
                            alt={character.name}
                            width={300}
                            height={300}
                        />
                    </div>
                    <div className="p-8">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                            {character.species} - {character.gender}
                        </div>
                        <h1 className="block mt-1 text-3xl leading-tight font-bold text-black">
                            {character.name}
                        </h1>
                        <p className="mt-2 text-gray-500">Status: {character.status}</p>

                        <div className="mt-4">
                            <h2 className="text-xl font-semibold text-gray-800">Origin</h2>
                            <p className="text-gray-600">{character.origin}</p>
                        </div>

                        <div className="mt-4">
                            <h2 className="text-xl font-semibold text-gray-800">Current Location</h2>
                            <p className="text-gray-600">{character.location}</p>
                        </div>

                        <div className="mt-4">
                            <h2 className="text-xl font-semibold text-gray-800">Episodes</h2>
                            <p className="text-gray-600">Appears in {character.episodeCount} episodes</p>
                            <ul className="mt-2 text-sm text-gray-500">
                                {character.episodes?.map((ep, index) => (
                                    <li key={index}>Episode {ep.split('/').pop()}</li>
                                ))}
                                {character.episodeCount > 3 && <li>...</li>}
                            </ul>
                        </div>

                        <div className="mt-4 text-sm text-gray-500">
                            Created: {character.createdDate}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterDetails;
