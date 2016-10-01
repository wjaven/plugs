(function(){
	var wcalendars=[],rendFlag=false,keyFlag,cskin;
	var wcalendar=function(obj){
		var nowDate=new Date(),
				todayDate=[],
				cDate=[];
		todayDate[0]=nowDate.getFullYear();
		todayDate[1]=nowDate.getMonth()+1;
		todayDate[2]=nowDate.getDate();
		cDate=todayDate.concat();
		if(wcalendars[obj.id]){
			wcalendars[obj.id].param=obj;
		}else{
			wcalendars[obj.id]={param:obj};
		}
		var handle=function(e){
			e&&e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
			var elem= e.target||e.srcElement;
			keyFlag=elem.id;
			var cleft=getElementLeft(elem);
			var ctop=getElementTop(elem)+elem.offsetHeight;
			var cbox=document.querySelector('.calendarBox');
			cbox.style.left=cleft+'px';
			cbox.style.top=ctop+'px';
			cbox.style.display='block';
			rend(todayDate[0],todayDate[1]);
		};
		for(var key in wcalendars){
			if(wcalendars[key].bind){continue;}
			addEvents(document.getElementById(key),'click',handle);
			wcalendars[key].bind=true;
		}
		if(rendFlag){return;}
		var weekTxt=['日','一','二','三','四','五','六'];
		var cbox=document.createElement('div'),
			cbtn=document.createElement('div'),
			chead=document.createElement('div'),
			cbody=document.createElement('div');
		cbox.className=cskin?'calendarBox '+cskin:'calendarBox';
		cbtn.className='cbtn';
		chead.className='chead';
		cbody.className='cbody';
		document.querySelector('body').appendChild(cbox);
		addEvents(document,'click',function(){
			document.querySelector('.calendarBox').style.display='none';
			var c=document.querySelector('.calendarBox').querySelectorAll('.cmore');
			c[0].style.display='none';
			c[1].style.display='none';
			cDate=todayDate.concat();
		});
		cbox.onselectstart=function(){return false;};
		var cyearHtml='<div><div class="c-icon"><i class="c-left"></i></div>'
				+'<div class="cyear"></div><div class="c-icon"><i class="c-right"></i></div>'
				+'<div class="cmore"><div class="cm-icon"><i class="c-up"></i></div>'
				+'<ul></ul><div class="cm-icon"><i class="c-down"></i></div></div></div>',
			cmonthHtml='<div><div class="c-icon"><i class="c-left"></i></div>'
				+'<div class="cmonth"></div><div class="c-icon"><i class="c-right"></i></div>'
				+'<div class="cmore"><ul></ul></div></div>';
		cbtn.innerHTML=cyearHtml+cmonthHtml;
		cbox.appendChild(cbtn);
		var cyearBtns=cbtn.childNodes[0].querySelectorAll('div'),
			cyear=cyearBtns[1],
			cyearPrev=cyearBtns[0],
			cyearNext=cyearBtns[2],
			cyearMore=cbtn.childNodes[0].querySelector('.cmore'),
			cyearUl=cyearMore.querySelector('ul'),
			cyearUlPrev=cyearMore.querySelectorAll('div')[0],
			cyearUlNext=cyearMore.querySelectorAll('div')[1];
		cyearUlChange(todayDate[0]-4);
		cyearUlPrev.onclick=function(){
			var first=parseInt(cyearUl.querySelector('li').innerText||cyearUl.querySelector('li').textContent);
			cyearUlChange(first-9);
		};
		cyearUlNext.onclick=function(){
			var first=parseInt(cyearUl.querySelector('li').innerText||cyearUl.querySelector('li').textContent);						
			cyearUlChange(first+7);
		};
		cyearPrev.onclick=function(){
			cDate[0]=cDate[0]-1;
			rend(cDate[0],cDate[1]);
		};
		cyearNext.onclick=function(){
			cDate[0]=cDate[0]+1;
			rend(cDate[0],cDate[1]);
		};
		function cyearUlChange(first){
			var cyearUlHtml='';
			for(var i=first;i<first+8;i++){
				var y=i+1;
				if(y==todayDate[0]){
					cyearUlHtml+='<li class="ctoday">'+y+'</li>';
				}else{
					cyearUlHtml+='<li>'+y+'</li>';
				}					
			}
			cyearUl.innerHTML=cyearUlHtml;
			var cyearUls=cyearUl.querySelectorAll('li');
			for(var i=0,len=cyearUls.length;i<len;i++){
				cyearUls[i].onclick=function(){
					cDate[0]=parseInt(this.innerText||this.textContent);
					rend(cDate[0],cDate[1]);
					cyearMore.style.display='none';
				}
			}
		}
		var cmonthBtns=cbtn.childNodes[1].querySelectorAll('div'),
			cmonth=cmonthBtns[1],
			cmonthPrev=cmonthBtns[0],
			cmonthNext=cmonthBtns[2],
			cmonthMore=cbtn.childNodes[1].querySelector('.cmore'),
			cmonthUl=cmonthMore.querySelector('ul'),
			cmonthUlHtml='';
		cmonth.className='cmonth';
		for(var i=0;i<12;i++){
			var m=i+1;
			if(m==todayDate[1]){
				cmonthUlHtml+='<li class="ctoday" data="'+m+'">'+m+'</li>';
			}else{
				cmonthUlHtml+='<li data="'+m+'">'+m+'</li>';
			}
		}
		cmonthUl.innerHTML=cmonthUlHtml;
		cmonthPrev.onclick=function(){
			cDate[1]=cDate[1]-1;
			if(cDate[1]<1){
				cDate[1]=12;
				cDate[0]=cDate[0]-1;
			}
			rend(cDate[0],cDate[1]);
		};
		cmonthNext.onclick=function(){
			cDate[1]=cDate[1]+1;
			if(cDate[1]>12){
				cDate[1]=1;
				cDate[0]=cDate[0]+1;
			}
			rend(cDate[0],cDate[1]);
		};
		cyear.onclick=function(){
			cyearMore.style.display='block';
			cmonthMore.style.display='none';
		};
		cmonth.onclick=function(){
			cmonthMore.style.display='block';
			cyearMore.style.display='none';
		};
		var cmonthUls=cmonthUl.querySelectorAll('li');
		for(var i=0,len=cmonthUls.length;i<len;i++){
			cmonthUls[i].onclick=function(){
				cDate[1]=parseInt(this.innerText||this.textContent);
				rend(cDate[0],cDate[1]);
				cmonthMore.style.display='none';
			}
		}
		var cheadHtml='';
		for(var i=0;i<7;i++){
			cheadHtml+='<div class="cth">'+weekTxt[i]+'</div>';
		}
		chead.innerHTML=cheadHtml;
		cbox.appendChild(chead);
		cbox.appendChild(cbody);
		rend(todayDate[0],todayDate[1],{min:'2016-09-01',max:'2016-09-20'});
		rendFlag=true;
		addEvents(cbox,'click',function(e){
			e&&e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
		});
		function rend(year,month){
			var cbox=document.querySelector('.calendarBox');
			if(cbox.innerText){
				cbox.querySelector('.cyear').innerText=year;
				cbox.querySelector('.cmonth').innerText=month;
			}else{
				cbox.querySelector('.cyear').textContent=year;
				cbox.querySelector('.cmonth').textContent=month;
			}
			var param=wcalendars[keyFlag]?wcalendars[keyFlag].param:null,
				min=param&&param.min?new Date(dateFormat(param.min)):null,
				max=param&&param.max?new Date(dateFormat(param.max)):null;
			weekFirst=new Date(year,month-1,1).getDay();
			var	newYear=year,newMonth=month;
        	if(newMonth>11){newYear=newYear+1;newMonth=0;}
        	var newDate=new Date(new Date(newYear,newMonth,1)-3600000*24),
        		days=newDate.getDate(),
        		weekLast=newDate.getDay(),
        		allDays=weekFirst+days+(6-weekLast);
			var cbodyHtml='';
			for(var i=0;i<allDays;i++){
				if(i%7==0){cbodyHtml+='<div class="ctr">';}
				if(i<weekFirst||i>=(weekFirst+days)){
					cbodyHtml+='<div class="ctd cdisable">&nbsp;</div>';
				}else{
					var datam=month<10?('0'+month):month,
						showd=i-weekFirst+1,
						datad=showd<10?('0'+showd):showd,
						data=year+'-'+datam+'-'+datad,
						className='ctd';
					var stempd=new Date(dateFormat(data));
					if(min&&stempd<min||max&&stempd>max){
						className+=' cdisable';
					}
					if(showd==todayDate[2]&&month==todayDate[1]&&year==todayDate[0]){
						className+=' ctoday';
					}
					cbodyHtml+='<div class="'+className+'" data="'+data+'">'+showd+'</div>';
				}
				if(i%7==6){cbodyHtml+='</div>';}
			}
			var cbody=cbox.querySelector('.cbody');
			cbody.innerHTML=cbodyHtml;
			var ctdElems=cbody.querySelectorAll('.ctd');
			for(var i= 0,len=ctdElems.length;i<len;i++){
				addEvents(ctdElems[i],'click',function(e){
					var that=e.target||e.srcElement;
					if(that.className.indexOf('cdisable')>-1){return;}
					var id=document.getElementById(keyFlag);
					if(id.value==undefined){
						id.innerHTML=that.getAttribute('data');
					}else{
						id.value=that.getAttribute('data');
					}
					document.querySelector('.calendarBox').style.display='none';
					var c=document.querySelector('.calendarBox').querySelectorAll('.cmore');
					c[0].style.display='none';
					c[1].style.display='none';
					cDate=todayDate.concat();
					if(wcalendars[keyFlag]&&wcalendars[keyFlag].param.callback){
						wcalendars[keyFlag].param.callback(that.getAttribute('data'));
					}
				});
			}
		}
	};
	wcalendar.cskin=function(className){
		cskin=className;
	};
	function addEvents(target,type,func){
		if(target.addEventListener){
			target.addEventListener(type, func,false);
		}else{
			target.attachEvent("on"+type,func);
		}
	}
	function removeEvents(target,type,func){
		if(target.removeEventListener){
			target.removeEventListener(type, func, false);
		}else{
			target.detachEvent("on"+type,func);
		}
	}
	function getElementLeft(elem){
		var left=elem.offsetLeft;
		var cur=elem.offsetParent;
		while (cur!==null){
			left+=cur.offsetLeft;
			cur=cur.offsetParent;
		}
		return left;
	}
	function getElementTop(elem){
		var top=elem.offsetTop;
		var cur=elem.offsetParent;
		while (cur!==null){
			top+=cur.offsetTop;
			cur=cur.offsetParent;
		}
		return top;
	}
	function dateFormat(date){
		return date.replace(/-/g,'/');
	}
	window.wcalendar=wcalendar;
})();
