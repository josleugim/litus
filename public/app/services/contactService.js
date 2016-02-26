/**
 * Created by Mordekaiser on 25/02/16.
 */
(function () {
    angular.module('app')
        .factory('contactService', ['$q', '$http', 'ApiUrl', contactService]);

    function contactService($q, $http, ApiUrl) {
        return {
            post: postContact
        };

        function postContact(data) {
            var dfd = $q.defer();

            $http({
                method: 'POST',
                url: ApiUrl + 'api/contact/',
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