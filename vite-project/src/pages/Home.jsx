import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import TopCards from "../components/TopMovies";
import ContentBased from "../components/ContentBased";
import Collaborative from "../components/Collaborative";
import TopMovies from "../components/TopMovies";

import axios from "axios";

function Home() {
  const [topMovies, setTopMovies] = useState([]);
  const [top10Movies, setTop10Movies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/top_popular");
        const movies = [];
        for (var i in response.data) {
          movies.push({
            name: [i],
            img: response.data[i],
          });
        }
        setTopMovies(movies);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    const fetchTopMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/top10");
        const movies = [];
        for (var i in response.data) {
          movies.push({
            name: i,
            img: response.data[i],
          });
        }
        setTop10Movies(movies);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchMovies();
    fetchTopMovies();
  }, []);

  return (
    <div style={{ backgroundColor: "#181818" }}>
      <Navbar />
      {isLoading ? <div>Loading...</div> : <TopMovies topMovies={topMovies} />}
      <ContentBased title="Top Rated Movies" movies={top10Movies} />
      <ContentBased title="Movies for your taste" />
      <Collaborative />
    </div>
  );
}

export default Home;
