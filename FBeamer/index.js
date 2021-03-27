'use strict'

const crypto = require('crypto');
const request = require('request');
const apiVersion = 'v9.0';


class FBeamer {

    constructor({ pageAccessToken, VerifyToken, appSecret}) {
        try {
            if (pageAccessToken && VerifyToken) {
                this.pageAccessToken = pageAccessToken;
                this.VerifyToken = VerifyToken;
                this.appSecret = appSecret;
            } else {
                throw new Error('One or more tokens/credentials are missing !');
            }
        } catch (e) {
            console.log(e);
        }
    }

    registerHook(req, res) {
        const params = req.query;
        const mode = params['hub.mode'];
        const token = params['hub.verify_token'];
        const challenge = params['hub.challenge'];

        try {
            if (mode && token && mode === 'subscribe' && token === this.VerifyToken) {
                console.log('Webhook registered !');
                return res.status(200).send(challenge);
            } else {
                throw new Error('Could not register Webhook !');
                return res.sendStatus(200);
            }
        } catch (e) {
            console.log(e);
        }
    } 

    verifySignature(req, res, buf) {
        return (req, res, buf) => {
            if (req.method === 'POST') {
                try {
                    const signature = req.headers['x-hub-signature'];
                    if (!signature) {
                        throw new Error('Signature not received!');
                    } else {
                        const hash = crypto.createHmac('sha1', this.appSecret).update(buf, 'utf-8');
                        // signature is in the form: sha1=<some_hash>
                        if (hash.digest('hex') !== signature.split('=')[1]) {
                            throw new Error('Invalid signature!');
                        }
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }

    incoming(req, res, cb) {
        res.sendStatus(200)
        if (req.body.object == 'page' && req.body.entry) {
            let data = req.body
            data.entry.forEach(entry => {
                entry.messaging.forEach(messageObj => {
                    return cb(this.messageHandler(messageObj))
                });
            });
        }
    }

    messageHandler(obj) {
        let sender = obj.sender.id;
        let message = obj.message;
        if (message.text) {
            let obj =
            {
                sender,
                type: 'text',
                content: message.text
            }
            return obj;
        }
    }


    sendMessage(payload) {
        return new Promise((resolve, reject) => {
            request({
                uri: 'https://graph.facebook.com/v9.0/me/messages',
                qs: {
                    access_token: this.pageAccessToken
                },
                method: 'POST',
                json: payload
            }, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    console.log("if")
                    resolve({ mid: body.message_id });

                }
                else {
                    console.log("else")
                    reject(error);
                }
            });
        });
    }

    txt(id, text, messaging_type = 'RESPONSE') {

        let obj = {
            messaging_type,
            recipient: { id },
            message: { text }
        }
        console.log(obj)
        return this.sendMessage(obj)
    }


    img(id, url, messaging_type = 'RESPONSE') {
        const obj = {
            messaging_type,
            recipient: { id },
            message: {
                attachment: {
                    type: 'image',
                    payload: {
                        url
                    }
                }
            }
        }
        return this.sendMessage(obj);
    }


}

module.exports = FBeamer;

