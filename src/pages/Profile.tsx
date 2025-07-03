import React, { useState } from 'react';
import { useProfilesStore } from '../store/profiles';
import { User, Camera, Plus } from 'lucide-react';

const Profile = () => {
  const { profiles } = useProfilesStore();
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          {editMode ? 'Manage Profiles' : 'Who\'s watching?'}
        </h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {profiles.map((profile) => (
            <div key={profile.id} className="group cursor-pointer">
              <div className="relative aspect-square rounded-md overflow-hidden mb-2 group-hover:ring-4 ring-white transition-all duration-200">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                    <User className="w-1/2 h-1/2 text-gray-400" />
                  </div>
                )}
                {editMode && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-1/4 h-1/4" />
                  </div>
                )}
              </div>
              <p className="text-center text-gray-300 group-hover:text-white transition-colors">
                {profile.name}
              </p>
            </div>
          ))}

          <div className="group cursor-pointer">
            <div className="aspect-square rounded-md overflow-hidden mb-2 bg-gray-800 flex items-center justify-center group-hover:bg-gray-700 transition-colors">
              <Plus className="w-1/2 h-1/2 text-gray-400" />
            </div>
            <p className="text-center text-gray-300 group-hover:text-white transition-colors">
              Add Profile
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setEditMode(!editMode)}
            className="px-8 py-2 border-2 border-gray-400 text-gray-400 hover:border-white hover:text-white transition-colors"
          >
            {editMode ? 'Done' : 'Manage Profiles'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;