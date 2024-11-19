import React from "react";
import hackimage1 from "../assets/16.png";
import hackimage2 from "../assets/27.png";
import hackimage3 from "../assets/_MG_9343 (1).jpg";
import TopCarousel from "./TopCarousel";

function TopMovies() {
  const slideDetails = [
    {
      name: "Movie 1",
      rating: "5",
      img: hackimage1,
      genre: "Comedy, Romcom",
      year: "2021",
    },
    {
      name: "Movie 2",
      rating: "4.5",
      img: hackimage2,
      genre: "Drama, Comedy, Romcom, Action",
      year: "2020",
    },
    {
      name: "Movie 3",
      rating: "4",
      img: hackimage3,
      genre: "Thriller, Mystery, Horror, Crime",
      year: "2019",
    },
  ];

  return (
    <div style={{ backgroundColor: "#181818", padding: "0px 0px" }}>
      <TopCarousel slides={slideDetails} />
    </div>
  );
}

export default TopMovies;
