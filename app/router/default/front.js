  module.exports = app => {
    const { router, controller } = app;
    //启用路由级别中间键,该路由只在前端有效，由于前端的路由不是有规律的
      /**
       * 第一个参数{}:可以写一些中间键配置信息,直接在路由注册的中间的 app参数是undefine,我们需要给他传递参数
       */
    let initMiddleWare = app.middleware.init({},app);
     // 首页
      router.get('/',initMiddleWare,controller.default.index.index);
      router.get('/user',initMiddleWare,controller.default.user.index);
     //用户注册页面
      router.get('/user/regist',initMiddleWare,controller.default.user.regist);
     //用户登录
      router.get('/user/login',initMiddleWare,controller.default.user.login);
      //用户订单
      router.get('/user/order',initMiddleWare,controller.default.user.order);
     /**
      * 商品模块
      */
      router.get('/products',initMiddleWare,controller.default.products.index);
      router.get('/products/detail',initMiddleWare ,controller.default.products.detail);
      router.get('/products/getPhotoByColor',initMiddleWare ,controller.default.products.getPhotoByColor);

     /**
      *  服务模块
      */
     router.get('/help',initMiddleWare,controller.default.help.index);
     router.get('/cart',initMiddleWare,controller.default.cart.index);


  };