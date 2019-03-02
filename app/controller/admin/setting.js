'use strict';

const BaseController = require('./base');
const pump = require('mz-modules/pump');
const fs =require('fs');
class SettingController extends BaseController {
  async index() {
    let list=await this.service.settingDbService.findAll();
    await this.ctx.render('admin/setting/index',{setting:list[0]});
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
      let result=await this.service.settingDbService.updateOne({},Object.assign(files,fields));
      if(result){
          await this.success('/admin/setting','修改系统设置成功');
      }
  }


}

module.exports = SettingController;