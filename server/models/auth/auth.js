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

module.exports = class Auth extends generalModel {
  async signIn(req, res) {
    const { username, password, authorityId, companyId, fullname } = req.body;
    try {
      const cacheKey = "user-auth-*" + username + "-information-*";
      await delKeyItem(cacheKey);
      if (username) {
        const sql = `SELECT id, username, password, authorityId, companyId, fullname
          FROM users
          WHERE username = ?;`;

        const parameters = [username];
        const userData = await getCacheQuery(sql, parameters, cacheKey);
        if (userData.length > 0) {
          const user = userData[0];
          const usernameCompare = await this.usernameCompare(
            username,
            user.username
          );
          const compare = await this.passwordCompare(password, user.password);
          console.log("karşilaştırma ", usernameCompare);
          if (compare) {
            const token = await jwt.sign(
              {
                username: user.username,
                password: user.password,
                authorityId: user.authorityId,
                id: user.companyId,
                fullname: user.fullname,
              },
              process.env.JWT_SECRET_KEY
            );
            return this.responseWith(res, this.successCode, {
              token: token,
              username: user.username,
              password: user.password,
              authorityId: user.authorityId,
              id: user.companyId,
              fullname: user.fullname,
            });
          } else {
            return this.responseWith(res, this.passwordErrorCode);
          }
        } else {
          return this.responseWith(res, this.userNotFoundCode);
        }
      } else {
        return this.responseWith(res, this.userNameValidCode);
      }
    } catch (error) {
      console.error(error);
      return this.responseWith(res, this.serverErrorCode);
    }
  }
  // -------------------------------------------------
  async signUp(req, res) {
    const {
      fullname,
      phoneNo,
      email,
      username,
      password,
      mission,
      authorityId,
    } = req.body;

    const companyId = req.body.companyId || 0;
    console.log(req.body);
    try {
      const insertState = await QuaryCache(
        `INSERT INTO users (fullname, phoneNo, email, username, password, mission, authorityId, companyId)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          fullname,
          phoneNo,
          email,
          username,
          await this.passwordHash(password),
          mission,
          authorityId,
          companyId,
        ]
      );

      const token = await jwt.sign(
        {
          id: insertState.insertId,
          phoneNo: phoneNo,
          email: email,
          username: username,
        },
        process.env.JWT_SECRET_KEY
      );
      console.log("signUp Token ", jwt.decode(token));
      return this.responseWith(res, this.successCode, {
        token: token,
        fullname: fullname,
        phoneNo: phoneNo,
        email: email,
        username: username,
        mission: mission,
        authorityId: authorityId,
        companyId: companyId,
      });
    } catch (error) {
      console.error(error);
      return this.responseWith(res, this.serverErrorCode);
    }
  }
};
