'use strict';
const matcher=require('../matcher');
const jikanjs  = require('jikanjs');
const axios  = require('axios');
const delay = ms => new Promise(res => setTimeout(res, ms));
var user_input=[];
function sendResponse(f,sender,reply){
    matcher(reply, async data => {
        try {
            switch (data.intent) {
                case 'Hello':
                    await f.txt(sender, `${data.entities.greeting} to you too!`);
                    await f.img(sender,'https://i.pinimg.com/originals/bb/c1/88/bbc188280bcaa0a1d6cdfb5524c1d506.jpg');
                    break;
                case 'Exit':
                    await f.txt(sender, `See you again !`);
                    await f.img(sender,'https://i.pinimg.com/originals/da/f5/2b/daf52baf8990f8b92e3756f82cc1a300.jpg');
                    break;

                case 'Add Anime':
                    var temp=[data.entities.anime_name,data.entities.rating];
                    user_input.push(temp);
                    await f.txt(sender, `Your anime has been succesfully added !`);
                    await f.txt(sender, `${user_input}`);
                    break;
                
                case 'Recommandation':
                    let enough_anime = false
                    if(user_input.length >= 2){
                        enough_anime = true
                    }
                    if(enough_anime){
                        try{
                            console.log("oui j'adore la vie")
                            res = await axios.post('http://localhost:8000/api/recommandation_anime', {user_anime: user_input, n:data.entities.number_recommandation})
                        }
                        catch{
                            f.txt(sender, "Sorry, We have an issue with the API Service");
                        }
                        await f.txt(sender, `${res.data['recommandation']}`);
                    }
                    else{
                        f.txt(sender, "Sorry, you don't have enough animes");
                    }
                    break;

                case 'Season':
                    await f.txt(sender, `Let me check...`);
                    jikanjs.loadSeason(data.entities.year,data.entities.season).then((response) => {
                        var i;
                        for (i=0;i<5;i++){
                            f.txt(sender,`${response.anime[i].title}: ${response.anime[i].score}`);
                            f.img(sender,`${response.anime[i].image_url}`)
                        }
                    }).catch((err) => {
                        f.txt(sender, "There seems to be a problem connecting to the Anime service.");
                    });
                    break;

                case 'Search':
                        await f.txt(sender, `Let me check...`);
                        console.log(data.entities.anime)
                        jikanjs.search('anime',data.entities.anime).then((response) => {
                            var i;
                            console.log(response)
                            for (i=0;i<5;i++){
                                f.txt(sender,`${response.results[i].title}: ${response.results[i].synopsis}`);
                                f.img(sender,`${response.results[i].image_url}`)
                            }
                            
                        }).catch((err) => {
                            f.txt(sender, "There seems to be a problem connecting to the Anime service.");
                        });
                        break;
                case 'Top':
                    await f.txt(sender, `Let me check...`);
                    await f.txt(sender, `Here is the top lead`);
                    jikanjs.loadTop('anime','1').then((response) => {
                        var i;
                        for (i=0;i<5;i++){
                            f.txt(sender,`${response.top[i].title}: ${response.top[i].score}`);
                            f.img(sender,`${response.top[i].image_url}`)
                        }
                    }).catch((err) => {
                        f.txt(sender, "There seems to be a problem connecting to the Anime service.");
                    });
                    break;
                case 'Schedule':
                    await f.txt(sender, `Let me check...`);
                    jikanjs.loadSchedule(data.entities.day).then((response) => {
                        var i;
                        if(data.entities.day=="monday"){
                            for (i=0;i<5;i++){
                            f.txt(sender,`${response.monday[i].title}: ${response.monday[i].score}`);
                            f.img(sender,`${response.monday[i].image_url}`)
                            }
                        }
                        if(data.entities.day=="tuesday"){
                            for (i=0;i<5;i++){
                                f.txt(sender,`${response.tuesday[i].title}: ${response.tuesday[i].score}`);
                                f.img(sender,`${response.tuesday[i].image_url}`)
                                }
                        }
                        if(data.entities.day=="wednesday"){
                            for (i=0;i<5;i++){
                                f.txt(sender,`${response.wednesday[i].title}: ${response.wednesday[i].score}`);
                                f.img(sender,`${response.wednesday[i].image_url}`)
                                }
                        }
                        if(data.entities.day=="thursday"){
                            for (i=0;i<5;i++){
                                f.txt(sender,`${response.thursday[i].title}: ${response.thursday[i].score}`);
                                f.img(sender,`${response.thursday[i].image_url}`)
                                }
                        }
                        if(data.entities.day=="friday"){
                            for (i=0;i<5;i++){
                                f.txt(sender,`${response.friday[i].title}: ${response.friday[i].score}`);
                                f.img(sender,`${response.friday[i].image_url}`)
                                }
                        }
                        if(data.entities.day=="saturday"){
                            for (i=0;i<5;i++){
                                f.txt(sender,`${response.saturday[i].title}: ${response.saturday[i].score}`);
                                f.img(sender,`${response.saturday[i].image_url}`)
                                }
                        }
                        if(data.entities.day=="sunday"){
                            for (i=0;i<5;i++){
                                f.txt(sender,`${response.sunday[i].title}: ${response.sunday[i].score}`);
                                f.img(sender,`${response.sunday[i].image_url}`)
                                }
                        }
                    }).catch((err) => {
                        f.txt(sender, "There seems to be a problem connecting to the Anime service.");
                    });
                    break;
                case 'Meta':
                    await f.txt(sender, `Let me check...`);
                    jikanjs.loadMeta(data.entities.type,data.entities.period).then((response) => {
                        console.log(response)
                        response.day_name.forEach(async element => {
                            f.txt(sender,`${element.title}: ${element.score}`);
                            f.img(sender,`${element.image_url}`)
                        })
                        
                    }).catch((err) => {
                        f.txt(sender, "There seems to be a problem connecting to the Anime service.");
                    });
                    break;
                case 'Later':
                        await f.txt(sender, `Let me check...`);
                        jikanjs.loadSeasonLater().then((response) => {
                            var i;
                            for (i=0;i<5;i++){
                                f.txt(sender,`${response.anime[i].title}: ${response.anime[i].synopsis}`);
                                f.img(sender,`${response.anime[i].image_url}`)
                                }
                            
                        }).catch((err) => {
                            f.txt(sender, "There seems to be a problem connecting to the Anime service.");
                        });
                    break;
                default:
                    await f.txt(sender, "I don't know what you mean :(");
            }
        }catch(e){
            console.log("Error occurred");
            await f.txt(sender, "An internal error occurred.");
        }
    });
}
module.exports=sendResponse;
