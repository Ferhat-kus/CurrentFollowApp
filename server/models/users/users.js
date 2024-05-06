const {
    getRedisClient,
    delKeyItem,
  } = require("node-caching-mysql-connector-with-redis/redis.Connector");
  const JWTR = require("jwt-redis").default;
  const jwt = new JWTR(getRedisClient());
  const generalModel = require("../../utils/generalMethods");
  const {
    QuaryCache,
    getCacheQuery,
  } = require("node-caching-mysql-connector-with-redis");
  
  module.exports = class User extends generalModel {
    async usersListing(req, res) {
      try {
        const users = await QuaryCache(`SELECT * FROM users;`);
        return this.responseWith(res, this.successCode, { users });
      } catch (error) {
        console.log("Hata", error);
        return this.responseWith(res, this.errorCode, { message: "Kullanıcıları listelerken bir hata oluştu" });
      }
    }
  };
  