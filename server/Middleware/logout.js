const express = require('express');
// const { Cookie } = require('express-session');
const passport = require('passport');

async function logout(req, res, next){
    try{
        res.clearCookie('connect.sid');
        res.clearCookie('accessToken');
        next();
    }catch(error){
        res.status(500).json("error in logout");
    }
}

module.exports = {
    logout
}