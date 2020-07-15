// In this class we handle connection to redis.
// In Redis tokens are cached so each api so that users are authenticated and they are autorized to call APIs.
const redis = require('redis');
const config = require('../config');
let redisClient = redis.createClient({ port: config.redis_port, host: config.redis });

redisClient.on('connect', function connect() {
    console.log('connected to redis');
    redisClient.select(0);
});

redisClient.on('error', function (err) {
    console.log('redis error occurred: ' + err);
});

redisClient.on('reconnecting', function reconnecting() {
    console.log('connection to redis established');
});

module.exports = redisClient;