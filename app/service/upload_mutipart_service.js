/**
 * 轮播图上传的服务
 */

 const Service = require('egg').Service;
 var sd = require('silly-datetime');
 let path = require('path');
//用来创建文件夹
const mkdirp = require('mz-modules/mkdirp');
 class UploadMutipartService extends Service {
     //获取时间戳
     async getTime(){

         var d=new Date();

         return d.getTime();

     }
   async mkDir(filename){
       //获取当天的日期作为文件夹
    let date = sd.format(new Date(),'YYYY-MM-DD');
    //拼接成一个存储文件的路径
    let dir=path.join(this.config.filepath,date);
    await mkdirp(dir);
    //获取当前的时间戳
    var d = await this.getTime();
    let uploadDir=path.join(dir,d+path.extname(filename));
    //console.log(uploadDir);
    return {
        uploadDir:uploadDir,
        //数据库存储的格式
        saveDir:uploadDir.slice(3).replace(/\\/g,'/')
    };
   }

 }

 module.exports = UploadMutipartService;
