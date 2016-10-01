var wslider=function(obj){
	var box=document.querySelector(obj.id),
		auto=obj.auto?obj.auto:true,
		interval=obj.interval?obj.interval:3000,
		step=obj.step&&obj.step>=5&&obj.step<=30?obj.step:10,
		ul=box.querySelector('.imgs'),
		lis=ul.querySelectorAll("li"),
		prevbtn=box.querySelector('.prevbtn'),
		nextbtn=box.querySelector('.nextbtn');
	
	ul.appendChild(lis[0].cloneNode(true));
	lis=ul.querySelectorAll("li");
	var width=lis[0].offsetWidth;
	var len=lis.length;
	ul.style.width=width*len+'px';
	var dotsliHtml='';
	for(var i=0;i<len-1;i++){
		dotsliHtml+='<li index="'+i+'">●</li>';
	}
	var dots=document.createElement("ul");
	dots.className='dots';
	dots.innerHTML=dotsliHtml;
	box.appendChild(dots);
	var dotsLi=dots.querySelectorAll('li');
	var index=0;
	dotsLi[index].className='active';
	
	var fclick=false;
	prevbtn.onclick=function(){
		if(fclick){return;}
		if(index-1<0){ul.style.left=-width*(len-1)+'px';index=len-1;}
		index--;
		move(width);
		showdots();
	};
	nextbtn.onclick=function(){
		if(fclick){return;}		
		if(index+1>=len){ul.style.left='0px';index=0;}
		index++;
		move(-width);
		showdots();
	};
	for(var i=0;i<len-1;i++){
		dotsLi[i].onclick=function(){
			if(fclick){return;}
			if(this.className=="active"){return;}
			var newIndex=this.getAttribute('index');
			var offset=-width*(newIndex-index);
			move(offset);
			index=newIndex;
			showdots();
		}
	}
	if(auto){
		autoplay();
		box.onmouseover=stop;
		box.onmouseout=autoplay;
	}
	var timer;
	function autoplay(){
		if(timer){clearTimeout(timer);}
		timer=setTimeout(function(){
			nextbtn.onclick();
			autoplay();
		},interval);
	}
	function stop(){
		clearTimeout(timer);
	}
	function move(offset){
		fclick=true;
		var newleft=ul.offsetLeft+offset;
		var go=function(){
			var nowleft=ul.offsetLeft;
			var speed=(newleft-nowleft)/step;
				speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if((offset>0&&nowleft<newleft)||(offset<0&&nowleft>newleft)){
				ul.style.left=nowleft+speed+'px';
				setTimeout(go,10);
			}else{
				fclick=false;
			}
		};
		go();
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
