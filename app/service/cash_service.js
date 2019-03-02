
const Service = require('egg').Service;

class CashSerivce extends Service {
  async setCash(key,value,time) {
      if(this.app.redis){
          value=JSON.stringify(value);
          if(time){
              await this.app.redis.set(key,value,'EX',time)
          }else {
              await this.app.redis.set(key,value)
          }
      }

  }
  async getCash(key){
      if(this.app.redis){
          let value = await this.app.redis.get(key);
          if(!value){
              value='';
          }else {
              value =JSON.parse(value);
          }
          return value;
      }else {
          return "";
      }
  }

}

module.exports = CashSerivce;