var njwt = require('njwt')
config = require("../config")
const redisClient = require('../utils/redisClient');

module.exports = {

    //in this method we create token for a user
    createToken(email,imapObject,callback) {
        console.log("in create token");
        var claims = {
            sub: email,
            permissions: "end-user permission",
            iat: new Date(),
        }
        var jwt = njwt.create(claims, config.jwt.secretkey);
        jwt.setExpiration(new Date().getTime()+ (24*60*60*1000));
        var tkn = jwt.compact();
        console.log('token is :' +tkn)
        var key = tkn;
        console.log(typeof key)
        var value = imapObject;
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
            console.log('GET result ->' + result);
            callback(null,tkn)

        });
 

    },


    //in this method we check token to authenticate a user
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
                    console.log('GET result ->' + JSON.parse(result));
                    callback(null,JSON.parse(result))
        
                });
            }

        })

    },
   
}
