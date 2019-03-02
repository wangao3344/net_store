(function($){

    var app={
        init:function(){
    
            this.initSwiper();

            this.initNavSlide();
            this.selectColor();
            this.initContentTab();
        },
        initSwiper:function(){    
            new Swiper('.swiper-container', {
                loop : true,
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev'                 
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable :true
                },
                autoplay: true
                
            });
        },
        initNavSlide:function(){
             $("#nav_list>li").hover(function(){

                $(this).find('.children-list').show();
             },function(){
                $(this).find('.children-list').hide(); 
             })          

        },
        selectColor:function() {
             var that =this;
            //添加类的样式，然后把兄弟节点的class=active的属性删除
            $('#color_list .banben').click(function () {
               $(this).addClass('active').siblings().removeClass('active');
                //console.log('点击');
               var goods_id = $(this).attr('goods_id');
                var color_id = $(this).attr('color_id');
                //console.log(goods_id+'=='+color_id);
                //进行ajax请求
                $.get('/products/getPhotoByColor',{goods_id:goods_id,color_id:color_id},function (data) {         var str='';
                  if(data.success){
                      var imglist=data.goods_image_list;
                      console.log(imglist);
                    imglist .forEach(value=>{
                        str+='<div class="swiper-slide"><img src="'+value.img_url+'"> </div>'
                     });
                      $("#swiper-wrapper").html(str);
                      //改变轮播图以后重新初始化轮播图
                      that.initSwiper();

                  }
                })
            });

        },
        initContentTab:function(){
            $('.detail_info .detail_info_item:first').addClass('active');
            $('.detail_list li:first').addClass('active');
            $('.detail_list li').click(function(){
                var index=$(this).index();
                $(this).addClass('active').siblings().removeClass('active');

                $('.detail_info .detail_info_item').removeClass('active').eq(index).addClass('active');

            })

        }
    };
    
    $(function(){
    
    
        app.init();
    })

    

})($)
