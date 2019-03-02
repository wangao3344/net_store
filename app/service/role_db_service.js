
const Service = require('egg').Service;

class Role_DB_Service extends Service {
  async findAll() {
    //查询所有角色
    let arr=await this.ctx.model.Role.find();
    return arr
  }
  //添加用户
  async add(role) {

        let result=await this.ctx.model.Role.create(role);
        return result
    }
    //修改用户
    async edit(condition,change) {
      let result='nothing';
      let data = await this.findOne(condition);
      if(data){
          result=await this.ctx.model.Role.updateOne(condition,change);
      }

        return result
    }
    async findOne(condition){
        let result=await this.ctx.model.Role.findOne(condition);
        return result;
    }
    async deleteOne(condition){
        let result = await this.ctx.model.Role.deleteOne(condition);
        return result;
    }

}

module.exports = Role_DB_Service;