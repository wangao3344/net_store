
const Service = require('egg').Service;

class GoodsTypeAttributeDbService extends Service {
  async findbyAggregate(cate_id){
      let list=await this.ctx.model.GoodsTypeAttribute.aggregate([
          {
              $lookup: {
                  from:'goods_type',
                  localField:'cate_id',
                  foreignField:'_id',
                  as:'items'
              },
          },
          {
              $match: {
                  //如果用聚合管道的原生mongo来操作数据库的话，我们需要把string类型装换成Objectid即可
                  'cate_id':this.app.mongoose.Types.ObjectId(cate_id)
              }

          }

      ]);
      return list;
  }
  async add(json) {
     let result = await this.ctx.model.GoodsTypeAttribute.create(json);
     //console.log(result);
      return result;
  }
  async findAll(){
      let result = await this.ctx.model.GoodsTypeAttribute.find();
      return result;
  }
  async findOne(condition){
      let result = await this.ctx.model.GoodsTypeAttribute.findOne(condition);
      return result;
  }
  async updateOne(condition,newGoods){
      let result = await this.ctx.model.GoodsTypeAttribute.updateOne(condition,newGoods);
      //console.log(result);
      return result;
  }
    async findByCondition(condition){
        let result = await this.ctx.model.GoodsTypeAttribute.find(condition);
        return result;
    }
    async deleteOne(condition){
        let result = await this.ctx.model.GoodsTypeAttribute.deleteOne(condition);
        return result;
    }


}

module.exports = GoodsTypeAttributeDbService;