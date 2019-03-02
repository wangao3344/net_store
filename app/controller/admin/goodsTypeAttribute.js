'use strict';

const BaseController = require('./base');

class GoodsTypeAttributeController extends BaseController {
  async index() {
    let cateId = this.ctx.query.cate_id;
      let goods_type = await this.service.goodsTypeDbService.findOne({_id:cateId});
    let list = await this.service.goodsTypeAttributeDbService.findbyAggregate(cateId);
    //console.log(list);
    await this.ctx.render('admin/goodsTypeAttribute/index',{list,cateId,goods_type});
  }

  async add(){
    //获取所要添加类型的id
    let cate_id=  this.ctx.query.cate_id;
    //  查询所有的类型
      let list = await this.service.goodsTypeDbService.findAll();
     await this.ctx.render('admin/goodsTypeAttribute/add',{list,cate_id});
  }
  async doAdd(){
    let attr = this.ctx.request.body;
    //console.log(goods);
    let result=await this.service.goodsTypeAttributeDbService.add(attr);
    if(result){
        await this.success('/admin/goodsTypeAttribute?cate_id='+attr.cate_id,'添加商品类型属性成功！！！');
    }

  }
  async edit(){
    let id = this.ctx.query.id;
      //  查询所有的类型
      let list = await this.service.goodsTypeDbService.findAll();
      //对应属性
    let attr = await this.service.goodsTypeAttributeDbService.findOne({_id:id});
    //console.log(attr);
    await this.ctx.render('admin/goodsTypeAttribute/edit',{attr,list});

  }
  async doEdit(){
    let attr = this.ctx.request.body;
    let id= attr.id;
    //console.log(attr.cate_id);
       let result=await this.service.goodsTypeAttributeDbService.updateOne({_id:id},attr);
       if(result){
           await this.success('/admin/goodsTypeAttribute?cate_id='+attr.cate_id,'修改商品类型属性成功！！！');
       }


  }
}

module.exports = GoodsTypeAttributeController;