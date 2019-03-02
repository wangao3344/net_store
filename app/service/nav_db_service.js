
const Service = require('egg').Service;

class NavDbService extends Service {
  
  async add(json) {
     let result = await this.ctx.model.Nav.create(json);
     //console.log(result);
      return result;
  }
  async findAll(){
      let result = await this.ctx.model.Nav.find();
      return result;
  }
  async findOne(condition){
      let result = await this.ctx.model.Nav.findOne(condition);
      return result;
  }
  async updateOne(condition,newGoods){
      let result = await this.ctx.model.Nav.updateOne(condition,newGoods);
      //console.log(result);
      return result;
  }
    async findByCondition(condition){
        let result = await this.ctx.model.Nav.find(condition);
        return result;
    }
    async deleteOne(condition){
        let result = await this.ctx.model.Nav.deleteOne(condition);
        return result;
    }

    /**
     * 实现分页
     */
    async findByPage(page,count){
        let list = await this.ctx.model.Nav.find().skip((page-1)*count).limit(count);
        return list;
    }
    async getCount(skip){
        let count = await this.ctx.model.Nav.find().countDocuments();
        let number = Math.ceil(count/skip);
        return number;
    }



}

module.exports = NavDbService;