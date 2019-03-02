'use strict';

const BaseController = require('./base');
//如果流的写入出现异常时他会抛出异常，避免浏览器卡死
const pump = require('mz-modules/pump');
const path = require('path');
const fs =require('fs');

/*
 *文章分类模块
 */
class ArticleCateController extends BaseController {
  async index(){
    let list = await this.service.articleCateDbService.showCateList();
    await this.ctx.render('admin/articleCate/index',{list});
  }
  async add() {
    let list=await this.service.articleCateDbService.findByCondition({pid:'0'});
    await this.ctx.render('admin/articleCate/add',{list});
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
          //获取上传的原文件名
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
          //上传图片成功后，生成缩略图
          await this.service.jimpService.jimp(target);

      }
      let fields= parts.field;
      //要进行关联查询通过pidt他的类型是混合类型，因此要把不是顶级分类的id转换成ObjectId类型
      if(fields.pid!='0'){
        fields.pid=this.app.mongoose.Types.ObjectId(fields.pid);
      }
      let result=await this.service.articleCateDbService.add(Object.assign(files,fields));
      if(result){
          await this.success('/admin/articleCate','添加文章分类成功');
      }
  }
    //修改商品分类首页
    async edit(){
        let id = this.ctx.query.id;
        //console.log(id);
        let cate = await this.service.articleCateDbService.findOne({_id:id});
        //console.log(cate);
        let list = await this.service.articleCateDbService.findByCondition({pid:'0'});
        await this.ctx.render('admin/articleCate/edit',{cate,list});

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
            //获取上传的原文件名
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
            //上传图片成功后，生成缩略图
            await this.service.jimpService.jimp(target);

        }
        let fields= parts.field;
        let id=fields.id;
        //要进行关联查询通过pidt他的类型是混合类型，因此要把不是顶级分类的id转换成ObjectId类型
        if(fields.pid!='0'){
            fields.pid=this.app.mongoose.Types.ObjectId(fields.pid);
        }
        let result=await this.service.articleCateDbService.updateOne({_id:id},Object.assign(files,fields));
        if(result){
            await this.success('/admin/articleCate','修改文章分类成功');
        }
    }

}

module.exports =ArticleCateController ;