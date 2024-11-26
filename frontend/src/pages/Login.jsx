import { useState } from 'react'
import { Link } from 'react-router-dom'
import bgimage from '../assets/collage-of-movie-posters-g2fdqahxlakaa7yq.jpg'

function Login() {
  const [count, setCount] = useState(0)

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

  const headingStyles = {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    textAlign: 'center',
    color: 'white',
    fontFamily: "'Poppins', sans-serif",
  }

  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  }

  const labelContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  }

  const labelStyles = {
    fontSize: '1.125rem',
    fontWeight: '500',
    color: 'white',
    textAlign: 'left',
    fontFamily: "'Quicksand', sans-serif",
  }

  const inputStyles = {
    width: '100%',
    height: '3rem',
    padding: '0 1rem',
    borderRadius: '0.5rem',
    background: 'linear-gradient(to right, rgba(153, 27, 27, 0.1), rgba(127, 29, 29, 0.1))',
    border: '1px solid rgba(220, 38, 38, 0.3)',
    color: 'white',
    outline: 'none',
  }

  const buttonStyles = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    backgroundColor: '#dc2626',
    color: 'white',
    fontWeight: '600',
    marginTop: '2rem',
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.2s ease-in-out',
  }

  const buttonHoverStyles = {
    backgroundColor: '#b91c1c',
  }

  const signupContainerStyles = {
    marginTop: '2rem',
    textAlign: 'center',
    color: '#d1d5db',
  }

  const signupLinkStyles = {
    color: '#dc2626',
    fontWeight: '600',
    textDecoration: 'none',
  }

  const [isButtonHovered, setIsButtonHovered] = useState(false)

  return (
    <div style={containerStyles}>
    <div style={overlayStyles}>
      <div style={formContainerStyles} class="container">
        <h2 style={headingStyles}>
          Log in to your account
        </h2>

        <form style={formStyles}>
          <div style={labelContainerStyles}>
            <label
              htmlFor="email"
              style={labelStyles}
            >
              Email address
            </label>
            <input
              placeholder="name@company.com"
              id="email"
              name="email"
              type="email"
              required
              style={inputStyles}
              onFocus={(e) => {
                e.target.style.borderColor = '#dc2626';
                e.target.style.boxShadow = '0 0 0 1px #dc2626';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(220, 38, 38, 0.3)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={labelContainerStyles}>
            <label
              htmlFor="password"
              style={labelStyles}
            >
              Password
            </label>
            <input
              placeholder="••••••••"
              id="password"
              name="password"
              type="password"
              required
              style={inputStyles}
              onFocus={(e) => {
                e.target.style.borderColor = '#dc2626';
                e.target.style.boxShadow = '0 0 0 1px #dc2626';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(220, 38, 38, 0.3)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              ...buttonStyles,
              ...(isButtonHovered ? buttonHoverStyles : {})
            }}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            Sign in
          </button>
        </form>

        <p style={signupContainerStyles}>
          New to Netflix?{' '}
          <Link
            to="/signup"
            style={signupLinkStyles}
            onMouseEnter={(e) => {
              e.target.style.color = '#ef4444';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#dc2626';
            }}
          >
            Sign up now!
          </Link>
        </p>
      </div>
      </div>
    </div>
  )
}

export default Login
