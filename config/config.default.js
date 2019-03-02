/* eslint valid-jsdoc: "off" */


'use strict';


/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1551344044633_3294';


  // add your middleware config here
  config.middleware =['permession'];
  //配置中间件
  config.permession = {
    //中间件在访问以/admin开头的路由都会访问,后台路由有一定的规则
    match: '/admin'
  };
  //配置模板引擎
  config.view = {
    mapping: {
      '.html': 'arttemplate',
    },
  };
  //配置session
  config.session = {
    key: 'XM_SESS',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
    renew: true
  };
  //mongodb的 插件配置
  config.mongoose = {
    client: {
      url: 'mongodb://wangao:wa5069369@127.0.0.1/xm_store',
      options: {},
    },
  };
  // egg-rdis插件配置
  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: '127.0.0.1',   // Redis host
      password: '',
      db: 0,
    },
  };
  //轮播图上传的路径
  config.filepath = 'app/public/admin/upload';
  //配置表单数量
  config.multipart = {
    fields: 50
  };
  //禁用csrf验证
  config.security = {
    csrf: {
// 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
      ignore: ctx => {
        if (ctx.request.url == '/admin/goods/uploadImg' || '/admin/goods/goodsUploadPhoto') {
          return true;
        }
        return false;
      },
    }
  };
  //图片副本的大小配置
  config.imageSize = [

    {
      width: 180,
      height: 180

    },
    {
      width: 400,
      height: 400
    }


  ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',

  };

  return config;
};
