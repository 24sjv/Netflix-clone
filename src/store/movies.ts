import { create } from 'zustand';
import { Movie } from '../types';

interface MoviesState {
  movies: Movie[];
  featured: Movie | null;
  getMoviesByCategory: (category: string) => Movie[];
}

const tempMovies: Movie[] = [
  {
    id: '1',
    title: 'Inception',
    description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    thumbnail_url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1920',
    video_url: 'https://example.com/inception.mp4',
    genre: 'Sci-Fi',
    release_year: 2010,
    duration: 148,
    created_at: new Date().toISOString(),
    type: 'movie'
  },
  {
    id: '2',
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    thumbnail_url: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&q=80&w=1920',
    video_url: 'https://example.com/dark-knight.mp4',
    genre: 'Action',
    release_year: 2008,
    duration: 152,
    created_at: new Date().toISOString(),
    type: 'movie'
  },
  {
    id: '3',
    title: 'Stranger Things',
    description: 'When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.',
    thumbnail_url: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&q=80&w=1920',
    video_url: 'https://example.com/stranger-things.mp4',
    genre: 'Sci-Fi & Horror',
    release_year: 2016,
    duration: 50,
    created_at: new Date().toISOString(),
    type: 'tv'
  },
  {
    id: '4',
    title: 'Breaking Bad',
    description: 'A high school chemistry teacher turned methamphetamine manufacturer partners with a former student to secure his family\'s financial future as he battles terminal lung cancer.',
    thumbnail_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1920',
    video_url: 'https://example.com/breaking-bad.mp4',
    genre: 'Drama',
    release_year: 2008,
    duration: 45,
    created_at: new Date().toISOString(),
    type: 'tv'
  },
  {
    id: '5',
    title: 'The Crown',
    description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the twentieth century.',
    thumbnail_url: 'https://images.unsplash.com/photo-1533894321612-48ae6440fc6a?auto=format&fit=crop&q=80&w=1920',
    video_url: 'https://example.com/the-crown.mp4',
    genre: 'Drama',
    release_year: 2016,
    duration: 58,
    created_at: new Date().toISOString(),
    type: 'tv'
  },
  {
    id: '6',
    title: 'Black Mirror',
    description: 'An anthology series exploring a twisted, high-tech multiverse where humanity\'s greatest innovations and darkest instincts collide.',
    thumbnail_url: 'https://images.unsplash.com/photo-1516724562728-afc4865086e7?auto=format&fit=crop&q=80&w=1920',
    video_url: 'https://example.com/black-mirror.mp4',
    genre: 'Sci-Fi',
    release_year: 2011,
    duration: 60,
    created_at: new Date().toISOString(),
    type: 'tv'
  },
  {
    id: '7',
    title: 'The Witcher',
    description: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.',
    thumbnail_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1920',
    video_url: 'https://example.com/the-witcher.mp4',
    genre: 'Fantasy',
    release_year: 2019,
    duration: 60,
    created_at: new Date().toISOString(),
    type: 'tv'
  },
  {
    id: '8',
    title: 'Dune',
    description: 'Feature adaptation of Frank Herbert\'s science fiction novel about the son of a noble family entrusted with the protection of the most valuable asset in the galaxy.',
    thumbnail_url: 'https://images.unsplash.com/photo-1547149600-a6cdf8fce60c?auto=format&fit=crop&q=80&w=1920',
    video_url: 'https://example.com/dune.mp4',
    genre: 'Sci-Fi',
    release_year: 2021,
    duration: 155,
    created_at: new Date().toISOString(),
    type: 'movie'
  },
  {
    id: '9',
    title: 'The Last of Us',
    description: 'After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity\'s last hope.',
    thumbnail_url: 'https://images.unsplash.com/photo-1542662565-7e4b66bae529?auto=format&fit=crop&q=80&w=1920',
    video_url: 'https://example.com/lastofus.mp4',
    genre: 'Drama',
    release_year: 2023,
    duration: 60,
    created_at: new Date().toISOString(),
    type: 'tv'
  },
  {
    id: '10',
    title: 'Oppenheimer',
    description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    thumbnail_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1920',
    video_url: 'https://example.com/oppenheimer.mp4',
    genre: 'Drama',
    release_year: 2023,
    duration: 180,
    created_at: new Date().toISOString(),
    type: 'movie'
  }
];

export const useMoviesStore = create<MoviesState>((set, get) => ({
  movies: tempMovies,
  featured: tempMovies[0],
  getMoviesByCategory: (category: string) => {
    const { movies } = get();
    switch (category) {
      case 'tv':
        return movies.filter(movie => movie.type === 'tv');
      case 'movies':
        return movies.filter(movie => movie.type === 'movie');
      case 'new':
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        return movies.filter(movie => new Date(movie.created_at) > oneMonthAgo);
      default:
        return movies;
    }
  }
}));