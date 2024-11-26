# Hybrid Movie Recommendation System

This is a **Hybrid Movie Recommendation System** built using **React** for the frontend and **Flask** for the backend. The system provides personalized movie recommendations based on both **user preferences** and **movie content metadata**. It combines various recommendation techniques to offer users the most relevant movie suggestions, helping them discover new films based on their interests.

### Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [System Architecture](#system-architecture)
5. [How It Works](#how-it-works)
6. [Future Scope](#future-scope)
7. [Installation & Setup](#installation--setup)
8. [Contributing](#contributing)
9. [License](#license)

---

## Project Overview

This project is a **Hybrid Movie Recommendation System** designed to provide users with movie recommendations based on their preferences, the content of movies, and metadata such as cast, genre, and movie length. The system integrates different recommendation strategies, including collaborative filtering, content-based filtering, and metadata-based recommendations, to generate more accurate and relevant suggestions for users.

Key features include:
- Personalized recommendations based on genres selected by the user.
- Top-rated and top-popular movie recommendations.
- Recommendations based on movie content (e.g., similar movies).
- Metadata-based recommendations (e.g., based on cast, length, etc.).
- Future enhancements that track user behavior to further personalize recommendations.

---

## Tech Stack

- **Frontend:** 
  - React (for building the user interface)
  
- **Backend:** 
  - Flask (Python web framework for handling API requests and recommendations)

- **Recommendation Techniques:**
  - **Collaborative Filtering** (for user-based recommendations)
  - **Content-based Filtering** (for movie content similarity)
  - **Metadata-based Recommendations** (using movie metadata such as cast, length, etc.)

- **Other Tools & Libraries:**
  - **NumPy, Pandas, Scikit-learn** (for implementing recommendation algorithms
  
---

## Features

1. **User Signup and Preferences:** 
   - When a new user signs up, they are asked to select their favorite movie genres. This helps the system make its first set of movie recommendations tailored to their interests.
   
2. **Top-Rated and Popular Movie Recommendations:** 
   - The system recommends popular and top-rated movies to ensure users have a variety of choices based on general trends in the movie industry.

3. **Movie Detail Page with Recommendations:**
   - When users click on a movie, they are provided with:
     - **Similar Movies**: Based on the content (e.g., genre, director, plot) of the selected movie.
     - **Metadata-based Recommendations**: Movies are recommended based on movie metadata like cast, length, and other attributes.
   
4. **Hybrid Recommendation Approach:**
   - The system combines **collaborative filtering**, **content-based filtering**, and **metadata-based recommendations** to offer a more diverse and accurate set of recommendations.

---

## System Architecture

The system is divided into two main components:

### 1. **Frontend (React):**
   - A user-friendly interface where users can sign up, select their preferred genres, and receive movie recommendations.
   - React communicates with the Flask backend via HTTP requests to fetch movie recommendations.
   - The frontend dynamically updates the UI to display recommended movies, movie details, and other user interactions.

### 2. **Backend (Flask):**
   - Flask serves as the backend API, handling requests for movie recommendations based on user preferences and movie content.
   - The backend integrates the different recommendation algorithms to generate personalized recommendations for each user.

### 3. **Recommendation Engine:**
   - The recommendation engine combines several strategies:
     - **Collaborative Filtering:** Recommends movies based on the preferences of similar users.
     - **Content-based Filtering:** Recommends movies similar to the content of the selected movie.
     - **Metadata-based Recommendations:** Recommends movies based on shared attributes such as cast, length, genre, etc.

---

## How It Works

1. **User Signup and Genre Selection:**
   - When a user signs up, they are prompted to choose their favorite genres (e.g., action, drama, comedy, etc.). This input is used to generate the initial set of movie recommendations.

2. **Top-Rated and Popular Movies:**
   - The system fetches and displays movies that are top-rated or have gained popularity among other users.

3. **Movie Detail and Recommendations:**
   - Once the user clicks on a movie, they are presented with:
     - **Similar Movies**: Based on the movie's content (e.g., shared genre or director).
     - **Metadata Recommendations**: Movies that share attributes such as cast, movie length, or production company.
   
4. **Hybrid Recommendation System:**
   - The backend API integrates multiple recommendation systems, combining:
     - **Collaborative Filtering:** Recommending movies liked by similar users.
     - **Content-based Filtering:** Suggesting movies with similar themes, genres, or directors.
     - **Metadata-based Filtering:** Using movie metadata (e.g., cast, production year) to recommend similar films.

---

## Future Scope

1. **User Behavior Tracking:**
   - Future improvements will include tracking how long users watch a movie, which movies they click on, and which movies they rate highly. This data will allow for:
     - **Personalized Recommendations** based on the user's watch history and interactions.
     - **Refining Recommendations** by understanding specific movie preferences and behavior patterns.
   
2. **Improved Recommendation Algorithms:**
   - Incorporating more advanced machine learning models, such as **neural networks** or **reinforcement learning**, to improve recommendation accuracy over time.

---

## Installation & Setup

### Prerequisites

- **Node.js** and **npm** (for frontend development)
- **Python 3.x** (for backend development)

### Steps

#### 1. Clone the repository:
```bash
git clone https://github.com/yourusername/hybrid-movie-recommendation.git
cd hybrid-movie-recommendation
```

#### 2. Set up the frontend:
```bash
cd frontend
npm install
npm run dev
```

#### 3. Set up the backend:
```bash
cd backend
python -m venv venv
./venv/Scripts/activate
pip install -r requirements.txt
```
