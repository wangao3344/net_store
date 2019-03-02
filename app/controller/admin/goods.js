'use strict';

const BaseController = require('./base');
const pump = require('mz-modules/pump');
const path = require('path');
const fs =require('fs');
class GoodsController extends BaseController {
  async index() {
    let keywords=this.ctx.query.keywords;
    let json={};
    if(keywords){
        json=Object.assign(json,{'title':{$regex:new RegExp(keywords)}})
    }
    let page= this.ctx.query.page || 1;
    let count=2;
    let totalCount= await this.service.goodsDbService.getCount(count,json);
    //console.log(totalCount);
    let list = await this.service.goodsDbService.findByPage(page,count,json);
      await this.ctx.render('admin/goods/index',{list,page,totalCount,keywords
      });
  }
  async add(){
      //获取商品分类 是个自关联的表
      let cate=await this.service.goodsCateDbService.showCateList();
      //console.log(cate);
      //所有的商品颜色
      let list = await this.service.goodsColorDbService.findAll();
      //所有的商品类型
      let type = await this.service.goodsTypeDbService.findAll();
      await this.ctx.render('admin/goods/add',{list,type,cate});
  }
  async getAttrByType(){
      let cid = this.ctx.query.cid;
      //console.log(cid);
      let result=await this.service.goodsTypeAttributeDbService.findByCondition({cate_id:cid});
      //console.log(result);
      this.ctx.body={
          result:result
      }
  }

    /**
     * 上传商品详情图片
     *
     */
  async uploadImg(){
      const parts = this.ctx.multipart({ autoFields: true });
      let files = {};
      let stream;
      //只要流存在我们就一直执行。
      while ((stream = await parts()) != null) {
          if (!stream.filename) {
              break;
          }
// console.log(stream);
          const filename = stream.filename.toLowerCase();
          //提交的文件属性名如 name=‘focus_img’
          const fieldname = stream.fieldname;
          const dir = await this.service.uploadMutipartService.mkDir(filename);
          let target=dir['uploadDir'];
          const writeStream = fs.createWriteStream(target);
          await pump(stream, writeStream);

          //如果保存的是原路径的话，会显示这样的格式：{"focus_img":"app\\public\\admin\\upload\\2019-02-08\\1549624765127.png"，因此我们需要重新修改路径保存的格式应该是public/admin/upload/2019-02-08/159624765127

          //用对象合并的方式来实现，不用数组的push方式
          files=Object.assign(files,{[fieldname]:dir.saveDir});

      }
      let fields= parts.field;


      this.ctx.body={link: files.file};

  }

    /**
     *
     * 上传商品封面的图片
     */
   async goodsUploadPhoto(){
        const parts = this.ctx.multipart({ autoFields: true });
        let files = {};
        let stream;
        //只要流存在我们就一直执行。
        while ((stream = await parts()) != null) {
            if (!stream.filename) {
                break;
            }
// console.log(stream);
            const filename = stream.filename.toLowerCase();
            //提交的文件属性名如 name=‘focus_img’
            const fieldname = stream.fieldname;
            const dir = await this.service.uploadMutipartService.mkDir(filename);
            let target=dir['uploadDir'];
            const writeStream = fs.createWriteStream(target);
            await pump(stream, writeStream);

            //如果保存的是原路径的话，会显示这样的格式：{"focus_img":"app\\public\\admin\\upload\\2019-02-08\\1549624765127.png"，因此我们需要重新修改路径保存的格式应该是public/admin/upload/2019-02-08/159624765127

            //用对象合并的方式来实现，不用数组的push方式
            files=Object.assign(files,{[fieldname]:dir.saveDir});
            //生成缩略图
            await this.service.jimpService.jimp(target);

        }
        let fields= parts.field;


        this.ctx.body={link: files.file};



    }

