'use strict';
const axios = require('axios');

const getEpisode = async (id) => {
    let url = `https://api.jikan.moe/v3/anime/${id}/episodes`;
    const response = await axios(url);
    const { data, status } = response;
    if (status >= 200 && status < 300) {
        var episode = [];
        data.genres.forEach(g => {
            if (ids.includes(g.id)) {
                episode.push(g.name.toLowerCase());
            }
        });
        return episode;
    } else {
        console.error(status);
        return false;
    }
}

const getPerson = async (id) => {
    let url = `https://api.themoviedb.org/3/person/${id}?api_key=${config.TMDB}&language=en-US`;
    const response = await axios(url);
    const { data, status } = response;
    if (status >= 200 && status < 300) {
        //console.log(data);
        return data;
    } else {
        console.error(status);
        return false;
    }

}

const getMovieData = async (movie, releaseYear = null) => {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${config.TMDB}&language=en-US&query=${movie}&year=${releaseYear}`;
    const response = await axios(url);
    const { data, status } = response;
    if (status >= 200 && status < 300) {
        //console.log(data.results[0]);
        return data.results[0];
    } else {
        console.error(status);
        return false;
    }
}

const getCredits = async (movie, releaseYear = null) => {
    let data_id = await getMovieData(movie, releaseYear);
    if (data_id) {
        let id = data_id.id;
        let title = data_id.title;
        let url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${config.TMDB}&language=en-US`;
        const response = await axios(url);
        const { data, status } = response;
        if (status >= 200 && status < 300) {
            data['title'] = title;
            return data;
        } else {
            console.error(status);
            return false;
        }
    }
}

const extractIntent = nlp => {
    try {
        const int = nlp.intents[0];
        const con = int.confidence;
        if (int && con >= 0.8) {
            return int.name;
        }
    } catch (error) { }
    return false;
}

const extractEntity = (nlp, entity) => {
    try {
        const ent = nlp.entities[entity][0];
        const con = ent.confidence;
        if (ent && con >= 0.8) {
            return ent.value;
        }
    } catch (error) { }
    return false;
}
