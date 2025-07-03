export interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  video_url: string;
  genre: string;
  release_year: number;
  duration: number;
  created_at: string;
  type: 'movie' | 'tv';
}

export interface Profile {
  id: string;
  user_id: string;
  name: string;
  avatar_url: string;
  created_at: string;
}

export interface WatchlistItem {
  id: string;
  user_id: string;
  movie_id: string;
  created_at: string;
  movie: Movie;
}