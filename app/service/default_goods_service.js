
const Service = require('egg').Service;

class DefaultGoodsService extends Service {
    /**
     *  通过商品分类查找对应的商品
     *  首先获取商品分类的所有id
     * @param gooods_cate_id
     * @param type
     * @param limit
     * @param field
     * @returns {Promise<void>}
     */
  async  getGoodsByCate(goods_cate_id,type,limit){
      //let goods_cate = await this.service.goodsCateDbService.findOne({_id:goods_cate_id});
        //定义临时数组
        let goods_cate_arr=[];
        try {
            var goods_cate_list = await this.service.goodsCateDbService.findByCondition(
                {"pid":this.app.mongoose.Types.ObjectId(goods_cate_id)});
            if (goods_cate_list) {
                goods_cate_list.forEach((value) => {

                    goods_cate_arr.push({cate_id: this.app.mongoose.Types.ObjectId(value._id)});

                });
            } else {
                //如果不是顶级分类的话我们就直接存到临时数组里就好
                goods_cate_arr.push({cate_id: goods_cate_id});
            }
        } catch (e) {
            console.log(e);
            return [];
        }
      let condition={$or:goods_cate_arr};
      switch (type) {
          case 'is_hot':
              condition=Object.assign(condition,{is_hot:1});
              break;
          case 'is_new':
              condition=Object.assign(condition,{is_new:1});
              break;
          case 'is_best':
              condition=Object.assign(condition,{is_best:1});
              break;
          default:
              condition;
      }
       let limitSize=limit||8;
      //console.log(condition);
     let goods_list=await this.ctx.model.Goods.find(condition).limit(limitSize);
      return goods_list;

  }

    /**
     * 多对多来操作表的查询
     */
    async findByList(str,dbService,field){
        if(str){
            //console.log(str);
        let goods_arr = str.replace(/，/g,',').split(',');
            let goods_relation_list=[];
            goods_arr.forEach((value)=>{
                //console.log(value);
                //由于用的条件是数组所以要把元素转换成objectId
                goods_relation_list.push({_id:this.app.mongoose.Types.ObjectId(value)});
            });
            var relation_goods = await this.service[dbService].findByRelation(goods_relation_list,field);//'_id market_price goods_version
        }else {
            //$or[{"1":-1}]不成立的条件,不然会报错！
             relation_goods = await this.service[dbService].findByRelation([{"1":-1}]);
        }
        //console.log(goods_arr);


        //console.log(goods_relation_list);
       return relation_goods;
    }

}

module.exports = DefaultGoodsService;