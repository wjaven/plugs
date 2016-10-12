var fullPage=function(obj){
    var main=document.querySelector(obj.id),//分页父元素
        pages=main.querySelectorAll(obj.class),//分页集合
        step=obj.step&&obj.step>=10&&obj.step<=30?obj.step:15,//滚动速度(10-30)
        timeout=obj.timeout,//持续滚动延迟
        callback=obj.callback;//滚动结束回调
    addActive(pages[0]);
    if(window.addEventListener){
        window.addEventListener('resize',resize,false);
    }else{
        window.attachEvent('onresize',resize);
    }
    function resize(){
        main.style.top=-main.offsetHeight*getActiveIndex()+'px';
    }
    //滑动范围在20x20内则做点击处理，s是开始，e是结束
    var init={x:20,y:20,sx:0,sy:0,ex:0,ey:0},scrollFlag=false;
    main.addEventListener('touchstart',function(){
            init.sx=event.targetTouches[0].pageX;
            init.sy=event.targetTouches[0].pageY;
        },false);
    main.addEventListener('touchmove',function(){
            event.preventDefault();
            init.ex=event.targetTouches[0].pageX;
            init.ey=event.targetTouches[0].pageY;
        },false);
    main.addEventListener('touchend',function(){
            var cx=init.ex-init.sx;
            var cy=init.ey-init.sy;
            if(Math.abs(cy)>init.y){
                if(cy<0){
                    up();
                }else if(cy>0){
                    down();
                }
            }
        },false);
    mouseScroll(main,mouseScrollCallback);
    function mouseScrollCallback(delta){
        if(delta<0){
            up();
        }else{
            down();
        }
    }
    function mouseScroll(elem,callback){
        var wheel=function(event){
            event=event||window.event;
            var delta=(event.wheelDelta)?event.wheelDelta/120:-(event.detail||0)/3;
            if(delta){
                callback(delta);
            }
        };
        var type='mousewheel';
        if(elem.addEventListener) {
            if(navigator.userAgent.indexOf('Firefox')>0){
                type='DOMMouseScroll';
            }
            elem.addEventListener(type,wheel,false);
        }else{
            elem.attachEvent('on'+type,wheel);
        }
    }
    function up(){
        if(scrollFlag){return;}
        var index=getActiveIndex();
        if(index>=pages.length-1){return;}
        scrollFlag=true;
        move(1);
        removeActive(pages[index]);
        addActive(pages[index+1]);
    }
    function down(){
        if(scrollFlag){return;}
        var index=getActiveIndex();
        if(index<=0){return;}
        scrollFlag=true;
        move(-1);
        removeActive(pages[index]);
        addActive(pages[index-1]);
    }
    function move(dir){
        var height=pages[0].offsetHeight,
            newTop=main.offsetTop-height*dir;
        var go=function(){
            var oldTop=main.offsetTop,
                speed=(newTop-oldTop)/step;
            speed=speed>0?Math.ceil(speed):Math.floor(speed);
            if((dir>0&&oldTop>newTop)||(dir<0&&oldTop<newTop)){
                main.style.top=oldTop+speed+'px';
                setTimeout(go,10);
            }else{
                if(callback){callback();}
                if(timeout){
                    setTimeout(function(){scrollFlag=false;},timeout);
                }else{
                    scrollFlag=false;
                }

            }
        };
        go();
    }
    function getActiveIndex(){
        var active;
        for(var i= 0,len=pages.length;i<len;i++){
            if(pages[i].className.indexOf('active')>-1){
                active=pages[i];
                break;
            }
        }
        return inArray(active,pages);
    }
    function addActive(elem){
        var className=elem.className.split(' '),
            add=className?(inArray('active',className)>-1?'':' active'):'active';
        elem.className=elem.className+add;
    }
    function removeActive(elem){
        var className=elem.className.split(' ');
        if(inArray('active',className)>-1){
            className.splice(inArray('active',className),1);
            elem.className=className.join(' ');
        }
    }
    function inArray(elem,arr,i){
        var len;
        if(arr){
            if([].indexOf){
                return [].indexOf.call(arr,elem,i);
            }
            len=arr.length;
            i=i?i<0?Math.max(0,len+i):i:0;
            for(;i<len;i++){
                if(i in arr&&arr[i]===elem){
                    return i;
                }
            }
        }
        return -1;
    }
};