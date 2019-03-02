$(function(){

	//dom加载完毕后就直接调用
	app.init();

});
var app={
    init:function(){
        this.deleteConfirm();
        this.setToggle();
    },
     setToggle:function () {
        //打开页面时让左侧边栏前三个隐藏
         $('.aside>li:nth-child(1) ul,.aside>li:nth-child(2) ul,.aside>li:nth-child(3) ul').hide();
         $('.aside h4').click(function(){
//		$(this).toggleClass('active');
             if($(this).find('span').hasClass('nav_close')){

                 $(this).find('span').removeClass('nav_close').addClass('nav_open');
             }else{

                 $(this).find('span').removeClass('nav_open').addClass('nav_close');
             }
             $(this).siblings('ul').slideToggle();
         })
     },
	 changeStatus: function(modelName,attr,ele,id){
	 	/*传递给后台的参数必须要写成json的格式*/
	 	$.get('/admin/changeStatus',{modelName:modelName,attr:attr,id:id},function(data){
	 		console.log(data.data);
            if(data.success){
            	if(ele.src.indexOf('yes')!=-1){
            		ele.src='/public/admin/images/no.gif'
				}else {
                    ele.src='/public/admin/images/yes.gif'
				}
			}
        });
     },
	//可以通过class来定义他的事件。并且该方法的执行必须在dom加载完毕后执行
     deleteConfirm:function () {
		 $('.delete').click(function () {
			 var flag= confirm('你确定要删除吗？');
			 //由于return的是个boolean值，所以当为false他就不会再向下执行其他的操作了
			 return flag;
         });
     },
	//更改数量的方法
    changeNum: function(modelName,attr,ele,id){
	 	//首先获取该标签的内容
        var val  = $(ele).html();
        //创建input标签
        var input=$("<input value=''/>");
        //input标签放在原来的span标签的里面
        $(ele).html(input);
        //为了方便点击更改内容，要让input标签获取焦点,注意要想让光标在值的后面，我们先获取焦点在赋值！
        $(input).trigger('focus').val(val);
        //点击input的时候阻止冒泡，禁用掉input的click事件
        $(input).click(function(){
            return false;
        });
        //鼠标离开的时候给sapn赋值
        $(input).blur(function () {
			var num = $(this).val();
			$(ele).html(num);
			//最后提交给服务器发送ajax请求
            $.get('/admin/changeNum',{modelName: modelName,attr:attr,id:id,num:num},function (data) {
				console.log(data.data);
            })
        });
    },
    //设置iframe的高度只有打开主页的时候我们才需要设置iframe的高度，当加载其他页面我们就获取不到iframe的rigMain属性，因此会报错，所以我们要把执行这段js放在主页面里就可以解决这个错误
    resizeIframe:function(){

        //var heights = $(window).height()-100;
        //var heights=window.innerHeight-100;
        //console.log(heights);
        //$('#rightMain').height=heights;

                    var heights = document.documentElement.clientHeight-100;
                    if(heights){
                        $('#rightMain').height(heights);
                    }

       // $(document).ready(function () {});




    }

};



