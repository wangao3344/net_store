'use strict';

const Controller = require('egg').Controller;

class ProductsController extends Controller {
  async index() {
      //根据商品分类展示对应的商品:获取小米手机
      let mobile_list = await this.service.defaultGoodsService.getGoodsByCate('5c6e5bf53cc9134c68d77cf5');
    await this.ctx.render('default/product_list',{mobile_list});
  }
  async detail(){
      let id = this.ctx.query.id;//5c6ff3ba27114931ec7773be
      //console.log(id);
      let goods = await this.service.goodsDbService.findOne({_id:id});
      let goods_photo_list = await this.service.goodsImgDbService.findByCondition({goods_id:this.app.mongoose.Types.ObjectId(id)});
      //console.log(goods.relation_goods);
   //获取关联商品
   var  relation_goods=await this.service.defaultGoodsService.findByList(goods.relation_goods,'goodsDbService','_id market_price goods_version');
      //console.log(relation_goods);
    //获取关联颜色
      let goods_color=await this.service.defaultGoodsService.findByList(goods.goods_color,'goodsColorDbService');
      //获取对应的属性
      //let cate_id=goods.cate_id;
      let attr_list=await this.service.goodsAttrDbService.findByCondition
      ({goods_id:this.app.mongoose.Types.ObjectId(id)});
      //console.log(attr_list);

      //8、获取更多参数  循环商品属性

      /*

        颜色:红色,白色,黄色 |  尺寸:41,42,43

          [

            { cate: '颜色', list: [ '红色', '白色', '黄色 ' ] },
            { cate: ' 尺寸', list: [ '41', '42', '43' ] }

          ]


        算法：

          var goodsAttr='颜色红色,白色,黄色 | 尺寸a41,42,43';

          if(goodsAttr&& goodsAttr.indexOf(':')!=-1){
              goodsAttr=goodsAttr.replace(/，/g,',');
              goodsAttr=goodsAttr.replace(/：/g,':');
              goodsAttr= goodsAttr.split('|');
              for( var i=0;i<goodsAttr.length;i++){
                  if(goodsAttr[i].indexOf(':')!=-1){
                      goodsAttr[i]={
                          cate:goodsAttr[i].split(':')[0],
                          list:goodsAttr[i].split(':')[1].split(',')
                      };
                  }else{
                      goodsAttr[i]={}
                  }
              }

          }else{
            goodsAttr=[]

          }
          console.log(goodsAttr);

      */

      await this.ctx.render('default/product_info',{goods,goods_photo_list,relation_goods,goods_color,attr_list});
  }



    /**
     * 通过ajax请求提交过来的数据，来查询，对应商品的相册
     * @returns {Promise<void>}
     */
    async getPhotoByColor(){
      let goodsId = this.ctx.query.goods_id;
      let colorId = this.ctx.query.color_id;
       // console.log(goodsId+'=='+colorId);
        try {
            if (colorId) {
                //获取相册集
                var goods_image = await this.service.goodsImgDbService.findByCondition({
                    goods_id: this.app.mongoose.Types.ObjectId(goodsId),
                    color_id: this.app.mongoose.Types.ObjectId(colorId)
                });
                if(goods_image.length==0){
                    goods_image = await this.service.goodsImgDbService.findByCondition({goods_id: this.app.mongoose.Types.ObjectId(goodsId)});
                }
            } else {
                goods_image = await this.service.goodsImgDbService.findByCondition({goods_id: this.app.mongoose.Types.ObjectId(goodsId)});
            }
            //console.log(goods_image);

            this.ctx.body = {
                success: true, goods_image_list: goods_image
            }
        } catch (e) {
            console.log(e);
            this.ctx.body = {
                success: false, goods_image_list: goods_image
            }
        }


    }

}

module.exports = ProductsController;