const bcrypt = require("bcrypt");

module.exports = class generalMethods {
  constructor() {
    this.successMessage = "Başarılı";
    this.serverError = "Server Hatası";
    this.usernameValid = "Kulanıcı adı zorunlu";
    this.passwordError = "Şifre yanlış";
    this.userNotFound = "Kullanıcı Bulunamadı";

    this.successCode = 200;
    this.serverErrorCode = 500;
    this.userNameValidCode = 400;
    this.passwordErrorCode = 401;
    this.userNotFoundCode = 404;
  }
  async passwordCompare(password1, password2, errorText = "Parola Hatalı") {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await bcrypt.compare(password1, password2);
        resolve(response);
      } catch (error) {
        throw new Error(errorText);
      }
    });
  }
  async usernameCompare(username1, username2, errorText = "Kullanıcı adı hatalı") {
    try {
      if (username1 === username2) {
        return true; // Kullanıcı adları eşleşirse true döndür
      } else {
        return false; // Eşleşmezse false döndür
      }
    } catch (error) {
      throw new Error(errorText);
    }
  }
  async passwordHash(password) {
    if (!password) return null;
    else {
      const passwordHash = await bcrypt.hash(password, 12);

      return passwordHash;
    }
  }
  async responseWith(response, state, data, message = null) {
    response.status(state);
    switch (state) {
      case 200:
        response.send({
          code: this.successCode,
          data: data,
          message: message ? message : this.successMessage,
        });
        break;
      case 500:
        response.send({
          code: this.serverErrorCode,
          data: data,
          message: message ? message : this.serverError,
        });
        break;
      case 400:
        response.send({
          code: this.userNameValidCode,
          data: data,
          message: message ? message : this.usernameValid,
        });
        break;
      case 401:
        response.send({
          code: this.passwordErrorCode,
          data: data,
          message: message ? message : this.passwordError,
        });
        break;
      case 404:
        response.send({
          code: this.userNotFoundCode,
          data: data,
          message: message ? message : this.userNotFound,
        });
        break;
      default:
        // Diğer durumlar için varsayılan işlemler
        break;
    }
  }
};
