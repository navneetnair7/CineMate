import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function ContentCarousel({ slides }) {
    const [liked, setLiked] = useState({});
    const toggleLike = (index) => {
        setLiked((prevLiked) => ({
            ...prevLiked,
            [index]: !prevLiked[index],
        }));
    };

    return (
        <Swiper
            slidesPerView={3}
            spaceBetween={1} // Remove white space between slides
            freeMode={true}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[FreeMode, Pagination, Navigation]}
            className="mySwiper"
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                    <div
                        style={{
                            color: "rgba(255, 255, 255, 0.85)",
                            padding: "1rem",
                            width: "24rem",
                            height: "25rem",
                            position: "relative",
                            background: "linear-gradient(to top, #6B0000, transparent)", // Gradient
                        }}
                    >
                        <div
                            style={{
                                position: "relative",
                                width: "20rem",
                                height: "15rem",
                                margin: "0 auto",
                                borderRadius: "0",
                                overflow: "hidden", // Ensures the button stays within the image
                            }}
                        >
                            <img
                                src={slide.img}
                                alt={slide.name}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                            {/* Heart Button */}
                            <button
                                onClick={() => toggleLike(index)}
                                style={{
                                    position: "absolute",
                                    bottom: "0.5rem",
                                    right: "0.5rem",
                                    border: "none",
                                    background: "none",
                                    cursor: "pointer",
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faHeart}
                                    style={{
                                        color: liked[index] ? "red" : "white", // Toggle color
                                        fontSize: "2rem",
                                        textShadow: "0 0 5px rgba(0, 0, 0, 0.5)", // Slight glow
                                    }}
                                />
                            </button>
                        </div>
                        <div
                            style={{
                                textAlign: "center",
                                padding: "1rem 0",
                            }}
                        >
                            <h3
                                style={{
                                    fontSize: "1.5rem",
                                    fontWeight: "800",
                                    fontFamily: "'Poppins', sans-serif",
                                    margin: "0",
                                    color: "white",
                                }}
                            >
                                {slide.name} ({slide.year})
                            </h3>
                            <p
                                style={{
                                    fontSize: "1.2rem",
                                    fontStyle: "italic",
                                    fontFamily: "'Playfair Display', serif",
                                    margin: "0.2rem 0 0",
                                    color: "white",
                                }}
                            >
                                {slide.genre}
                            </p>
                            <p
                                style={{
                                    fontSize: "1.2rem",
                                    fontFamily: "'Playfair Display', serif",
                                    margin: "0.2rem 0 0",
                                    color: "white",
                                }}
                            >
                                Rated {slide.rating}
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
