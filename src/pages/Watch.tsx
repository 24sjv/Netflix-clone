import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useMoviesStore } from '../store/movies';
import ReactPlayer from 'react-player';

const Watch = () => {
  const { id } = useParams();
  const { movies } = useMoviesStore();
  const movie = movies.find(m => m.id === id);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="absolute top-0 left-0 z-10 p-4">
        <Link
          to="/browse"
          className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
          Back to Browse
        </Link>
      </div>
      
      <div className="relative pt-[56.25%]">
        <ReactPlayer
          url={movie.video_url}
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0 }}
          playing
          controls
        />
      </div>
      
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
          <span>{movie.release_year}</span>
          <span>{movie.duration} min</span>
          <span>{movie.genre}</span>
        </div>
        <p className="text-gray-300">{movie.description}</p>
      </div>
    </div>
  );
};

export default Watch;