
'use client'
import { useState } from 'react';
import useSWR from 'swr'
import Image from 'next/image';
import { fetcher } from "@/fetcher/fetcher";
import { Character } from './models/character.model';
import { Skeleton } from './components/skeleton.component';
import { useCharacter } from './context/character.context';
import { useRouter } from 'next/navigation'
import { charactersAdapter } from './adapters/characters.adapters';

export default function CharacterList() {
    const router = useRouter();
    // this can be in the router query params
    const [pageIndex, setPageIndex] = useState(1);
    const [status, setStatus] = useState('');
    const [name, setName] = useState('');

    const { data, error, isLoading } = useSWR(`/character/?page=${pageIndex}&name=${name}&status=${status}`, fetcher);

    if (error) return <div className="text-center text-red-500 mt-8">Failed to load characters. Please try again later.</div>

    const { characters, totalPages } = charactersAdapter(data);

    // context to set the selected character
    const { setCharacter } = useCharacter();

    // handle click on character card
    const handleCharacterClick = (character: Character) => {
        setCharacter(character);
        router.push(`/characters/${character.id}`);
    }
    // list of characters
    return (

        <div className="mx-auto w-full lg:max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto w-full py-2 lg:max-w-4xl">
                {/* search character  */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-200">Characters</h1>
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search character"
                            onChange={(e) => setName(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <details className="dropdown">
                            <summary className="btn m-1"> Status </summary>
                            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li><a onClick={() => setStatus('alive')}>Alive</a></li>
                                <li><a onClick={() => setStatus('dead')}>Dead</a></li>
                                <li><a onClick={() => setStatus('unknown')}>Unknown</a></li>
                            </ul>
                        </details>
                    </div>
                </div>
                {/* list of characters */}
                <ul role="list" className="grid mb-8 sm:px-4 grid-col-1 lg:grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                    {isLoading
                        ? Array(8).fill(0).map((_, index) => <Skeleton key={index} />)
                        :
                        characters.map((character: Character) => (
                            <li key={character.id} className="relative flex flex-col items-center p-4 bg-base-200 rounded-lg shadow-md">
                                <Image
                                    width={100}
                                    height={100}
                                    className="object-cover w-full lg:h-[200px] rounded-lg"
                                    src={character.image}
                                    alt={character.name}
                                />

                                <div className="card-body items-center text-center">
                                    <h2 className="card-title">{character.name}</h2>
                                    <p className="mt-1 text-sm text-withe-200">{character.species}</p>
                                    <div className="card-actions">
                                        <button onClick={() => handleCharacterClick(character)} className="btn btn-primary">View Episodes</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                </ul>
                {/* Pagination */}
                <nav
                    aria-label="Pagination"
                    className="flex bg-base-200 items-center justify-between   px-4 py-3 sm:px-6"
                >
                    <div className="hidden sm:block">
                        <p className="text-sm text-gray-700">
                            Showing <span className="self-center">{`Page ${pageIndex} of ${totalPages}`}</span> results
                        </p>
                    </div>
                    <div className="flex flex-1 justify-between sm:justify-end">
                        <button
                            onClick={() => setPageIndex(pageIndex > 1 ? pageIndex - 1 : 1)}
                            className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setPageIndex(pageIndex < totalPages ? pageIndex + 1 : pageIndex)}
                            className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                        >
                            Next
                        </button>
                    </div>
                </nav>
            </div>
        </div>
    );
}
