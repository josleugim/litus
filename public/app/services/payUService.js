/**
 * Created by Mordekaiser on 29/05/16.
 */
(function () {
    angular.module('app')
        .factory('payUService', ['$q', '$http', '$location', payUService]);

    function payUService($q, $http, $location) {
        var host = 'http://' + $location.host() + ':5002/';
        return {
            get: getReferenceCode
        };

        function getReferenceCode() {
            var dfd = $q.defer();

            $http({
                method: 'GET',
                url: host + 'api/reference-code',
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