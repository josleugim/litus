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
        .controller('ChatCtrl', ['mvNotifier', '$scope', 'chatService', 'mvIdentity', ChatCtrl]);

    function ChatCtrl(mvNotifier, $scope, chatService, mvIdentity) {
        var socket = io();
        $scope.chat = {};
        $scope.chat_id = "";

        socket.on('updateConversation', function (username, data) {
            $('#conversation').append('<li><b>' + username + ':</b> ' + data + '</li>');
        });

        // retrieves all th chats of the current user
        chatService.getChatsUsers(getQuery(mvIdentity.currentUser)).then(function (data) {
            if(data) {
                $scope.users = data;
            }
        });

        // retrieve all the conversation, when user opens a chat
        $scope.getChat = function (chat_id) {
            $scope.chat_id = chat_id;
            $('#message-container').css('display','block');

            chatService.get({_id: chat_id}).then(function (data) {
                if(data.conversation) {
                    angular.forEach(data.conversation, function (value, key) {
                        $('#conversation').append('<li><b>' + value.completeName + ':</b> ' + value.message + '</li>');
                    });

                    // client joins a room, with the specific chat_id
                    socket.emit('joinUser', mvIdentity.currentUser.name, chat_id);
                }
            })
        };

        $scope.sendMessage = function() {
            var query = {
                chat_id: $scope.chat_id
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

        // constructs the query depending of the user role
        function getQuery(currentUser) {
            var query = {};

            if(currentUser.roles.indexOf("abogado") != -1) {
                query.lawyer_id = currentUser._id;
            } else if(currentUser.roles.indexOf("cliente") != -1) {
                query.client_id = currentUser._id;
            }

            return query;
        }

        // Rates the user
        $scope.rate = function () {
            $('.chat .rate-box').css('display','block');
        };
        
        $scope.sendRate = function (email) {
            
        }
    }
}());