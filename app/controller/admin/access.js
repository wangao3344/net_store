'use strict';

const BaseController = require('./base');

class AccessContorller extends BaseController {
    async index() {
        let list = await this.ctx.service.accessDbService.accessList();
        //list=JSON.stringify(list);
        //console.log(list);
        await this.ctx.render('admin/access/index',{list});
    }
    async add() {
        //首先要在数据库中查询出顶级模块
        let arr = await this.ctx.service.accessDbService.findByCondition({module_id: '0'});
        //let arr=[];
        let list =arr.length==0?[{_id:0,module_name:'顶级分类'}]:arr;
       //console.log(list);
        await this.ctx.render('/admin/access/add',{list});
    }
    async doAdd() {
       let access = this.ctx.request.body;
       let module_id=access.module_id;
       if(module_id && module_id!=0){
           //把字符串转换成objectID类型
           access.module_id=this.app.mongoose.Types.ObjectId(module_id);
           //console.log(module_id);
       }
       let result = await this.service.accessDbService.add(access);
        if(result){
            await this.success('/admin/access','添加成功');
        }

    }
    //编辑权限
    async edit() {
        //需要把顶级分类的信息传过去
        let list = await this.service.accessDbService.findByCondition({module_id:'0'});
        //获取前端穿过来的id参数
        let id = this.ctx.query.id;
        let access=await this.service.accessDbService.findOne({_id:id});
        await this.ctx.render('admin/access/edit',{list,access});


    }
    async doEdit(){
        let access=this.ctx.request.body;
        //console.log(access);
        if(access.module_id&&access.module_id!='0'){
            access.module_id=this.app.mongoose.Types.ObjectId(access.module_id);
        }
        await this.service.accessDbService.updateOne({_id:access.id},access);
        await this.success('/admin/access','编辑权限成功');


    }
    async delete() {
        this.ctx.body='权限删除'

    }
}

module.exports = AccessContorller;