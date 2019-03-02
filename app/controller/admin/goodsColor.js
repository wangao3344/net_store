'use strict';

const BaseController = require('./base');

class GoodsColorController extends BaseController {
  async index() {
      let list = await this.service.goodsColorDbService.findAll();
    await this.ctx.render('admin/goodsColor/index',{list});
  }
  async add(){
      await this.ctx.render('admin/goodsColor/add');
  }
  async edit(){
      let id=this.ctx.query.id;
      let color=await this.service.goodsColorDbService.findOne({_id:id});
      await this.ctx.render('admin/goodsColor/edit',{color});
  }
  async doEdit(){
    let color = this.ctx.request.body;
      let result = await this.service.goodsColorDbService.updateOne({_id:color.id},color);
      if(result){
          await this.success('/admin/goodsColor','修改商品颜色成功！！');
      }
  }
  async doAdd(){
    let color = this.ctx.request.body;
    //console.log(color);
    let result = await this.service.goodsColorDbService.add(color);
    if(result){
        await this.success('/admin/goodsColor','添加颜色成功');
    }
  }
}

module.exports =GoodsColorController ;