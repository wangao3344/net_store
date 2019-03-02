'use strict';

const Controller = require('egg').Controller;

class HelpController extends Controller {
  async index() {
    this.ctx.body='服务首页';
  }
}

module.exports = HelpController;