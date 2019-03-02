
const Service = require('egg').Service;

class FocusDbService extends Service {
  async add(json) {
   let result= await this.ctx.model.Focus.create(json);
   return result;
  }
    async findAll() {
        let result= await this.ctx.model.Focus.find();
        return result;
    }
    async findOne(condition) {
        let result= await this.ctx.model.Focus.findOne(condition);
        return result;
    }
    async updateOne(condition,newdata) {
        let result= await this.ctx.model.Focus.updateOne(condition,newdata);
        return result;
    }

}

module.exports = FocusDbService;