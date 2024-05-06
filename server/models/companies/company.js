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
  async companiesListing(req, res) {
    try {
      const company = await QuaryCache(`SELECT * FROM companies;`);
      return this.responseWith(res, this.successCode, { company });
    } catch (error) {
      console.log("Hata", error);
      return this.responseWith(res, this.errorCode, {
        message: "Kullanıcıları listelerken bir hata oluştu",
      });
    }
  }
  async add(req, res) {
    const { name, addres, phoneNo, email, taxAddres, taxNo, companyType } =
      req.body;
    try {
      const insertState = await QuaryCache(
        `INSERT INTO companies (name, addres, phoneNo, email, taxAddres, taxNo, companyType)
         VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [name, addres, phoneNo, email, taxAddres, taxNo, companyType]
      );
      const token = await jwt.sign(
        {
          id: insertState.insertId,
          email: email,
        },
        process.env.JWT_SECRET_KEY
      );
      return this.responseWith(res, this.successCode, {
        token: token,
        name: name,
        addres: addres,
        phoneNo: phoneNo,
        email: email,
        taxAddres: taxAddres,
        taxNo: taxNo,
        companyType: companyType,
      });
    } catch (error) {
      console.error(error);
      return this.responseWith(res, this.serverErrorCode);
    }
  }
  async getCompany(req, res) {
    const header = req.headers.companyauthorization;
    const companyToken = header && header.split(" ")[1];
    try {
      const getCompanyId = jwt.decode(companyToken);
      if (!getCompanyId) {
        return this.responseWith(res);
      }
      const authHeader = req.headers.authorization;
      const authToken = authHeader && authHeader.split(" ")[1];
      const decodedAuthToken = jwt.decode(authToken);
      if (!decodedAuthToken) {
        return this.responseWith(res, this.unauthorizedCode, {
          message: "Token geçersiz veya hatalı",
        });
      }
      const decodeAuthId = decodedAuthToken.id;
      const getUserSql = await QuaryCache(
        `SELECT * FROM companies WHERE id =${getCompanyId.id};
          UPDATE db.users
            SET companyId = '${getCompanyId.id}'
          WHERE id = '${decodeAuthId}';`
      );
      console.log("getUserSql", getUserSql);
      return this.responseWith(res, this.successCode, {
          name: getUserSql[0].name,
          addres: getUserSql[0].addres,
          phoneNo: getUserSql[0].phoneNo,
          email: getUserSql[0].email,
          taxAddres: getUserSql[0].taxAddres,
          taxNo: getUserSql[0].taxNo,
          companyType: getUserSql[0].companyType,
      });
    } catch (error) {
      console.log("Eşleme başarısız", error);
    }
  }
  async companyBring(req, res) {
    const { name, addres, phoneNo, email, taxAddres, taxNo, companyType } =
      req.body;
    console.log("Bring request", req.body);
    try {
      const header = req.headers.companyauthorization;
      const token = header && header.split(" ")[1];
      console.log("Token", token);
      const decodedToken = jwt.decode(token);
      console.log("Decoded token", decodedToken);
      if (!decodedToken) {
        return this.responseWith(res, this.unauthorizedCode, {
          message: "Token geçersiz veya hatalı",
        });
      }
      const decodeId = decodedToken.id;
      console.log("decode id", decodeId);
      const BringState = await QuaryCache(
        `UPDATE db.companies
        SET 
            name = '${name}',
            addres = '${addres}',
            phoneNo = '${phoneNo}',
            email = '${email}',
            taxAddres = '${taxAddres}',
            taxNo = '${taxNo}',
            companyType = '${companyType}'
        WHERE id = '${decodeId}';
        `
      );
      console.log("SQL", BringState);
      console.log("aaaaaaaaaaa", companyType);
      // Güncelleme başarılı mesajı gönder
      return this.responseWith(res, this.successCode, {
        name: name,
        addres: addres,
        phoneNo: phoneNo,
        email: email,
        taxAddres: taxAddres,
        taxNo: taxNo,
        companyType: companyType,
        // id: decodeId,
      });
    } catch (error) {
      console.log("Hata", error);
      // Hata durumunda uygun bir hata mesajı gönder
      return this.responseWith(res, this.serverErrorCode);
    }
  }
};
