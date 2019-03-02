'use strict';
//如果流的写入出现异常时他会抛出异常，避免浏览器卡死
const pump = require('mz-modules/pump');
const path = require('path');
const fs =require('fs');
//引入本地的资源，需要写全路径
const BaseController = require('./base');
class FocusController extends BaseController {
  async index(){
      //查找存储轮播图的数据库表
      let list = await this.service.focusDbService.findAll();
      //console.log(list);
      await this.ctx.render('admin/focus/index',{list});
  }


    /***
     *
     * 轮播图的添加首页
     */
     async add(){
      await this.ctx.render('admin/focus/add');
     }

    /**
     * 上传的轮播图控制器
     */
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

        }
        let fields= parts.field;
        let result=await this.service.focusDbService.add(Object.assign(files,fields));
        if(result){
            await this.success('/admin/focus','添加轮播图成功');
        }
        //获取提交字段，必须在 流读写完毕后我们才能获取到提交字段
        // this.ctx.body = {
        //     files: files, fields: parts.field // 所有表单字段都能通过 `parts.fields` 获取到
        // };
    }
    //编辑轮播图的界面
      async edit(){
        let id = this.ctx.request.query.id;
        let json = await this.service.focusDbService.findOne({_id:id});
        await this.ctx.render('admin/focus/edit',{json});
      }
      //修改轮播图提交到服务器的逻辑
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
              //获取上传过来的源文件名字
              const filename = stream.filename;
              if(filename){
                  filename.toLowerCase();
              }
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
          //通过读写完毕之后的流中获取提交过来的id
          let fields= parts.field;
          let id=fields.id;
          //如果没有上传图片的话就没有img_fous:****图片的字段，因此我们不需要在判断图片是否重新上传！数据库也不会对，原来的img_fous字段进行修改的
          let result=await this.service.focusDbService.updateOne({_id:id},Object.assign(files,fields));
          if(result){
              await this.success('/admin/focus','修改轮播图成功');
          }
          //获取提交字段，必须在 流读写完毕后我们才能获取到提交字段
          // this.ctx.body = {
          //     files: files, fields: parts.field // 所有表单字段都能通过 `parts.fields` 获取到
          // };

      }
     /*---------------------------------------------demo------------------------------------*/
    //上传单文件的路由界面
    async uploadOne(){
        await this.ctx.render('admin/focus/one');
    }
    //上传多文件的路由界面
    async mutipart(){
        await this.ctx.render('admin/focus/mutipart');
    }
    //提交单文件的业务操作
    async updownLoadSingleFile() {
        //获取上传文件或者图片的流
        let stream = await this.ctx.getFileStream();
        //console.log(stream);
        //上传到服务器的具体目录：               //以图片名称为文件名
        var target='app/public/admin/upload/'+path.basename(stream.filename);
        //创建写入流
        let writeStream = fs.createWriteStream(target);
        //失败了会及时销毁！
        await pump(stream,writeStream);
        this.ctx.body = {
            url: target,
            // 所有表单字段都能通过 `stream.fields` 获取到
            fields: stream.fields
        }



    }

    /**
     *
     * 多文件上传的业务逻辑
     */
    async mutipartUpload(){
        //autoFields:true代表提交的字段都能写入流中
        const parts = this.ctx.multipart({ autoFields: true });
        const files = [];
        let stream;
        //只要流存在我们就一直执行。
        while ((stream = await parts()) != null) {
            if (!stream.filename) {
                return;
            }
// console.log(stream);
            const filename = stream.filename.toLowerCase();
            const fieldname = stream.fieldname;
            const target = 'app/public/admin/upload/' + path.basename(filename);
            const writeStream = fs.createWriteStream(target);
            await pump(stream, writeStream);
            files.push({
                [fieldname]:target
            });

        }
        //获取提交字段，必须在 流读写完毕后我们才能获取到提交字段
        this.ctx.body = {
            files: files, fields: parts.field // 所有表单字段都能通过 `parts.fields` 获取到
        };
    }

}

module.exports = FocusController;