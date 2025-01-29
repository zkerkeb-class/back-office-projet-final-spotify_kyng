'use client';

import { login } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
    const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const handleOnChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    try {
        e.preventDefault();
        const token = await login(formData.email, formData.password);
        localStorage.setItem('token', token);
        router.push('/');
    } catch (error) {
        console.error('Error during login', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-zinc-900">
      <form
        onSubmit={handleSubmit}
        className="bg-black text-white p-10 rounded-lg shadow-lg w-96"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Log in to Spotify Portal</h1>

        <div className="my-6 border-t border-zinc-700"></div>

        <input
          type="text"
          name="email"
          placeholder="Email or username"
          className="w-full p-3 bg-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-3"
          defaultValue={formData.email}
          onChange={(e) => handleOnChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 bg-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-3"
          defaultValue={formData.password}
          onChange={(e) => handleOnChange(e)}
        />

        <button className="w-full p-3 bg-green-500 rounded-lg font-bold hover:bg-green-600">
          Log In
        </button>

        <div className="text-center mt-4">
          <a
            href="#"
            className="text-zinc-400 hover:underline"
          >
            Forgot your password?
          </a>
        </div>
      </form>
    </div>
  );
}
