const models = require('../../models');
const mParkingHeader = models.ParkingHeader;
const mTransactionParking= models.TransactionParking;
const responApi = require('../apirespon');
const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');
const sequelize = require('sequelize');
const moment = require('moment-timezone');


exports.AutoUpdate = async(io) => {
   
  
  const todayDate = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:00');

    try {

      //Versi Start (+1)
      
      const updatedData = await mTransactionParking.findAll(
      
        {
          where: {
            DATE_START: {
              [Op.lte]: todayDate
            },
            STATUS: 'ONGOING',
            UPDATE_SLOT_START: 'N',
            UPDATE_SLOT_END: 'N' 
          },
        }
      );

      console.log("pay"+todayDate)
      
      if (updatedData.length > 0) {
        for (const data of updatedData) {
          var Param = {};
          if (data.TYPE == "CAR") {
            Param.TOTAL_USED_CAR = sequelize.literal('TOTAL_USED_CAR + 1');
          } else {
            Param.TOTAL_USED_MOTORCYCLE = sequelize.literal('TOTAL_USED_MOTORCYCLE + 1');
          }
      
          await mParkingHeader.update(Param, {
            where: {
              id: data.PARKING_ID
            }
          });

          await mTransactionParking.update(
            { UPDATE_SLOT_START: 'Y' },{
              where: {
                id:data.id
              },
            }
            
          )

          var updatedParkingHeader = await mParkingHeader.findOne({
            where:{
              id:data.PARKING_ID
            }
          });

          // Lakukan perhitungan sesuai kebutuhan
          const motorTotal = updatedParkingHeader.TOTAL_SLOT_MOTORCYCLE;
          const motorAvaliable = updatedParkingHeader.TOTAL_SLOT_MOTORCYCLE - updatedParkingHeader.TOTAL_USED_MOTORCYCLE;
          const carTotal = updatedParkingHeader.TOTAL_SLOT_CAR;
          const carAvaliable = updatedParkingHeader.TOTAL_SLOT_CAR - updatedParkingHeader.TOTAL_USED_CAR;

          // console.log(`Emmit ${updatedParkingHeader.TOTAL_SLOT_CAR}`)
          // Emit informasi terkini ke socket.io atau lapisan lainnya
           io.emit(`track-${data.PARKING_ID}`, {
            motorTotal: motorTotal,
            motorAvaliable: motorAvaliable,
            carTotal: carTotal,
            carAvaliable: carAvaliable
          });

          
        }
      } 
      


      //Versi End (-1)
      // DATE_START: {
      //   [Op.gte]: todayDate
      // },
      const updatedDataEnd = await mTransactionParking.findAll(
      
        {
          where: {
            DATE_END: {
              [Op.lte]: todayDate
            },
            STATUS: 'ONGOING',
            UPDATE_SLOT_START: 'Y',
            UPDATE_SLOT_END: 'N',
            DATE_USER_IN: {
              [Op.eq]: null
            }
          },
        }
      );
      if (updatedDataEnd.length > 0) {
        for (const dataEnd of updatedDataEnd) {
          var ParamEnd = {};
          if (dataEnd.TYPE == "CAR") {
            ParamEnd.TOTAL_USED_CAR = sequelize.literal('TOTAL_USED_CAR - 1');
          } else {
            ParamEnd.TOTAL_USED_MOTORCYCLE = sequelize.literal('TOTAL_USED_MOTORCYCLE - 1');
          }

          await mParkingHeader.update(ParamEnd, {
            where: {
              id: dataEnd.PARKING_ID
            }
          });

          await mTransactionParking.update(
            { UPDATE_SLOT_END: 'Y', 	STATUS: 'DONE' },{
              where: {
                id:dataEnd.id
              },
            }
            
          )
          const updatedParkingHeaderEnd = await mParkingHeader.findOne({
            where:{
              id:dataEnd.PARKING_ID
            }
          });


          // Lakukan perhitungan sesuai kebutuhan
          const motorTotalEnd = updatedParkingHeaderEnd.TOTAL_SLOT_MOTORCYCLE;
          const motorAvaliableEnd = updatedParkingHeaderEnd.TOTAL_SLOT_MOTORCYCLE - updatedParkingHeaderEnd.TOTAL_USED_MOTORCYCLE;
          const carTotalEnd = updatedParkingHeaderEnd.TOTAL_SLOT_CAR;
          const carAvaliableEnd = updatedParkingHeaderEnd.TOTAL_SLOT_CAR - updatedParkingHeaderEnd.TOTAL_USED_CAR;

          // console.log(`Emmit ${updatedParkingHeaderEnd.TOTAL_CAR}`)
          // Emit informasi terkini ke socket.io atau lapisan lainnya
          
           io.emit(`track-${dataEnd.PARKING_ID}`, {
            motorTotal: motorTotalEnd,
            motorAvaliable: motorAvaliableEnd,
            carTotal: carTotalEnd,
            carAvaliable: carAvaliableEnd
          });

          
        }
      }


      //Failed Version
      await mTransactionParking.update({
        STATUS: 'FAILED'
      },
      
        {
          where: {
            DATE_END: {
              [Op.lte]: todayDate
            },
            STATUS: 'WAITINGP',
          },
        }
      );

      console.log("AutoUpdateSuccess => SUCCESSFULLY TO UPDATE ALL PARKING DATA")
    } catch (error) {
        console.log("AutoUpdateError =>"+error)
    }
}