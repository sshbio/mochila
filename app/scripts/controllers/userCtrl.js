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
                var found = false;
                //check if exist just show if it is hide
                console.log('asdasd',$scope.chats);
                for (var i = 0; i < $scope.chats.length; i++) {
                    if($scope.chats[i].to._id == friend._id){
                        found = true;
                        $scope.chats[i].show = true;
                    };
                }
                if(!found)
                    $scope.chats.push({
                            to:friend,
                            logs:[],
                            imageUrl:friend.imageUrl,
                            name:friend.userName,
                            messages:[],
                            field:'',
                            show:true
                        });
            };
            $scope.hideChat = function(index){
                $scope.chats[index].show = false;
            }
            $scope.sendMessage = function(message , friend , index){
                console.log(message,friend,index);
                eventFact.sio.emit('message',{text:message,to:friend});
                $scope.chats[index].field = '';
                $scope.chats[index].messages.push({text:message,imageUrl:$scope.user.imageUrl});
            };

            $rootScope.$on('message',function(event , data){
                console.log(data);
                var found = false;
                //find friend id and imageUrl
                var friend = {}; 
                for(var i = 0; i < $scope.friends.length ;i++){

                    if($scope.friends[i]._id == data.from)
                        friend = $scope.friends[i];  
                };
                console.log(friend);
                for (var i = 0; i < $scope.chats.length; i++) {
                    if($scope.chats[i].to._id == friend._id){
                        found = true;
                        $scope.chats[i].show = true;
                    };
                }
                if(!found)
                    setTimeout(function() {
                            $scope.$apply(function(){
                                $scope.chats.push({
                                    to:friend,
                                    logs:[],
                                    imageUrl:friend.imageUrl,
                                    name:friend.userName,
                                    messages:[{text:data.text,imageUrl:friend.imageUrl}],
                                    field:'',
                                    show:true
                                });
                            });
                        }, 0);

                for (var i = 0; i < $scope.chats.length; i++) {
                    // console.log($scope.chats[i].to,data.from)
                    if($scope.chats[i].to._id == data.from){          
                        var tmp =i;
                        setTimeout(function() {
                            $scope.$apply(function(){
                                $scope.chats[tmp].messages.push({text:data.text,imageUrl:friend.imageUrl});
                            });
                        }, 0);
                    }
                };
            });
    }]);