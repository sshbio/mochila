'use strict';
/**
*  Module
*
* Description
*/
angular
    .module('app')
    .controller('userCtrl', ['$scope','$rootScope','$state','userFact','eventFact','userMyInfo',
        function($scope,$rootScope,$state,userFact,eventFact,userMyInfo){
            console.log('userCtrl');
            console.log(userMyInfo.data);
            console.log(userFact.friends);
            $scope.user = userMyInfo.data.data;
            $scope.friends = userFact.friends;
            $scope.chats = [];
            // $scope.field = '';
            // $scope.messages= [];
            $scope.startChat = function(friend){
                console.log(friend);
                //check if not exist
                $scope.chats.push({to:friend,
                            logs:[],
                            messages:[]});
            };

            $scope.sendMessage = function(message , friend){
                // console.log(message,frined);
                eventFact.sio.emit('message',{text:message,to:friend});
                // setTimeout(function() {
                    $scope.field = '';
                    // $scope.$apply();
                // }, 100);
            };

            $rootScope.$on('message',function(event , data){
                console.log(data);
                // if($scope.chats)
                for (var i = $scope.chats.length - 1; i >= 0; i--) {
                    console.log($scope.chats[i].to,data.from)
                    if($scope.chats[i].to == data.from){
                        $scope.chats.push({to:data.from,
                            logs:[],
                            messages:[{text:data.text}]});          
                    }else{
                        $scope.chats[i].messages.push({text:data.text});
                    }
                };
                if($scope.chats.length < 0){
                    $scope.chats.push({to:data.from,
                        logs:[],
                        messages:[{text:data.text}]});
                }
                    // $scope.$apply();
                // else{
                    // $scope.chats.push({to:friend,
                    //         logs:[],
                    //         messages:[]});
                    // $scope.chats[0].messages.push({text:data.text});
                // }
            });
            // eventFact.on('test',function(msg){
            //     console.log(msg)
            // })
            // eventFact.on('something', function () {
            //     $scope.getItems();
            // });
    }]);
