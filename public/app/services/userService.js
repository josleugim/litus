/**
 * Created by Mordekaiser on 17/02/16.
 */
(function () {
    angular.module('app')
        .factory('userService', ['$q', '$http', 'ApiUrl', userService]);

    function userService($q, $http, ApiUrl) {
        return {
            post: postUser
        };

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
    }
}());