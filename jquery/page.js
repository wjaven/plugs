   $.extend($.fn,{
        page:function(request){
            var that=this,output={};
            var url=request.url,
            param=request.param,
            pageStyle=request.pageStyle,
            pageList=request.pageList,
            pageCount=request.pageCount?request.pageCount:20,
            total=400,
            pageTotal=20,
            pageIndex=1,
            createPage;
        switch (pageStyle){
            case "page-center" :
                createPage=function(){pageCenter();};
                break;
            case "page-right":
                createPage=function(){pageRight();};
                break;
        }
        indexPage(1);
        function getData(pageIndex){
        	var request=param;
        	request.pageIndex=pageIndex;
              $.ajax({
                  type: "get",
                  url:url,
                  data:request,
                  success: function (response) {
                      jsonData = eval(response);
                      pageList(jsonData);
                  }
              });
            //响应假数据
//          var data=[
//              {name:"aa",age:11},
//              {name:"bb",age:12},
//              {name:"cc",age:13}
//          ];
            //响应数据列表渲染
            //pageList(data);
        }
        function nextPage(){
            if (pageIndex>=pageTotal){
                pageIndex=pageTotal;
            }else{
                pageIndex++;
            }
            getData(pageIndex);
            createPage();
        }
        function prevPage(){
            if (pageIndex<=1){
                pageIndex=1;
            }else{
                pageIndex--;
            }
            getData(pageIndex);
            createPage();
        }
        function indexPage(index){
            pageIndex=index>0?index:1;
            pageIndex=pageIndex<pageTotal?index:pageTotal;
            getData(pageIndex);
            createPage();
        }
        function pageCenter(){
            if(pageTotal<=0){$(that).html("");return;}
            var pageHtml='',flag;
            flag=pageIndex==1?" disable":"";
            pageHtml+='<span class="page-first'+flag+'">首页</span>';
            pageHtml+='<span class="page-prev'+flag+'">上一页</span>';
            if(pageTotal<=10){
                for(var i=1;i<=pageTotal;i++){
                    flag=pageIndex==i?" active":"";
                    pageHtml+='<span class="page-num'+flag+'">'+i+'</span>';
                }
            }else{
                for(var i=1;i<=10;i++){
                    var p=pageIndex<7?i:pageIndex>=(pageTotal-3)?(pageTotal+i-10):(pageIndex+i-7);
                    flag=pageIndex==p?" active":"";
                    pageHtml+='<span class="page-num'+flag+'">'+p+'</span>';
                }
            }
            flag=pageIndex==pageTotal?" disable":"";
            pageHtml+='<span class="page-next'+flag+'">下一页</span>';
            pageHtml+='<span class="page-last'+flag+'">尾页</span>';
            $(that).html('<div class="page-container"><div class="page-center">'+pageHtml+'</div></div>');
            $(that).find(".page-first").on("click",function(){
                if($(this).hasClass("disable")){return;}
                indexPage(1);
            });
            $(that).find(".page-prev").on("click",function(){
                if($(this).hasClass("disable")){return;}
                prevPage();
            });
            $(that).find(".page-num").on("click",function(){
                if($(this).hasClass("active")){return;}
                indexPage(parseInt($(this).text()));
            });
            $(that).find(".page-next").on("click",function(){
                if($(this).hasClass("disable")){return;}
                nextPage();
            });
            $(that).find(".page-last").on("click",function(){
                if($(this).hasClass("disable")){return;}
                indexPage(pageTotal);
            });
        }
        function pageRight(){
            if(pageTotal<=0){$(that).html("");return;}
            var first=(pageIndex-1)*pageCount+1;
            var last=(pageIndex*pageCount)>total?total:(pageIndex*pageCount);
            var pageHtml="";
            if(pageIndex==1&&pageTotal==1){
                pageHtml='&nbsp;'+first+'-'+last+'条，共'+total+'条&nbsp;';
            }
            if(pageIndex==1){
                pageHtml='&nbsp;'+first+'-'+last+'条，共'+total+'条&nbsp;<span class="page-next">下一页&gt;</span><span class="page-last">&nbsp;&nbsp;尾页&gt;&gt;</span>';
            }
            if(pageIndex>1) {
                if(pageIndex<pageTotal){
                    pageHtml='<span class="page-first">&lt;&lt;首页&nbsp;&nbsp;</span><span class="page-prev">&lt;上一页</span>&nbsp;'+first+'-'+last+'条，共'+total+'条&nbsp;<span class="page-next">下一页&gt;</span><span class="page-last">&nbsp;&nbsp;尾页&gt;&gt;</span>';
                }else{
                    pageHtml='<span class="page-first">&lt;&lt;首页&nbsp;&nbsp;</span><span class="page-prev">&lt;上一页</span>&nbsp;'+first+'-'+last+'条，共'+total+'条&nbsp;';
                }
            }
            $(that).html('<div class="page-container"><div class="page-right">'+pageHtml+'</div></div>');
            $(that).find(".page-first").on("click",function(){
                indexPage(1);
            });
            $(that).find(".page-prev").on("click",function(){
                prevPage();
            });
            $(that).find(".page-next").on("click",function(){
                nextPage();
            });
            $(that).find(".page-last").on("click",function(){
                indexPage(pageTotal);
            });
        }
    }
});
