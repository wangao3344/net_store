'use strict';

const BaseController = require('./base');

class NavController extends BaseController {
  async index() {
      let page=this.ctx.query.page||1;
      //每页显示条数 参数skip 每页显示的条数
      let pageCount = await this.service.navDbService.getCount(2);
      let list=await this.service.navDbService.findByPage(page,2);
   　await  this.ctx.render('admin/nav/index',{list,pageCount,page});
  }
  async add() {
      await  this.ctx.render('admin/nav/add');
  }
  async doAdd() {
        let nav=this.ctx.request.body;
        await  this.service.navDbService.add(nav);
        await this.success('/admin/nav','添加成功');
    }
  async edit() {
      let id = this.ctx.query.id;
      let pre_page=this.ctx.state.pre_page;
      let nav=await  this.service.navDbService.findOne({_id:id});
      //console.log(nav);
      await  this.ctx.render('admin/nav/edit',{nav,pre_page});
  }
  async doEdit(){
      let nav = this.ctx.request.body;
      let id=nav.nav_id;
      let prePage=nav.pre_page;
      await  this.service.navDbService.updateOne({_id:id},nav);
      await this.success(prePage,'修改成功');
  }



}

module.exports = NavController;