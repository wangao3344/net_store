'use strict';

const BaseController = require('./base');

class ManagerController extends BaseController {
  //展示用户
  async index() {
      let keywords = this.ctx.query.keywords;
      console.log(keywords);
      let json={};
      //模糊查询
      if(keywords){

          json= Object.assign(json,{"username":{$regex:new RegExp(keywords)}});
      }
     let list = await this.service.adminDbService.aggregate(json);
     //console.log(JSON.stringify(list));
    await this.ctx.render('admin/manager/index',{list});

  }
  //添加用户
    async add() {
      //再添加的时候我们要获取角色的数据
        let list = await this.service.roleDbService.findAll();
        //console.log(list);
        await this.ctx.render('admin/manager/add',{list})
    }
    //添加用户所提交的数据
    async doAdd() {
        let adminInfor = this.ctx.request.body;
       // console.log(adminInfor);
        //首先要验证用户是否注册过了
        let password=adminInfor.password;
        let username =adminInfor.username;
        let email=adminInfor.email;
        let mobile=adminInfor.mobile;
        let id=adminInfor.role_id;
        //console.log(id);
        password=await this.service.encrypted.toMD5(password);
        let result = await this.service.adminDbService.findOne({username:username});
        if(result){
            await this.error('/admin/manager/add','用户已存在');
        }else {
            let result=await this.service.adminDbService.add({username: username,password:password,email: email,mobile:mobile,role_id: id});
            if(result){
                await this.success('/admin/manager','添加成功');
            }
        }
    }
    //编辑用户
    async edit() {
        let id = this.ctx.query.id;
        //console.log(id);
        //转换成objectID失败！！
        //let _id=this.app.mongoose.Types.ObjectId(id);
        let admin = await this.service.adminDbService.findOne({_id:id});
        //console.log(admin);
        //再编辑用户的时候我们要获取角色的数据传递过来
        let list = await this.service.roleDbService.findAll();
        //console.log(list);
        await this.ctx.render('admin/manager/edit',{admin,list});

    }
    //修改用户所提交的数据
    async doEdit() {
        let adminInfor = this.ctx.request.body;
        //console.log(adminInfor);
        let id = adminInfor.id;
        let password=adminInfor.password;
        let username =adminInfor.username;
        let email=adminInfor.email;
        let mobile=adminInfor.mobile;
        let role_id=adminInfor.role_id;
        //console.log(role_id);
        //首先判断密码是否为空
        if(password){
            //进行md5加密
            password = await this.service.encrypted.toMD5(password);
            await this.service.adminDbService.updateOne({_id:id},{password,email,mobile,role_id});
        }else {
            //为空就不修改密码，根据id来修改
            await this.service.adminDbService.updateOne({_id:id},{email,mobile,role_id})

        }
        await this.success('/admin/manager','编辑用户成功');

    }
    async delete() {
        this.ctx.body='管理员删除'

    }
}

module.exports = ManagerController;