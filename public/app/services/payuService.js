/**
 * Created by Mordekaiser on 23/02/16.
 */
(function () {
    angular.module('app')
        .factory('payuService', ['$q', '$http', payuService]);

    function payuService($q, $http) {
        return {
            post: postPayUService
        };

        function postPayUService(data) {
            var dfd = $q.defer();

            var fd = new FormData();
            for(var key in data) {
                fd.append(key, data[key]);
            }

            $http({
                method: 'POST',
                url: "https://stg.api.payulatam.com/payments-api/4.0/service.cgi",
                data: fd,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function successCallback(response) {
                console.log(response);
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