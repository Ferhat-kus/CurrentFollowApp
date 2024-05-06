const redis = require('redis');
const { promisify } = require('util');
require('dotenv').config();

const client = redis.createClient({
    host: process.env.REDIS_SERVER,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});

client.on('error', (err) => {
    console.error(err);
});

const existsAsync = promisify(client.exists).bind(client);
const getAsync = promisify(client.get).bind(client);
const setexAsync = promisify(client.setex).bind(client);
const delAsync = promisify(client.del).bind(client);
const keysAsync = promisify(client.keys).bind(client);

module.exports = {
    async getArrayItem(key) {
        const exists = await existsAsync(key);
        if (exists) {
            const reply = await getAsync(key);
            return JSON.parse(reply);
        }
        return [];
    },

    async addArrayItem(key, array, expiryDate = 40000) {
        await setexAsync(key, expiryDate, JSON.stringify(array));
        return array;
    },

    async delKeyItem(keys) {
        await delAsync(keys);
    },

    async delPrefixKeyItem(keys) {
        if (Array.isArray(keys)) {
            for (const el of keys) {
                const data = await keysAsync(el);
                if (data.length) {
                    await Promise.all(data.map(keyItem => delAsync(keyItem)));
                }
            }
        } else {
            const data = await keysAsync(keys);
            if (data.length) {
                await Promise.all(data.map(keyItem => delAsync(keyItem)));
            }
        }
    },

    getRedisClient() {
        return client;
    }
};
