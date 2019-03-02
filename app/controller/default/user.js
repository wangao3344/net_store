'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {

  async regist(){
    await this.ctx.render('default/register');
  }
  async login(){
    await this.ctx.render('default/login');
  }
  async order(){
      await this.ctx.render('default/order');
  }
  async index(){
      await this.ctx.render('default/user');
  }

}

module.exports = UserController;
