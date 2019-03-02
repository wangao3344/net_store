
const Service = require('egg').Service;
var md5 = require('md5');
class EncryptedService extends Service {
  async toMD5(password) {
      let md = await md5(password);
    return md
  }

}

module.exports = EncryptedService;