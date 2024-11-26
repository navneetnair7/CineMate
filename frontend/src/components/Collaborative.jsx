
import React from "react";
import hackimage1 from '../assets/16.png';
import hackimage2 from '../assets/27.png';
import hackimage3 from '../assets/_MG_9343 (1).jpg';
import CollaborativeCard from './CollaborativeCard';

function Collaborative() {
    const cardDetails = [
        {
            name: "Movie 1",
            rating: "5",
            img: hackimage1,
            genre: "Comedy",
            year: "2021",
        },
        {
            name: "Movie 2",
            rating: "4.5",
            img: hackimage2,
            genre: "Drama",
            year: "2020",
        },
        {
            name: "Movie 3",
            rating: "4",
            img: hackimage3,
            genre: "Action",
            year: "2019",
        },
        {
            name: "Movie 3",
            rating: "4",
            img: hackimage3,
            genre: "Action",
            year: "2019",
        },
    ];

    return (
        <div style={{ backgroundColor: "#181818", padding: "20px" }}>
            <h2
                style={{
                    color: "rgba(255, 255, 255, 0.85)",
                    marginBottom: "1rem",
                    fontSize: "2rem",
                    fontWeight: "bold",
                }}
            >Watch What Your Friends Liked</h2>
            <div className="outer-container"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)", // 3 cards per row
                    gap: "20px", // Spacing between cards
                    justifyItems: "center", // Center each card horizontally
                    padding: "20px",
                }}>
                {cardDetails.map((details, index) => (
                    <CollaborativeCard key={index} details={details} />
                ))}
            </div>
        </div>
    );
}

export default Collaborative;
