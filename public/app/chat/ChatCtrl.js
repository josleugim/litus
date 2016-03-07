/**
 * Created by Mordekaiser on 03/03/16.
 */
(function () {
    angular.module('app')
        .controller('ChatCtrl', ['mvNotifier', '$scope', 'chatService', 'mvIdentity', ChatCtrl]);

    function ChatCtrl(mvNotifier, $scope, chatService, mvIdentity) {
        $scope.chat_id = "";
        chatService.getChatsUsers(getQuery(mvIdentity.currentUser)).then(function (data) {
            if(data) {
                $scope.users = data;
            }
        });

        $scope.getChat = function (chat_id) {
            $scope.chat_id = chat_id;
            $('#message-container').css('display','block');

            chatService.get({_id: chat_id}).then(function (data) {
                if(data) {
                    $scope.conversations = data.conversation;
                }
            })
        };

        $scope.sendMessage = function(message) {
            var query = {
                chat_id: $scope.chat_id
            };

            var data = {
                completeName: mvIdentity.currentUser.name + " " + mvIdentity.currentUser.lastName,
                message: message
            };

            chatService.post(query, data).then(function (success) {
                if(success) {
                    $scope.msg = "";
                }
            })

        };

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