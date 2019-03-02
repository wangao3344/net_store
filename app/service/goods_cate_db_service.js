
const Service = require('egg').Service;

class GoodsCateDbService extends Service {
  async add(json) {
     let result = await this.ctx.model.GoodsCate.create(json);
     //console.log(result);
      return result;
  }
  async findAll(){
      let result = await this.ctx.model.GoodsCate.find();
      return result;
  }
  async findOne(condition){
      let result = await this.ctx.model.GoodsCate.findOne(condition);
      return result;
  }
  async findByCondition(condition){
      let result = await this.ctx.model.GoodsCate.find(condition);
      return result;
  }
  async updateOne(condition,newGoods){
      let result = await this.ctx.model.GoodsCate.updateOne(condition,newGoods);
      //console.log(result);
      return result;
  }
    async deleteOne(condition){
        let result = await this.ctx.model.GoodsCate.deleteOne(condition);
        return result;
    }

    /**
     * 自关联查询首页展示
     */
    async showCateList(){
        let list=await this.ctx.model.GoodsCate.aggregate([
            {
                $lookup: {
                    from:'goods_cate',
                    localField:'_id',
                    foreignField:'pid',
                    as:'items'
                },
            },
            {
                $match: {
                    'pid':'0'
                }

            }

        ]);
        return list;
    }



}

module.exports = GoodsCateDbService;