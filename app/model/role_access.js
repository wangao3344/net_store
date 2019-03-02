/**
 * 角色——权限 关联表
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const mongoose = app.mongoose;   /*引入建立连接的mongoose */
    const Schema = mongoose.Schema;
    var d=new Date();
    const RoleAccessSchema = new Schema({
        role_id: { type: Schema.Types.ObjectId  },      //角色id
        access_id: { type: Schema.Types.ObjectId  },      //权限id

    });
    return mongoose.model('RoleAccess', RoleAccessSchema,'role_access');
}