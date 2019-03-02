'use strict';

const Controller = require('egg').Controller;

class CartController extends Controller {
  async index() {
      await this.ctx.render('default/cart');
  }
}

module.exports = CartController;