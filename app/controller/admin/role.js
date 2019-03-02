'use strict';

const BaseController = require('./base');

class WorkerController extends BaseController {
  async index() {
      let roles=await this.service.roleDbService.findAll();
   　await  this.ctx.render('admin/role/index',{list:roles});
  }
  async add() {
      await  this.ctx.render('admin/role/add');
  }
  async doAdd() {
        let role=this.ctx.request.body;
        await  this.service.roleDbService.add({title:role.title,description:role.description});
        await this.success('/admin/role','添加成功');
    }
  async edit() {
      let id = this.ctx.query.id;
      let role=await  this.service.roleDbService.findOne({_id:id});
      //console.log(role);
      await  this.ctx.render('admin/role/edit',{role});
  }
  async doEdit(){
      let id = this.ctx.request.body.id;
      let title = this.ctx.request.body.title;
      let description=this.ctx.request.body.description;
      await  this.service.roleDbService.edit({_id:id},{title: title,description:description});
      await this.success('/admin/role','修改成功');
  }

    /**
     * 权限的回显操作
     *
     */
  async author(){
      let id = this.ctx.request.query.id;
      //先查询role_access表中的权限集合
      let roleArray = await this.service.roleAccessDbService.find({role_id:id});
      //console.log(roleArray);
      //遍历该集合，并把权限字段保存在一个新的集合中
      let accessArray=[];
      roleArray.forEach((value)=>{
          accessArray.push(
              value.access_id.toString()
          );
      });
      //console.log(accessArray);
      //然后在查询所有的权限集合就是access
      //console.log(id);
      var list=await this.service.accessDbService.accessList();
      list.forEach((value)=>{
          if(accessArray.indexOf(value._id.toString())!=-1){
              //判断access表中是否含有role_access的元素。有的话我们就设置checked字段等于true.
              value.checked=true;
              //console.log(value.module_name);
          }
          value.items.forEach((element)=>{
              //判断access表中是否含有role_access的元素。有的话我们就设置checked字段等于true.
              if(accessArray.indexOf(element._id.toString())!=-1){
                  //console.log(element.action_name);
                  element.checked=true;
              }
          })
      });
      //console.log(list);
      await this.ctx.render('/admin/role/auth',{list,id});
  }
  //授权提交
  async doAuthor(){
       let roleId = this.ctx.request.body.role_id;
       let accessNode = this.ctx.request.body.access_node;
       //对于多对多的表关联，我们在进行添加权限的时候要对以前所对应的表中字段的数据要进行删除后再添加，不然会出现重复
       await this.service.roleAccessDbService.deleteMany({role_id: roleId});
      //把数据添加到 role_access表中
       accessNode.forEach(async (access_id)=>{
           await this.service.roleAccessDbService.add({role_id:roleId,access_id});
       });
       await this.success('/admin/role','授权成功！！') ;


  }

}

module.exports = WorkerController;