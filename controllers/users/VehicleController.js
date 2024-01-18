const models = require('../../models');
const mVehicle = models.VehicleUser
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const responApi = require('../apirespon');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const tokenModels = models.Token


exports.VehicleUserGet = async (req, res, next) => {
    var funcName = "VehicleUserGet"
    let token = req.body.token || req.query.token || req.headers["authorization"];
    if (!token) {
        return responApi.v2respon400(req, res, 'Token dibutuhkan untuk kebutuhan authentikasi', null);
    }
    token = token.replace("Bearer ", "");
    try{
        const tokendb = await tokenModels.findOne({ where: { TOKEN_VALUE: token } } );
        if (!tokendb) {
            return responApi.v2respon401(req, res, null);
        } else{
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            mVehicle.findAll({where: {U_ID: decoded.user.id}}).then((payload) => {
                return responApi.v2respon200(req, res, "Berhasil mendapatkan data kendaraan user", payload);
            }).catch((error) => {
                console.log('Error '+funcName+' => '+error)
                return responApi.v2respon400(req, res, "Gagal melakukan permintaan", null);
            });
        }
    }catch (error) {
      console.log('Error '+funcName+' => '+error)
      return responApi.v2respon400(req, res, 'Internal Server Error', null);
    }
  
}

exports.VehicleUserCreate = async (req, res, next) => {
    var funcName = "VehicleUserCreate"
    let token = req.body.token || req.query.token || req.headers["authorization"];
    const {LICENSE_PLATE, VHC_NAME, VHC_TYPE } = req.body;

    if (!token) {
        return responApi.v2respon400(req, res, 'Token dibutuhkan untuk kebutuhan authentikasi', null);
    }
    token = token.replace("Bearer ", "");
    try{
        const tokendb = await tokenModels.findOne({ where: { TOKEN_VALUE: token } } );
        if (!tokendb) {
            return responApi.v2respon401(req, res, null);
        } else{
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            mVehicle.create({
                U_ID: decoded.user.id,
                LICENSE_PLATE: LICENSE_PLATE,
                VHC_NAME: VHC_NAME, 
                VHC_TYPE: VHC_TYPE
            }).then((payload) => {
                return responApi.v2respon200(req, res, "Berhasil menambahkan kendaraan", null);
            }).catch((error) => {
                console.log('Error '+funcName+' => '+error)
                return responApi.v2respon400(req, res, "Gagal menambahkan kendaraan", null);
            });
        }
    }catch (error) {
      console.log('Error '+funcName+' => '+error)
      return responApi.v2respon400(req, res, 'Internal Server Error', null);
    }
  
}
exports.VehicleUserDelete = async (req, res, next) => {
    var funcName = "VehicleUserCreate"
    let token = req.body.token || req.query.token || req.headers["authorization"];
    if (!token) {
        return responApi.v2respon400(req, res, 'Token dibutuhkan untuk kebutuhan authentikasi', null);
    }
    token = token.replace("Bearer ", "");
    var id = req.params.id;
    try{
        const tokendb = await tokenModels.findOne({ where: { TOKEN_VALUE: token } } );
        if (!tokendb) {
            return responApi.v2respon401(req, res, null);
        } else{
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            mVehicle.destroy({where: {id: id}}).then((payload) => {
                return responApi.v2respon200(req, res, "Berhasil menghapus data kendaraan", null);
            }).catch((error) => {
                console.log('Error '+funcName+' => '+error)
                return responApi.v2respon400(req, res, "Gagal melakukan permintaan", null);
            });
        }
    }catch (error) {
      console.log('Error '+funcName+' => '+error)
      return responApi.v2respon400(req, res, 'Internal Server Error', null);
    }
  
}
