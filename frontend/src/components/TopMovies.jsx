import React from "react";
import hackimage1 from "../assets/16.png";
import hackimage2 from "../assets/27.png";
import hackimage3 from "../assets/_MG_9343 (1).jpg";
import TopCarousel from "./TopCarousel";

function TopMovies({ topMovies }) {
  return (
    <div style={{ backgroundColor: "#181818", padding: "0px 0px" }}>
      <TopCarousel slides={topMovies} />
    </div>
  );
}

export default TopMovies;
