const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient({});

    this.client.on('error', (error) => {
      console.log('Redis client not connected to the server:', error);
    });

    this.client.connect().catch(console.error);
  }

  isAlive() {
    return this.client.isOpen;
  }

  async get(key) {
    return this.client.get(key);
  }

  async set(key, value, duration) {
    return this.client.setEx(key, duration, value);
  }

  async del(key) {
    return this.client.del(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
