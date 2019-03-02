
const Service = require('egg').Service;

class GoodsImageDbService extends Service {

  async add(json) {
     let result = await this.ctx.model.GoodsImage.create(json);
     //console.log(result);
      return result;
  }
  async findAll(){
      let result = await this.ctx.model.GoodsImage.find();
      return result;
  }
  async findOne(condition){
      let result = await this.ctx.model.GoodsImage.findOne(condition);
      return result;
  }
  async updateOne(condition,newGoods){
      let result = await this.ctx.model.GoodsImage.updateOne(condition,newGoods);
      //console.log(result);
      return result;
  }
    async findByCondition(condition){
        let result = await this.ctx.model.GoodsImage.find(condition);
        return result;
    }
    async deleteOne(condition){
        let result = await this.ctx.model.GoodsImage.deleteOne(condition);
        return result;
    }


}

module.exports =  GoodsImageDbService;