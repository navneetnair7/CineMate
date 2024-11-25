from flask import Flask, request, jsonify
import requests
import json
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
# matplotlib inline
import seaborn as sns
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from ast import literal_eval
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS
# from surprise import SVD, Reader, Dataset
# from surprise.model_selection import train_test_split

df_credits=pd.read_csv('dataset/tmdb_5000_credits.csv')
df_movies=pd.read_csv('dataset/tmdb_5000_movies.csv')
df_metadata = pd.read_csv('dataset/movies_metadata.csv')

df_credits.columns=['id', 'title', 'cast', 'crew']
df_movies.drop(['title'], axis=1, inplace=True)
df_movielens=pd.merge(df_credits,df_movies,on='id')

df_movielens['vote_average'].mean()
df_movielens['vote_count'].quantile(q=0.9)
df_filtered=df_movielens[df_movielens['vote_count']>df_movielens['vote_count'].quantile(q=0.9)]

# function to calculate the score of individual movies
def movie_score(x):
    v=x['vote_count']
    m=df_movielens['vote_count'].quantile(q=0.9)
    R=x['vote_average']
    C=df_movielens['vote_average'].mean()
    return ((R*v)/(v+m))+((C*m)/(v+m))


df_filtered['score']=df_filtered.apply(movie_score, axis=1)
df_highscore=df_filtered.sort_values(by='score', ascending=False).head(10)

def content_recommendations(title, cosine_sim):
    idx = indices[title]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores.sort(key=lambda x: x[1], reverse=True)
    sim_scores=sim_scores[1:11]
    ind=[]
    for (x,y) in sim_scores:
        ind.append(x)
    tit=[]
    for x in ind:
        tit.append(df_movielens.iloc[x]['title'])
    filtered_df = df_metadata[df_metadata['title'].isin(tit)]
    filtered_df = filtered_df.drop_duplicates(subset='title', keep='first')
    filtered_df = filtered_df.set_index('title').reindex(tit).reset_index()
    poster_paths = filtered_df['poster_path'].tolist()
    poster_paths = []
    for i in range(len(tit)):
        req = requests.get(f"http://www.omdbapi.com/?t={tit[i].replace(' ', '%20')}&apikey=2d02d8f5").json()
        # print(req)
        poster_paths.append(req.get('Poster'))
    top_json = dict(zip(tit, poster_paths))
    return top_json

def get_director(x):
    if isinstance(x, str):
        try:
            x = json.loads(x)
        except json.JSONDecodeError:
            print(f"Error decoding JSON: {x}")
            return 'NaN'
    
    if isinstance(x, list):
        for a in x:
            if isinstance(a, dict) and a.get('job') == 'Director':
                return a.get('name', 'NaN')
    return 'NaN'

def get_top3(x):
    new = []
    if isinstance(x, str):
        try:
            x = json.loads(x)
        except json.JSONDecodeError:
            print(f"Error decoding JSON: {x}")
            return []
        
    if isinstance(x, list):
        for a in x[:3]:
            if isinstance(a, dict) and 'name' in a:
                new.append(a['name'])
    
    return new

def clean_director(x):
    return x.lower().replace(' ','')

def clean_top3(x):
    new=[]
    for a in x:
        new.append(a.lower().replace(' ',''))
    return new

def create_soup(x):
    return ' '.join(x['keywords']) + ' ' + ' '.join(x['actor']) + ' ' + x['director'] + ' ' + ' '.join(x['genres'])

# Step 5: Function to calculate genre similarity between user input and other users
def genre_similarity(input_genres, user_genres):
    # Calculate Jaccard similarity between input_genres and user_genres
    intersection = len(set(input_genres).intersection(user_genres))
    union = len(set(input_genres).union(user_genres))
    return intersection / union

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def home():
    return "Hello World"

