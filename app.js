const express = require('express')
const app = express()
const port = 4200

const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const server = http.createServer(app);
const io = socketIO(server);
const path = require('path');
const firebaseadmin = require('firebase-admin');
const serviceAccount = require('./firebase-zendmind-ServiceAccountKey.json');
const ipAddress = '192.168.246.80'; 



//Firebase Setup
firebaseadmin.initializeApp({
  credential: firebaseadmin.credential.cert(serviceAccount),
});


//Setup Api
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())


//SocketIO Setup
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.set('io', io);




//Make Variable for route location
const authRoute = require('./routes/all-access/auth')
const parkerRoute = require('./routes/all-access/parker')
const employeeHandleRoute = require('./routes/parker/employee')
const vehicleRoute = require('./routes/user/vehicle')
const userParkerTransactionRoute = require('./routes/user/parkingtrx')
const userTopupTransactionRoute = require('./routes/user/topuptrx')
const userBillTransactionRoute = require('./routes/user/billtrx')
const userFavParkerRoute = require('./routes/user/favoriteparking')
const userReportParkerRoute = require('./routes/user/reportparking')
const userCashoutRoute = require('./routes/user/cashout')
const cron = require('node-cron');
const performAutoUpdate = require('./routes/all-access/update');


// Mendapatkan waktu saat ini
const currentTime = new Date();

// Menentukan menit pertama setelah waktu saat ini yang merupakan kelipatan 15
var firstScheduledMinute = Math.ceil(currentTime.getMinutes() / 15) * 15;

if(firstScheduledMinute == 60){
  firstScheduledMinute= 0;
}

// Membuat string penjadwalan cron dengan menit kelipatan 15
// const cronSchedule = `0 15,30,45 * * * *`;
const cronSchedule = `*/15 * * * * *`;

// Menjadwalkan cron
console.log("Minute First to call => "+firstScheduledMinute)
console.log("Start at => "+currentTime)
cron.schedule(cronSchedule, async () => {
  try {
    await performAutoUpdate(io);
    console.log("ppp")
  } catch (error) {
    console.error('AutoUpdateError:', error);
  }
});
//RouteRegister


app.use('/api/auth', authRoute)
app.use('/api/parking/location', parkerRoute)
app.use('/api/user/vehicle', vehicleRoute)
app.use('/api/parker/employee', employeeHandleRoute)


//Unused
app.use('/api/user/transaction/parker', userParkerTransactionRoute)
app.use('/api/user/transaction/bill', userBillTransactionRoute)
app.use('/api/user/transaction/topup', userTopupTransactionRoute)
app.use('/api/user/favorite', userFavParkerRoute)
app.use('/api/user/parking-report', userReportParkerRoute)

app.use('/api/user/cashout', userCashoutRoute)



//For Image Read

const multer  = require('multer'); 

app.use(express.static('public'));
const uploadDir = '/img/';
const storage = multer.diskStorage({
    destination: "./public"+uploadDir,
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err)  

        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
})


//Socket
io.on('connect', (socket) => {
  console.log('a user connected');

  // Join room
  const roomId = 'smartParker';
  socket.join(roomId);
  console.log(`User joined room ${roomId}`);

  // Emit event to room
  io.to(roomId).emit('smartParker', 'A new user joined the room');

});




io.on('disconnect', () => {
  console.log('Disconnected from server');
});



// server.listen(port,ipAddress, () => console.log(`Successfully to start server : http://${ipAddress}:${port}`)); //By Ip
server.listen(port, () => console.log(`Successfully to start server : http://127.0.0.1:${port}`)); 
// app.listen(port, () => console.log(`Successfully to start😱😱😱 : http://127.0.0.1:${port}, Lupakan titik koma`));