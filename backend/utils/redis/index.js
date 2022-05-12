const redis = require("redis");

// const redisClient = redis.createClient({
//   url: process.env.REDIS_URL,
//   auth_pass: process.env.REDIS_PASSWORD,
//   password: process.env.REDIS_PASSWORD
// })
let redisClient;
if (process.env.NODE_ENV === "production") {
  redisClient = redis.createClient({
    url: process.env.REDISTOGO_URL,
  });
} else {
  redisClient = redis.createClient(6379, '127.0.0.1');
}

(async () => {
  try {
    await redisClient.connect();
  } catch (e) {
      console.log(e);
  }
  redisClient.on("connect", () => {
    console.log("Redis connected");
  });
  redisClient.on('error', (err) => console.log('Redis Client Error', err));
})();

module.exports = redisClient;