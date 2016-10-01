var touchSlider=function(obj){
	var sliderBox=document.querySelector(obj.id),
		hw=obj.hw;
		ul=sliderBox.querySelector('.imgs'),
		lis=ul.querySelectorAll('li');
		len=lis.length;
	var dotsHtml='';
	for(var i=0;i<len;i++){dotsHtml+='<li></li>';}
	var dots=document.createElement('ul');
	dots.className='dots';
	dots.innerHTML=dotsHtml;
	sliderBox.appendChild(dots);
	var dotsLi=dots.querySelectorAll('li');
	var index=0;
	dotsLi[index].className='active';
	ul.appendChild(lis[0].cloneNode(true));
	lis=ul.querySelectorAll('li');
	len=lis.length;
	var width,height;
	resize();
	window.onresize=function(){
		resize();
	};
	function resize(){
		width=sliderBox.offsetWidth;
		height=width*2/3;
		if(hw){height=width*hw;}
		sliderBox.style.height=height+'px';
		ul.style.width=width*len+'px';
		for(var i=0;i<len;i++){
			lis[i].style.width=width+'px';
		}
	}
	var auto;
	autoPlay();
	function autoPlay(){
		if(auto){clearTimeout(auto)};		
		auto=setTimeout(function(){
			index++;move(-1);
			autoPlay();
		},3000);
	}
	var sx=0,mx=0,movingFlag=false;
	sliderBox.addEventListener('touchstart',function(event){
		if(auto){clearTimeout(auto);};
		sx=event.targetTouches[0].pageX;
	},false);
	sliderBox.addEventListener('touchmove',function(event){
		event.preventDefault();
	},false);
	sliderBox.addEventListener('touchend',function(event){
		mx=event.changedTouches[0].pageX-sx;
		if(mx<-30){if(movingFlag){return;}index++;move(-1);
		}else if(mx>30){if(movingFlag){return;}index--;move(1);}
		autoPlay();
	},false);
	function move(dir){
		movingFlag=true;
		if(index>=len){ul.style.left='0px';index=1;}
		if(index<0){ul.style.left=-width*(len-1)+'px';index=len-2;}
		var newLeft=-width*index;
		var go=function(){
			var oldLeft=ul.offsetLeft;
			var speed=(newLeft-oldLeft)/8;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if((dir<0&&oldLeft>newLeft)||(dir>0&&oldLeft<newLeft)){
				ul.style.left=oldLeft+speed+'px';
				setTimeout(go,10);
			}else{movingFlag=false;}
		}
		go();
		showdots();
	}
	function showdots() {
        for (var i = 0; i < len-1; i++) {
            if( dotsLi[i].className == 'active'){
                dotsLi[i].className = '';
                break;
            }
        }
        dotsLi[index>=len-1?0:index].className = 'active';
    }
};
