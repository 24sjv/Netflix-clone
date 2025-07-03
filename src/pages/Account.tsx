import React from 'react';
import { useAuthStore } from '../store/auth';

const Account = () => {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen pt-20 px-4 bg-netflix-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
        
        <div className="bg-gray-900 rounded-md p-6 mb-8">
          <div className="border-b border-gray-700 pb-4 mb-4">
            <h2 className="text-xl font-semibold mb-1">MEMBERSHIP & BILLING</h2>
            <button className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700 transition-colors">
              Cancel Membership
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="col-span-2">
              <p className="text-gray-400">{user?.email}</p>
              <p className="text-gray-400">Password: ********</p>
              <p className="text-gray-400">Phone: (555) 555-5555</p>
            </div>
            <div className="space-y-2">
              <button className="text-blue-500 hover:underline block">Change email</button>
              <button className="text-blue-500 hover:underline block">Change password</button>
              <button className="text-blue-500 hover:underline block">Change phone number</button>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">PLAN DETAILS</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Premium Plan</p>
              <p className="text-gray-400">Ultra HD + HDR Available</p>
            </div>
            <button className="text-blue-500 hover:underline">Change plan</button>
          </div>
        </div>

        <div className="bg-gray-900 rounded-md p-6">
          <h2 className="text-xl font-semibold mb-4">PROFILE & PARENTAL CONTROLS</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-800 rounded-md">
              <div className="flex items-center gap-4">
                <img
                  src="https://occ-0-2186-64.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABY20DrC9-11ewwAs6nfEgb1vrORxRPP9IGmlW1WtKuaLIz8VxCx5NryzDK3_ez064IsBGdXjVUT59G5IRuFdqZlCJCneepU.png?r=229"
                  alt="Profile"
                  className="w-12 h-12 rounded"
                />
                <span className="font-medium">Main Profile</span>
              </div>
              <button className="text-blue-500 hover:underline">
                Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;