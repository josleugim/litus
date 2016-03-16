/**
 * Created by Mordekaiser on 03/03/16.
 */
(function () {
    angular.module('app')
        .factory('chatService', ['$q', '$http', 'ApiUrl', chatService]);

    function chatService($q, $http, ApiUrl) {
        return {
            getChatsUsers: getChatsUsers,
            get: getChat,
            post: postMessage
        };

        function getChatsUsers(query) {
            var dfd = $q.defer();

            $http({
                method: 'GET',
                url: ApiUrl + 'api/chat/users',
                params: query,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function successCallback(response) {
                if(response.data) {
                    dfd.resolve(response.data);
                }
            }, function errorCallback(response) {
                dfd.resolve(false);
            });

            return dfd.promise;
        }

        function getChat(query) {
            var dfd = $q.defer();

            $http({
                method: 'GET',
                url: ApiUrl + 'api/chat',
                params: query,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function successCallback(response) {
                if(response.data) {
                    dfd.resolve(response.data);
                }
            }, function errorCallback(response) {
                dfd.resolve(false);
            });

            return dfd.promise;
        }

        function postMessage(query, data) {
            var dfd = $q.defer();

            $http({
                method: 'PUT',
                url: ApiUrl + 'api/chat',
                params: query,
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function successCallback(response) {
                // The post method send the last message saved, to send trough the socket.io
                if(response.data) {
                    dfd.resolve(response.data);
                }
            }, function errorCallback(response) {
                dfd.resolve(false);
            });

            return dfd.promise;
        }
    }
}());