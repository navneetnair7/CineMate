import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgimage from "../assets/collage-of-movie-posters-g2fdqahxlakaa7yq.jpg";
import axios from "axios";

const Preferences = () => {
  const containerStyles = {
    minHeight: "100vh",
    backgroundImage: `url(${bgimage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  };

  const overlayStyles = {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 1,
  };

  const formContainerStyles = {
    width: "100%",
    maxWidth: "28rem",
    padding: "2rem",
    borderRadius: "0.75rem",
    border: "2px solid #dc2626",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 2,
  };

  const [language, setLanguage] = useState([]);
  const [genre, setGenre] = useState([]);
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const navigate = useNavigate();

  const handleLanguageSelection = (lang) => {
    setLanguage((prev) =>
      prev.includes(lang)
        ? prev.filter((item) => item !== lang)
        : [...prev, lang]
    );
  };

  const handleGenreSelection = (gen) => {
    setGenre((prev) =>
      prev.includes(gen) ? prev.filter((item) => item !== gen) : [...prev, gen]
    );
  };

  const handleSubmit = async () => {
    await axios
      .post("http://localhost:5000/preferences", {
        genre: genre,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log({ language, genre, startYear, endYear });
    navigate("/home");
  };

  return (
    <div style={containerStyles}>
      <div style={overlayStyles}>
        <div style={formContainerStyles} class="container">
          <h2 className="text-3xl font-bold mb-8 text-center text-white font-['Poppins', sans-serif]">
            Let's get you started!
          </h2>
          <div className="space-y-6">
            {/* Language Selection */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white font-['Quicksand', sans-serif]">
                Select Language
              </h3>
              <div className="flex gap-2 flex-wrap">
                {["English", "Hindi", "Marathi", "Tamil"].map((lang) => (
                  <button
                    key={lang}
                    className={`px-3 py-2 rounded-lg ${
                      language.includes(lang)
                        ? "bg-red-600 text-white"
                        : "bg-gradient-to-r from-red-900/10 to-red-800/10 border border-red-500/30 text-white"
                    }`}
                    onClick={() => handleLanguageSelection(lang)}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Genre Selection */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white font-['Quicksand', sans-serif]">
                Preferred Genre
              </h3>
              <input
                name="genre"
                id="genre"
                className="w-full h-12 px-4 rounded-lg bg-gradient-to-r from-red-900/10 to-red-800/10 
                border border-red-500/30 text-white placeholder-gray-400 focus:outline-none 
                focus:border-red-500 focus:ring-1 focus:ring-red-500"
                placeholder="Action, Comedy, Drama"
                required
                // value={genre}
                onChange={() =>
                  handleGenreSelection(document.getElementById("genre").value)
                }
              />
            </div>

            {/* Rating Selection */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white font-['Quicksand', sans-serif]">
                Ratings
              </h3>
              <div className="flex gap-2 flex-wrap">
                {["5", "4 & Above", "3 & Above", "Less than 3"].map((gen) => (
                  <button
                    key={gen}
                    className={`px-3 py-2 rounded-lg ${
                      genre.includes(gen)
                        ? "bg-red-600 text-white"
                        : "bg-gradient-to-r from-red-900/10 to-red-800/10 border border-red-500/30 text-white"
                    }`}
                  >
                    {gen}
                  </button>
                ))}
              </div>
            </div>

            {/* Info Text */}
            <p className="text-sm text-gray-400 font-['Quicksand', sans-serif]">
              * This input data will be used to generate initial recommendations
              for you.
            </p>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full py-3 px-4 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition duration-200 ease-in-out"
            >
              Suggest me Movies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
