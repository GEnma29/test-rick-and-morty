'use client'
import useSWR from 'swr'
import { fetcher } from "@/fetcher/fetcher";
import { Episode } from './models/episode.models'
import { TableSkeleton } from './components/skeleton.component';
import { getEpisodesListData } from './adapters/episodes.adapter';
import { useEpisode } from './context/episode.context';
import { useRouter } from 'next/navigation';

export default function Episodes() {
    const router = useRouter();

    const { data, error, isLoading } = useSWR(`/episode/`, fetcher);

    const { episodes, totalPages } = getEpisodesListData(data);

    const { setEpisode } = useEpisode();

    const handelEpisodeClick = (episode: Episode) => {
        setEpisode(episode);
        router.push(`/episodes/${episode.id}`);
    }

    return (
        <div className="bg-gray-900">
            <div className="mx-auto max-w-7xl">
                <div className="bg-gray-900 py-10">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h1 className="text-base font-semibold text-white">Episodes</h1>
                                <p className="mt-2 text-sm text-gray-300">
                                    A list of episodes from the Rick and Morty universe, including their title, episode code, and air date.
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <table className="min-w-full divide-y divide-gray-700">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                                                    Episode Name
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                    Episode Code
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                    Air Date
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                    Characters
                                                </th>
                                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                                    <span className="sr-only">View Details</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        {isLoading ? (
                                            <TableSkeleton />
                                        ) : (
                                            <tbody className="divide-y divide-gray-800">
                                                {episodes.map((episode: Episode) => (
                                                    <tr key={episode.id}>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                                                            {episode.name}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                                            {episode.episode}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                                            {episode.air_date}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                                            {episode.characters.length} characters
                                                        </td>
                                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                            <a onClick={() => handelEpisodeClick(episode)} className="text-indigo-400 hover:text-indigo-300">
                                                                View Details<span className="sr-only">, {episode.name}</span>
                                                                <span className="sr-only">, {episode.name}</span>
                                                            </a>

                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        )}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
