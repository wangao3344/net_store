'use strict';

const BaseController = require('./base');

class GoodsTypeController extends BaseController {
  async index() {
    let list = await this.service.goodsTypeDbService.findAll();

    await this.ctx.render('admin/goodsType/index',{list});
  }

  async add(){
    await this.ctx.render('admin/goodsType/add')
  }
  async doAdd(){
    let goods = this.ctx.request.body;
    //console.log(goods);
    let result=await this.service.goodsTypeDbService.add(goods);
    if(result){
        await this.success('/admin/goodsType','添加商品类型成功！！！');
    }

  }
  async edit(){
    let id = this.ctx.query.id;
    let goods = await this.service.goodsTypeDbService.findOne({_id:id});
    await this.ctx.render('admin/goodsType/edit',{goods});

  }
  async doEdit(){
    let goods = this.ctx.request.body;
    let id= goods.id;
    //console.log(id);
       let result=await this.service.goodsTypeDbService.updateOne({_id:id},goods);
       if(result){
           await this.success('/admin/goodsType','修改商品类型成功！！！');
       }


  }
}

module.exports = GoodsTypeController;