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
    const header = req.headers.companyauthorization;
    const companyToken = header && header.split(" ")[1];
    try {
      // ------------------------------------------------------------------------
      console.log("Abi Headers Burda Abi", req.headers.companyauthorization);
      if (!companyToken) {
        return this.responseWith(res, this.errorCode, {
          message: "Şirket kimliği bulunamadı.",
        });
      }
      const companyDecodeToken = jwt.decode(companyToken);
      if (!companyDecodeToken) {
        return this.responseWith(res, this.errorCode, {
          message: "Geçersiz şirket kimliği.",
        });
      }
      // ----------------------------------------------------------------
      const users = await QuaryCache(
        `SELECT users.*
            FROM companies
            JOIN users ON companies.id = users.companyId
            WHERE companies.id = ${companyDecodeToken.id};`,
        [companyDecodeToken.id]
      );
      console.log("companyDecodeToken mi bu abi", companyDecodeToken);
      return this.responseWith(res, this.successCode, {
        fullname: companyDecodeToken.fullname,
        authorityId: companyDecodeToken.authorityId,
        id: companyDecodeToken.id,
        users: users,
      });
    } catch (error) {
      return this.responseWith(res, this.errorCode, {
        message: "Kullanıcıları listelerken bir hata oluştu",
        error: error.message,
      });
    }
  }

  async userAdd(req, res) {
    const {
      fullname,
      phoneNo,
      email,
      username,
      password,
      authorityId,
      mission,
      companyId,
    } = req.body;
    const header = req.headers.companyauthorization;
    const companyToken = header && header.split(" ")[1];
    try {
      const companyDecodeToken = jwt.decode(companyToken);
      console.log("aaaaaaaaaaaa", companyDecodeToken);
      if (!companyDecodeToken) {
        return this.responseWith(res);
      }
      const insertState = await QuaryCache(
        `INSERT INTO users (fullname, phoneNo, email, username, password, authorityId, mission, companyId)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          fullname,
          phoneNo,
          email,
          username,
          await this.passwordHash(password),
          authorityId,
          mission,
          companyDecodeToken.id,
        ]
      );
      const token = await jwt.sign(
        {
          id: insertState.insertId,
          username: username,
          password: password,
          authorityId: authorityId,
          email: email,
        },
        process.env.JWT_SECRET_KEY
      );
      return this.responseWith(res, this.successCode, {
        token: token,
        fullname: fullname,
        phoneNo: phoneNo,
        email: email,
        username: username,
        mission: mission,
        authorityId: authorityId,
        companyId: companyDecodeToken.id,
      });
    } catch (error) {
      console.error(error);
      return this.responseWith(res, this.serverErrorCode);
    }
  }
};
