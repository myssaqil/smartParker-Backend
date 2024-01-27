const models = require('../../models');
const mUser = models.User
const tokenModels = models.Token
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const responApi = require('../apirespon');
const nodemailer = require('nodemailer');
const fs = require('fs');
const mTokenDevice = models.TokenDevice;
const path = require('path');


//Keperluan Send Main
const transporter = nodemailer.createTransport({
    service: 'Gmail', // layanan email yang digunakan
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  //Function Save Base64 Image
  const saveBase64Image = (base64String, imagePath) => {
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');
  
    fs.writeFileSync(imagePath, imageBuffer);
  };


exports.register = async(req, res) => {
    const { email, password, name } = req.body;

    try{
        const hashedPassword = bcryptjs.hashSync(password, 10)

        mUser.count({
            where: { U_MAIL: email },
            attributes: [ 'U_MAIL']
        }).then(async count =>{
            if(count > 0){
                return responApi.v2respon400(req, res, "Email telah digunakan");
            } else{
                orderCreate = await mUser.create({
                        U_MAIL: email,
                        U_PASSWORD: hashedPassword,
                        U_NAME: name
                    },
                    { fields: [
                            'id',
                            'U_MAIL',
                            'U_PASSWORD',
                            'U_NAME',
                        ]
                    }
                )
         
                orderGet = await mUser.findOne({
                     where: { id: orderCreate.id },
                     attributes: [ 'U_MAIL' ]
                })
         
                 return responApi.v2respon200(req, res, 'Berhasil mendaftar', orderGet);
            }
        })
    } catch(error){
        return responApi.v2respon400(req, res, 'Internal Server Error', null);
    }
}

exports.login = async(req, res) => {
    const { email, password, tokenDvc } = req.body;

    try{
        var order = await mUser.findOne({ 
            where: { U_MAIL: email },
            attributes: ['id', 'U_MAIL', 'U_PASSWORD', 'U_IMG', 'U_NAME', 'U_BALANCE', 'U_VERIFY_TOKEN', 'U_ROLE', 'U_VERIFY_STATUS', 'createdAt', 'updatedAt']
        });

        if(order){
            const validatePassword = bcryptjs.compareSync(password, order.U_PASSWORD)

            if(validatePassword){
                const user = await mUser.findOne({ 
                    where: { U_MAIL: email },
                    attributes: [ 'U_MAIL', 'U_ROLE', 'id', 'U_VERIFY_STATUS' ]
                });

                if(user.U_VERIFY_STATUS == "TRUE"){
                    const token = jwt.sign(
                        { user }, process.env.TOKEN_KEY,
                    );
    
                    user.setDataValue('token', token)
    
                    var response= {user}
    
                    await tokenModels.create(
                        {
                            TOKEN_VALUE: token,
                        },
                        { fields: [ 'TOKEN_ID', 'TOKEN_VALUE'] }
                    )
                    await mTokenDevice.create(
                        {
                            id: user.id,
                            TOKEN_VALUE: tokenDvc
                        },
                        { fields: [ 'TKN_DVC_ID', 'TOKEN_VALUE'] }
                    )
    
                    return responApi.v2respon200(req, res, 'Berhasil masuk', response);
                } else{
                    return responApi.v2respon400(req, res, 'Email belum diverifikasi', null);
                }
            } else{
                return responApi.v2respon400(req, res, 'Password yang dimasukkan salah', null);
            }


        } else{
            return responApi.v2respon400(req, res, 'Email belum terdaftar', null);
        }
    }catch(error){
        return responApi.v2respon400(req, res, 'Internal Server Error', null);
    }
}

exports.tokenUser= async(req, res) =>{
    let token = req.body.token || req.query.token || req.headers["authorization"];

    if (!token) {
        return responApi.v2respon400(req, res, 'Token dibutuhkan untuk kebutuhan authentikasi', null);
    }
    token = token.replace("Bearer ", "");
    try {
        const tokendb = await models.Token.findOne({ 
            where: { TOKEN_VALUE: token },
            attributes: [ 'TOKEN_VALUE', 'TOKEN_ID', 'createdAt', 'updatedAt' ]
        });
        if (!tokendb) {
             return responApi.v2respon401(req, res, null);
        }

        const decoded = jwt.verify(token, process.env.TOKEN_KEY);

        res.locals.decodedUser = decoded;


        console.log(decoded)
        return responApi.v2respon200(req, res, 'Berhasil menerima token', decoded.user);
    } catch (err) {
        return responApi.v2respon400(req, res, 'Internal Server Error', null);
    }
}

exports.sendVerifyEmail = async(req, res) => {
    const { email } = req.body;
        try{
            const token = jwt.sign({ email }, process.env.TOKEN_KEY, { expiresIn: '1h' });

        await mUser.update(
            {
                U_VERIFY_TOKEN: token,
            },
            {
                where: { U_MAIL: email},
            }
        );

        const sendMail = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Verifikasi Email',
            html: `
            <p>Silakan klik tautan di bawah ini untuk memverifikasi email Anda:</p>
            <a href="${process.env.APP_URL}api/auth/verify-email/${token}">Verifikasi Email</a>
            `
        };
         await transporter.sendMail(sendMail, (error, info) => {
        if (error) {
            console.log('Email sent: ' + info, 'Error: ' + error);
            return responApi.v2respon200(req, res, "Gagal mengirim email verifikasi", null);
        } else {
            return responApi.v2respon200(req, res, "Berhasil mengirim email verifikasi", null);
        }
      });

    }catch (err) {
        return responApi.v2respon400(req, res, 'Internal Server Error');
    }
}

exports.verifyEmail = async(req, res) => {
    const { token } = req.params;

    try {
      const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  
      await mUser.update(
            {
                U_VERIFY_TOKEN: "",
                U_VERIFY_STATUS: "TRUE"
            },
            {
                where: { U_MAIL: decodedToken.email},
                attributes: [ 'U_MAIL' ]
            }
        );

      res.send("Email telah berhasil diverifikasi, silahkan kembali ke aplikasi dan tunggu sebentar");
    } catch (error) {
    console.log('Error: ' + error);
      res.send('Token tidak valid atau telah kadaluarsa.');
    }
  
}


exports.forgotPassword = async(req, res) => {}

exports.changeMails = async(req, res) => {}


exports.uploadImg = async (req, res) => {
    const { img, imgNamed } = req.body;

    const timestamp = Date.now();


    // const base64Image = img.split(';base64,').pop();
    // const imageBuffer = Buffer.from(base64Image, 'base64');
    // const imagePath = process.env.APP_URL + `Assets/${timestamp+imgNamed}.png`;

    const imagePath = path.resolve(`public/img/users`, `${timestamp+imgNamed}.png`);
    const imageUrl = `img/users/${timestamp+imgNamed}.png`;


    saveBase64Image(img, imagePath);

    return responApi.v2respon200(req, res, 'Berhasil menyimpan foto',imageUrl);
}

exports.uploadImgProfile = async(req, res) => {
    const { img, imgNamed } = req.body;
   
    let token = req.body.token || req.query.token || req.headers["authorization"];

    if (!token) {
        return responApi.v2respon400(req, res, 'Token dibutuhkan untuk kebutuhan authentikasi', null);
    }
    token = token.replace("Bearer ", "");

    try {
        const tokendb = await tokenModels.findOne({ where: { token: token } });
        if (!tokendb) {
             return responApi.v2respon401(req, res, null);
        } else{
            const timestamp = Date.now();

            const imagePath = path.resolve(`public/img/users-profile`, `${timestamp+imgNamed}.png`);
            const imageUrl = `img/users-profile/${timestamp+imgNamed}.png`;
    
    
            saveBase64Image(img, imagePath);
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
             await mUser.update(
                {
                    imgProfileURL: imageUrl
                },
                {
                    where: { id: decoded.user.id}
                }
                );
    
            return responApi.v2respon200(req, res, "Berhasil mengupdate profile", null);
        }
        
        
    } catch (error) {
        return responApi.v2respon400(req, res, 'Internal Server Error', null);
    }
    

}

exports.isVerifyPermission = async(req, res, next) => {
    let token = req.body.token || req.query.token || req.headers["authorization"];

    if (!token) {

        return responApi.v2respon400(req, res, 'Token dibutuhkan untuk kebutuhan authentikasi', null);
    }
    token = token.replace("Bearer ", "");
    try {
        const tokendb = await tokenModels.findOne({ where: { token: token } });
        if (!tokendb) {
             return responApi.v2respon401(req, res, null);
        }

        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        if (decoded.user.isVerify != "true") {
            return responApi.v2respon200(req, res, "Akun belum diverifikasi", null);
        }

        res.locals.decodedUser = decoded;
    } catch (err) {
        return responApi.v2respon400(req, res, 'Internal Server Error', null);
    }
    
    // return next();
    return responApi.v2respon400(req, res, 'Internal Server Error', null);
}

exports.adminPermission = async (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers["authorization"];

    if (!token) {

        return res.status(403).json("A token is required for authentication");
    }
    token = token.replace("Bearer ", "");
    try {
        const tokendb = await tokenModels.findOne({ where: { token: token } });
        if (!tokendb) {
            return responApi.v2respon400(req, res, "Invalid Token");
        }

        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        if (decoded.user.isVerify != "true") {
            return responApi.v2respon200(req, res, "Please Verify Your Email");
        }
        if (decoded.user.role != "admin") {
            return responApi.v2respon200(req, res, "You dont have a access");
        }

        res.locals.decodedUser = decoded;
    } catch (err) {
        return responApi.v2respon400(req, res, 'Internal Server Error');
    }

    return next();
}

exports.logOut = async(req, res, next) => {
    var funcName = "logOut"
    console.log(funcName+'called')
    let token = req.body.token || req.query.token || req.headers["authorization"];
    if (!token) {
        return responApi.v2respon400(req, res, 'Token dibutuhkan untuk kebutuhan authentikasi', null);
    }
    token = token.replace("Bearer ", "");
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const tokendb = await tokenModels.findOne({ where: { TOKEN_VALUE: token } });
        if (!tokendb) {
             return responApi.v2respon401(req, res, null);
        } else{
            await mTokenDevice.destroy({
                where: {
                    id: decoded.user.id,
                    TOKEN_VALUE: req.params.tokenDvc
                }
            })
            tokenModels.destroy({
                where: {
                  TOKEN_VALUE: token,
                },
              }).then((rowsDeleted) => {
                return responApi.v2respon200(req, res, "Berhasil untuk keluar", null);
              })
              .catch((error) => {
                return responApi.v2respon400(req, res, "Gagal untuk keluar", null);
              });
        }

        
    } catch (error) {
        console.log('Error '+funcName+' => '+error)
        return responApi.v2respon400(req, res, 'Internal Server Error', null);
    }

}
exports.getSession = async(req, res, next) => {
    var funcName = "getSession"
    let token = req.body.token || req.query.token || req.headers["authorization"];
    if (!token) {
        return responApi.v2respon400(req, res, 'Token dibutuhkan untuk kebutuhan authentikasi', null);
    }
    token = token.replace("Bearer ", "");
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const tokendb = await tokenModels.findOne({ where: { TOKEN_VALUE: token } });
        if (!tokendb) {
            return responApi.v2respon401(req, res, null);
        } else{
            return responApi.v2respon200(req, res, "Session ok", null);
        }

        
    } catch (error) {
        console.log('Error '+funcName+' => '+error)
        return responApi.v2respon400(req, res, 'Internal Server Error', null);
    }

}
exports.getUser = async(req, res, next) => {
    var funcName = "getUser"
    let token = req.body.token || req.query.token || req.headers["authorization"];
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
            mUser.findOne({
                where: {
                  id: decoded.user.id,
                },
                attributes: { exclude: ['U_PASSWORD', 'U_VERIFY_TOKEN'] },
              }).then((user) => {
                if (user) {
                    return responApi.v2respon200(req, res, "Berhasil mendapatkan data user",user);
                } else {
                    return responApi.v2respon400(req, res, "User tidak ditemukan", null);
                }
              })
              .catch((error) => {
                return responApi.v2respon400(req, res, "Failed to make a request", null);
              });
        }

        
    } catch (error) {
        console.log('Error '+funcName+' => '+error)
        return responApi.v2respon400(req, res, 'Internal Server Error', null);
    }

}
exports.allUser = async(req, res, next) => {
    var funcName = "allUser"
 
    try {

        mUser.findAll({
            attributes: { exclude: ['password'] },
          }).then((user) => {
            if (user) {
                return responApi.v2respon200(req, res, "Berhasil mendapat data user",user);
            } else {
                return responApi.v2respon400(req, res, "Gagal mendapatkan data user", null);
            }
          })
          .catch((error) => {
            return responApi.v2respon400(req, res, "Failed to make a request", null);
          });

        
    } catch (error) {
        console.log('Error '+funcName+' => '+error)
        return responApi.v2respon400(req, res, 'Internal Server Error', null);
    }

}
exports.allParker = async(req, res, next) => {
 
    try {

        mUser.findAll({
            where: {
                role: 'parker',
            },
            attributes: { exclude: ['password'] },
          }).then((user) => {
            if (user) {
                return responApi.v2respon200(req, res, "Berhasil mendapatkan data penyedia layanan parkir",user);
            } else {
                return responApi.v2respon400(req, res, "Gagal mendapatkan data", null);
            }
          })
          .catch((error) => {
            return responApi.v2respon400(req, res, "Failed to make a request", null);
          });

        
    } catch (error) {
        return responApi.v2respon400(req, res, 'Internal Server Error', null);
    }

}
exports.updateUserDisplay = async(req, res, next) => {
    let token = req.body.token || req.query.token || req.headers["authorization"];
    const {name} = req.body
    if (!token) {
        return responApi.v2respon400(req, res, 'Token dibutuhkan untuk kebutuhan authentikasi', null);
    }
    token = token.replace("Bearer ", "");
    try {

        const tokendb = await tokenModels.findOne({ where: { token: token } });
        if (!tokendb) {
             return responApi.v2respon401(req, res, null);
        } else{
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            mUser.update(
                {
                    name: name
                }, 
                {
                where: {
                  id: decoded.user.id,
                }})

                return responApi.v2respon200(req, res, "Berhasil merubah profile", null);
        }

        
    } catch (error) {
        return responApi.v2respon400(req, res, 'Internal Server Error', null);
    }

}

exports.verifyemailCheck = async(req, res) => {
    const {email} = req.params

    const user = await mUser.findOne({ 
        where: { email: email },
        attributes: [ 'isVerify' ]
    });

    if(user.isVerify == "true"){
        return responApi.v2respon200(req, res, "Akun telah diverifikasi", null);
    } else{
        return responApi.v2respon400(req, res, 'Akun Belum diverifikasi', null);
    }

}