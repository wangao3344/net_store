module.exports = (options,app) => {
   return async function init (ctx,next) {
       //初始化公共部分的数据: 中间导航
       //顶部导航导航结合缓存实现
       let nav_top_list = await ctx.service.cashService.getCash('nav_top_list');
       //console.log(nav_top_list);
       if(!nav_top_list){
           nav_top_list = await ctx.service.navDbService.findByCondition({position: 1});
           await ctx.service.cashService.setCash('nav_top_list',nav_top_list,60*60*60);
       }
       ctx.state.nav_top_list=nav_top_list;
       //遍历中间导航
       let nav_middle_list = await ctx.service.navDbService.findByCondition({position: 2});
       //防止不可扩展对象
       nav_middle_list = JSON.parse(JSON.stringify(nav_middle_list));
       //console.log(nav_middle_list);
       if (nav_middle_list.length > 0) {
           nav_middle_list.forEach(async (value) => {
               let goods_id_list = [];
               if (value.relation) {
                   //如果用户添加的id有误我们不能让程序报错
                   try {
                       //防止用户输入中文符号报错
                       let arr = value.relation.replace(/，/g, ',').split(',');
                       //console.log(arr);
                       arr.forEach((goodsID) => {
                           //由于我们是通过数组来查找数据的，我们需要把元素转换成Objectid类型

                           goods_id_list.push({"_id": app.mongoose.Types.ObjectId(goodsID)});
                       });
                       //查找商品数据库
                       let goods_arr = await ctx.service.goodsDbService.findByRelation(goods_id_list);
                       value.goods_list = goods_arr;
                       //console.log(value.goods_list);
                   } catch (e) {
                       value.goods_list = [];
                       console.log(e);
                   }

               } else {
                   value.goods_list = [];
               }


           });
       }
       //console.log(nav_middle_list);//在controller中我们可以看见他的扩展属性
       ctx.state.nav_middle_list=nav_middle_list;
       //商品分类
       let goods_cate_list = await ctx.service.goodsCateDbService.showCateList();
       ctx.state.goods_cate_list=goods_cate_list;
       await next();


   }
};