const models = require('../../models');
const mParkingHeader = models.ParkingHeader
const mUser = models.User
const responApi = require('../apirespon');
const jwt = require('jsonwebtoken')
const path = require('path');
const fs = require('fs');

exports.getParking = async(req, res, next) => {
    let token = req.body.token || req.query.token || req.headers["authorization"];

    if (!token) {
        return responApi.v2respon400(req, res, 'Token dibutuhkan untuk kebutuhan authentikasi', null);
    }

    token = token.replace("Bearer ", "");

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);

        if (decoded.user.U_ROLE == 'PARKER') {
            const data_parker = await mParkingHeader.findOne({
                where: {
                    U_ID: decoded.user.U_ID
                },
                attributes: [ 
                    'U_ID',
                    'PKG_NAME',
                    'PKG_STREET',
                    'PKG_BANNER_BASE64',
                    'PKG_SUBLOCALITY',
                    'PKG_SUB_ADMINISTRATIVE_AREA',
                    'PKG_POSTAL_CODE',
                    'LATITUDE',
                    'LONGITUDE',
                    'FEE',
                    'STATUS', 
                ]
            })
    
            if (!data_parker) {
                return responApi.v2respon400(req, res, "Data parker tidak ada", null);
            } else {
                console.log('info: ', data_parker)
                return responApi.v2respon200(req, res, "Berhasil mendapatkan data user",data_parker);
            }
        } else {
            return responApi.v2respon400(req, res, "Anda bukan role parker", null);
        }
    } catch (error) {
        console.log('info: ', error)
        return responApi.v2respon400(req, res, "Failed to make a request", null);
    }
}

exports.createByUserParker = async(req, res, next) => {
    let token = req.body.token || req.query.token || req.headers["authorization"];
    const { name, street, banner, sublocality, sub_administrative_area, postal_code, latitude, longitude, fee, status } = req.body;

    if (!token) {
        return responApi.v2respon400(req, res, 'Token dibutuhkan untuk kebutuhan authentikasi', null);
    }

    token = token.replace("Bearer ", "");

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);

        if (decoded.user.U_ROLE == 'PARKER') {
            const store_parker = await mParkingHeader.create(
                {
                    U_ID: decoded.user.U_ID,
                    PKG_NAME: name,
                    PKG_STREET: street,
                    PKG_BANNER_BASE64: banner,
                    PKG_SUBLOCALITY: sublocality,
                    PKG_SUB_ADMINISTRATIVE_AREA: sub_administrative_area,
                    PKG_POSTAL_CODE: postal_code,
                    LATITUDE: latitude,
                    LONGITUDE: longitude,
                    FEE:  fee,
                    STATUS: status,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    fields: [ 
                        'U_ID',
                        'PKG_NAME',
                        'PKG_STREET',
                        'PKG_BANNER_BASE64',
                        'PKG_SUBLOCALITY',
                        'PKG_SUB_ADMINISTRATIVE_AREA',
                        'PKG_POSTAL_CODE',
                        'LATITUDE',
                        'LONGITUDE',
                        'FEE',
                        'STATUS',
                        'createdAt',
                        'updatedAt'
                    ]
                }
            )
            return responApi.v2respon200(req, res, "Berhasil menambah data parkir",store_parker);
        } else {
            return responApi.v2respon400(req, res, "Anda bukan role parker", null);
        }
    } catch (error) {
        return responApi.v2respon400(req, res, "Failed to make a request", null);
    }
}

exports.updateByUserParker = async (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers["authorization"];

    const { id } = req.params;
    const { name, street, banner, sublocality, sub_administrative_area, postal_code, latitude, longtitude, fee, status } = req.body;

    if (!token) {
        return responApi.v2respon400(req, res, 'Token dibutuhkan untuk kebutuhan authentikasi', null);
    }

    token = token.replace("Bearer ", "");

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);

        if (decoded.user.U_ROLE == 'PARKER') {

            const parker = await mParkingHeader.findOne({
                where: {
                    PKG_HEAD_ID: id
                },
                attributes: [ 'PKG_HEAD_ID' ]
            })
    
            if (!parker) {
                return responApi.v2respon400(req, res, "Data parker tidak ditemukan", null);
            }

            const store_parker = await mParkingHeader.update(
                {
                    PKG_NAME: name,
                    PKG_STREET: street,
                    PKG_BANNER_BASE64: banner,
                    PKG_SUBLOCALITY: sublocality,
                    PKG_SUB_ADMINISTRATIVE_AREA: sub_administrative_area,
                    PKG_POSTAL_CODE: postal_code,
                    LATITUDE: latitude,
                    LONGITUDE: longtitude,
                    FEE:  fee,
                    STATUS: status,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    where: { PKG_HEAD_ID: id },
                }
            )
            return responApi.v2respon200(req, res, "Berhasil menambah data parkir",store_parker);
        } else {
            return responApi.v2respon400(req, res, "Anda bukan role parker", null);
        }
    } catch (error) {
        return responApi.v2respon400(req, res, "Failed to make a request", null);
    }
}

exports.deleteByUserParker = async (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers["authorization"];

    const { id } = req.params;

    if (!token) {
        return responApi.v2respon400(req, res, 'Token dibutuhkan untuk kebutuhan authentikasi', null);
    }

    token = token.replace("Bearer ", "");

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);

        if (decoded.user.U_ROLE == 'PARKER') {

            const parker = await mParkingHeader.findOne({
                where: {
                    PKG_HEAD_ID: id
                },
                attributes: [ 'PKG_HEAD_ID' ]
            })
    
            if (!parker) {
                return responApi.v2respon400(req, res, "Data parker tidak ditemukan", null);
            }

            await mParkingHeader.destroy({
                where: {
                    PKG_HEAD_ID: id
                }
            }).then((rowsDeleted) => {
                return responApi.v2respon200(req, res, "Berhasil menghapus data parker", null)
            })
            .catch((error) => {
                return responApi.v2respon400(req, res, "Gagal menghapus data", null)
            })
        } else {
            return responApi.v2respon400(req, res, "Anda bukan role parker", null);
        }
    } catch (error) {
        return responApi.v2respon400(req, res, "Failed to make a request", null);
    }
}
