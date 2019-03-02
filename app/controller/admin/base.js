'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  async success(redirectUrl,msg) {
   await this.ctx.render('admin/public/success',{redirectUrl,msg})
  }
  async error(redirectUrl,msg){
      await this.ctx.render('admin/public/error',{redirectUrl,msg})
  }
  //删除功能公共的方法
  async deleteOne(){
      let id = this.ctx.query.id;
      //console.log(id);
      let collection = this.ctx.query.collection;
      //console.log(collection);
      let result=await this.ctx.model[collection].deleteOne({_id:id});
      this.ctx.redirect(this.ctx.state.pre_page);

  }
  //ajax的局部更新的方法
    async changeStatus(){
     let id = this.ctx.query.id;
     let modelName = this.ctx.query.modelName;
     let attr = this.ctx.query.attr;
     let infor = await this.ctx.model[modelName].findOne({_id:id});
     if(infor){
         if(infor[attr]==1){
             infor[attr]=0
         }else {
             infor[attr]=1
         }
         await this.ctx.model[modelName].updateOne({_id:id},infor);
         this.ctx.body={success:true,data:'更新成功！！'}
     }else {
         this.ctx.body={success:false,data:'更新失败！！'}
     }



    }
    //生成验证码的路由
    async getCaptcha(){
        let captcha= await this.ctx.helper.getCaptcha();
        //存在session方便校验
        this.ctx.session.code=captcha.text;
        this.ctx.response.type = 'image/svg+xml';
        this.ctx.body=captcha.data;
    }
    //ajax的局部更新数量的方法
    async changeNum(){
        let id = this.ctx.query.id;
        let modelName = this.ctx.query.modelName;
        let attr = this.ctx.query.attr;
        let num=this.ctx.query.num;
        let infor = await this.ctx.model[modelName].findOne({_id:id});
        if(infor){
            await this.ctx.model[modelName].updateOne({_id:id},{[attr]:num});
            this.ctx.body={success:true,data:'更新数量成功！！'}
        }else {
            this.ctx.body={success:false,data:'更新数量失败！！'}
        }



    }
}

module.exports = BaseController;