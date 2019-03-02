'use strict';

const BaseController = require('./base');

class LoginController extends BaseController {
  //登录首页
  async index() {
   await this.ctx.render('admin/login',{csrf:this.ctx.csrf});

  }
  //登录提交
  async doLogin(){
      let userinfor = this.ctx.request.body;
      //this.ctx.body=userinfor;
      //console.log(userinfor);
      //首先先判断验证码是否正确
      let user_verify = userinfor.verify.toUpperCase();
      let service_verify= this.ctx.session.code.toUpperCase();
      if (user_verify==service_verify){
          //如果验证码输入正确我们就获取提交的用户名和密码
          let username = userinfor.username;
          if(!username){
              await this.error('/admin/login','用户名或密码不能为空');
          }
          let password = userinfor.password;
          if (!password){
              await this.error('/admin/login','用户名或密码不能为空');
          }
          password=await this.service.encrypted.toMD5(password);
          //console.log(password);
          //数据库中查找
          let user = await this.service.adminDbService.findOne({username,password});
          //console.log(userInfor);
          if(user){
              //保存在session中
              this.ctx.session.userInfor=user;
              //console.log(user);
              await this.ctx.redirect('/admin');
          }else {
              await this.error('/admin/login','用户名或密码不正确');
          }

      }else {
          await this.error('/admin/login','验证码输入有误！');
      }

  }
  //退出登录
  async loginOut(){
    this.ctx.session.userInfor=null;
    this.ctx.redirect('/admin/login');
  }

}

module.exports = LoginController;