const models = require('../models');
const mUser = models.User
const tokenModels = models.Token
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const responApi = require('../controllers/apirespon');
const nodemailer = require('nodemailer');
const fs = require('fs');
const mTokenDevice = models.TokenDevice;
const path = require('path');


exports.cekSession = async(req, res, next) => {
    let token = req.body.token || req.query.token || req.headers["authorization"];
    if (!token) {
        return res.status(403).json("A token is required for authentication");
    }
    token = token.replace("Bearer ", "");

    try {
        const tokendb = await tokenModels.findOne({ where: { token: token } });
        if (!tokendb) {
            return responApi.v2respon400(req, res, "Invalid Token", null);
        } else{
            return next()
        }
        
    } catch (error) {
        return responApi.v2respon400(req, res, 'Internal Server Error', null);
    }
}