
const Service = require('egg').Service;

class DB_Admin_Service extends Service {
  //用户展示关联查询
  async aggregate(regex){
     let arr= await this.ctx.model.Admin.aggregate([
         {
          $lookup:{
              from:'role',
              localField:'role_id',
              foreignField:'_id',
              as:'item'
          }
         },
         {
             $match:regex
         }
     ]);
     return arr;
  }
  async add(json) {
    let result = await this.ctx.model.Admin.create(json);
    return result;

  }
    async findOne(condition) {

        let result = await this.ctx.model.Admin.findOne(condition);
        return result;

    }
    async findAll() {
        let result = await this.ctx.model.Admin.find({});
        return result;

    }
    async updateOne(condition,changed) {
        let result = await this.ctx.model.Admin.updateOne(condition,changed);
        return result;

    }

}

module.exports = DB_Admin_Service;