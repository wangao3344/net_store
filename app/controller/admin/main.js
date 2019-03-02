var BaseController =require('./base.js');
class MainController extends BaseController {
    //加载首页
    async index() {
        await this.ctx.render('admin/main/index');
    }
    //加载欢迎界面
    async welcome(){
        await this.ctx.render('admin/main/welcome');
    }
}
module.exports = MainController;