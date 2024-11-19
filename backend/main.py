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
# from surprise import SVD, Reader, Dataset
# from surprise.model_selection import cross_validate

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


# ratings = pd.read_csv('/content/ratings_small.csv')  # User ratings dataset
# movies = pd.read_csv('/content/tmdb_5000_movies.csv')  # Movies dataset
@app.route('/collaborative')
def collaborative():
    return "Collaborative"

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