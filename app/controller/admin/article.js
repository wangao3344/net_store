'use strict';

const BaseController = require('./base');
//如果流的写入出现异常时他会抛出异常，避免浏览器卡死
const pump = require('mz-modules/pump');
const path = require('path');
const fs =require('fs');

/*
 *文章分类模块
 */
class ArticleController extends BaseController {
  async index(){
    let page = this.ctx.query.page||1;
    //console.log(page);
    let pageCount = await this.service.articleDbService.getCount(2);
    let list = await this.service.articleDbService.showCateList(page,2);
    //console.log(list);
    await this.ctx.render('admin/article/index',{list,page,pageCount});
  }
  async add() {
    let list=await this.service.articleCateDbService.findByCondition({pid:'0'});
    await this.ctx.render('admin/article/add',{list});
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
      let assign = Object.assign(files,fields);
      //console.log(assign);
      let result=await this.service.articleDbService.add(assign);
      if(result){
          await this.success('/admin/article','添加文章成功');
      }
  }
    //修改文章首页
    async edit(){
        let id = this.ctx.query.id;
        let pre_page=this.ctx.state.pre_page;
        //console.log(id);
        let article = await this.service.articleDbService.findOne({_id:id});
        //console.log(cate);
        let list = await this.service.articleCateDbService.findByCondition({pid:'0'});
        await this.ctx.render('admin/article/edit',{article,list,pre_page});

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
        //获取编辑之前的上一页url
        let prePage=fields.pre_page;
        //要进行关联查询通过pidt他的类型是混合类型，因此要把不是顶级分类的id转换成ObjectId类型
        if(fields.cate_id!='0'){
            fields.cate_id=this.app.mongoose.Types.ObjectId(fields.cate_id);
        }
        let result=await this.service.articleDbService.updateOne({_id:id},Object.assign(files,fields));
        if(result){
            await this.success(prePage,'修改文章成功');
        }
    }

}

module.exports =ArticleController ;