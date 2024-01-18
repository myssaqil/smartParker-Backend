const models = require('../../models');
const mParkingHeader = models.ParkingHeader;
const mParkingDetail = models.Parking_Detail;
const mVehicleUser = models.VehicleUser;
const mTransactionParking= models.TransactionParking;
const mTransactionHeader= models.TransactionHeader;
const responApi = require('../apirespon');
const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');
const geolib = require('geolib');
const tokenModels = models.Token
const jwt = require('jsonwebtoken')
const moment = require('moment-timezone');
const { start } = require('repl');


exports.parkerStreet = async(req, res, next) => {
  const io = req.app.get('io');

  const { idParking, motorTotal,motorAvaliable, carTotal,carAvaliable } = req.body;
  
  

  io.emit(`track-${idParking}`,{
  motorTotal: motorTotal,
  motorAvaliable: motorAvaliable,
  carTotal: carTotal,
  carAvaliable: carAvaliable
});


  return responApi.v2respon200(req, res, "Tidak ada tempat parkir dalam radius", null);
}


exports.parkerDetail = async (req, res, next) => {
  var funcName = "parkerDetail"
  const idParking =  req.params.idParking
  try {
    var parkingQuery ={
      where: {
        id: idParking
      },
      include: [
        {
          model: mParkingDetail,
          as: 'ParkingDetailMotorAll',
          where: {
            TYPE: 'MOTORCYCLE'
          },
          required: false,
        },
        {
          model: mParkingDetail,
          as: 'ParkingDetailMotorActive',
          where: {
            STATUS: 'ACTIVE',
            TYPE: 'MOTORCYCLE'
          },
          required: false,
        },
        {
          model: mParkingDetail,
          as: 'ParkingDetailCarAll',
          where: {
            TYPE: 'CAR'
          },
          required: false,
        },
        {
          model: mParkingDetail,
          as: 'ParkingDetailCarActive',
          where: {
            STATUS: 'ACTIVE',
            TYPE: 'CAR'
          },
          required: false,
        },
       
      ],
    }

    mParkingHeader.findOne(parkingQuery).then((payload) => {
      return responApi.v2respon200(req, res, "Berhasil mendapatkan data tempat parkir", payload);
    }).catch((error) => {
      console.log('Error '+funcName+' => '+error)
      return responApi.v2respon400(req, res, "Gagal melakukan permintaan", null);
    });
  }catch (error) {
    console.log('Error '+funcName+' => '+error)
    return responApi.v2respon400(req, res, 'Internal Server Error', null);
  }
}

