const redis = require("redis");
const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
  auth_pass: process.env.REDIS_PASSWORD,
  password: process.env.REDIS_PASSWORD
})

(async () => {
  try {
    await redisClient.connect();
  } catch (e) {
      console.log(e);
  }
  redisClient.on('error', (err) => console.log('Redis Client Error', err));
})();

module.exports = redisClient;