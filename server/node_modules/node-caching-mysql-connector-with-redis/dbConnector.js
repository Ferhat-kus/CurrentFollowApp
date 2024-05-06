const db = require('mysql2/promise');
const { getArrayItem, addArrayItem, delPrefixKeyItem } = require('./redis.Connector');
require('dotenv').config();
const env = process.env;

const con = db.createPool({
    host: env.DB_HOST,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    connectionLimit: 20000,
    queueLimit: 20,
    acquireTimeout: 1000000,
    multipleStatements: true,
    port: env.DB_PORT
});

module.exports = {
    async QuaryCache(sql, parameters, resetCacheName = null) {
        try {
            const connection = await con.getConnection();
            const [data] = await connection.query(sql, parameters);
            connection.release();

            if (resetCacheName) {
                await delPrefixKeyItem(resetCacheName);
            }

            return data;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    async getCacheQuery(sql, parameters, cacheName) {
        try {
            const cachedData = await getArrayItem(cacheName);

            if (cachedData.length > 0) {
                return cachedData;
            }

            const connection = await con.getConnection();
            const [data] = await connection.query(sql, parameters);
            connection.release();

            await addArrayItem(cacheName, data);
            return data;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    async getCacheQueryPagination(sql, parameters, cacheName, page, pageSize = 30) {
        try {
            const cachedData = await getArrayItem(cacheName);

            if (typeof cachedData === 'object' && !Array.isArray(cachedData) && cachedData !== null) {
                return cachedData;
            }

            const connection = await con.getConnection();
            const [data] = await connection.query(sql, parameters);
            connection.release();

            let filteredData = data.filter(r => r.id > 0);
            let list = [];

            for (let i = 0; i < filteredData.length; i += pageSize) {
                list.push(filteredData.slice(i, i + pageSize));
            }

            const cPage = parseInt(page) >= 0 ? page : 0;

            if (!filteredData.length || !(list.length - 1 >= cPage)) {
                return {
                    totalCount: filteredData.length,
                    pageCount: list.length,
                    detail: []
                };
            }

            const result = {
                totalCount: filteredData.length,
                pageCount: list.length,
                detail: list[cPage]
            };

            await addArrayItem(cacheName, result);
            return result;
        } catch (err) {
            throw new Error(err.message);
        }
    }
};
