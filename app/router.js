'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  //后台权限管理系统
    require('./router/admin/manager')(app);
  //PC前端首
    require('./router/default/front')(app);
};
