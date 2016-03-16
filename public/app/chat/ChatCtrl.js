/**
 * Created by Mordekaiser on 03/03/16.
 */
(function () {
    angular.module('app')
        .controller('ChatCtrl', ['mvNotifier', '$scope', 'chatService', 'mvIdentity', '$rootScope', ChatCtrl]);

    function ChatCtrl(mvNotifier, $scope, chatService, mvIdentity, $rootScope) {
        var socket = io();
        $scope.chat = {};
        $scope.chat_id = "";
        var conversations = [];

        $scope.$on("updateChat", function(event, data) {
            if(Object.keys(data).length) {
                conversations.push(data);
                $scope.messages = conversations;
                var objDiv = document.getElementById("conversation");
                objDiv.scrollTop = objDiv.scrollHeight;
            }
        });
        // the socket receives the message
        socket.on('chat message', function(msg){
            $rootScope.$broadcast('updateChat', msg);
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
                        conversations.push(value);
                    });
                    $scope.messages = conversations;
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
                    socket.emit('chat message', message);
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
    }
}());