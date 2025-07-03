import { create } from 'zustand';
import { Profile } from '../types';

interface ProfilesState {
  profiles: Profile[];
  currentProfile: Profile | null;
  setCurrentProfile: (profile: Profile) => void;
}

const tempProfiles: Profile[] = [
  {
    id: '1',
    user_id: '1',
    name: 'Main Profile',
    avatar_url: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=200',
    created_at: new Date().toISOString(),
  },
];

export const useProfilesStore = create<ProfilesState>((set) => ({
  profiles: tempProfiles,
  currentProfile: null,
  setCurrentProfile: (profile) => set({ currentProfile: profile }),
}));