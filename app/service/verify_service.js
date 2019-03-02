
const Service = require('egg').Service;
var url = require('url');

/**
 * 用户的权限验证功能
 */
class VerifyService extends Service {
  async isAccess() {
    let userInfor = this.ctx.session.userInfor;
    let roleId = userInfor.role_id;
    //通过角色id
    let list =await this.service.roleAccessDbService.find({role_id:roleId});
    let accessArray=[];
    list.forEach((value)=>{
      accessArray.push(value.access_id.toString());
    });
    //console.log(accessArray);
      let pathname = url.parse(this.ctx.request.url).pathname;
      //忽略权限判断的地址    is_super表示是管理员
      var ignoreUrl=['/admin/login','/admin/doLogin','/admin/verify','/admin/loginOut','/admin/changeStatus'];

      if(ignoreUrl.indexOf(pathname)!=-1 || userInfor.is_super==1){
          return true;   //允许访问
      }

      //获取所访问的路径权限id
      let result = await this.service.accessDbService.findOne({url:pathname});
     //console.log(result);
      //如果存在的话
      if(result){
        //并且他存在该用户所对应的权限id里面
          if(accessArray.indexOf((result._id).toString())!=-1){
            return true;
          }
      }
      return false;

  }

    /**
     * 根据不同的角色来显示不同的权限
     * @param role_id
     * @returns {Promise<*>}
     */
   async showAccesses(role_id){
      //通过角色id来查找对应的全限根据role_id这个表
       let list = await this.ctx.service.roleAccessDbService.find({role_id:role_id});
       let accessArray=[];
       list.forEach(value=>{
           accessArray.push(value.access_id.toString());
       });
       //获取全部权限的集合
        let allAccess = await this.ctx.service.accessDbService.accessList();
        allAccess.forEach(value=>{
            if(accessArray.indexOf(value._id.toString())!=-1){
                value.checked=true;
                value.items.forEach(ele=>{
                   if( accessArray.indexOf(ele._id.toString())!=-1){
                       ele.checked=true;
                   }
                })
            }
        });
       return allAccess;
   }


}

module.exports = VerifyService;