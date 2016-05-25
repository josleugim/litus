/**
 * Created by Mordekaiser on 24/05/16.
 */
(function () {
    angular.module('app')
        .controller('ChatListCtrl', ['mvNotifier', '$scope', 'chatService', 'mvIdentity', 'userService', ChatListCtrl]);
    function ChatListCtrl(mvNotifier, $scope, chatService, mvIdentity) {
        // retrieves all th chats of the current user
        chatService.getChatsUsers(getQuery(mvIdentity.currentUser)).then(function (data) {
            if(data) {
                $scope.users = data;
            }
        });

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