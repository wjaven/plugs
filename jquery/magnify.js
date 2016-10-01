$.extend($.fn, {
	magnifying:function(){
		var that = $(this),
		 	$imgCon = that.find('.magnifyshow'),
		 	$img = $imgCon.find('.magnifyimg'),
		   	$drag = that.find('.magnifydrag'),
		   	$show = that.find('.magnifybig'),
			$bigImg = $show.find('.magnifybigimg'),
			$imgul=that.find(".magnifylist ul"),
			$imgList = that.find('.magnifylist li'),
			$prevbtn=that.find(".prevbtn"),
			$nextbtn=that.find(".nextbtn"),
			showlen=7;
		var multiple = $show.width()/$drag.width();
		$imgList.eq(0).addClass("active");
		$img.attr('src',$imgList.eq(0).attr('data-img'));
		$bigImg.attr('src',$imgList.eq(0).attr('data-bigimg'));
		var w=$imgul.children().eq(0).width()+9;
		var len=$imgul.children().length;
		$imgul.css("width",w*len);
		var moveW=w*len-that.find(".magnifylist").width();
		var time=len-5;
		if(time>0){
			$nextbtn.addClass("active");
			var timer;
			$nextbtn.on("mousedown",function(){		
				var left=function(){
					var oldLeft=parseInt($imgul.css("left"));
					var newLeft=oldLeft-10;
					if(newLeft>-moveW){
						$imgul.css("left",newLeft+'px');
						timer=setTimeout(left,10);
						$prevbtn.addClass("active");
					}else{
						$imgul.css("left",-moveW+'px');
						$nextbtn.removeClass("active");
					}
				};
				left();
			});
			$nextbtn.on("mouseup",function(){
				clearTimeout(timer);
			});
			$prevbtn.on("mousedown",function(){//右移				
				var right=function(){
					var oldLeft=parseInt($imgul.css("left"));
					var newLeft=oldLeft+10;
					if(newLeft<0){
						$imgul.css("left",newLeft+'px');
						timer=setTimeout(right,10);
						$nextbtn.addClass("active");
					}else{
						$imgul.css("left",0+'px');
						$prevbtn.removeClass("active");
					}
				};
				right();
			});
			$prevbtn.on("mouseup",function(){
				clearTimeout(timer);
			});
		}
		$imgCon.mousemove(function(e){
			$drag.css('display','block');
			$show.css('display','block');

		   	var iX = e.pageX - $(this).offset().left - $drag.width()/2,
		   		iY = e.pageY - $(this).offset().top - $drag.height()/2,	
		   		MaxX = $imgCon.width()-$drag.width(),
		   		MaxY = $imgCon.height()-$drag.height();

		   	iX = iX > 0 ? iX : 0;
		   	iX = iX < MaxX ? iX : MaxX;
		   	iY = iY > 0 ? iY : 0;
		   	iY = iY < MaxY ? iY : MaxY;	
		   	$drag.css({left:iX+'px',top:iY+'px'});	   		
		   	$bigImg.css({marginLeft:-multiple*iX+'px',marginTop:-multiple*iY+'px'});
		});
		$imgCon.mouseout(function(){
		   	$drag.css('display','none');
			$show.css('display','none');
		});

		$imgList.click(function(){
			var img = $(this).attr('data-img');
			var bigimg = $(this).attr('data-bigimg');
			$img.attr('src',img);
			$bigImg.attr('src',bigimg);
			$(this).addClass('active').siblings().removeClass('active');
		});
		$imgList.mouseover(function(){
			var img = $(this).attr('data-img');
			var bigimg = $(this).attr('data-bigimg');
			$img.attr('src',img);
			$bigImg.attr('src',bigimg);
			$(this).addClass('active').siblings().removeClass('active');
		});	
	}
});
