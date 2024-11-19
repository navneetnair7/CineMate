// import React from "react";
// import ContentCarousel from "./ContentCarousel";

// function ContentBased() {
//     const slideDetails = [
//         {
//             name: "Movie 1",
//             rating: "5",
//             img: hackimage1,
//             genre: "Comedy, Romcom",
//             year: "2021",
//         },
//         {
//             name: "Movie 2",
//             rating: "4.5",
//             img: hackimage2,
//             genre: "Drama, Comedy, Romcom, Action",
//             year: "2020",
//         },
//         {
//             name: "Movie 3",
//             rating: "4",
//             img: hackimage3,
//             genre: "Thriller, Mystery, Horror, Crime",
//             year: "2019",
//         },
//     ];

//     return (
//         <div style={{ backgroundColor: "#181818", padding: "20px" }}>
//             <h2 className="text-white mb-4 text-2xl font-bold" style={{ marginBottom: "10px" }}>Movies For Your Taste</h2>
//             <ContentCarousel slides={slideDetails} />
//         </div>
//     );
// }

// export default ContentBased;

import React from "react";
import ContentCarousel from "./ContentCarousel";

import hackimage1 from "../assets/16.png";
import hackimage2 from "../assets/27.png";
import hackimage3 from "../assets/_MG_9343 (1).jpg";
import hackimage4 from "../assets/DSC_0027.jpg";
import hackimage5 from "../assets/DSC_0180.jpg";

function ContentBased({ title, movies }) {
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
    {
      name: "Movie 4",
      rating: "4.5",
      img: hackimage4,
      genre: "Drama, Comedy, Romcom, Action",
      year: "2020",
    },
    {
      name: "Movie 5",
      rating: "4",
      img: hackimage5,
      genre: "Thriller, Mystery, Horror, Crime",
      year: "2019",
    },
  ];

  return (
    <div style={{ backgroundColor: "#181818", padding: "2rem" }}>
      <h2
        style={{
          color: "rgba(255, 255, 255, 0.85)",
          marginBottom: "1rem",
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        {title ? title : "Movies For Your Taste"}
      </h2>
      <ContentCarousel slides={movies ? movies : slideDetails} />
    </div>
  );
}

export default ContentBased;
