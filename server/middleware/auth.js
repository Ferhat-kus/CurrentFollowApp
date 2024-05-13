const {
  getRedisClient,
} = require("node-caching-mysql-connector-with-redis/redis.Connector");
let JWTR = require("jwt-redis").default;
const jwt = new JWTR(getRedisClient());

module.exports = {
  authVerify(req, res, next) {
    var header = req.headers.authorization;
    const token = header && header.split(" ")[1];
    if (!token) return res.sendStatus(401);
    jwt
      .verify(token, process.env.JWT_SECRET_KEY)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(401);
      });
  },
};
