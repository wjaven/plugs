var animate=function(obj){
    var elem=obj.elem,//必填
        style=obj.style,//必填
        type=obj.type?obj.type:'linear',//不填默认linear
        time=obj.time?obj.time:2000,//不填默认2000ms
        callback=obj.callback,//动画结束回调
        fps=10,//每帧10ms，实际有延迟
        timeout= 0,//动画变化时间
        start={},//style初始值
        newend={};//变化值
    var types={
        linear:function(e,s,t){
            return (e-s)/time;
        },
        easeIn:function(e,s,t){
            return (e-s)*2/(time*time)*t;
        },
        easeOut:function(e,s,t){
            return (e-s)*2/(time*time)*(time-t);
        },
        easeInOut:function(e,s,t){
            if(t*2<time){
                return (e-s)*4/(time*time)*t;
            }
            return (e-s)*4/(time*time)*(time-t);
        }
    };
    for(var attr in style){
        start[attr]=getStyle(elem,attr);
        newend[attr]=start[attr];
    }
    var go=function(){
        timeout+=fps;
        for(var attr in style){
            var speed=types[type](style[attr],start[attr],timeout)*fps;
            newend[attr]=parseFloat(parseFloat(newend[attr]+speed).toFixed(4));
            if(attr=='opacity'){
                elem.style.filter='alpha(opacity:'+newend[attr]+')';
                elem.style.opacity=newend[attr]/100;
            }else{
                elem.style[attr]=newend[attr]+'px';
            }
        }
        if(timeout<time){
            setTimeout(go,fps);
        }else{
            endCorrect();
            if(callback){callback();}
        }
    };
    go();
    function endCorrect(){
        for(var attr in style){
            if(newend[attr]!=style[attr]){
                if(attr=='opacity'){
                    elem.style.filter='alpha(opacity:'+style[attr]+')';
                    elem.style.opacity=style[attr]/100;
                }else{elem.style[attr]=style[attr]+'px';}
            }
        }
    }
    function getStyle(obj,attr){
        var value=obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
        if(attr=='opacity'){
            value=value*100;
        }
        return parseFloat(value);
    }
};