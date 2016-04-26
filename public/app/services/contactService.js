/**
 * Created by Mordekaiser on 25/02/16.
 */
(function () {
    angular.module('app')
        .factory('contactService', ['$q', '$http', '$location', contactService]);

    function contactService($q, $http, $location) {
        var host = 'http://' + $location.host() + ':5002/';
        return {
            post: postContact
        };

        function postContact(data) {
            var dfd = $q.defer();

            $http({
                method: 'POST',
                url: host + 'api/contact/',
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