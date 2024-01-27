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
const sequelize = require('sequelize');



//XENDIT REQ
const Xendit = require('xendit-node');
const { decode } = require('punycode');
const { time } = require('console');
const x = new Xendit({
    secretKey: 'xnd_development_VieWPiJcdB8h0TiekQpjQiF18rASv6erIShpr8pSRMAQRGSqDpDrYrKjg4hkU',
});

const { Invoice } = x;
const invoiceSpecificOptions = {};
const i = new Invoice(invoiceSpecificOptions);


//TEST SOCKET
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


//DELETED
exports.OrderUserGetOnGoing = async (req, res, next) => {
  var funcName = "OrderUserGetOnGoing"
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
          mTransactionParking.findAll({where:{
            U_ID: decoded.user.id,
            [Op.or]: [{ STATUS: 'ONGOING' }, { STATUS: 'WAITINGP' }]
          }}).then((payload) => {
              return responApi.v2respon200(req, res, "Berhasil mendapatkan data order user", payload);
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
exports.OrderUserGetDoneFailed = async (req, res, next) => {
  var funcName = "OrderUserGetDoneFailed"
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
          mTransactionParking.findAll({where:{
            U_ID: decoded.user.id,
            [Op.or]: [{ STATUS: 'ONGOING' }, { STATUS: 'FAILED' }]
          }}).then((payload) => {
              return responApi.v2respon200(req, res, "Berhasil mendapatkan data order user", payload);
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
exports.scan = async (req, res, next) => {
  var funcName = "OrderUserGetDoneFailed"
  let token = req.body.token || req.query.token || req.headers["authorization"];
  const id = req.params.id
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
          mTransactionParking.findOne({where:{
            id: id,
          }}).then((payload) => {
              return responApi.v2respon200(req, res, "Berhasil mendapatkan data order user", payload);
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
exports.updateScan = async (req, res, next) => {
  var funcName = "OrderUserGetDoneFailed"
  let token = req.body.token || req.query.token || req.headers["authorization"];
  const id = req.params.id
  if (!token) {
      return responApi.v2respon400(req, res, 'Token dibutuhkan untuk kebutuhan authentikasi', null);
  }
  token = token.replace("Bearer ", "");
  try{
      const tokendb = await tokenModels.findOne({ where: { TOKEN_VALUE: token } } );
      if (!tokendb) {
          return responApi.v2respon401(req, res, null);
      } else{
          //cek flag update flag and slot
          const decoded = jwt.verify(token, process.env.TOKEN_KEY);

          const data= await mTransactionParking.findOne({
            where:{
              id: id,
            }
          })

          // if(data.STATUS != "WAITINGP" || data.STATUS != "ONGOING"){
          //   return responApi.v2respon400(req, res, "Status tidak sesuai yang dibutuhkan", null);
          // }
          const employee= await mEmployee.findOne({
            where:{
              EMPLOYE_U_ID: decoded.user.id,
            }
          })

          const todayDate = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:00');
          let QueryUpdate = {
            DATE_USER_IN: todayDate,
            // EMPLOYEE_ID: employee.id,
          }
          if(data.STATUS =="WAITINGP"){
            // QueryUpdate.DATE_START =
            // QueryUpdate.DATE_START =
          }

          if(data.UPDATE_SLOT_START != "Y"){
            QueryUpdate.UPDATE_SLOT_START = "Y"

            //Update slot
            var ParamUpdateSlot = {};
            if (data.TYPE == "CAR") {
              ParamUpdateSlot.TOTAL_USED_CAR = sequelize.literal('TOTAL_USED_CAR + 1');
            } else {
              ParamUpdateSlot.TOTAL_USED_MOTORCYCLE = sequelize.literal('TOTAL_USED_MOTORCYCLE + 1');
            }
            await mParkingHeader.update(ParamUpdateSlot, {
              where: {
                id: data.PARKING_ID
              }
            });
          }

          if(data.DATE_USER_IN != null){
            QueryUpdate.UPDATE_SLOT_END = "Y"
            var ParamUpdateSlot = {};
            QueryUpdate.DATE_USER_OUT = todayDate,
            QueryUpdate.STATUS = "DONE"
            
            if(data.UPDATE_SLOT_END != "Y"){
              if (data.TYPE == "CAR") {
                ParamUpdateSlot.TOTAL_USED_CAR = sequelize.literal('TOTAL_USED_CAR - 1');
              } else {
                ParamUpdateSlot.TOTAL_USED_MOTORCYCLE = sequelize.literal('TOTAL_USED_MOTORCYCLE - 1');
              }
              await mParkingHeader.update(ParamUpdateSlot, {
                where: {
                  id: data.PARKING_ID
                }
              });
            }
          }

           
          
          mTransactionParking.update(QueryUpdate,{where:{
            id: id,
          }}).then((payload) => {
              return responApi.v2respon200(req, res, "Berhasil menerima", payload);
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

//DETAIL OF PARKING USED
exports.parkerDetail = async (req, res, next) => {
  var funcName = "parkerDetail"
  const idParking =  req.params.idParking
  try {
    var parkingQuery ={
      where: {
        id: idParking,
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
exports.parkerByAuth = async (req, res, next) => {
  var funcName = "parkerByAuthPending"
  let token = req.body.token || req.query.token || req.headers["authorization"];


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
              var parkingQuery ={
                where: {
                  U_ID: decoded.user.id,
                  [Op.or]: [
                    { STATUS: 'ACTIVE' },
                    { STATUS: 'NO' }
                  ]
                },
              }

              mParkingHeader.findAll(parkingQuery).then((payload) => {
                return responApi.v2respon200(req, res, "Berhasil mendapatkan data tempat parkir", payload);
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
exports.parkerByAuthPending = async (req, res, next) => {
  var funcName = "parkerByAuthPending"
  let token = req.body.token || req.query.token || req.headers["authorization"];

 
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
              var parkingQuery ={
                where: {
                  U_ID: decoded.user.id,
                  STATUS: 'PENDING'
                },
              }

              mParkingHeader.findAll(parkingQuery).then((payload) => {
                return responApi.v2respon200(req, res, "Berhasil mendapatkan data tempat parkir", payload);
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

exports.parkerLatlong = async (req, res, next) => {
  var funcName = "parkerLatlong"
  const { latitude, longitude,filterFree, distance } = req.body;
  const maxDistance = distance; // Dalam meter 

  try {
    var parkingQuery ={
      where: {
        STATUS: 'ACTIVE'
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



//NOT USED BELUM DIUPDATE JUGA
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

            if(dataVehicle.VHC_TYPE == "CAR"){
                if (overlappingTransactions >= dataParking.TOTAL_SLOT_CAR) {
                  return responApi.v2respon400(req, res, 'Parkiran mobil dengan rentan waktu yang dipilih telah penuh/tidak tersedia.',null);
                }else{
                  handleOrder(req,res,payment,startDate, endDate, decoded, dataVehicle.LICENSE_PLATE, idParking,info,type , dataParking.FEE)
                }
             
            }else{
              if(dataParking.TOTAL_SLOT_MOTORCYCLE > 0){
                if (overlappingTransactions >= dataParking.TOTAL_SLOT_MOTORCYCLE) {
                  return responApi.v2respon400(req, res, 'Parkiran motor dengan rentan waktu yang dipilih telah penuh/tidak tersedia.',null);
                }else{
                  handleOrder(req,res,payment,startDate, endDate, decoded, dataVehicle.LICENSE_PLATE, idParking,info,type, dataParking.FEE )
                }
              }else{
                return responApi.v2respon400(req, res, 'Tidak ada slot untuk motor')
              }
                
            } 
          }

    
    } catch (error) {
        console.log('Error '+funcName+' => '+error)
        return responApi.v2respon400(req, res, 'Internal Server Error', null);
    }
};


async function handleOrder(req,res, payment, startDate, endDate, decoded, plate, pkgId,info, type, amountOfParking) {
  const startDateCvt = new Date(startDate.replace(" ", "T") + "Z"); // Tambahkan "Z" untuk menandakan UTC timezone
const endDateCvt = new Date(endDate.replace(" ", "T") + "Z");

const startDateroundedMinutes = Math.floor(startDateCvt.getMinutes() / 15) * 15;
startDateCvt.setMinutes(startDateroundedMinutes);

// const endDateroundedMinutes = Math.floor(endDateCvt.getMinutes() / 15) * 15;
// endDateCvt.setMinutes(endDateroundedMinutes);

const todayDate = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:00');
const todayDateFormated = todayDate.toLocaleString('en-US', { hour12: false });

// Mendapatkan waktu saat ini
// const now = new Date();
// now.setSeconds(0);
// const nowDateroundedMinutes = Math.floor(now.getMinutes() / 15) * 15;
// now.setMinutes(nowDateroundedMinutes);

// Menghitung waktu 15 menit ke depan dari sekarang
// const fifteenMinutesFromNow = new Date(now.getTime() + 15 * 60000);
// fifteenMinutesFromNow.setDate(fifteenMinutesFromNow.getDate() + 1);
// now.setDate(now.getDate() + 1);



endDateCvt.setMinutes(endDateCvt.getMinutes() - 1);
  console.log(startDate)
  console.log("start: " +startDateCvt.toISOString());
console.log(endDate);
console.log("end: " +endDateCvt.toISOString());
// console.log("now: " + todayDateFormated);


// console.log("fifteenMinutesFromNow: " + fifteenMinutesFromNow.toISOString());


  if(startDateCvt > endDateCvt){
     return responApi.v2respon400(req, res, 'Waktu mulai harus lebih kecil daripada waktu selesai',null);
  }else{
    //Handle Payment Here
          const date = new Date();
          const datetimeValue = date.getTime();
        if(payment == 'XENDIT'){

          //ini untuk update slot, sebenernya udh dihandle auto update
          // if (startDateCvt>= todayDate&& startDateCvt<= fifteenMinutesFromNow) {
          //   console.log("startDate berada dalam rentang waktu sekarang - 15 menit hingga 15 menit ke depan"+now + fifteenMinutesFromNow );
          // } else {
          //   console.log("startDate tidak berada dalam rentang waktu yang valid "+now+ fifteenMinutesFromNow);
          // }

          const AMOUNT = calculateCost(startDateCvt, endDateCvt, amountOfParking);

          const createPaymentResponse = await i.createInvoice({
            externalID: `TRX-${decoded.user.id}-${datetimeValue}`,
            amount: AMOUNT,
            payerEmail: decoded.email,
            description: info,
          });
      
          const paymentUrl = createPaymentResponse.invoice_url;

          console.log(paymentUrl)

          if(paymentUrl != null){
            // var dataHeader = await mTransactionHeader.create({
            //   TRX_ID: `TRX-${decoded.user.id}-${datetimeValue}`,
            //   TRX_TYPE: "PARKING",
            //   STATUS: "PENDING",
            //   PAY: payment,
            //   AMOUNT: AMOUNT,
            // })
            // await mVehicleUser

            await mTransactionParking.create({
              U_ID: decoded.user.id,
              TRX_ID: `TRX-${decoded.user.id}-${datetimeValue}`,
              PAY: payment,
              AMOUNT: AMOUNT,
              LICENSE_PLATE :plate,
              PARKING_ID: pkgId,
              DATE_START: startDate, 
               DATE_END: endDate,
              INFO: info,
              STATUS:'WAITINGP',//CALLBACK -UPDATE menjadi waiting p
              TYPE: type
            })
            return responApi.v2respon200(req, res, "Berhasil melakukan pembayaran", {
              type: "URL",
              url: paymentUrl
             });
          }else{
            res.status(500).json({ error: 'Terjadi kesalahan saat membuat pembayaran' });
          }
          
          
        }else{
          
          //  var dataHeader = await mTransactionHeader.create({
          //     TRX_ID: `TRX-${decoded.user.id}-${datetimeValue}`,
          //     TRX_TYPE: "PARKING",
          //     STATUS: "PENDING",
          //     PAY: payment,
          //     AMOUNT: AMOUNT,
          //   })

          var dataHeader = await mTransactionParking.create({
              TRX_ID: `TRX-${decoded.user.id}-${datetimeValue}`,
              PAY: payment,
              U_ID: decoded.user.id,
              LICENSE_PLATE :plate,
              PARKING_ID: pkgId,
              // DATE_START: startDate, diisi pas udah scan dan berhasil 
               DATE_END: endDate,
              INFO: info,
              STATUS:'WAITINGP',
              TYPE: type
            })
            return responApi.v2respon200(req, res, "Berhasil membuat Barcode", dataHeader);
         }
  }

}


// const xenditApiKey = require('../config/xendit');
// const Xendit = require('xendit-node');
// const xendit = new Xendit(xenditApiKey);

// // Fungsi untuk membuat pembayaran dan mendapatkan URL pembayaran
// const createPaymentXendit = async (req,res, userdecoded,fee, mentor,date_mentoring,time_mentoring,sendMailOptions,sendMailMentorOptions) => {
//   try {

//       const currentTime = new Date();
//       const gmt7Offset = 7 * 60 * 60 * 1000;
//       const currentTimestampGMT7 = new Date(currentTime.getTime() + gmt7Offset).toISOString();
//       const uniqueString = 'PAYMENT_';
//       const idPayment = uniqueString+userdecoded.id+'-At'+currentTimestampGMT7


//     const createPaymentResponse = await i.createInvoice({
//       externalID: idPayment,
//       amount: fee,
//       payerEmail: userdecoded.email,
//       description: 'Pembayaran Mentoring',
//       // successRedirectUrl: 'https://7f91-43-252-106-218.ngrok-free.app/xendit',
//       // success_redirect_url: "https://7f91-43-252-106-218.ngrok-free.app/xendit",
//       // failureRedirectUrl: 'https://7f91-43-252-106-218.ngrok-free.app/xendit',
//     });

//     const paymentUrl = createPaymentResponse.invoice_url;

//     if(paymentUrl != null){

//       const model = await mMentoring.create({ 
//           id_user:userdecoded.id,
//           id_mentor:mentor['id'],
//           fee:fee,
//           date_mentoring:date_mentoring["date"],
//           time_mentoring:time_mentoring["time"],
//           notes: "",
//           urlTrx:paymentUrl,
//           idTRx:idPayment,
//           status: "WaitingP"
//         });

//       //   await destroyTimeMentoring(date_mentoring, time_mentoring);          
        

//       //   await sendEmailNotif(sendMailOptions.to, sendMailOptions.subject, sendMailOptions.html);

//       //   await sendEmailNotif(sendMailMentorOptions.to, sendMailMentorOptions.subject, sendMailMentorOptions.html);


//       return responApi.v2respon200(req, res, {
//           type:"Paid",
//           data:paymentUrl,
//       });
//     }else{
//       res.status(500).json({ error: 'Terjadi kesalahan saat membuat pembayaran' });
//     }
//   } catch (error) {
//     console.log(error);
//     return responApi.v2respon400(req, res, 'Internal Server Error');
//   }
// };


function calculateCost(startDate, endDate, costPer15Minutes) {
  // Konversi waktu mulai dan waktu selesai ke dalam menit
  const startTimeInMinutes = startDate.getHours() * 60 + startDate.getMinutes();
  const endTimeInMinutes = endDate.getHours() * 60 + endDate.getMinutes();

  // Hitung total waktu dalam menit
  const totalTimeInMinutes = endTimeInMinutes - startTimeInMinutes;

  // Hitung biaya berdasarkan biaya per blok 15 menit
  const numberOf15MinutesBlocks = Math.ceil(totalTimeInMinutes / 15);
  const totalCost = costPer15Minutes * numberOf15MinutesBlocks;

  return totalCost;
}

function convertUTCtoGMT7(dateUTC) {
  const dateGMT7 = new Date(dateUTC);
  dateGMT7.setHours(dateGMT7.getHours() + 7); // Menambahkan 7 jam untuk mengonversi ke GMT+7
  return dateGMT7;
}


exports.xendit= async(req, res, next) => {

  const xenditSignature = req.get('X-CALLBACK-SIGNATURE'); // Header tanda tangan callback dari Xendit
  // const payload = req.body; // Data JSON yang dikirimkan oleh Xendit

  const paymentStatus = req.body.status;
  const paymentId = req.body.external_id;

  console.log(req.body.status);

  
  if (paymentStatus === 'PAID') {
      
    await mTransactionParking.update({
      STATUS:'ONGOING'
    },{where:{
      TRX_ID: paymentId,
    }})
      

  } else if (paymentStatus === 'PENDING') {
      
      console.log('Pembayaran tertunda');
  } else if (paymentStatus === 'FAILED') {
      console.log('Pembayaran gagal');
  }
  console.log('WOIII');
  res.status(200).send('Callback received successfully');
}