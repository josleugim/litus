/**
 * Created by Mordekaiser on 17/02/16.
 */
(function () {
    angular.module('app')
        .factory('userService', ['$q', '$http', 'ApiUrl', userService]);

    function userService($q, $http, ApiUrl) {
        return {
            getUserByID: getUserByID,
            post: postUser,
            put: putUser,
            getLawyers: getLawyers
        };

        function getUserByID(query) {
            var dfd = $q.defer();

            $http({
                method: 'GET',
                url: ApiUrl + 'api/users',
                params: query,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function successCallback(response) {
                dfd.resolve(response.data);
            }, function errorCallback() {
                dfd.resolve(false);
            });

            return dfd.promise;

        }

        function postUser(data) {
            var dfd = $q.defer();

            var fd = new FormData();
            for(var key in data) {
                fd.append(key, data[key]);
            }

            $http({
                method: 'POST',
                url: ApiUrl + 'api/users',
                data: fd,
                transformRequest: angular.indentity,
                headers: {
                    'Content-Type': undefined
                }
            }).then(function successCallback(response) {
                if(response.data.success) {
                    dfd.resolve(true);
                }
            }, function errorCallback(response) {
                dfd.resolve(false);
            });

            return dfd.promise;
        }

        function putUser(query, data) {
            var dfd = $q.defer();

            $http({
                method: 'PUT',
                url: ApiUrl + 'api/users',
                params: query,
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function successCallback(response) {
                if(response.data.success) {
                    dfd.resolve(true);
                }
            }, function errorCallback(response) {
                dfd.resolve(false);
            });

            return dfd.promise;
        }

        function getLawyers(query) {
            var dfd = $q.defer();

            $http({
                method: 'GET',
                url: ApiUrl + 'api/lawyers',
                params: query,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function successCallback(response) {
                dfd.resolve(response.data);
            }, function errorCallback() {
                dfd.resolve(false);
            });

            return dfd.promise;
        }
    }
}());