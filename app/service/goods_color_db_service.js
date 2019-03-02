
const Service = require('egg').Service;

class GoodsColorDbService extends Service {
  async add(json) {
     let result = await this.ctx.model.GoodsColor.create(json);
     //console.log(result);
      return result;
  }
  async findAll(){
      let result = await this.ctx.model.GoodsColor.find();
      return result;
  }
  async findOne(condition){
      let result = await this.ctx.model.GoodsColor.findOne(condition);
      return result;
  }
  async findByCondition(condition){
      let result = await this.ctx.model.GoodsColor.find(condition);
      return result;
  }
  async updateOne(condition,newGoods){
      let result = await this.ctx.model.GoodsColor.updateOne(condition,newGoods);
      //console.log(result);
      return result;
  }
    async deleteOne(condition){
        let result = await this.ctx.model.GoodsColor.deleteOne(condition);
        return result;
    }
    //查找商品的对应颜色
    async findGoodsColor(goodsColorArr){
      let colors= await this.ctx.model.GoodsColor.find({
            $or:goodsColorArr
            }
        );
      return colors;
    }
    async findByRelation(condition_list,keywords){
        let goods_color_list = await this.ctx.model.GoodsColor.find({$or:condition_list},keywords);
        return goods_color_list;
    }





}

module.exports = GoodsColorDbService;