const moment = require('moment-timezone');
const AutoUpdate = require('../../controllers/all-access/AutoUpdateData');

const performAutoUpdate = async (io) => {
    const todayDate = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');

    await AutoUpdate.AutoUpdate(io);

  
    console.log('AutoUpdate executed at', todayDate);
  };
  
  module.exports = performAutoUpdate;