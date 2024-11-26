import { useState } from 'react'
import { Link } from 'react-router-dom'
import bgimage from '../assets/collage-of-movie-posters-g2fdqahxlakaa7yq.jpg'

function Signup() {
  const containerStyles = {
    minHeight: '100vh',
    backgroundImage: `url(${bgimage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  }

  const overlayStyles = {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1,
  }

  const formContainerStyles = {
    width: '100%',
    maxWidth: '28rem',
    padding: '2rem',
    borderRadius: '0.75rem',
    border: '2px solid #dc2626',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 2,
  }

  return (
    <div style={containerStyles}>
      <div style={overlayStyles}>
        <div style={formContainerStyles} class="container">
          <h2 className="text-3xl font-bold mb-8 text-center text-white font-['Poppins', sans-serif]">
            Create an account
          </h2>

          <form className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-lg font-medium text-white text-left font-['Quicksand', sans-serif]"
              >
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full h-12 px-4 rounded-lg bg-gradient-to-r from-red-900/10 to-red-800/10 
                border border-red-500/30 text-white placeholder-gray-400 focus:outline-none 
                focus:border-red-500 focus:ring-1 focus:ring-red-500"
                placeholder="name@company.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-lg font-medium text-white text-left font-['Quicksand', sans-serif]"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full h-12 px-4 rounded-lg bg-gradient-to-r from-red-900/10 to-red-800/10 
                border border-red-500/30 text-white placeholder-gray-400 focus:outline-none 
                focus:border-red-500 focus:ring-1 focus:ring-red-500"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirm-password"
                className="block text-lg font-medium text-white text-left font-['Quicksand', sans-serif]"
              >
                Confirm password
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                className="w-full h-12 px-4 rounded-lg bg-gradient-to-r from-red-900/10 to-red-800/10 
                border border-red-500/30 text-white placeholder-gray-400 focus:outline-none 
                focus:border-red-500 focus:ring-1 focus:ring-red-500"
                placeholder="••••••••"
                required
              />
            </div>

            <Link to="/userdata" className="block w-full">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-lg bg-red-600 text-white font-semibold 
                hover:bg-red-700 transition duration-200 ease-in-out mt-6"
              >
                Create new account
              </button>
            </Link>

            <p className="mt-8 text-center text-gray-300">
              Already have an account?
              <Link to="/" className="text-red-600 font-semibold hover:text-red-500 ml-2">
                Login Here!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup