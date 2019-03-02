'use strict';

/** @type Egg.EggPlugin */
'use strict';

// had enabled by egg
// exports.static = true;
//安装模板引擎
exports.arttemplate = {
  enable: true,
  package: 'egg-view-arttemplate',
};
//数据库插件
exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};
//egg-redis的插件
exports.redis = {
  enable: false,
  package: 'egg-redis',
};