exports.parkerLatlong = async (req, res, next) => {
  var funcName = "parkerLatlong"
  const { latitude, longitude,filterFree, distance } = req.body;
  const maxDistance = distance; // Dalam meter 

  try {
    var parkingQuery ={
      where: {
      },
      // include: [
      //   {
      //     model: mParkingDetail,
      //     as: 'ParkingDetailMotorAll',
      //     where: {
      //       TYPE: 'MOTORCYCLE'
      //     },
      //     required: false,
      //   },
      //   {
      //     model: mParkingDetail,
      //     as: 'ParkingDetailMotorActive',
      //     where: {
      //       STATUS: 'ACTIVE',
      //       TYPE: 'MOTORCYCLE'
      //     },
      //     required: false,
      //   },
      //   {
      //     model: mParkingDetail,
      //     as: 'ParkingDetailCarAll',
      //     where: {
      //       TYPE: 'CAR'
      //     },
      //     required: false,
      //   },
      //   {
      //     model: mParkingDetail,
      //     as: 'ParkingDetailCarActive',
      //     where: {
      //       STATUS: 'ACTIVE',
      //       TYPE: 'CAR'
      //     },
      //     required: false,
      //   },
       
      // ],
    }
   
    if (filterFree == "TRUE") {
      parkingQuery.where.FEE = {
        [Op.lte]: 0,
      };
    }
    mParkingHeader.findAll(parkingQuery).then((payload) => {
      // Filter hasil berdasarkan jarak
      const nearbyParkingLocations = payload.filter(location => {
        const distance = geolib.getDistance(
          { latitude: location.LATITUDE, longitude: location.LONGITUDE },
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
      console.log('Error '+funcName+' => '+error)
      return responApi.v2respon400(req, res, "Gagal melakukan permintaan", null);
    });
  } catch (error) {
    console.log('Error '+funcName+' => '+error)
    return responApi.v2respon400(req, res, 'Internal Server Error', null);
  }
};


exports.parkerAll = async (req, res, next) => {
  const { filterFree} = req.body;

  try {

    if(filterFree == true){
      mParkingHeader.findAll({
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





exports.parkerOrder = async (req, res, next) => {
  var funcName = "parkerOrder"
  let token = req.body.token || req.query.token || req.headers["authorization"];

  const {idParking, endDate, vhcId, payment  } = req.body;
  // beri dateStartnull untuk tidak booking
  // Payment = XENDIT, CASH, PAYLATER
  var startDate = req.body.startDate;
    if (!token) {
        return responApi.v2respon400(req, res, 'Token dibutuhkan untuk kebutuhan authentikasi', null);
    }
    token = token.replace("Bearer ", "");

    
    try {
      const tokendb = await tokenModels.findOne({ where: { TOKEN_VALUE: token } } );
      if (!tokendb) {
            return responApi.v2respon401(req, res, null);
          } else{
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            const dataVehicle = await mVehicleUser.findOne({
              where:{
                  id: vhcId
              }
            })
            var type = dataVehicle.VHC_TYPE;

            if(startDate == null){
                startDate = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:00');
            }

            const dataParking = await mParkingHeader.findOne({
              where:{
                  id: idParking
              }
            })

            const info = `Parkir ${dataParking.PKG_NAME}`;

            const overlappingTransactions = await mTransactionParking.count({
              where: {
                PARKING_ID:idParking, 
                STATUS: "ONGOING",
                UPDATE_SLOT_END: "N",
                TYPE: type, 
                [Op.or]: [
                  {
                    DATE_START: {
                      [Op.between]: [startDate, endDate]
                    }
                  },
                  {
                    DATE_END: {
                      [Op.between]: [startDate, endDate]
                    }
                  },
                  {
                    [Op.and]: [
                      { DATE_START: { [Op.lte]: startDate } },
                      { DATE_END: { [Op.gte]: endDate } }
                    ]
                  }
                ]
              }
            })

            if(type == "Car"){
              if (overlappingTransactions >= dataParking.TOTAL_SLOT_CAR) {
                return responApi.v2respon400(req, res, 'Parkiran mobil dengan rentan waktu yang dipilih telah penuh.',null);
              }else{
                handleOrder(req,res,payment,startDate, endDate, decoded, dataVehicle.LICENSE_PLATE, idParking,info,type )
              }
            }else{
              if (overlappingTransactions >= dataParking.TOTAL_SLOT_MOTORCYCLE) {
                return responApi.v2respon400(req, res, 'Parkiran motor dengan rentan waktu yang dipilih telah penuh.',null);
              }else{
                handleOrder(req,res,payment,startDate, endDate, decoded, dataVehicle.LICENSE_PLATE, idParking,info,type )
              }
            } 
          }

    
    } catch (error) {
        console.log('Error '+funcName+' => '+error)
        return responApi.v2respon400(req, res, 'Internal Server Error', null);
    }
};


async function handleOrder(req,res, payment, startDate, endDate, decoded, plate, pkgId,info, type) {
  const startDateCvt = new Date(startDate); 
  const startDatecurrentMinutes = startDateCvt.getMinutes();
  const startDateroundedMinutes = Math.floor(startDatecurrentMinutes / 15) * 15;
  startDateCvt.setMinutes(startDateroundedMinutes);

  const endDateCvt = new Date(endDate); 
  const endtDatecurrentMinutes = startDateCvt.getMinutes();
  const endDateroundedMinutes = Math.floor(endtDatecurrentMinutes / 15) * 15;
  endDateCvt.setMinutes(endDateroundedMinutes);

  endDateCvt.setMinutes(endDateCvt.getMinutes() - 1);
  if(startDateCvt > endDateCvt){
     return responApi.v2respon400(req, res, 'Waktu mulai harus lebih kecil daripada waktu selesai',null);
  }else{
    //Handle Payment Here
        if(payment == 'XENDIT'){

        }else{
          const date = new Date();
          const datetimeValue = date.getTime();
           var dataHeader = await mTransactionHeader.create({
              TRX_ID: `TRX-${decoded.user.id}-${datetimeValue}`,
              TRX_TYPE: "PARKING",
              STATUS: "PENDING",
              PAY: payment,
            })

            await mTransactionParking.create({
              U_ID: decoded.user.id,
              TRX_HEAD_ID: dataHeader.id,
              LICENSE_PLATE :plate,
              PARKING_ID: pkgId,
              // DATE_START: startDateCvt.toISOString(), diisi pas udah scan dan berhasil 
               DATE_END: endDateCvt.toISOString(),
              INFO: info,
              STATUS:'WAITINGP',
              TYPE: type
            })
            return responApi.v2respon200(req, res, "Berhasil membuat Barcode", dataHeader);
         }
  }

}
