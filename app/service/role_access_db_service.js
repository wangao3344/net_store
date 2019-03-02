
const Service = require('egg').Service;

class RoleAccessDbService extends Service {
  async add(json) {
        let result = await this.ctx.model.RoleAccess.create(json);
        return result;
  }
  async deleteMany(condition){
      let result=await this.ctx.model.RoleAccess.deleteMany(condition);
      return result;
  }
  async find(conditon){
      let list = await this.ctx.model.RoleAccess.find(conditon);
      return list;
  }

}

module.exports = RoleAccessDbService;