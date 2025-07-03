import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate('/browse');
    } catch (err: any) {
      if (err?.message?.includes('user_already_exists')) {
        setError('An account with this email already exists. Please sign in or use a different email address.');
      } else {
        setError('Error creating account. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-black/80 p-8 rounded-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8">Sign Up</h2>
        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">
            {error}
            {error.includes('already exists') && (
              <div className="mt-2 text-sm">
                Already have an account?{' '}
                <Link to="/signin" className="underline hover:text-white/80">
                  Sign in here
                </Link>
              </div>
            )}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-4 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-4 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-netflix-red text-white py-4 rounded font-semibold"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;