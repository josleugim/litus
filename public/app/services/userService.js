/**
 * Created by Mordekaiser on 17/02/16.
 */
(function () {
    angular.module('app')
        .factory('userService', ['$q', '$http', '$location', userService]);

    function userService($q, $http, $location) {
        return {
            getUserByID: getUserByID,
            post: postUser,
            put: putUser,
            getLawyers: getLawyers,
            postRate: postRate
        };

        function getUserByID(query) {
            var dfd = $q.defer();

            $http({
                method: 'GET',
                url: 'http://' + $location.host() + '/api/users',
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
                url: 'http://' + $location.host() + '/api/users',
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
                url: 'http://' + $location.host() + '/api/users',
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
                url: 'http://' + $location.host() + 'api/lawyers',
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
        
        function postRate(query, data) {
            var dfd = $q.defer();
            $http({
                method: 'POST',
                url: 'http://' + $location.host() + 'api/users/rate',
                data: data,
                params: query,
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
    }
}());