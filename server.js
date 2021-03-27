`use strict`;

const matcher = require('./matcher');
const express = require (`express`) ;
const bodyparser = require (`body-parser`) ;
const config = require(`./config`);
const FBeamer = require('./FBeamer');
const f=new FBeamer(config.FB);
const server = express () ;
const PORT = process.env.PORT||3000;
const sendResponse=require('./anime_bot');

server.post (`/`, bodyparser.json ({
    verify : f.verifySignature.call (f)
    }) ) ;
    server.post('/',(req,res,next)=>{
        return f.incoming(req,res,async data=>{
            try{
                if(data && data.type==='text'){
                    await sendResponse(f,data.sender,data.content);
                }
            }catch(e){
                console.log(e);
            }
        });
    });
        

server.get(`/`,(req,res) => f.registerHook(req,res));
server.listen (PORT , () => console.log ( `The bot server is
running on port ${ PORT } `) ) ;
