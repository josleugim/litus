/**
 * Created by Mordekaiser on 28/02/16.
 */
(function () {
    angular.module('app')
        .factory('notificationService', ['$q', '$http', 'ApiUrl', notificationService]);

    function notificationService($q, $http, ApiUrl) {
        return {
            post: postNotification,
            put: putNotification
        };

        function postNotification(query, data) {
            var dfd = $q.defer();

            $http({
                method: 'POST',
                url: ApiUrl + 'api/notifications/',
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

        function putNotification(query, data) {
            var dfd = $q.defer();

            $http({
                method: 'PUT',
                url: ApiUrl + 'api/notifications/',
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
    }
}());