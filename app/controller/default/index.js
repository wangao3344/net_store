'use strict';

const Controller = require('egg').Controller;

class WelcomeController extends Controller {
    async index() {
        //轮播图列表
        let focus_list = await this.service.focusDbService.findAll();
        //根据商品分类展示对应的商品
        let mobile_list = await this.service.defaultGoodsService.getGoodsByCate('5c6e5bf53cc9134c68d77cf5');
        //console.log(mobile_list.length);
        await this.ctx.render('default/index', {
            focus_list,
            mobile_list
        });
    }
}

module.exports = WelcomeController;