# route to get the top 10 movies in general based on the rating
@app.route('/top10', methods=['GET'])
def top_10_movies():
    top_movies = df_highscore['title'].tolist()
    # filtered_df = df_metadata[df_metadata['title'].isin(top_movies)]
    # filtered_df = filtered_df.drop_duplicates(subset='title', keep='first')
    # filtered_df = filtered_df.set_index('title').reindex(top_movies).reset_index()
    # poster_paths = filtered_df['poster_path'].tolist()
    # for i in range(len(poster_paths)):
    #     if pd.notna(poster_paths[i]):
    #         poster_paths[i] = 'https://image.tmdb.org/t/p/original' + poster_paths[i]
    #     else:
    #         poster_paths[i] = None
    poster_paths = []
    for i in range(len(top_movies)):
        req = requests.get(f"http://www.omdbapi.com/?t={top_movies[i].replace(' ', '%20')}&apikey=2d02d8f5").json()
        # print(req)
        poster_paths.append(req.get('Poster'))
    top_json = dict(zip(top_movies, poster_paths))
    return top_json

# route to get the top 10 movies based on popularity
@app.route('/top_popular', methods=['GET'])
def top_popular_movies():
    df_popular= df_movielens.sort_values('popularity', ascending=False).head(10)
    # df_popular[['title', 'vote_count', 'vote_average', 'popularity']]
    df_popular = df_popular['title'].tolist()
    poster_paths = []
    for i in range(len(df_popular)):
        req = requests.get(f"http://www.omdbapi.com/?t={df_popular[i].replace(' ', '%20')}&apikey=2d02d8f5").json()
        poster_paths.append(req.get('Poster'))
    top_json = dict(zip(df_popular, poster_paths))
    return top_json


# Step 1: Load the datasets
# ratings = pd.read_csv('/content/ratings_small.csv')  # User ratings dataset
# movies = pd.read_csv('/content/tmdb_5000_movies.csv')  # Movies dataset
# Step 2: Prepare Surprise dataset
# reader = Reader(rating_scale=(0.5, 5.0))
# data = Dataset.load_from_df(ratings[['userId', 'movieId', 'rating']], reader)

# Step 3: Train the SVD model
# trainset, testset = train_test_split(data, test_size=0.2)
# svd = SVD()
# svd.fit(trainset)

# Step 4: Predict ratings for all movies for each user
# all_users = ratings['userId'].unique()
# user_top_genres = {}

# for user_id in all_users:
#     # Predict ratings for all movies for this user
#     predictions = [(row['movieId'], svd.predict(user_id, row['movieId']).est, row['genres'])
#                    for _, row in df_movielens.iterrows()]

#     # Sort predictions by estimated rating in descending order
#     predictions.sort(key=lambda x: x[1], reverse=True)

#     # Get the top genres from the top-rated movies
#     top_genres = {}
#     for _, _, genres in predictions[:10]:  # Top 10 movies
#         for genre in genres:  # Directly iterate over the list of genres
#             top_genres[genre] = top_genres.get(genre, 0) + 1

#     # Store the top 3 genres for the user
#     sorted_genres = sorted(top_genres.items(), key=lambda x: x[1], reverse=True)[:3]
#     user_top_genres[user_id] = [genre for genre, _ in sorted_genres]

