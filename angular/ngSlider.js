angular.module("ngSlider",[])
.directive("sliderDir",["$window","$interval","$timeout",function($window,$interval,$timeout){
	return function($scope,$element,$attr){
		if($scope.$last==true){
			var sliderBox=$element.parent().parent();
			var ul=$element.parent();
			var li=ul.children("li");
			var len=li.length;
			var dots='';
			for(var i=0;i<len;i++){dots+='<li></li>';}
			sliderBox.append('<ul class="dots">'+dots+'</ul>');
			var dotsLi=sliderBox.children().eq(1).children("li");
			dotsLi.eq(0).addClass("active");
			ul.append(li.eq(0).clone());
			$timeout(function(){
				li.eq(len-1).html(li[0].innerHTML);
			},100);
			li=ul.children("li");
			len=li.length;
			var width,height;
			resize();
			angular.element($window).bind("resize",function(){
				resize();
			});
			function resize(){
				width=sliderBox[0].clientWidth;
				height=width*2/3;
				if($scope.hw){height=width*$scope.hw;}
				sliderBox.css("height",height+'px');
				ul.css({"width":width*len+'px',"left":'0px'});
				li.css("width",width+'px');
			}
			var auto=$interval(autoPlay,3000);
			function autoPlay(){
				index++;move(-1);
			}
			$scope.$on('$destroy', function() {
				$interval.cancel(auto);
			});
			var sx=0,mx=0,index=0,movingFlag=false;
			sliderBox.bind("touchstart",function(event){
				$interval.cancel(auto);
				var t=event.targetTouches||event.originalEvent.targetTouches;
				sx=t[0].pageX;
			});
			sliderBox.bind("touchmove",function(event){
				event.preventDefault();
			});
			sliderBox.bind("touchend",function(event){
				var t=event.changedTouches||event.originalEvent.changedTouches;
				mx=t[0].pageX-sx;
				if(mx<-30){if(movingFlag){return;}index++;move(-1);
				}else if(mx>30){if(movingFlag){return;}index--;move(1);}
				$timeout(function(){
					auto=$interval(autoPlay,3000);
				},300);
			});
			function move(dir){
				movingFlag=true;
				if(index>=len){ul.css("left","0px");index=1;}
				if(index<0){ul.css("left",-width*(len-1)+'px');index=len-2;}
				var newLeft=-width*index;
				var go=function(){
					var oldLeft=parseInt(ul.css("left"));
					var speed=(newLeft-oldLeft)/8;
					speed=speed>0?Math.ceil(speed):Math.floor(speed);
					if((dir<0&&oldLeft>newLeft)||(dir>0&&oldLeft<newLeft)){
						ul.css("left",oldLeft+speed+'px');
						$timeout(go,10);
					}else{movingFlag=false;}
				}
				go();
				dotsLi.removeClass("active");
				dotsLi.eq(index>=(len-1)?0:index).addClass("active");
			}				
		}
	}
}]);
