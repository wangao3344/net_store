
const Service = require('egg').Service;

class GoodsTypeDbService extends Service {
  async add(json) {
     let result = await this.ctx.model.GoodsType.create(json);
     //console.log(result);
      return result;
  }
  async findAll(){
      let result = await this.ctx.model.GoodsType.find();
      return result;
  }
  async findOne(condition){
      let result = await this.ctx.model.GoodsType.findOne(condition);
      return result;
  }
  async updateOne(condition,newGoods){
      let result = await this.ctx.model.GoodsType.updateOne(condition,newGoods);
      //console.log(result);
      return result;
  }
    async deleteOne(condition){
        let result = await this.ctx.model.GoodsType.deleteOne(condition);
        return result;
    }


}

module.exports = GoodsTypeDbService;