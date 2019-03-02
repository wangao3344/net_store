module.exports = app => {
    // var adminauth=app.middleware.adminauth()
  const { router, controller } = app;

    //首页地址
    router.get('/admin', controller.admin.main.index);
    //欢迎界面首页右边界面默认加载的地址：
    router.get('/admin/main/welcome', controller.admin.main.welcome);



    //登录界面
    router.get('/admin/login', controller.admin.login.index);

    router.post('/admin/doLogin', controller.admin.login.doLogin);

    router.get('/admin/loginOut', controller.admin.login.loginOut);



//公共路由
    router.get('/admin/verify', controller.admin.base.getCaptcha);

    router.get('/admin/deleteOne', controller.admin.base.deleteOne);

    router.get('/admin/changeStatus', controller.admin.base.changeStatus);

    router.get('/admin/changeNum', controller.admin.base.changeNum);



    router.get('/admin/manager', controller.admin.manager.index);
    router.get('/admin/manager/add', controller.admin.manager.add);
    router.post('/admin/manager/doAdd', controller.admin.manager.doAdd);
    router.get('/admin/manager/edit', controller.admin.manager.edit);
    router.post('/admin/manager/doEdit', controller.admin.manager.doEdit);



    router.get('/admin/role', controller.admin.role.index);
    router.get('/admin/role/add', controller.admin.role.add);
    router.post('/admin/role/doAdd', controller.admin.role.doAdd);
    router.post('/admin/role/doEdit', controller.admin.role.doEdit);
    router.get('/admin/role/edit', controller.admin.role.edit);
    router.get('/admin/role/author', controller.admin.role.author);
    router.post('/admin/role/doAuthor', controller.admin.role.doAuthor);





    router.get('/admin/access', controller.admin.access.index);
    router.get('/admin/access/add', controller.admin.access.add);
    router.post('/admin/access/doAdd', controller.admin.access.doAdd);
    router.post('/admin/access/doEdit', controller.admin.access.doEdit);
    router.get('/admin/access/edit', controller.admin.access.edit);



    //上传图片演示
    router.get('/admin/focus/uploadOne', controller.admin.focus.uploadOne);
    router.get('/admin/focus/mutipart', controller.admin.focus.mutipart);
    //上传单文件demo
    router.post('/admin/focus/updownLoadSingle',controller.admin.focus.updownLoadSingleFile);
    //上传多文件demo
    router.post('/admin/focus/mutipartUpload',controller.admin.focus.mutipartUpload);



    //轮播图列表首页
    router.get('/admin/focus', controller.admin.focus.index);
    //轮播图添加界面
    router.get('/admin/focus/add', controller.admin.focus.add);
    //上传轮播图路由
    router.post('/admin/focus/doAdd',controller.admin.focus.doAdd);
    //编辑轮播图的路由界面
    router.get('/admin/focus/edit', controller.admin.focus.edit);
    //编辑轮播图提交服务的逻辑处理的路由
    router.post('/admin/focus/doEdit', controller.admin.focus.doEdit);




    //增加商品类型
    router.get('/admin/goodsType/add', controller.admin.goodsType.add);
    //商品类型首页
    router.get('/admin/goodsType', controller.admin.goodsType.index);
    //商品类型提交的路由
    router.post('/admin/goodsType/doAdd', controller.admin.goodsType.doAdd);
    //修改商品类型
    router.get('/admin/goodsType/edit', controller.admin.goodsType.edit);
    //提交修改的商品类型
    router.post('/admin/goodsType/doEdit', controller.admin.goodsType.doEdit);




    //属性列表首页
    router.get('/admin/goodsTypeAttribute', controller.admin.goodsTypeAttribute.index);
    //根据类型添加属性
    router.get('/admin/goodsTypeAttribute/add', controller.admin.goodsTypeAttribute.add);
    //提交添加类型属性
    router.post('/admin/goodsTypeAttribute/doAdd', controller.admin.goodsTypeAttribute.doAdd);
    //修改商品属性
    router.get('/admin/goodsTypeAttribute/edit', controller.admin.goodsTypeAttribute.edit);
    //提交修改商品属性
    router.post('/admin/goodsTypeAttribute/doEdit', controller.admin.goodsTypeAttribute.doEdit);


   //商品添加的路由
    router.get('/admin/goodsCate/add', controller.admin.goodsCate.add);
    //商品添加的路由
    router.post('/admin/goodsCate/doAdd', controller.admin.goodsCate.doAdd);
    //商品分类首页
    router.get('/admin/goodsCate', controller.admin.goodsCate.index);
    //修改商品分类首页
    router.get('/admin/goodsCate/edit', controller.admin.goodsCate.edit);
    router.post('/admin/goodsCate/doEdit', controller.admin.goodsCate.doEdit);


    /**
     * 商品模块
     */
    router.get('/admin/goods', controller.admin.goods.index);
    router.get('/admin/goods/add', controller.admin.goods.add);
    //通过ajax请求动态生成对应的标签
    router.get('/admin/goods/goodsTypeAttribute', controller.admin.goods.getAttrByType);
    //富文本上传图片的路由
    router.post('/admin/goods/uploadImg', controller.admin.goods.uploadImg);
    //百度批量上传图片
    router.post('/admin/goods/goodsUploadPhoto',controller.admin.goods.goodsUploadPhoto);
    //提交商品信息
    router.post('/admin/goods/doAdd', controller.admin.goods.doAdd);
    //商品修改
    router.get('/admin/goods/edit', controller.admin.goods.edit);
    //商品修改提交模块
    router.post('/admin/goods/doEdit',controller.admin.goods.doEdit);
    //手动更新商品相册颜色的数据
    router.post('/admin/goods/changePhotosColor',controller.admin.goods.changePhotosColor);
    //删除相册
    router.post('/admin/goods/deletePhoto',controller.admin.goods.deletePhoto);
    /**
     * 商品颜色模块
     */
    router.get('/admin/goodsColor', controller.admin.goodsColor.index);
    router.get('/admin/goodsColor/add', controller.admin.goodsColor.add);
    router.get('/admin/goodsColor/edit', controller.admin.goodsColor.edit);
    router.post('/admin/goodsColor/doEdit', controller.admin.goodsColor.doEdit);
    router.post('/admin/goodsColor/doAdd', controller.admin.goodsColor.doAdd);
    /**
     * 导航模块
     */
    //导航首页
    router.get('/admin/nav', controller.admin.nav.index);
    //添加导航
    router.get('/admin/nav/add', controller.admin.nav.add);
    //添加导航提交
    router.post('/admin/nav/doAdd', controller.admin.nav.doAdd);
    //编辑导航
    router.get('/admin/nav/edit', controller.admin.nav.edit);
    //提交编辑的商品
    router.post('/admin/nav/doEdit', controller.admin.nav.doEdit);
    /**
     * 文章分类模块
     */
    //首页列表
    router.get('/admin/articleCate', controller.admin.articleCate.index);
    //添加文章分裂
    router.get('/admin/articleCate/add', controller.admin.articleCate.add);
    //提交文章分类
    router.post('/admin/articleCate/doAdd', controller.admin.articleCate.doAdd);
    //编辑文章分类提交
    router.post('/admin/articleCate/doEdit', controller.admin.articleCate.doEdit);
    //编辑文章分类的路由
    router.get('/admin/articleCate/edit', controller.admin.articleCate.edit);
    /**
     * 文章模块
     */
    //首页列表
    router.get('/admin/article', controller.admin.article.index);
    //添加文章分裂
    router.get('/admin/article/add', controller.admin.article.add);
    //提交文章分类
    router.post('/admin/article/doAdd', controller.admin.article.doAdd);
    //编辑文章分类提交
    router.post('/admin/article/doEdit', controller.admin.article.doEdit);
    //编辑文章分类的路由
    router.get('/admin/article/edit', controller.admin.article.edit);

    /**
     * 系统设置模块
     */
    router.get('/admin/setting',controller.admin.setting.index);
    router.post('/admin/setting/doEdit',controller.admin.setting.doEdit);


};