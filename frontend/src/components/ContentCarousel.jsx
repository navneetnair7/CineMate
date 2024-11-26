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
import axios from "axios";

export default function ContentCarousel({ slides }) {
  const [liked, setLiked] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [similarMoviesCredits, setSimilarMoviesCredits] = useState([]);
  const toggleLike = (index) => {
    setLiked((prevLiked) => ({
      ...prevLiked,
      [index]: !prevLiked[index],
    }));
  };
  const openModal = (index) => {
    setSelectedSlide(index);

    const fetchSimilarMovies = async () => {
      try {
        console.log(slides[index].name);

        const response = await axios
          .get(`http://localhost:5000/content?title=${slides[index].name}`)
          .then((response) => {
            console.log(response.data);
            const movies = [];
            for (var i in response.data) {
              movies.push({
                name: i,
                img: response.data[i],
              });
            }
            setSimilarMovies(movies);
          });
      } catch (error) {
        console.log(error);
      }
    };

    const fetchMoviesCredits = async () => {
      try {
        console.log(slides[index].name);
        const response = await axios
          .get(
            `http://localhost:5000/content_credits?title=${slides[index].name}`
          )
          .then((response) => {
            console.log(response.data);
            const movies = [];
            for (var i in response.data) {
              movies.push({
                name: i,
                img: response.data[i],
              });
            }
            setSimilarMoviesCredits(movies);
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchSimilarMovies();
    fetchMoviesCredits();
    setIsModalOpen(true);
  };

  return (
    <div className="relaive">
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
              onClick={() => openModal(index)}
              className="cursor-pointer relative w-96 h-[25rem] bg-gradient-to-t from-[#6B0000] to-transparent p-4"
            >
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
                    {slide.name}
                  </h3>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => {
              setIsModalOpen(false);
              setSimilarMovies([]);
              setSimilarMoviesCredits([]);
            }}
          ></div>
          {/* <div className="relative w-[90vw] bg-gray-900 rounded-lg overflow-hidden p-6"> */}
          {/* <div className="relative w-[90vw] max-w-[800px] max-h-[85vh] bg-gray-900 rounded-lg overflow-hidden p-6" >
            <div className="h-full overflow-y-auto" >
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSimilarMovies([]);
                  setSimilarMoviesCredits([]);
                }}
                className="absolute top-4 right-4 z-50 text-white hover:text-gray-300 p-2"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h2 className="text-3xl font-bold text-white mb-6">
                {slides[selectedSlide].name}
              </h2>

              <h4 className="text-lg text-white mb-6">
                Movies similar to {slides[selectedSlide].name}
              </h4>
              <Swiper
                slidesPerView={4}
                spaceBetween={16}
                navigation={true}
                modules={[Navigation]}
                className="w-full"
              >
                {similarMovies.map((slide, idx) => (
                  <SwiperSlide key={`modal-${idx}`}>
                    <div className="aspect-[2/3] rounded-lg overflow-hidden">
                      <img
                        src={slide.img}
                        alt={slide.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="m-10 text-white text-lg">
                Movies with similar cast
              </div>
              <Swiper
                slidesPerView={4}
                spaceBetween={16}
                navigation={true}
                modules={[Navigation]}
                className="w-full"
              >
                {similarMoviesCredits.map((slide, idx) => (
                  <SwiperSlide key={`modal-${idx}`}>
                    <div className="aspect-[2/3] rounded-lg overflow-hidden">
                      <img
                        src={slide.img}
                        alt={slide.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div> 
        </div> */}
          <div className="relative w-[90vw] max-w-[800px] max-h-[90vh] bg-gray-900 rounded-lg overflow-hidden p-6"
            style={{
              top: '5%', // Adjust the modal's vertical position
              position: 'relative', // Ensure it's positioned relative to the screen
              margin: '0 auto', // Center horizontally
            }}
          >
            {/* Scrollable Content */}
            <div className="h-full overflow-y-auto max-h-[80vh]">
              {/* Close button */}
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSimilarMovies([]);
                  setSimilarMoviesCredits([]);
                }}
                className="absolute top-4 right-4 z-50 text-white hover:text-gray-300 p-2"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Title */}
              <h2 className="text-3xl font-bold text-white mb-6">
                {slides[selectedSlide].name}
              </h2>

              <h4 className="text-lg text-white mb-6">
                Movies similar to {slides[selectedSlide].name}
              </h4>

              {/* Carousel 1 */}
              <Swiper
                slidesPerView={4}
                spaceBetween={16}
                navigation={true}
                modules={[Navigation]}
                className="w-full"
              >
                {similarMovies.map((slide, idx) => (
                  <SwiperSlide key={`modal-${idx}`}>
                    <div className="aspect-[2/3] rounded-lg overflow-hidden">
                      <img
                        src={slide.img}
                        alt={slide.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Second Section Title */}
              <div className="m-10 text-white text-lg">Movies with similar cast</div>

              {/* Carousel 2 */}
              <Swiper
                slidesPerView={4}
                spaceBetween={16}
                navigation={true}
                modules={[Navigation]}
                className="w-full"
              >
                {similarMoviesCredits.map((slide, idx) => (
                  <SwiperSlide key={`modal-${idx}`}>
                    <div className="aspect-[2/3] rounded-lg overflow-hidden">
                      <img
                        src={slide.img}
                        alt={slide.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      )
      }
    </div >
  );
}
