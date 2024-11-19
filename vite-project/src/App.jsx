import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Preferences from './pages/Preferences'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/userdata" element={<Preferences />} /> 
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
