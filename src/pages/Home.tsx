import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/signup', { state: { email } });
  };

  return (
    <div className="relative min-h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://assets.nflxext.com/ffe/siteui/vlv3/c0b69670-89a3-48ca-877f-45642b3fc06d/6902905f-c26f-4808-9c15-d56b4cbf2bcc/US-en-20240212-popsignuptwoweeks-perspective_alpha_website_large.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-5">
            Unlimited movies, TV shows and more
          </h1>
          <h2 className="text-2xl md:text-3xl mb-5">
            Watch anywhere. Cancel anytime.
          </h2>
          <p className="text-xl md:text-2xl mb-8">
            Ready to watch? Enter your email to create or restart your membership.
          </p>
          
          <form onSubmit={handleGetStarted} className="flex flex-col md:flex-row gap-2 max-w-[600px] mx-auto">
            <div className="flex-grow">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                  className="w-full px-4 pt-5 pb-2 text-lg text-white bg-gray-800/70 rounded focus:outline-none focus:ring-2 focus:ring-white/75 peer"
                  required
                />
                <label className="absolute text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                  Email address
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="bg-netflix-red hover:bg-red-700 text-white px-8 py-4 rounded text-2xl font-semibold transition duration-300 whitespace-nowrap"
            >
              Get Started &gt;
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;