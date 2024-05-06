// redis ve jwt (JSON WEB TOKEN)
const JWTR = require("jwt-redis").default;
const {
  getRedisClient,
} = require("node-caching-mysql-connector-with-redis/redis.Connector");

const jwt = new JWTR(getRedisClient());

module.exports = {
  companyVerify(req, res, next) {
    const header = req.headers.companyauthorization;
    console.log("REQ.HEADERS COMPANY MİDDLEWARE", req.headers);
    console.log("COMPANY HEADER TOKEN", header);
    const token = header && header.split(" ")[1];
    console.log("SPLİT TOKEN", token);
    if (!token) return res.sendStatus(401);
    jwt
      .verify(token, process.env.JWT_SECRET_KEY)
      .then((company) => {
        console.log("Middleware company",company);
        req.company= company;
        console.log("req.company:",req.company);
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
