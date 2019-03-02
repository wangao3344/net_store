var svgCaptcha = require('svg-captcha');
let sd = require('silly-datetime');
let path = require('path');
var showdown  = require('showdown');
//生成验证码
let getCaptcha=()=>{
    const captcha = svgCaptcha.create(
        {
            size:6,
            fontSize: 50,
            width: 100,
            height:40,
            background:"#cc9966"
        });
    return captcha;
};
//格式化日期 time 必须是13位的毫秒值
function formatDate(time){
    var date=sd.format(time, 'YYYY-MM-DD HH:mm');
    return date;

}
//获取图片副本后缀名的方法
function formatImage(dir,width,height){
    height=height||width;
    let extname = path.extname(dir);
    let result=dir+'_'+width+'x'+height+extname;
    //console.log(result);
    return result;

}
//markdown解析成html
function mark2Html(text){
    var converter = new showdown.Converter();
    var htmlTag   = converter.makeHtml(text);
    return htmlTag;
}
module.exports={
   getCaptcha,
   formatDate,
   formatImage,
    mark2Html
};