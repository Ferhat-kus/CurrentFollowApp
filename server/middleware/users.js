// redis ve jwt (JSON WEB TOKEN)
const JWTR = require("jwt-redis").default;
const {
  getRedisClient,
} = require("node-caching-mysql-connector-with-redis/redis.Connector");

const jwt = new JWTR(getRedisClient());

module.exports = {
  usersVerify(req, res, next) {
    const header = req.headers.authorization;
    console.log("USERS HEADER", header);
    const token = header && header.split(" ")[1];
    console.log("MERHABAUSERSTOKEN", token);
    if (!token) return res.sendStatus(401);
    jwt
      .verify(token, process.env.JWT_SECRET_KEY)
      .then(() => {
        req.user = user;
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
