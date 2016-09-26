angular.module('ngAlert',[])
.factory('alertService',['$rootScope','$timeout',function($rootScope,$timeout){
    return {
        "alertService":function(){
            var alertJson={};
            alertJson.showAlert=function(msg,time){
                $rootScope.alertMessage=msg;
                if(time){
                    $timeout(function(){
                        $rootScope.closeAlert();
                    },time);
                }
            };
            alertJson.showConfirm=function(msg,callback){
                $rootScope.alertMessage=msg;
                $rootScope.showConfirmFlag=true;
                alertJson.callback=callback;
            };
            alertJson.showPrompt=function(msg,initMes,callback){
                $rootScope.alertMessage=msg;
                $rootScope.showPromptFlag=true;
                $rootScope.alertInput=initMes;
                alertJson.callback=callback;
            };
            $rootScope.confirmAlert=function($event,result){
                alertJson.callback(result);
                $rootScope.closeAlert();
            };
            $rootScope.promptAlert=function($event,result,alertInput){
                if(result){
                    if(!alertInput||!alertInput.trim()){return;}
                    else{
                        result=alertInput.trim();
                    }
                }
                alertJson.callback(result);
                $rootScope.alertInput='';
                $rootScope.closeAlert();
            };
            $rootScope.closeAlert=function(){
                $rootScope.alertMessage=undefined;
                $rootScope.showPromptFlag=$rootScope.showConfirmFlag=false;
            };
            $rootScope.stopEvent=function($event){
                $event.stopPropagation();
            };
            return alertJson;
        }
    }
}])
.directive("alertDir",function(){
    return {
        template:'<div class="ng-cloak alert-container" ng-show="alertMessage" ng-click="closeAlert()"><div class="alert-box" ng-click="stopEvent($event)">' +
            '<div class="alert-message" ng-bind="alertMessage"></div>' +
            '<div class="alert-prompt" ng-show="showPromptFlag">' +
            '<input type="text" ng-model="alertInput">' +
            '<div class="alert-confirm"><button ng-click="promptAlert($event,false)">取消</button><button ng-click="promptAlert($event,true,alertInput)">确认</button></div>' +
            '</div>'+
            '<div class="alert-confirm" ng-show="showConfirmFlag">' +
            '<button ng-click="confirmAlert($event,false)">取消</button>' +
            '<button ng-click="confirmAlert($event,true)">确认</button>' +
            '</div>' +
            '</div></div>'
    }
});