   async doAdd(){
       const parts = this.ctx.multipart({ autoFields: true });
       let files = {};
       let stream;
       //只要流存在我们就一直执行。
       while ((stream = await parts()) != null) {
           if (!stream.filename) {
               break;
           }
// console.log(stream);
           const filename = stream.filename.toLowerCase();
           //提交的文件属性名如 name=‘focus_img’
           const fieldname = stream.fieldname;
           const dir = await this.service.uploadMutipartService.mkDir(filename);
           let target=dir['uploadDir'];
           const writeStream = fs.createWriteStream(target);
           await pump(stream, writeStream);

           //如果保存的是原路径的话，会显示这样的格式：{"focus_img":"app\\public\\admin\\upload\\2019-02-08\\1549624765127.png"，因此我们需要重新修改路径保存的格式应该是public/admin/upload/2019-02-08/159624765127

           //用对象合并的方式来实现，不用数组的push方式
           files=Object.assign(files,{[fieldname]:dir.saveDir});
           //拷贝图片
           await this.service.jimpService.jimp(target);
       }
       let fields= parts.field;
       let goodsInfor=Object.assign(files,fields);
       //console.log(goodsInfor);
       let infor=await this.service.goodsDbService.add(goodsInfor);
       /*图片上传成功后imglist存放的是url路径*/
       let goodsImgList = goodsInfor.goods_image_list;
       //console.log(infor._id);
       if(goodsImgList){
           //解决上传图片一个图片的错误
           if(typeof (goodsImgList)=='string'){
               goodsImgList=new Array(goodsImgList);

           }
           //添加图库
           goodsImgList.forEach(async (value)=>{
               //console.log(value);
                   let result = await this.service.goodsImgDbService.add({goods_id:infor._id,img_url:value});
           })
       }
       //添加商品属性
       /**
        * goods_id: ,
        * cate_id:
        * attribute_id:
        * attribute_type
        * attribute_title
        * attribute_value
        */
       let attrIdList = goodsInfor.attr_id_list;
       //console.log(attrIdList);
       let attrValueList = goodsInfor.attr_value_list;
       //console.log(attrValueList);
       if(attrIdList){
           //解决上传一个属性的错误
           if(typeof(attrIdList)=='string' ){
               attrIdList=new Array(attrIdList);
               attrValueList=new Array(attrValueList);
           }
           attrIdList.forEach(async (value,index)=>{
               //遍历商品类型属性表
               let attr = await this.service.goodsTypeAttributeDbService.findOne({_id:value});
               await this.service.goodsAttrDbService.add({
                    goods_id: infor._id,
                    cate_id: goodsInfor.cate_id,
                    attribute_id:value,
                    attribute_type:attr.attr_type,
                    attribute_title:attr.title,
                    attribute_value:attrValueList[index],

               })
           })
       }
       await this.success('/admin/goods','添加商品成功');




   }

