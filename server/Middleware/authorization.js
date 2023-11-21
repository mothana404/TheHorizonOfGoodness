const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const allbini = require('../Controllers/beneficiariesController');
// const Cookies = require('js-cookie');
// const cookieParser = require('cookie-parser');
require('dotenv').config();
// app.use(cookieParser());

async function authorize(req, res, next){
    try{
        if (!req.user){
        const tokenCookie = req.headers.cookie;
        if (tokenCookie) {
            const cookiesArray = tokenCookie.split(';');
            const accessTokenCookie = cookiesArray.find(cookie => cookie.trim().startsWith('accessToken='));
            if (accessTokenCookie) {
                const accessToken = accessTokenCookie.split('=')[1].trim();
                const user = jwt.verify(accessToken, process.env.SECRET_KEY);
                console.log(user);
                if(user.email){
                    console.log(user);
                    req.user = user;
                    next();
                }else{
                    res.status(401).json("unauthorized");
                }
                console.log(user);
            }
        }else {
            res.status(401).json("you need to login first");
        }
    }else{
        next();
    }
    }catch(error){
        res.status(400).json(error);
    }
};

async function userProfile(req, res, next){
    try{
        if (!req.user){
        const tokenCookie = req.headers.cookie;
        if (tokenCookie) {
            const cookiesArray = tokenCookie.split(';');
            const accessTokenCookie = cookiesArray.find(cookie => cookie.trim().startsWith('accessToken='));
            if (accessTokenCookie) {
                const accessToken = accessTokenCookie.split('=')[1].trim();
                const user = jwt.verify(accessToken, process.env.SECRET_KEY);
                if(user.email){
                    const Requests = await allbini.getAllRequest(user.id);
                    console.log(Requests)
                    res.render('userprofileView.ejs', {user, Requests});
                }else{
                    res.status(401).json("unauthorized");
                }
                console.log(user);
            }
        }else {
            res.status(401).json("you need to login first");
        }
        }else{
            let user = req.user;
            res.render('userprofileView.ejs', {user});
    }
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};



module.exports = {
    authorize,
    userProfile
};
