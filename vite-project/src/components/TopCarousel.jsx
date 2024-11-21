// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation, Autoplay } from "swiper/modules";
// import carouselimg from "../assets/carouselimg.jpg";

// function TopCarousel({ slides }) {
//   const overlayStyles = {
//     content: '""',
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.4)',  
//     zIndex: 1,  
//   }

//   return (
//     <Swiper
//       slidesPerView={1}
//       spaceBetween={30}
//       navigation={true}
//       autoplay={{
//         delay: 3000,
//         disableOnInteraction: false,
//       }}
//       modules={[Navigation, Autoplay]}
//       className="mySwiper"
//       style={{
//         height: "500px", // Carousel height
//         backgroundImage: `url(${carouselimg})`, // Background image
//         backgroundSize: "cover", // Cover the entire container
//         backgroundPosition: "center", // Center the image
//       }}
//     >
//       {slides.map((slide, index) => (
//         <SwiperSlide key={index}>
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center", // Vertically center both elements
//               height: "100%",
//               width: "100%",
//               padding: "0 2rem", // Add padding for spacing
//             }}
//           >
//             <div style={overlayStyles}>
//               {/* Slide Image */}
//               <img
//                 src={slide.img}
//                 alt={slide.name}
//                 style={{
//                   height: "28rem", // Fixed height for the image
//                   width: "auto", // Maintain aspect ratio
//                   marginRight: "4rem", // Gap between the image and title
//                   marginLeft: "4rem",
//                 }}
//               />
//               {/* Slide Title */}
//               <h1
//                 style={{
//                   fontSize: "3rem", // Larger font for the title
//                   fontWeight: "900", // Stronger font weight
//                   fontFamily: "'Poppins', sans-serif", // Stylish font
//                   color: "white", // White text for better contrast
//                   margin: 0, // Remove default margins
//                   textAlign: "left", // Align text to the left
//                 }}
//               >
//                 {slide.name}
//               </h1>
//             </div>
//           </div>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// }

// export default TopCarousel;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import carouselimg from "../assets/carouselimg.jpg";

function TopCarousel({ slides }) {
  const overlayStyles = {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',  
    zIndex: 1,
  }

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
      style={{
        height: "500px", // Carousel height
        backgroundImage: `url(${carouselimg})`, // Background image
        backgroundSize: "cover", // Cover the entire container
        backgroundPosition: "center", // Center the image
      }}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            style={{
              display: "flex",
              alignItems: "center", // Vertically center both elements
              height: "100%",
              width: "100%",
              padding: "0 2rem", // Add padding for spacing
              position: "relative", // Ensure overlay can position correctly
            }}
          >
            <div style={overlayStyles}></div> {/* Apply the overlay */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                position: "relative", // Keep the image and title above the overlay
                zIndex: 2,
              }}
            >
              {/* Movie Image */}
              <img
                src={slide.img}
                alt={slide.name}
                style={{
                  height: "28rem", // Fixed height for the image
                  width: "auto", // Maintain aspect ratio
                  marginRight: "3rem", // Gap between the image and title
                  marginLeft: "5rem",
                  borderRadius: "8px", // Round corners for the image
                  boxShadow: "0 4px 12px rgba(0,0,0,0.6)", // Shadow to make the image pop
                }}
              />

              {/* Movie Title */}
              <h1
                style={{
                  fontSize: "3rem", // Larger font for the title
                  fontWeight: "900", // Stronger font weight
                  fontFamily: "'Poppins', sans-serif", // Stylish font
                  color: "white", // White text for better contrast
                  margin: 0, // Remove default margins
                  textAlign: "left", // Align text to the left
                  lineHeight: "1.2", // Adjust line height
                }}
              >
                {slide.name}
              </h1>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default TopCarousel;
