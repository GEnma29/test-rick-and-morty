'use client'
import React from 'react'
import { useEpisode } from '../context/episode.context';
import { episodeAdapter } from '../adapters/episodes.adapter';

const Episode = () => {
    const { state } = useEpisode();

    const episode = episodeAdapter(state.episode);


    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-8">
                    <h1 className="block mt-1 text-3xl leading-tight font-bold text-black">
                        {episode.name}
                    </h1>
                    <p className="mt-2 text-gray-500">Episode: {episode.episodeCode}</p>
                    <p className="mt-2 text-gray-500">Air Date: {episode.createdDate}</p>

                    <div className="mt-4">
                        <h2 className="text-xl font-semibold text-gray-800">Characters</h2>
                        <ul className="mt-2 text-sm text-gray-500">
                            {episode.characters.map((characterUrl, index) => (
                                <li key={index}>{characterUrl}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-4 text-sm text-gray-500">
                        Created: {new Date(episode.createdDate).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Episode