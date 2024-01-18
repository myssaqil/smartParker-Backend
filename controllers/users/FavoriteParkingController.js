const models = require('../../models');
const mFavorite = models.FavoriteUser
const mParkingHeader = models.ParkingHeader;
const mParkingDetail = models.Parking_Detail;
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const responApi = require('../apirespon');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const tokenModels = models.Token
const { Op } = require('sequelize');



exports.FavoriteUserCreate = async (req, res, next) => {
    var funcName = "FavoriteUserGet"
    let token = req.body.token || req.query.token || req.headers["authorization"];
    const {DVC_ID, PKG_HEAD_ID } = req.body;
    if(token){
        token = token.replace("Bearer ", "");
    }
    try{
        Query = {
            PKG_HEAD_ID: PKG_HEAD_ID
        }
        if (token) {
            const tokendb = await tokenModels.findOne({ where: { TOKEN_VALUE: token } } );
            if (!tokendb) {
                return responApi.v2respon401(req, res, null);
            }
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);

            Query.U_ID = decoded.user.id; 
        }else{
            Query.DVC_ID = DVC_ID; 

        }

        mFavorite.findOne({ where: Query })
        .then((existingFavorite) => {
            if (existingFavorite) {
            return existingFavorite.destroy()
                .then(() => responApi.v2respon200(req, res, "Berhasil dihapus dari favorite", false));
            } else {
            return mFavorite.create(Query)
                .then(() => responApi.v2respon200(req, res, "Berhasil ditambahkan ke favorite", true));
            }
        })
        .catch((error) => {
            console.log('Error ' + funcName + ' => ' + error);
            return responApi.v2respon400(req, res, "Gagal menambahkan/menghapus dari favorite", null);
        });
    }catch (error) {
        console.log('Error '+funcName+' => '+error)
        return responApi.v2respon400(req, res, 'Internal Server Error', null);
      }
    
  }
exports.validateFav = async (req, res, next) => {
    var funcName = "checkFav"
    let token = req.body.token || req.query.token || req.headers["authorization"];
    const {DVC_ID, PKG_HEAD_ID } = req.body;
    if(token){
        token = token.replace("Bearer ", "");
    }
    try{
        Query = {
            PKG_HEAD_ID: PKG_HEAD_ID
        }
        if (token) {
            const tokendb = await tokenModels.findOne({ where: { TOKEN_VALUE: token } } );
            if (!tokendb) {
                return responApi.v2respon401(req, res, null);
            }
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);

            Query.U_ID = decoded.user.id; 
        }else{
            Query.DVC_ID = DVC_ID; 

        }

        mFavorite.findOne({ where: Query })
        .then((existingFavorite) => {
            if (existingFavorite) {
            return responApi.v2respon200(req, res, "Berhasil mendapatkan status favorite (sudah tersedia)", true);
            } else {
            return responApi.v2respon200(req, res, "Berhasil mendapatkan status favorite (belum tersedia)", false);
            }
        })
        .catch((error) => {
            console.log('Error ' + funcName + ' => ' + error);
            return responApi.v2respon400(req, res, "Gagal mendapatkan status favorite", null);
        });
    }catch (error) {
        console.log('Error '+funcName+' => '+error)
        return responApi.v2respon400(req, res, 'Internal Server Error', null);
      }
    
  }

exports.FavoriteUserGet = async (req, res, next) => {
    var funcName = "FavoriteUserGet"
    let token = req.body.token || req.query.token || req.headers["authorization"];
    var dvcId = req.params.DVC_ID
    if(token){
        token = token.replace("Bearer ", "");
    }
    try{
        Query = {
            where: {
              [Op.or]: [
                {  DVC_ID: dvcId},
              ]
            },
            distinct: true, 
            group: ['PKG_HEAD_ID'],
            include: [
                {
                    model: mParkingHeader,
                    as: 'ParkingHeader',
                    required: true,
                    // include: [
                    //     {
                    //       model: mParkingDetail,
                    //       as: 'ParkingDetailMotorAll',
                    //       where: {
                    //         TYPE: 'MOTORCYCLE'
                    //       },
                    //       required: false,
                    //     },
                    //     {
                    //       model: mParkingDetail,
                    //       as: 'ParkingDetailMotorActive',
                    //       where: {
                    //         STATUS: 'ACTIVE',
                    //         TYPE: 'MOTORCYCLE'
                    //       },
                    //       required: false,
                    //     },
                    //     {
                    //       model: mParkingDetail,
                    //       as: 'ParkingDetailCarAll',
                    //       where: {
                    //         TYPE: 'CAR'
                    //       },
                    //       required: false,
                    //     },
                    //     {
                    //       model: mParkingDetail,
                    //       as: 'ParkingDetailCarActive',
                    //       where: {
                    //         STATUS: 'ACTIVE',
                    //         TYPE: 'CAR'
                    //       },
                    //       required: false,
                    //     },
                       
                    //   ],
                  },
            ]
          };
        if (token) {
            const tokendb = await tokenModels.findOne({ where: { TOKEN_VALUE: token } } );
            if (!tokendb) {
                return responApi.v2respon401(req, res, null);
            }
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);

            Query.where[Op.or].push({ U_ID: decoded.user.id });
        }
            
        mFavorite.findAll(Query).then((payload) => {
            return responApi.v2respon200(req, res, "Berhasil mendapatkan data Favorite user", payload);
        }).catch((error) => {
            console.log('Error '+funcName+' => '+error)
            return responApi.v2respon400(req, res, "Gagal melakukan permintaan", null);
        });
        
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
            mFavorite.create({
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
exports.FavoriteUserDelete = async (req, res, next) => {
    var funcName = "FavoriteUserDelete"
    
    var id = req.params.id;
    try{
      
            mFavorite.destroy({where: {id: id}}).then((payload) => {
                return responApi.v2respon200(req, res, "Berhasil menghapus data favorite", null);
            }).catch((error) => {
                console.log('Error '+funcName+' => '+error)
                return responApi.v2respon400(req, res, "Gagal melakukan permintaan", null);
            });
        
    }catch (error) {
      console.log('Error '+funcName+' => '+error)
      return responApi.v2respon400(req, res, 'Internal Server Error', null);
    }
  
}
