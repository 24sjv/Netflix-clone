import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Plus, Check, ThumbsUp, ChevronDown, Volume2, VolumeX } from 'lucide-react';
import { Movie } from '../types';
import { useWatchlistStore } from '../store/watchlist';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const { items, addToWatchlist, removeFromWatchlist } = useWatchlistStore();
  
  const isInWatchlist = items.some(item => item.movie_id === movie.id);

  const handleWatchlistToggle = async () => {
    if (isInWatchlist) {
      await removeFromWatchlist(movie.id);
    } else {
      await addToWatchlist(movie.id);
    }
  };

  return (
    <div 
      className="group relative h-[160px] transition-all duration-200 ease-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`
        absolute w-full rounded-md overflow-hidden transition-all duration-200
        ${isHovered ? 'scale-[1.5] z-50 -translate-y-[25%] shadow-2xl' : 'scale-100'}
      `}>
        <img
          src={movie.thumbnail_url}
          alt={movie.title}
          className="w-full h-[160px] object-cover"
        />
        
        {isHovered && (
          <div className="absolute inset-0 bg-black/20">
            <div className="absolute bottom-0 left-0 right-0 bg-[#181818] p-3 shadow-xl">
              <div className="flex items-center gap-2 mb-2">
                <Link
                  to={`/watch/${movie.id}`}
                  className="bg-white rounded-full p-2 hover:bg-gray-200 transition-colors"
                >
                  <Play className="w-4 h-4 text-black" fill="black" />
                </Link>
                <button 
                  className="border-2 border-gray-400 rounded-full p-2 hover:border-white transition-colors"
                  onClick={handleWatchlistToggle}
                >
                  {isInWatchlist ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </button>
                <button className="border-2 border-gray-400 rounded-full p-2 hover:border-white transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                </button>
                <button 
                  className="border-2 border-gray-400 rounded-full p-2 hover:border-white transition-colors"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button className="border-2 border-gray-400 rounded-full p-2 hover:border-white transition-colors ml-auto">
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center gap-2 text-xs">
                <span className="text-green-500 font-semibold">98% Match</span>
                <span className="border border-gray-400 px-1">{movie.release_year >= 2020 ? 'NEW' : movie.release_year}</span>
                <span>{movie.duration}m</span>
                <span className="border border-gray-400 px-1">HD</span>
              </div>
              
              <div className="mt-2 flex gap-2 text-xs">
                <span>{movie.genre}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;