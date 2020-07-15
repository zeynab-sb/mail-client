//this file contains config for redis and server.
const path = require("path")

    let configJson = {
        ip: "0.0.0.0",
        port: 3001,
        path: {
            controller: path.resolve("./controller"),
            model: path.resolve("./model"),
               },
        jwt:
            {
                secretkey:"secret-key"
            },       
       redis : "localhost",

redis_port: 6379       
    }   

module.exports = configJson;

