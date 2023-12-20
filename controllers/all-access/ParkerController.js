const models = require('../../models');
const mParkerLoc = models.ParkingLocation;
const responApi = require('../apirespon');
const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');
const geolib = require('geolib');


exports.parkerStreet = async(req, res, next) => {
 
    let street = req.body.street;
    try {

        mParkerLoc.findAll({
            where: {
                street: street,
            },
          }).then((payload) => {
            if (payload) {
                return responApi.v2respon200(req, res, "Berhasil mendapat data tempat parkir", payload);
            } else {
                return responApi.v2respon400(req, res, "Gagal mendapat data tempat parkir", null);
            }
          })
          .catch((error) => {
            return responApi.v2respon400(req, res, "Failed to make a request", null);
          });

        
    } catch (error) {
        return responApi.v2respon400(req, res, 'Internal Server Error', null);
    }

}




exports.parkerLatlong = async (req, res, next) => {
  const { latitude, longitude } = req.body;
  const maxDistance = 100; // Dalam meter (misalnya, radius 1 kilometer)

  try {
    mParkerLoc.findAll({
      raw: true, // Dapat diperlukan tergantung pada versi Sequelize
    }).then((payload) => {
      // Filter hasil berdasarkan jarak
      const nearbyParkingLocations = payload.filter(location => {
        const distance = geolib.getDistance(
          { latitude: location.latitude, longitude: location.longtitude },
          { latitude, longitude }
        );
        return distance <= maxDistance;
      });

      if (nearbyParkingLocations.length > 0) {
        return responApi.v2respon200(req, res, "Berhasil mendapatkan data tempat parkir", nearbyParkingLocations);
      } else {
        return responApi.v2respon400(req, res, "Tidak ada tempat parkir dalam radius", null);
      }
    }).catch((error) => {
      return responApi.v2respon400(req, res, "Gagal melakukan permintaan", null);
    });
  } catch (error) {
    return responApi.v2respon400(req, res, 'Internal Server Error', null);
  }
};

exports.parkerAll = async (req, res, next) => {
  const { filterFree} = req.body;

  try {

    if(filterFree == true){
        mParkerLoc.findAll({
            where: {
                fee: {
                    [Op.lte]: 0,
                  },
            },
          }).then((payload) => {
            if (payload) {
                return responApi.v2respon200(req, res, "Berhasil mendapat data tempat parkir", payload);
            } else {
                return responApi.v2respon400(req, res, "Gagal mendapat data tempat parkir", null);
            }
          })
          .catch((error) => {
            return responApi.v2respon400(req, res, "Failed to make a request", null);
          });
    }else{
        mParkerLoc.findAll().then((payload) => {
            if (payload) {
                return responApi.v2respon200(req, res, "Berhasil mendapat data tempat parkir", payload);
            } else {
                return responApi.v2respon400(req, res, "Gagal mendapat data tempat parkir", null);
            }
          })
          .catch((error) => {
            return responApi.v2respon400(req, res, "Failed to make a request", null);
          });
    }

    
    } catch (error) {
        return responApi.v2respon400(req, res, 'Internal Server Error', null);
    }
};
