angular.module("ngLoadScroll",[])
.factory('listService', ['$http','$timeout',function($http,$timeout) {
    var listService = function (obj) {
    	this.itemsName=obj.itemsName;
        this.url=obj.url;
        this.request=obj.request;
        this.items = [];
        this.busy = false;
        this.page = 1;
    };
    listService.prototype.firstPage=function(){
		this.items = [];
      	this.page = 1;
      	this.nextPage();
	};
    listService.prototype.nextPage = function() {
        if (this.busy) return;
        this.busy = true;
  	$http({method:"GET",url:this.url,params:this.request})
  	.success(function(response){
  		var items=response.data[this.itemsName];
  		for(var i=0,len=items.length;i<len;i++){
  			this.items.push(items[i]);
  		}
  		this.busy = false;
  		this.page += 1;
  	}.bind(this)); 
    };
    return listService;
}])
.directive("loadScrollDir",['$rootScope','$window','$timeout',function($rootScope,$window,$timeout){
    return function($scope,$element,$attrs){
        var windowBottom,elementBottom,busyFlag=false;
        $window=angular.element($window);
        var disable=$attrs.loadScrollDisabled;
        disable=disable.substr(0,disable.length-5);
        $scope.$watch(disable,function(value){
            busyFlag=value.busy;
            if($scope.loadScrollFirstFlag&&!busyFlag){
            	$scope.loadScrollFirstFlag=false;
            }
        },true);
        $scope.$eval($attrs.loadScrollFirst);
        var handler=function(){
            windowBottom=$window[0].innerHeight+$window[0].scrollY;
            elementBottom=$element[0].offsetTop+$element[0].offsetHeight-10;
            if(windowBottom>elementBottom){
                if(busyFlag){return;}
                if ($rootScope.$$phase) {
                    $scope.$eval($attrs.loadScrollDir);
                } else {
                    $scope.$apply($attrs.loadScrollDir);
                }
            }
        };
        $window.on("scroll",handler);
        $scope.$on('$destroy', function() {
            $window.off('scroll',handler);
        });
        var sy=0,ey=0,my=0;
        $window.on("touchstart",function(event){
            var t=event.targetTouches||event.originalEvent.targetTouches;
            sy=t[0].pageY;
        });
		$window.on("touchmove",function(event){
			var t=event.changedTouches||event.originalEvent.changedTouches;
			ey=t[0].pageY;
			my=ey-sy;
			if($window[0].scrollY<=0&&my-$window[0].scrollY>100){
		    	$scope.loadScrollFirstFlag=true;
		    }
		});
        $window.on("touchend",function(event){
            if($window[0].scrollY<=0&&my-$window[0].scrollY>100){
                $scope.$apply($attrs.loadScrollFirst);
            }
        });
    }
}]);
