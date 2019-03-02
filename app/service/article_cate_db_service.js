
const Service = require('egg').Service;

class ArticleCateDbService extends Service {
  async add(json) {
     let result = await this.ctx.model.ArticleCate.create(json);
     //console.log(result);
      return result;
  }
  async findAll(){
      let result = await this.ctx.model.ArticleCate.find();
      return result;
  }
  async findOne(condition){
      let result = await this.ctx.model.ArticleCate.findOne(condition);
      return result;
  }
  async findByCondition(condition){
      let result = await this.ctx.model.ArticleCate.find(condition);
      return result;
  }
  async updateOne(condition,newGoods){
      let result = await this.ctx.model.ArticleCate.updateOne(condition,newGoods);
      //console.log(result);
      return result;
  }
    async deleteOne(condition){
        let result = await this.ctx.model.ArticleCate.deleteOne(condition);
        return result;
    }

    /**
     * 自关联查询首页展示
     */
    async showCateList(){
        let list=await this.ctx.model.ArticleCate.aggregate([
            {
                $lookup: {
                    from:'article_cate',
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

module.exports = ArticleCateDbService;