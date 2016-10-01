$.extend($.fn, {
    formVerify:function(){
        var formObj=$(this);
        var output={};
        var valids,
            validList=[],
            repeats,
            repeatList=[]
        valids=$(formObj).find("[gvalid]");
        for(var i=0,len=valids.length;i<len;i++){
            var para=$(valids).eq(i).attr("gvalid").split(";");
            validList.push({
                node:$(valids).eq(i),
                required:para[0],
                type:para[1],
                range:para[2],
                txt:para[3].substring(1,para[3].length-1)
            });
        }
        //grepeat
        repeats=$(formObj).find("[grepeat]");
        for(var i=0,len=repeats.length;i<len;i++){
        	var para=$(repeats).eq(i).attr("grepeat").split(";");
        	repeatList.push({
        		node:$(repeats).eq(i),
        		to:para[0],
        		txt:para[1].substring(1,para[1].length-1)
        	});
        }
        output.bindform=function(){
            $.each(validList,function(i,obj){
                $(obj.node).on("focusout",function(){
                    validReg($(this),$(this).val(),obj.required,obj.type,obj.range,obj.txt);
                });
            });
            $.each(repeatList,function(i,obj){
            	$(obj.node).on("focusout",function(){
            		repeatReg($(obj.node),$(obj.node).val(),$(formObj).find("["+obj.to+"]").val(),obj.txt);
            	});           	
            });
        };
        output.subform=function(){
            $.each(validList,function(i,obj){
            	if($(obj.node).prev().attr("gvalid")&&$(obj.node).closest("dd").next(".hint").css("display")=="block"){return;}
                validReg($(obj.node),$(obj.node).val(),obj.required,obj.type,obj.range,obj.txt);
            });
            $.each(repeatList,function(i,obj){
            	repeatReg($(obj.node),$(obj.node).val(),$(formObj).find("["+obj.to+"]").val(),obj.txt);
            });
            var hints=$(formObj).find(".hint");
            for(var i=0,len=hints.length;i<len;i++){
            	if($(hints).eq(i).closest("dl").css("display")=="none"){continue;}
                if($(hints).eq(i).css("display")=="block"){
                    return true;
                }
            }
            return false;
        };
        if(String.prototype.trim==undefined){
	        String.prototype.trim=function(){
	            return this.replace(/^\s+|\s+$/g,'');
	        }
	    }
        function validReg(node,value,required,type,range,txt){
            if(!value||!value.trim()){
                if(required=="true"){
                    $(node).closest("dd").next(".hint").find("span").text('必填项:'+txt);
                    $(node).closest("dd").next(".hint").show();
                }else{
                    $(node).closest("dd").next(".hint").hide();
                }
            }
            else{
                if(!reg(value,type,range)){
                    $(node).closest("dd").next(".hint").find("span").text('格式有误:'+txt);
                    $(node).closest("dd").next(".hint").show();
                }else{
                    $(node).closest("dd").next(".hint").hide();
                }
            }
        }
        function repeatReg(node,value,tovalue,txt){
        	if(value==tovalue){
        		$(node).closest("dd").next(".hint").hide();
        	}else{
        		$(node).closest("dd").next(".hint").find("span").text(txt);
                $(node).closest("dd").next(".hint").show();
        	}
        }
        function reg(value,type,range){
            var result;
            switch(type){
            	case "letter": result=value.match('^[a-zA-Z0-9_]'+range+'$');break;//字母数字下划线
                case "number": result=value.match('^[0-9]'+range+'$');break;//数字
                case "mobile": result=value.match('^((1[3,5,8][0-9])|(14[5,7])|(17[0,1,6,7,8]))[0-9]{8}$');break;
                case "phone": result=value.match('^(0[0-9]{2,3}|(0[0-9]{2,3}-))?[0-9]{7,8}$');break;//固话，可有区号
                case "contact": result=value.match('^(0[0-9]{2,3}|(0[0-9]{2,3}-))?[0-9]{7,8}$')||value.match('^((1[3,5,8][0-9])|(14[5,7])|(17[0,1,6,7,8]))[0-9]{8}$');break;//联系方式：手机或固定电话
                case "email": result=value.match('^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$');break;//邮箱
                case "IDcard": result=value.match('^(^[0-9]{15}$|^[0-9]{18}$|^[0-9]{17}([0-9]|X|x))$');break;//15,18位身份证
                case "CN": result=value.match('^[\u4e00-\u9fa5]'+range+'$');break;//中文
                case "int": result=intRange(value,range);break;//数字范围
                case "len": result=strRange(value,range);break;//字符串长度
                case "postcode": result=value.match('^[1-9][0-9]{5}$');break;//邮编              
                default: result = true;break;
            }
            return result;
        }
        function intRange(value,range){
        	if(value!=parseInt(value)){return false;}
        	var arr=range.substring(1,range.length-1).split(",");
        	return arr[1]==''?(value>=parseInt(arr[0])):(value>=parseInt(arr[0])&&value<=parseInt(arr[1]));
        }
        function strRange(value,range){
        	var len=value.length;
        	if(range.indexOf(",")<0){
        		return len==range.substring(1,range.length-1);
        	}else{
        		var arr=range.substring(1,range.length-1).split(",");
        		return arr[1]==''?(len>=arr[0]):(len>=arr[0]&&len<=arr[1]);
        	}
        }
        return output;
    }
});
