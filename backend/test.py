import pandas as pd
import ast
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.impute import SimpleImputer
import numpy as np

# Load the ratings and movies dataset
ratings = pd.read_csv('dataset/ratings_small.csv')  # User ratings dataset
movies = pd.read_csv('dataset/movies_metadata.csv')  # Movie metadata (with genres)

# Step 1: Extract and clean genres from the 'genres' column
def extract_genres(genre_str):
    try:
        genre_list = ast.literal_eval(genre_str)  # Convert string to list of dictionaries
        return [genre['name'] for genre in genre_list]  # Extract genre names
    except (ValueError, SyntaxError):  # Handle invalid formats
        return []

movies['genres'] = movies['genres'].apply(extract_genres)

# Step 2: Rename the 'id' column to 'movieId' to match ratings dataset
movies.rename(columns={'id': 'movieId'}, inplace=True)

# Step 3: Create a user-item matrix
user_item_matrix = ratings.pivot(index='userId', columns='movieId', values='rating')

# Fill missing ratings with 0 (or you can use other strategies, e.g., mean imputation)
imputer = SimpleImputer(strategy='constant', fill_value=0)
user_item_matrix_filled = pd.DataFrame(
    imputer.fit_transform(user_item_matrix),
    index=user_item_matrix.index,
    columns=user_item_matrix.columns
)

# Step 4: Compute user-user similarity using cosine similarity
user_similarity = cosine_similarity(user_item_matrix_filled)

# Convert similarity matrix to a DataFrame for easier manipulation
user_similarity_df = pd.DataFrame(user_similarity, index=user_item_matrix.index, columns=user_item_matrix.index)

# Step 5: Find the top genres for a user based on their top-rated movies
def calculate_top_genres(user_id, movies, ratings, n_top_movies=10):
    """Get top genres for a given user based on their top-rated movies."""
    user_ratings = ratings[ratings['userId'] == user_id]
    top_movies = user_ratings.sort_values('rating', ascending=False).head(n_top_movies)
    top_movie_ids = top_movies['movieId']
    
    # Extract genres for the top movies
    genres = movies[movies['movieId'].isin(top_movie_ids)]['genres']
    genre_counts = {}
    for genre_list in genres:
        for genre in genre_list:  # Iterate over the list of genres
            genre_counts[genre] = genre_counts.get(genre, 0) + 1
    
    # Return top 3 genres
    return sorted(genre_counts, key=genre_counts.get, reverse=True)[:3]

# Step 6: Calculate top genres for each user
user_top_genres = {user_id: calculate_top_genres(user_id, movies, ratings) for user_id in ratings['userId'].unique()}

# Convert top genres to a DataFrame
top_genres_df = pd.DataFrame(list(user_top_genres.items()), columns=['userId', 'top_genres'])
top_genres_df['top_genres'] = top_genres_df['top_genres'].apply(lambda x: ', '.join(x))

# Step 7: Allow user to input genres
input_genres = ['Drama', 'Romance', 'Comedy']  # User input (this could be dynamic)

# Define a function to calculate Jaccard similarity
def genre_similarity(input_genres, user_genres):
    intersection = len(set(input_genres).intersection(user_genres))
    union = len(set(input_genres).union(user_genres))
    return intersection / union

# Step 8: Find the most similar users based on genre similarity
top_genres_df['similarity'] = top_genres_df['top_genres'].apply(
    lambda user_genres: genre_similarity(input_genres, user_genres.split(', '))
)

# Get the top 2 most similar users
top_2_similar_users = top_genres_df.nlargest(2, 'similarity')[['userId', 'similarity']]

# Step 9: Recommend movies for the new user based on similar users
all_recommended_movies = []

for user_id in top_2_similar_users['userId']:
    # Get the top-rated movies of the similar user
    user_ratings = ratings[ratings['userId'] == user_id]
    top_movies = user_ratings.sort_values('rating', ascending=False).head(5)
    
    # Add these movies to the recommendation list
    for _, row in top_movies.iterrows():
        movie_id = row['movieId']
        movie_title = movies[movies['movieId'] == movie_id]['title'].values[0]
        genres = movies[movies['movieId'] == movie_id]['genres'].values[0]
        all_recommended_movies.append({'movieId': movie_id, 'title': movie_title, 'genres': genres, 'rating': row['rating']})

# Remove duplicates based on movieId
recommended_movies_df = pd.DataFrame(all_recommended_movies).drop_duplicates(subset='movieId')

# Step 10: Display the recommendations
print("Recommended Movies for New User based on similar genre preferences:")
for _, row in recommended_movies_df.iterrows():
    print(f"Movie: {row['title']}, Rating: {row['rating']:.2f}, Genres: {', '.join(row['genres'])}")