/**
 * Created by Mordekaiser on 03/03/16.
 */
(function () {
    angular.module('app')
        .directive('rateStar', function () {
            return {
                link: function (scope, element, attr) {
                    element.on('change', function () {
                        for(var i=1; i <= 5; i ++) {
                            if(i <= element[0].value) {
                                $('#' + i).prop('checked', true);
                                //$('#' + i + ' :checked + label:before').css('background-color','yellow');
                            }
                            else {
                                $('#' + i).prop('checked', false);
                                //$('#' + i + ' :checked + label:before').css('background-color','transparent');
                            }
                        }
                    })
                }
            }
        })
        .controller('ChatCtrl', ['mvNotifier', '$scope', 'chatService', 'mvIdentity', 'userService', '$routeParams', ChatCtrl]);

    function ChatCtrl(mvNotifier, $scope, chatService, mvIdentity, userService, $routeParams) {
        var socket = io();
        // client joins a room, with the specific chat_id
        socket.emit('joinUser', mvIdentity.currentUser.name, $routeParams.id);
        $scope.chat = {};
        $scope.rate = {};

        chatService.get({_id: $routeParams.id}).then(function (data) {
            userService.getUserByID({_id: data.client_id}).then(function (user) {
                $scope.user = user;
            });

            if(data.conversation) {
                angular.forEach(data.conversation, function (value, key) {
                    $('#conversation').append('<li><b>' + value.completeName + ':</b> ' + value.message + '</li>');
                });
            }
        });

        socket.on('updateConversation', function (username, data) {
            $('#conversation').append('<li><b>' + username + ':</b> ' + data + '</li>');
        });

        $scope.sendMessage = function() {
            var query = {
                chat_id: $routeParams.id
            };

            var data = {
                completeName: mvIdentity.currentUser.name + " " + mvIdentity.currentUser.lastName,
                message: $scope.chat.msg
            };

            chatService.post(query, data).then(function (message) {
                if(message) {
                    // client emit a message to a specific room (chat_id)
                    socket.emit('sendMessage', message);
                    $scope.chat.msg = "";
                } else
                    mvNotifier.error('No se pudo enviar el mensaje');
            });
        };

        $scope.$on("$destroy", function(){
            socket.disconnect(true);
        });
        
        $scope.sendRate = function (email) {
            var query = {
                email: email
            };

            var data = {
                comment: $scope.rate.comment,
                user_id: mvIdentity.currentUser._id
            };

            if($("#5").is(':checked')) {
                data.rate = 5;
            } else if($("#4").is(':checked') && $("#5").is(':checked') == false) {
                data.rate = 4;
            } else if($("#3").is(':checked') && $("#4").is(':checked') == false) {
                data.rate = 3;
            } else if($("#2").is(':checked') && $("#3").is(':checked') == false) {
                data.rate = 2;
            } else if($("#1").is(':checked') && $("#2").is(':checked') == false) {
                data.rate = 1;
            }

            userService.postRate(query, data).then(function (success) {
                if(success) {
                    mvNotifier.notify('Usuario calificado');
                    $('.chat .rate-box').css('display','none');
                }
            })
        }
    }
}());