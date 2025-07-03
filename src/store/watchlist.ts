import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { WatchlistItem } from '../types';

interface WatchlistState {
  items: WatchlistItem[];
  loading: boolean;
  addToWatchlist: (movieId: string) => Promise<void>;
  removeFromWatchlist: (movieId: string) => Promise<void>;
  fetchWatchlist: () => Promise<void>;
}

export const useWatchlistStore = create<WatchlistState>((set, get) => ({
  items: [],
  loading: false,
  
  fetchWatchlist: async () => {
    try {
      set({ loading: true });
      const { data: watchlist, error } = await supabase
        .from('watchlist')
        .select(`
          id,
          movie_id,
          created_at,
          movies (
            id,
            title,
            description,
            thumbnail_url,
            video_url,
            genre,
            release_year,
            duration,
            created_at
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      set({ 
        items: watchlist.map(item => ({
          id: item.id,
          user_id: item.user_id,
          movie_id: item.movie_id,
          created_at: item.created_at,
          movie: item.movies
        })),
        loading: false 
      });
    } catch (error) {
      console.error('Error fetching watchlist:', error);
      set({ loading: false });
    }
  },

  addToWatchlist: async (movieId: string) => {
    try {
      const { error } = await supabase
        .from('watchlist')
        .insert({ movie_id: movieId });

      if (error) throw error;

      // Refresh watchlist
      await get().fetchWatchlist();
    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  },

  removeFromWatchlist: async (movieId: string) => {
    try {
      const { error } = await supabase
        .from('watchlist')
        .delete()
        .eq('movie_id', movieId);

      if (error) throw error;

      // Refresh watchlist
      await get().fetchWatchlist();
    } catch (error) {
      console.error('Error removing from watchlist:', error);
    }
  },
}));