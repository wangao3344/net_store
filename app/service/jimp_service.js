
const Service = require('egg').Service;
var path = require('path');
var Jimp = require('jimp');
class JimpService extends Service {
  async jimp(target) {
     let imageSize = this.config.imageSize;
      Jimp.read(target).then(function (lenna) {

               imageSize.forEach((img)=>{
              lenna
                  .resize(img.width,img.height) // resize
                  .quality(90) // set JPEG quality 品质
                  // .greyscale() // set greyscale 复古 黑白
                  //public/img/12233.jpg
                  .write(target+'_'+img.width+'x'+img.height+path.extname(target)); // save
              //console.log('生成缩略图完成');
          });

      }).catch(function (err) {
             console.error(err);
          });


      // Jimp.read(target, (err, lenna) => {
      //     if (err) throw err;
      //     imageSize.forEach((img)=>{
      //         lenna
      //             .resize(img.width,img.height) // resize
      //             .quality(90) // set JPEG quality 品质
      //             // .greyscale() // set greyscale 复古 黑白
      //             //public/img/12233.jpg
      //             .write(target+'_'+img.width+'x'+img.height+path.extname(target)); // save
      //         //console.log('生成缩略图完成');
      //     });
      //
      // });

  }

}

module.exports = JimpService;