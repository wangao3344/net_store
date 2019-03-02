const url = require('url');
module.exports = (options) => {
   return async (ctx,next)=> {
       //对于不是get请求，需要进行csrf安全验证，所以我们要设置个全局变量
       ctx.state.csrf=ctx.csrf;
       //记录上一页：
       ctx.state.pre_page=ctx.request.headers['referer'];
       //因为验证码的路径是带有参数，我们只有把url转化成json获取不带参数的url才可以
    let pathname = url.parse(ctx.request.url).pathname;
    //console.log(pathname);
    //如果用户已经登录
   if( ctx.session.userInfor){
       //设置全局变量好让前端能获取数据
       ctx.state.userInfor=ctx.session.userInfor;
       ctx.state.username=ctx.session.userInfor.username;
       ctx.state.globalSide=await ctx.service.verifyService.showAccesses(ctx.session.userInfor.role_id);
       //授权功能的验证
       let result=await ctx.service.verifyService.isAccess();
       //console.log(result);
       if(result){
           await next();
       }else {
           ctx.body='你没有访问权限'
       }

   }else {
       //如果用户访问的是 验证码，登录， 和dologin我们也要放行
       if(pathname=='/admin/login'||pathname=="/admin/verify"||pathname=="/admin/doLogin"){
           await next();
       }else {
           ctx.redirect('/admin/login');
       }
   }

   }
};