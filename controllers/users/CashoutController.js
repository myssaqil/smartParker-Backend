const models = require('../../models');
const mUser = models.User
const mCashout = models.CashOut
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const responApi = require('../apirespon');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const tokenModels = models.Token
const { Op } = require('sequelize');

exports.CashOutGet = async(req, res, next) => {
    let token = req.body.token || req.query.token || req.headers["authorization"];

    const { id } = req.params;

    if (!token) {
        return responApi.v2respon400(req, res, 'Token dibutuhkan untuk kebutuhan authentikasi', null);
    }

    token = token.replace("Bearer ", "");

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);

        const data_cashout = await mCashout.findOne({
            where: {
                id: id
            },
            attributes: [ 
                'u_id',
                'account_number',
                'account_holder_name',
                'bank_name',
                'nominal',
            ]
        })

        if (!data_cashout) {
            return responApi.v2respon400(req, res, "Data tidak ada", null);
        } else {
            // console.log('info: ', data_cashout)
            return responApi.v2respon200(req, res, "Berhasil mendapatkan data",data_cashout);
        }
    } catch (error) {
        
    }
}

exports.CashOutCreate = async(req, res, next) => {
    let token = req.body.token || req.headers["authorization"];
    const { account_number, account_holder_name, bank_name, nominal } = req.body;

    if (!token) {
        return responApi.v2respon400(req, res, 'Token dibutuhkan untuk kebutuhan authentikasi', null);
    }

    token = token.replace("Bearer ", "");

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        
        const store_cashout = await mCashout.create(
            {
                u_id: decoded.user.id,
                account_number: account_number,
                account_holder_name: account_holder_name,
                bank_name: bank_name,
                nominal: nominal,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                fields: [
                    'u_id',
                    'account_number',
                    'account_holder_name',
                    'bank_name',
                    'nominal',
                    'createdAt',
                    'updatedAt'
                ]
            }
        )
        return responApi.v2respon200(req, res, "Berhasil menambah data cashout",store_cashout);
    } catch (error) {
        return responApi.v2respon400(req, res, "Failed to make a request", null);
    }
}

exports.CashOutUpdate = async(req, res, next) => {
    let token = req.body.token || req.query.token || req.headers["authorization"];

    const { id } = req.params;
    const { account_number, account_holder_name, bank_name, nominal } = req.body;

    if (!token) {
        return responApi.v2respon400(req, res, 'Token dibutuhkan untuk kebutuhan authentikasi', null);
    }

    token = token.replace("Bearer ", "");

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);

        const cashout = await mCashout.findOne({
            where: {
                id: id
            },
            attributes: [ 'id' ]
        })

        if (!cashout) {
            return responApi.v2respon400(req, res, "Data tidak ditemukan", null);
        }

        const update_cashout = await mCashout.update(
            {
                u_id: decoded.user.id,
                account_number: account_number,
                account_holder_name: account_holder_name,
                bank_name: bank_name,
                nominal: nominal,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                where: { id: id },
            }
        )
        return responApi.v2respon200(req, res, "Berhasil mengubah data",update_cashout);
    } catch (error) {
        return responApi.v2respon400(req, res, "Failed to make a request", null);
    }
}

exports.CashOutDelete = async(req, res, next) => {
    let token = req.body.token || req.query.token || req.headers["authorization"];

    const { id } = req.params;

    if (!token) {
        return responApi.v2respon400(req, res, 'Token dibutuhkan untuk kebutuhan authentikasi', null);
    }

    token = token.replace("Bearer ", "");

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);

        const cashout = await mCashout.findOne({
            where: {
                id: id
            },
            attributes: [ 'id', 'u_id' ]
        })

        if (!cashout) {
            return responApi.v2respon400(req, res, "Data tidak ditemukan", null);
        }
        
        await mCashout.destroy({
            where: {
                id: id
            }
        }).then((rowsDeleted) => {
            return responApi.v2respon200(req, res, "Berhasil menghapus data", null)
        })
        .catch((error) => {
            return responApi.v2respon400(req, res, "Gagal menghapus data", null)
        })
    } catch (error) {
        return responApi.v2respon400(req, res, "Failed to make a request", null);
    }
}