    /**
     * 商品的修改
     */
    async edit(){
        let id = this.ctx.query.id;
        let pre_page=this.ctx.state.pre_page;
        let goods=await this.service.goodsDbService.findOne({_id:id});
        //如果商品存在颜色时，根据商品信息动态的获取颜色数组

            if(goods.goods_color){
                let colorArr=goods.goods_color.split(',');
                if(colorArr.length>0){
                    let goodsColorArr=[];
                    colorArr.forEach((value)=>{
                        goodsColorArr.push({_id:value});

                    } );
                    var color_arr=await this.service.goodsColorDbService.findGoodsColor(goodsColorArr);

                }
            }




            //console.log(color_arr);


        //获取商品分类 是个自关联的表
        let cate=await this.service.goodsCateDbService.showCateList();
        //console.log(cate);
        //所有的商品颜色
        let list = await this.service.goodsColorDbService.findAll();
        //所有的商品类型
        let type = await this.service.goodsTypeDbService.findAll();
        //对应商品的属性信息
        let attr=await this.service.goodsAttrDbService.findByCondition({goods_id:id});

        var goodsAttsStr='';

        attr.forEach(async (val)=>{
            //console.log(val.attribute_type);
            if(val.attribute_type=='1'){
                goodsAttsStr+=`<li><span>${val.attribute_title}: 　</span><input type="hidden" name="attr_id_list" value="${val.attribute_id}" />  <input type="text" name="attr_value_list"  value="${val.attribute_value}" /></li>`;
            }else if(val.attribute_type=='2'){
                //console.log('------------2------------');
                goodsAttsStr+=`<li><span>${val.attribute_title}: 　</span><input type="hidden" name="attr_id_list" value="${val.attribute_id}" />  <textarea cols="50" rows="3" name="attr_value_list">${val.attribute_value}</textarea></li>`;
            }else{
                //获取 attr_value  获取可选值列表
                //console.log('------------3------------');
                var oneGoodsTypeAttributeResult=await this.service.goodsTypeAttributeDbService.findOne({
                    _id:val.attribute_id
                });
                //console.log(oneGoodsTypeAttributeResult);

                var arr=oneGoodsTypeAttributeResult.attr_value.split('\n');

                goodsAttsStr+=`<li><span>${val.attribute_title}: 　</span><input type="hidden" name="attr_id_list" value="${val.attribute_id}" />`;

                goodsAttsStr+=`<select name="attr_value_list">`;

                for(var j=0;j<arr.length;j++){

                    if(arr[j]==val.attribute_value){
                        goodsAttsStr+=`<option value="${arr[j]}" selected >${arr[j]}</option>`;
                    }else{
                        goodsAttsStr+=`<option value="${arr[j]}" >${arr[j]}</option>`;
                    }
                }
                goodsAttsStr+=`</select>`;
                goodsAttsStr+=`</li>`;
            }

        });
        //商品图片
        let imgList=await this.service.goodsImgDbService.findByCondition({goods_id:id});
        //console.log(imgList);
        //await this.service.goodsImgDbService.findOne()
        await this.ctx.render('admin/goods/edit',{goods,cate,list,type,attr:goodsAttsStr,imgList,color_arr,pre_page});
    }
    async doEdit(){
        const parts = this.ctx.multipart({ autoFields: true });
        let files = {};
        let stream;
        //只要流存在我们就一直执行。
        while ((stream = await parts()) != null) {
            if (!stream.filename) {
                break;
            }
// console.log(stream);
            const filename = stream.filename.toLowerCase();
            //提交的文件属性名如 name=‘focus_img’
            const fieldname = stream.fieldname;
            const dir = await this.service.uploadMutipartService.mkDir(filename);
            let target=dir['uploadDir'];
            const writeStream = fs.createWriteStream(target);
            await pump(stream, writeStream);

            //如果保存的是原路径的话，会显示这样的格式：{"focus_img":"app\\public\\admin\\upload\\2019-02-08\\1549624765127.png"，因此我们需要重新修改路径保存的格式应该是public/admin/upload/2019-02-08/159624765127

            //用对象合并的方式来实现，不用数组的push方式
            files=Object.assign(files,{[fieldname]:dir.saveDir});
            //生成缩略图
            await this.service.jimpService.jimp(target);

        }
        let fields= parts.field;
        let prePage = fields.pre_page;
        let goodsInfor=Object.assign(files,fields);
        console.log(goodsInfor);
        let id=goodsInfor.gid;
        //console.log(id);//修改数据
        let update=await this.service.goodsDbService.updateOne({_id:id},goodsInfor);
        //console.log(id);
        let goodsImgList = goodsInfor.goods_image_list;
        //console.log(infor._id);
        if(goodsImgList){
            //解决上传图片一个图片的错误
            if(typeof (goodsImgList)=='string'){
                goodsImgList=new Array(goodsImgList);

            }
            //编辑图库实际就是添加图库
            goodsImgList.forEach(async (value)=>{
                //console.log(value);
                let result = await this.service.goodsImgDbService.add({goods_id:id,img_url:value});
            })
        }
        //添加商品属性
        /**
         * goods_id: ,
         * cate_id:
         * attribute_id:
         * attribute_type
         * attribute_title
         * attribute_value
         */
        //更新属性信息,先删除原有的商品对应的属性
        await this.service.goodsAttrDbService.deleteMany({goods_id:id});
        let attrIdList = goodsInfor.attr_id_list;
        //console.log(attrIdList);
        let attrValueList = goodsInfor.attr_value_list;
        //console.log(attrValueList);
        if(attrIdList){
            //解决上传一个属性的错误
            if(typeof(attrIdList)=='string' ){
                attrIdList=new Array(attrIdList);
                attrValueList=new Array(attrValueList);
            }
            attrIdList.forEach(async (value,index)=>{
                //遍历商品类型属性表
                let attr = await this.service.goodsTypeAttributeDbService.findOne({_id:value});
                await this.service.goodsAttrDbService.add({
                    goods_id: id,
                    cate_id: goodsInfor.cate_id,
                    attribute_id:value,
                    attribute_type:attr.attr_type,
                    attribute_title:attr.title,
                    attribute_value:attrValueList[index],

                })
            })
        }
        await this.success(prePage,'修改商品成功');
    }

    /**
     * 修改商品颜色
     */
     async changePhotosColor(){
         let imgId = this.ctx.request.body.img_id;
         let colorId = this.ctx.request.body.color_id;
         //通过id查询数据库时，mongoose会自动转化成objectid;如果要添加其他字段也是objectid类型需要手动转化
         colorId = await this.app.mongoose.Types.ObjectId(colorId);
         //console.log(colorId+'----'+imgId);
         let result = await this.service.goodsImgDbService.updateOne({_id:imgId},{color_id:colorId});

         if(result){
             this.ctx.body={
                 success:'更新成功'
             }
         }else {
             this.ctx.body={
                 fail:'更新失败'
             }
         }
    }
   async deletePhoto(){
         let imgId = this.ctx.request.body.img_id;
       let result = await this.service.goodsImgDbService.deleteOne({_id:imgId});
        if(result){
            this.ctx.body={
                flag:true,msg:'删除成功'
            }
        } else {
            this.ctx.body={
                flag:false,msg:'删除失败'
            }
        }
   }

}

module.exports = GoodsController;