# Step 5: Store results in a DataFrame
# top_genres_df = pd.DataFrame(list(user_top_genres.items()), columns=['userId', 'top_genres'])
# top_genres_df['top_genres'] = top_genres_df['top_genres'].apply(lambda x: ', '.join(x))
user_genre_json = {}
flag = False
@app.route('/preferences', methods=['POST'])
def collaborative():
    data = request.get_json()
    input_genres = data['genre']
    print(input_genres)
    if not flag:
        movies = ["Galaxy Quest", "The Thomas Crown Affair", "Flags of Our Fathers", "Space Jam", "We're no angels", "Men in Black II", "Cold Mountain", "Cars"]
    else:
        movies = []
    output_json = {}
    poster_paths = []
    for i in range(len(movies)):
        req = requests.get(f"http://www.omdbapi.com/?t={movies[i].replace(' ', '%20')}&apikey=2d02d8f5").json()
        poster_paths.append(req.get('Poster'))
    top_json = dict(zip(movies, poster_paths))
    global user_genre_json
    user_genre_json = top_json
    print(user_genre_json)
    return {}

    # Step 6: Calculate similarity for each user based on their top genres
    top_genres_df['similarity'] = top_genres_df['top_genres'].apply(lambda user_genres: genre_similarity(input_genres, user_genres.split(', ')))

    # Step 7: Find top 2 most similar users based on genre similarity
    top_2_similar_users = top_genres_df.nlargest(2, 'similarity')[['userId', 'similarity']]

    # Step 8: Print the most similar users and their favorite genres
    print("Most Similar Users Based on Genre Preferences:")
    for _, row in top_2_similar_users.iterrows():
        user_id = row['userId']
        similarity = row['similarity']
        user_fav_genres = top_genres_df[top_genres_df['userId'] == user_id]['top_genres'].values[0]
        print(f"User {user_id} with similarity {similarity:.2f} has favorite genres: {user_fav_genres}")

    user_top_movies = {}

    for user_id in top_2_similar_users['userId']:
        # Get predictions for all movies for this user
        predictions = [(row['movieId'], svd.predict(user_id, row['movieId']).est, row['genres'])
                    for _, row in df_movielens.iterrows()]

        # Sort predictions by estimated rating
        predictions.sort(key=lambda x: x[1], reverse=True)

        # Store the top 5 movies for this user
        user_top_movies[user_id] = predictions[:5]

    # Step 9: Combine the top 5 movies from both users and remove duplicates
    all_recommended_movies = []
    for user_id, top_movies in user_top_movies.items():
        for movie in top_movies:
            movie_id, est_rating, genres = movie
            movie_title = df_movielens[df_movielens['movieId'] == movie_id]['title'].values[0]
            all_recommended_movies.append({'userId': user_id, 'movieId': movie_id, 'title': movie_title,
                                        'estimated_rating': est_rating, 'genres': genres})

    # Remove duplicates based on movieId to get unique movie recommendations
    recommended_movies_df = pd.DataFrame(all_recommended_movies)
    recommended_movies_df = recommended_movies_df.drop_duplicates(subset='movieId')

    # Step 10: Display the results
    print("Recommended Movies for New User based on similar genre preferences:")
    for _, row in recommended_movies_df.iterrows():
        print(f"Movie: {row['title']}, Estimated Rating: {row['estimated_rating']:.2f}, Genres: {', '.join(row['genres'])}")

@app.route('/getGenre', methods=['GET'])
def getGenre():
    return user_genre_json

# route to get the top similar movies based on summary
df_movielens['overview'].head()
df_movielens['overview'].isnull().sum()
df_movielens['overview'].fillna(' ', inplace=True)
tfidfv=TfidfVectorizer(analyzer='word', stop_words='english')
tfidfv_matrix=tfidfv.fit_transform(df_movielens['overview'])
print(tfidfv_matrix.todense())
tfidfv_matrix.todense().shape
cosine_sim1 = linear_kernel(tfidfv_matrix, tfidfv_matrix)
cosine_sim1.shape
indices=pd.Series(data=list(df_movielens.index), index= df_movielens['title'] )
indices.head()
@app.route('/content')
def content():
    title = request.args.get('title')
    return jsonify(content_recommendations(title, cosine_sim1))

@app.route('/content_credits')
def content_credits():
    df_movielens['director']=df_movielens['crew'].apply(lambda x: get_director(x))
    df_movielens['actor']=df_movielens['cast'].apply(lambda x:get_top3(x))
    df_movielens[['title', 'actor', 'director', 'keywords', 'genres']].head(3)
    df_movielens['director']=df_movielens['director'].apply(lambda x: clean_director(x))
    df_movielens['actor']=df_movielens['actor'].apply(lambda x:clean_top3(x))
    df_movielens['keywords']=df_movielens['keywords'].apply(lambda x:clean_top3(x))
    df_movielens['genres']=df_movielens['genres'].apply(lambda x:clean_top3(x))
    df_movielens[['title', 'actor', 'director', 'keywords', 'genres']].head(3)
    df_movielens['soup'] = df_movielens.apply(create_soup, axis=1)
    cv = CountVectorizer(stop_words='english')
    cv_matrix = cv.fit_transform(df_movielens['soup'])
    cosine_sim2 = cosine_similarity(cv_matrix, cv_matrix)
    title = request.args.get('title')
    return jsonify(content_recommendations(title, cosine_sim2))

if __name__ == '__main__':
    app.run(port=5000, debug=True)