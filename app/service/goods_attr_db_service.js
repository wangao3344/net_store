
const Service = require('egg').Service;

class GoodsAttrDbService extends Service {

  async add(json) {
     let result = await this.ctx.model.GoodsAttr.create(json);
     //console.log(result);
      return result;
  }
  async findAll(){
      let result = await this.ctx.model.GoodsAttr.find();
      return result;
  }
  async findOne(condition){
      let result = await this.ctx.model.GoodsAttr.findOne(condition);
      return result;
  }
  async updateOne(condition,newGoods){
      let result = await this.ctx.model.GoodsAttr.updateOne(condition,newGoods);
      //console.log(result);
      return result;
  }
    async findByCondition(condition){
        let result = await this.ctx.model.GoodsAttr.find(condition);
        return result;
    }
    async deleteOne(condition){
        let result = await this.ctx.model.GoodsAttr.deleteOne(condition);
        return result;
    }
    async deleteMany(condition){
        let result = await this.ctx.model.GoodsAttr.deleteMany(condition);
        return result;
    }


}

module.exports = GoodsAttrDbService;