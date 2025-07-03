import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useMoviesStore } from '../store/movies';
import { useWatchlistStore } from '../store/watchlist';
import FeaturedMovie from '../components/FeaturedMovie';
import MovieCard from '../components/MovieCard';

const Browse = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';
  const { movies, featured, getMoviesByCategory } = useMoviesStore();
  const { items: watchlistItems } = useWatchlistStore();
  const [selectedGenre, setSelectedGenre] = useState<string>('All');

  const filteredMovies = getMoviesByCategory(category);
  const genres = ['All', ...Array.from(new Set(filteredMovies.map(movie => movie.genre)))];
  
  const displayMovies = selectedGenre === 'All' 
    ? filteredMovies 
    : filteredMovies.filter(movie => movie.genre === selectedGenre);

  const trendingMovies = [...displayMovies].sort(() => Math.random() - 0.5).slice(0, 5);
  const newReleases = [...displayMovies].sort((a, b) => b.release_year - a.release_year).slice(0, 5);
  const popularContent = [...displayMovies].sort(() => Math.random() - 0.5).slice(0, 5);

  // Get watchlist content if on the my-list page
  const watchlistContent = category === 'my-list' 
    ? movies.filter(movie => watchlistItems.some(item => item.movie_id === movie.id))
    : [];

  const getCategoryTitle = () => {
    switch (category) {
      case 'tv':
        return 'TV Shows';
      case 'movies':
        return 'Movies';
      case 'new':
        return 'New & Popular';
      case 'my-list':
        return 'My List';
      default:
        return 'Browse';
    }
  };

  if (!featured && category === 'all') return null;

  return (
    <div className="min-h-screen bg-netflix-black">
      {category === 'all' && <FeaturedMovie movie={featured} />}
      
      <div className={`container mx-auto px-4 md:px-8 lg:px-16 ${category === 'all' ? '-mt-32' : 'pt-24'} relative z-10`}>
        <h1 className="text-4xl font-bold mb-8">{getCategoryTitle()}</h1>
        
        <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedGenre === genre
                  ? 'bg-white text-black'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {category === 'my-list' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {watchlistContent.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <>
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {trendingMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">New Releases</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {newReleases.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Popular on Netflix</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {popularContent.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Browse;