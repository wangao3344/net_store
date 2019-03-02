
const Service = require('egg').Service;

class ArticleDbService extends Service {
  async add(json) {
     let result = await this.ctx.model.Article.create(json);
     //console.log(result);
      return result;
  }
  async findAll(){
      let result = await this.ctx.model.Article.find();
      return result;
  }
  async findOne(condition){
      let result = await this.ctx.model.Article.findOne(condition);
      return result;
  }
  async findByCondition(condition){
      let result = await this.ctx.model.Article.find(condition);
      return result;
  }
  async updateOne(condition,newGoods){
      let result = await this.ctx.model.Article.updateOne(condition,newGoods);
      //console.log(result);
      return result;
  }
    async deleteOne(condition){
        let result = await this.ctx.model.Article.deleteOne(condition);
        return result;
    }

    /**
     * 自关联查询首页展示聚合管道做分页查询
     */
    async showCateList(page,count){
        let list=await this.ctx.model.Article.aggregate([
            {
                $lookup: {
                    from:'article_cate',
                    localField:'cate_id',
                    foreignField:'_id',
                    as:'items'
                },
            },

            {
                $skip:(page-1)*count
            },
            {
                $limit: count

            }

        ]);
        return list;
    }
    async getCount(skip){
        let count = await this.ctx.model.Article.find().count();
        let number = Math.ceil(count/skip);
        return number;
    }



}

module.exports = ArticleDbService;