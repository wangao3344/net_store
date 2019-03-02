
const Service = require('egg').Service;

class GoodsDbService extends Service {

  async add(json) {
     let result = await this.ctx.model.Goods.create(json);
     //console.log(result);
      return result;
  }
  async findAll(){
      let result = await this.ctx.model.Goods.find();
      return result;
  }
  async findOne(condition){
      let result = await this.ctx.model.Goods.findOne(condition);
      return result;
  }
  async updateOne(condition,newGoods){
      let result = await this.ctx.model.Goods.updateOne(condition,newGoods);
      //console.log(result);
      return result;
  }
    async findByCondition(condition){
        let result = await this.ctx.model.Goods.find(condition);
        return result;
    }
    async deleteOne(condition){
        let result = await this.ctx.model.Goods.deleteOne(condition);
        return result;
    }

    /**
     * 实现分页
     */
    async findByPage(page,count,json){
        let list = await this.ctx.model.Goods.find(json).skip((page-1)*count).limit(count);
        return list;
    }
    async getCount(skip,json){
        let count = await this.ctx.model.Goods.find(json).countDocuments();
        let number = Math.ceil(count/skip);
        return number;
    }

    /**
     *
     * @param condition_list
     * @param field 限制返回的字段： title price'
     * @returns {Promise<*>}
     */
    async findByRelation(condition_list,keywords){
        let goods_list = await this.ctx.model.Goods.find({$or:condition_list},keywords);
        return goods_list;
    }



}

module.exports = GoodsDbService;