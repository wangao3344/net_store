
const Service = require('egg').Service;

class Access_Db_Service extends Service {
    //添加权限数据信息
  async add(json) {
    let access=await this.ctx.model.Access.create(json);
    return access;
  }
  async updateOne(conditon,jason){
      let update = await this.ctx.model.Access.updateOne(conditon,jason);
      return update;
  }
  //查询全部权限
    async findAll() {
        let arr=await this.ctx.model.Access.find();
        return arr;
    }
    //查询一个权限的方法
    async findOne(condition) {
        let arr=await this.ctx.model.Access.findOne(condition);
        return arr;
    }
    //根据条件查询
    async findByCondition(condition) {
        let arr=await this.ctx.model.Access.find(condition);
        return arr;
    }
    //首页展示自关联查询
    async accessList(){
        let list=await this.ctx.model.Access.aggregate([
            {
                $lookup: {
                        from:'access',
                        localField:'_id',
                        foreignField:'module_id',
                        as:'items'
                    },
            },
            {
                $match: {
                    'module_id':'0'
                }

            }

            ]);
        return list;
    }

}

module.exports = Access_Db_Service;