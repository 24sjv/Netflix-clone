import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Info, Volume2, VolumeX } from 'lucide-react';
import { Movie } from '../types';

interface FeaturedMovieProps {
  movie: Movie;
}

const FeaturedMovie: React.FC<FeaturedMovieProps> = ({ movie }) => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="relative h-[85vh] w-full">
      <div className="absolute inset-0">
        <img
          src={movie.thumbnail_url}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/60" />
      </div>
      
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="max-w-xl">
            <h1 className="text-7xl font-bold mb-4 animate-fade-in">
              {movie.title}
            </h1>
            <p className="text-lg mb-8 animate-fade-in-delay line-clamp-3">
              {movie.description}
            </p>
            <div className="flex items-center gap-4">
              <Link
                to={`/watch/${movie.id}`}
                className="bg-white text-black px-8 py-3 rounded-md flex items-center gap-2 hover:bg-gray-200 transition-colors animate-fade-in-delay-2 font-semibold"
              >
                <Play className="w-6 h-6" fill="black" />
                Play
              </Link>
              <button className="bg-gray-500/70 text-white px-8 py-3 rounded-md flex items-center gap-2 hover:bg-gray-600/70 transition-colors animate-fade-in-delay-2 font-semibold">
                <Info className="w-6 h-6" />
                More Info
              </button>
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="ml-auto bg-gray-500/70 rounded-full p-3 hover:bg-gray-600/70 transition-colors"
              >
                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMovie;