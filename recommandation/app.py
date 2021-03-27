from flask import Flask, request, jsonify
import pandas as pd
import re
import math
import numpy as np
from numpy import linalg as LA

app = Flask(__name__)

@app.route('/api/recommandation_anime', methods=['POST'])

def extractor(anime,line):
    linedata = anime.iloc[line]
    # Title and date extraction
    chain = linedata[1].split(" ")

    # Title
    title = ""
    for i in range (len(chain)-1):
        title += chain[i]
        if i != len(chain)-2:
            title += " "
    genrelist = linedata[3]
    type_anime=linedata[4]
    return str(linedata[0]), title, type_anime, eval(genrelist)

def normalize(df):
    for index , row in df.iterrows(): 
        nbofgenres = len(df.iloc[index,12])
        for i in range(len(df.iloc[index,13:])):
               if df.iloc[index,13+i]==1:
                    df.iloc[index,13+i] = df.iloc[index,13+i]/math.sqrt(nbofgenres)

def recommandation_anime(user_anime,n):
    anime = pd.read_csv('myAnimeListDataset.csv')
    animeId = []
    title = []
    type_animes = []
    genres=[]

    for i in range(anime.shape[0]):
        mid, tit, typ, gen = extractor(anime,i)
        animeId.append(mid)
        title.append(tit)
        type_animes.append(typ)
        genres.append(gen)
    
    new_columns= list(anime.columns)
    anime_norm=pd.DataFrame(columns=new_columns)
    anime_norm['animeID'] = animeId
    anime_norm['name'] = title
    anime_norm['type'] = type_animes
    anime_norm = anime_norm.drop(columns=['genre'])

    genres_df = pd.DataFrame({"genre":list(genres)})
    anime_norm = anime_norm.join(genres_df)
    genres_ohe = pd.get_dummies(anime_norm.genre.apply(pd.Series).stack()).sum(level=0)
    anime_norm = anime_norm.join(genres_ohe)

    normalize(anime_norm)
    anime_norm=anime_norm.drop(columns=["premiered","type","episodes","producer","licensor","studio","source","scored","scoredBy","members"])
    genre=['Action', 'Adventure', 'Cars', 'Comedy', 'Dementia', 'Demons', 'Drama', 'Ecchi', 'Fantasy', 'Game', 'Harem', 'Hentai', 'Historical', 'Horror', 'Josei', 'Kids', 'Magic', 'Martial Arts', 'Mecha', 'Military', 'Music', 'Mystery', 'Parody', 'Police', 'Psychological', 'Romance', 'Samurai', 'School', 'Sci-Fi', 'Seinen', 'Shoujo', 'Shoujo Ai', 'Shounen', 'Shounen Ai', 'Slice of Life', 'Space', 'Sports', 'Super Power', 'Supernatural', 'Thriller', 'Vampire', 'Yaoi', 'Yuri']
    new_columns= ["rating"]+list(anime_norm.columns)
    user_input=pd.DataFrame(columns=new_columns)
    for i in range(len(user_anime)):
        anime_input=anime_norm[anime_norm['name']==user_anime[i][0]]
        user_input=user_input.append(anime_input)
        user_input.loc[user_input.name == user_anime[i][0], 'rating'] = int(user_anime[i][1])
    sums = list()
    for i in range(4,47):
        sum = 0
        for indice, row in user_input.iterrows():
            sum += row[i] * float(row['rating'])
        sums.append(sum)
    user_compute=pd.DataFrame([sums],columns=genre)
    best_recommanded_animes =[]
    list_movie_recommandations=[]
    for index,anime in anime_norm.iloc[:200, :].iterrows():
        c=user_compute.values.tolist()
        sum_value=0
        normc=LA.norm(c)
        m=anime[3:]
        normm=LA.norm(m)
        for i in range(len(c)):
            sum_value+=(c[0][i]*m[i])
        heuristic=sum_value/(normc*normm)
        list_movie_recommandations.append(heuristic)
    indexs = sorted(range(len(list_movie_recommandations)),key=lambda i: list_movie_recommandations[i])[-3:]
    for e in indexs:
        best_recommanded_animes.append(anime_norm.iloc[e, :].animeID)
    
    answer="\nWe recommand you to see : \n"
    for anime_reco in best_recommanded_animes:
        answer += str(anime_norm[anime_norm["animeID"]==anime_reco].name.to_string(index=False))
        answer += "\t|\t"

    return answer

app.run('0.0.0.0', 8000)