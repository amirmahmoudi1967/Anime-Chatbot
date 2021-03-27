<h1 align="center">
  <br>
   <img src="https://static.hitek.fr/img/actualite/2017/04/25/fb_wall-e1.jpg"/>
  <br>
</h1>

## Introduction
This chatbot is about anime. You can ask him information about an anime, season, top tier anime list and even ask him to recommend you animes based on what you've already seen.
This chatbot is based on the JikanJS API which is a small Wrapper of the [Jikan](https://github.com/jikan-me/jikan) API. [Jikan](https://jikan.moe) is an unofficial [MyAnimeList](https://myanimelist.net) API.

It may not be running right know due to deployment issue, but you can watch the video to be sure that it is working!

## Requirements
* [Python](https://www.python.org/)
* [Node.js](https://nodejs.org/en/)
* [JikanJS](https://github.com/zuritor/jikanjs)

## How to use it ?
The chatbot is divided in **2 parts**. The Facebook messenger platform and the recommender system. The Facebook messenger is made in [JavaScript](https://www.javascript.com) and the recommender system is made in python, so we had to make an external API to link both. The recommendation part is also available in a python [notebook](./recommandation/Anime Recommandation.ipynb)
So, if you want to use the chatbot at home you will need to follow those steps:
- Get a Facebook Messenger app setup on the Facebook developers’s platform, to get a page token.
- Get a [LastFM](https://www.last.fm/) API key.
- Create a .env file following the [.env.example](/.env.example) file
- You can now run the chatbot with the command “npm run start” that will run the app and the python api
- Finally register the webhook to your app with the verify token you choose at the creation of your .env file.

**Your app is now up and running!**

## Demonstration
[![Chatbot](https://img.youtube.com/vi/PCf6l4FWhtE/0.jpg)](https://www.youtube.com/watch?v=PCf6l4FWhtE)

## All the command you can try
**Hello:**
![](/images/hello.png)

**Bye:**
![](/images/bye.png)
