$.extend($.fn,{
   hsliderPage:function(obj){
       var showlen=obj.showlen,
           w=obj.itemw,
           style=obj.style;
       var oUl=$(this).find(".hsliderlist"),
           aLi=$(oUl).children(),
           prevbtn=$(this).find(".prevbtn"),
           nextbtn=$(this).find(".nextbtn"),
           len=$(aLi).length,
           flag=0,
           time=len-showlen,
           page=$(this).find(".page"),
           dotLi;
       $(oUl).css("width",w*len);
       if(style=="dot"){
           var dotnum=Math.ceil(len/showlen);
           var lihtml='';
           for(var i=0;i<dotnum;i++){
               lihtml+='<li>●</li>';
           }
           $(this).append('<ul class="dots">'+lihtml+'</ul>');
           dotLi=$(this).find(".dots").children("li");
           $(dotLi).eq(0).addClass("active");
       }
       if(time>0){
           $(nextbtn).addClass("active");
           $(nextbtn).on("click",function(){
               if(flag>=time){return;}
               if(time-flag<showlen){
                   $(oUl).animate({left:-time*w},500);
                   flag=time;
               }else{
                   $(oUl).animate({left:-(flag+showlen)*w},500);
                   flag=flag+showlen;
               }
               btn();
           });
           $(prevbtn).on("click",function(){
               if(flag<=0){return;}
               if(flag-showlen<0){
                   $(oUl).animate({left:0},500);
                   flag=0;
               }else{
                   $(oUl).animate({left:-(flag-showlen)*w},500);
                   flag=flag-showlen;
               }
               btn();
           });
           if(style=="dot"){
               $(dotLi).on("click",function(){
                   var active=$(dotLi).index($(this).parent().find(".active"));
                   var now=$(dotLi).index($(this));
                   if(active==now){return;}
                   var dotflag=(now+1)*showlen;
                   if(dotflag>len){
                       $(oUl).animate({left:-time*w},500);
                       flag=time;
                   }else{
                       $(oUl).animate({left:-(now*showlen)*w},1000);
                       flag=now*showlen;
                   }
                   btn()
               });
           }
       }
       function btn(){
           $(prevbtn).addClass("active");
           $(nextbtn).addClass("active");
           if(flag<=0){$(prevbtn).removeClass("active");}
           if(flag>=time){$(nextbtn).removeClass("active");}
           if(style=="number"){
               $(page).text(Math.ceil(flag/showlen)+1);
           }else if(style=="dot"){
               $(dotLi).eq(Math.ceil(flag/showlen)).addClass("active").siblings().removeClass("active");
           }

       }
   }
});
