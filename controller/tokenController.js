var njwt = require('njwt')
//var express = require('express')
config = require("../config")
const redisClient = require('../utils/redisClient');
// var app = express()
// const validator = require('../controllers/validators/token')
// const log4js = require('log4js')
// var logger = log4js.getLogger('tokenLog')
// // app.use(time.init)


module.exports = {

    createToken(email,imapObject,callback) {
        console.log("in create token");
        var claims = {
            sub: email,
            permissions: "end-user permission",
            iat: new Date(),
        }
        var jwt = njwt.create(claims, config.jwt.secretkey);
        jwt.setExpiration(new Date().getTime()+ (24*60*60*1000)); // 24 hour from now
        var tkn = jwt.compact();
        console.log('token is :' +tkn)
        var key = tkn;
        console.log(typeof key)
        var value = imapObject;
        //console.log(JSON.parse(value))
        redisClient.set(key,value,(err,result)=>{
            console.log(err)
            console.log(result)
        });
        redisClient.get(key, function (error, result) {
            if (error) {
                rej()
                console.log(error);
                callback(error,null)
                throw error;
            }
            //res(result)
            console.log('GET result ->' + result);
            callback(null,tkn)

        });
 

    },


    checkToken(bearerHeader, callback) {

        var token;
        if (typeof bearerHeader !== 'undefined') {
            console.log('header is')
            var bearer = bearerHeader.split(' ')
            console.log(bearer)
            console.log(bearer[1])
            var bearerToken = bearer[1]
            token = bearerToken
        }
        console.log(`token is ${token}`)
        njwt.verify(token, config.jwt.secretkey, (err) => {
            if (err) {
                console.log(err)
                callback("token is not valid", null)
            } else {
                redisClient.get(token, function (error, result) {
                    if (error) {
                        rej()
                        console.log(error);
                        callback(error,null)
                        throw error;
                    }
                    //res(result)
                    console.log('GET result ->' + JSON.parse(result));
                    callback(null,JSON.parse(result))
        
                });
                // Token.findOne({
                //     where: {
                //         token: token,
                //         status: true
                //     }

                // }).then(function (item) {

                //     if (item) {
                //         callback(null, item)


                //     } else {
                //         callback("token is not valid", null)


                //     }


                // })

            }

        })

    },
   
}
