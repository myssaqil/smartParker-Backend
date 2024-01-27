const models = require('../../models');
const mParkingHeader = models.ParkingHeader;
const mParkingDetail = models.Parking_Detail;
const mVehicleUser = models.VehicleUser;
const mTransactionParking= models.TransactionParking;
const mTransactionHeader= models.TransactionHeader;
const mEmployee = models.Employee;
const responApi = require('../apirespon');
const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');
const geolib = require('geolib');
const tokenModels = models.Token
const jwt = require('jsonwebtoken')
const moment = require('moment-timezone');
const { start } = require('repl');

exports.ParkerEmployeeGetList = async (req, res, next) => {
    var funcName = "ParkerEmployeeGetList"
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
            mEmployee.findAll({where: {U_ID: decoded.user.id, STATUS: "ACTIVE"}, include: [
                {
                    model: models.User,
                    as: 'EmployeeDetail',
                    attributes: { exclude: ['U_PASSWORD', 'U_VERIFY_TOKEN'] },
                    required: true,
                },
                {
                    model: models.ParkingHeader,
                    as: 'ParkingDetail',
                    required: true,
                },
                {
                    model: models.TransactionParking,
                    as: 'EmployeeParkingHandle',
                    required: false,
                }
            ]}).then((payload) => {
                return responApi.v2respon200(req, res, "Berhasil mendapatkan data karyawan user", payload);
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


exports.ParkerEmployeeCreate = async (req, res, next) => {
    var funcName = "ParkerEmployeeCreate"
    let token = req.body.token || req.query.token || req.headers["authorization"];
    const {KARY_ID } = req.body;

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
            mEmployee.create({
                U_ID: decoded.user.id,
                EMPLOYE_U_ID: KARY_ID,
                STATUS: "PENDING"
            }).then((payload) => {
                return responApi.v2respon200(req, res, "Berhasil menambahkan karyawan", null);
            }).catch((error) => {
                console.log('Error '+funcName+' => '+error)
                return responApi.v2respon400(req, res, "Gagal menambahkan karyawan", null);
            });
        }
    }catch (error) {
      console.log('Error '+funcName+' => '+error)
      return responApi.v2respon400(req, res, 'Internal Server Error', null);
    }
  
}

exports.ParkerEmployeeDelete = async (req, res, next) => {
    var funcName = "ParkerEmployeeDelete"
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
            mEmployee.destroy({where: {id: id}}).then((payload) => {
                return responApi.v2respon200(req, res, "Berhasil menghapus data karyawan", null);
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
