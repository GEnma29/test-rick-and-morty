import axios from 'axios'

const rickAndMorty = axios.create({
    baseURL: 'https://rickandmortyapi.com/api/',
    timeout: 3000,
  });

export const fetcher = (url: string) => rickAndMorty.get(url).then(res => res.data)