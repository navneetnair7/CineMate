import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

function TopCarousel({ slides }) {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      navigation={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Navigation, Autoplay]}
      className="mySwiper"
      style={{ height: "500px" }} // Adjust slide height
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            {/* Slide Image */}
            <img
              src={slide.img}
              alt={slide.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                color: "white",
                padding: "15px",
                borderRadius: "8px",
                maxWidth: "90%", // Semi-transparent background for better readability
                textAlign: "left", // Ensure left alignment
              }}
            >
              <h1
                style={{
                  margin: "0 0 10px 0",
                  fontSize: "3.5rem", // Larger movie title
                  fontWeight: "900", // Stronger font for the title
                  fontFamily: "'Poppins', sans-serif", // Beautiful strong font
                }}
              >
                {slide.name}
              </h1>
              <p style={{
                margin: "10px 0", fontSize: "1.8rem",
                fontWeight: "700", // Stronger font for the year
                fontFamily: "'Poppins', sans-serif"
              }}>
                {slide.year}
              </p>
              <p style={{
                margin: "10px 0", fontSize: "1.5rem", fontStyle: "italic", // Elegant italic style for genres
                fontFamily: "'Playfair Display', serif"
              }}>
                {slide.genre}
              </p>
              <p style={{
                margin: "0.5rem 0", fontSize: "1.5rem", fontStyle: "italic", fontFamily: "'Playfair Display', serif", display: "inline-flex",
                alignItems: "center"
              }}>
                Rated {slide.rating} <span style={{ fontSize: "1.2rem", margin: "0.5rem" }}> ⭐</span>
              </p>
            </div>
          </div>
        </SwiperSlide >
      ))
      }
    </Swiper >
  );
}

export default TopCarousel;
