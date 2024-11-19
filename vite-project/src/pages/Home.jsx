import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import TopCards from '../components/TopMovies'
import ContentBased from '../components/ContentBased'
import Collaborative from '../components/Collaborative'
import TopMovies from '../components/TopMovies'

function Home() {
    return (
        <div style={{backgroundColor: "#181818"}}>
            <Navbar />
            <TopMovies />
            <ContentBased />
            <Collaborative />
        </div>
    )
}

export default Home