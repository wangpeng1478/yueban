jQuery(document).ready(function($) {
     $("#click_q a").click(function() {
        $(this).siblings('a').removeClass('cut'); 
       $(this).addClass('cut');
          
     });
     $("#click_q a").click(function() {
        var t=$(this).text();
         $("#s1").text(t)
     });
     ////////////
      $("#click_qz a").click(function() {
        $(this).siblings('a').removeClass('cut_tt'); 
       $(this).addClass('cut_tt');
          
     });
     $("#click_qz a").click(function() {
        var t=$(this).text();
         $("#s11").text(t)
     });
    // ================
    
     $('img').error(function(){
    $(this).attr('src',"images/fail.jpg");
})


});
jQuery(document).ready(function($) {
      $("#txtPhone").blur(function(){
        var ptxt=$(this).val();
         console.log(ptxt);
           
            // if(!preg_match('/(^0\d{2,3}\-\d{7,8}$)|(^1[3|4|5|6|7|8][0-9]{9}$)/', $telephone)){
            // return 'format_telephone';
            // }
        
          var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
           // var myreg = /13[0-9]{9}/
           if(!myreg.test($("#txtPhone").val())) 
            {  
             $("#p22").html('请输入正确的手机号')
               layer.msg('请输入正确的手机号');
               return false; 
          }else{
            layer.msg('5分钟内客服将与您联系', {time: 5000})
          } 




        });
      $("#subBtn").click(function() {
         var pptxt = $("#txtPhone").val();
         if (pptxt=="") {
             layer.msg('手机号不能为空');
         }else{
           var index = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
            layer.msg('10分钟内客服将与您联系', {time: 5000});  
         }
      });
      $("#txtPhone").focus(function() {
          var time=new Date().getHours();
          // var time=21;     
           if (time>20){
             layer.msg('非工作时间，经纪人将在上班后与您尽快联系', {time: 7000});
           }
      });

   
});

// =========================登录=====================
        jQuery(document).ready(function() {
         $("#denglu2").click(function() {
            //iframe层-禁滚动条
            layer.open({
            type: 2,
            title: '',
            area: ['400px', '430px'],
            content: ['thinkphp_full/public/index.php/index/index/login.html', 'no'] 
            });
         });
        });
// ===========================结束===========================

