// import React from "react"
// import { useState } from "react";

// function CollaborativeCard(props) {
//     const { name, rating, img, genre, year } = props.details;
//     const [isLiked, setIsLiked] = useState(false);

//     const handleLikeClick = (e) => {
//         e.stopPropagation(); // Prevent card hover effect when clicking heart
//         setIsLiked(!isLiked);
//     };

//     return (
//         <div
//             className="card-container shadow-lg rounded-lg overflow-hidden bg-white p-4"
//             style={{
//                 color: "rgba(255, 255, 255, 0.85)",
//                 width: "16rem", // Changed to rem
//                 height: "24rem", // Changed to rem
//                 border: "2px solid red",
//                 backgroundColor: "transparent",
//                 borderRadius: "8px",
//                 padding: "1rem", // Adjusted padding
//                 margin: "0.5rem", // Adjusted margin 
//                 boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                 cursor: "pointer",
//                 position: "relative", // Added for transform-origin
//                 transformStyle: "preserve-3d", // Enables 3D effects
//                 transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
//             }}
//             onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = "scale3d(1.1, 1.1, 1.1) translateY(-8px)";
//                 e.currentTarget.style.boxShadow = "0 20px 30px rgba(255, 0, 0, 0.3)";
//                 e.currentTarget.style.borderColor = "#ff0000";
//                 e.currentTarget.style.zIndex = "10";
//             }}
//             onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = "scale3d(1, 1, 1) translateY(0)";
//                 e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
//                 e.currentTarget.style.borderColor = "red";
//                 e.currentTarget.style.zIndex = "1";
//             }}
//         >
//             {img && (
//                 <img
//                     style={{ width: "100%", height: "15rem" }}
//                     src={img}
//                     alt={name}
//                     className="object-cover rounded-md"
//                 />
//             )}
//             <div className="p-2" style={{ gap: "0.25rem" }}>
//                 <h3
//                     style={{
//                         fontSize: "1.5rem",
//                         fontWeight: "800",
//                         fontFamily: "'Poppins', sans-serif",
//                         margin: "0",
//                         color: "rgba(255, 255, 255, 0.85)",
//                     }}
//                 >
//                     {name} {year}
//                 </h3>
//                 <p
//                     style={{
//                         fontSize: "1.2rem",
//                         fontStyle: "italic",
//                         fontFamily: "'Playfair Display', serif",
//                         margin: "0.2rem 0 0",
//                         color: "rgba(255, 255, 255, 0.85)",
//                     }}
//                 >
//                     {genre}
//                 </p>
//                 <p
//                     style={{
//                         fontSize: "1.2rem",
//                         fontFamily: "'Playfair Display', serif",
//                         margin: "0.2rem 0 0",
//                         color: "rgba(255, 255, 255, 0.85)",
//                     }}
//                 >
//                     Rated {rating}
//                 </p>
//             </div>
//         </div>
//     );
// }

// export default CollaborativeCard;

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function CollaborativeCard(props) {
    const { name, rating, img, genre, year } = props.details;
    const [isLiked, setIsLiked] = useState(false);

    const handleLikeClick = (e) => {
        e.stopPropagation(); // Prevent card hover effect when clicking heart
        setIsLiked(!isLiked);
    };

    return (
        <div
            className="card-container shadow-lg rounded-lg overflow-hidden bg-white p-4"
            style={{
                color: "rgba(255, 255, 255, 0.85)",
                width: "16rem",
                height: "24rem",
                border: "2px solid red",
                backgroundColor: "transparent",
                borderRadius: "8px",
                padding: "1rem",
                margin: "0.5rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                position: "relative", // Added for positioning heart icon
                transformStyle: "preserve-3d",
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale3d(1.1, 1.1, 1.1) translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 20px 30px rgba(255, 0, 0, 0.3)";
                e.currentTarget.style.borderColor = "#ff0000";
                e.currentTarget.style.zIndex = "10";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale3d(1, 1, 1) translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
                e.currentTarget.style.borderColor = "red";
                e.currentTarget.style.zIndex = "1";
            }}
        >
            {img && (
                <div style={{ position: "relative" }}>
                    <img
                        style={{ width: "100%", height: "15rem", objectFit: "cover" }}
                        src={img}
                        alt={name}
                        className="object-cover rounded-md"
                    />
                    {/* Heart Button */}
                    <button
                        onClick={handleLikeClick}
                        style={{
                            position: "absolute",
                            top: "12rem",
                            right: "-0.5rem",
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faHeart}
                            style={{
                                color: isLiked ? "red" : "white", // Toggle color
                                fontSize: "2rem",
                                textShadow: "0 0 5px rgba(0, 0, 0, 0.5)", // Glow effect
                            }}
                        />
                    </button>
                </div>
            )}
            <div className="p-2" style={{ gap: "0.25rem" }}>
                <h3
                    style={{
                        fontSize: "1.5rem",
                        fontWeight: "800",
                        fontFamily: "'Poppins', sans-serif",
                        margin: "0",
                        color: "rgba(255, 255, 255, 0.85)",
                    }}
                >
                    {name} {year}
                </h3>
                <p
                    style={{
                        fontSize: "1.2rem",
                        fontStyle: "italic",
                        fontFamily: "'Playfair Display', serif",
                        margin: "0.2rem 0 0",
                        color: "rgba(255, 255, 255, 0.85)",
                    }}
                >
                    {genre}
                </p>
                <p
                    style={{
                        fontSize: "1.2rem",
                        fontFamily: "'Playfair Display', serif",
                        margin: "0.2rem 0 0",
                        color: "rgba(255, 255, 255, 0.85)",
                    }}
                >
                    Rated {rating}
                </p>
            </div>
        </div>
    );
}

export default CollaborativeCard;
