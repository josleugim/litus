/**
 * Created by Mordekaiser on 18/05/16.
 */
(function(){
    angular.module('app')
        .factory('uploaderService', ['$q', '$http', '$location', uploaderService]);

    function uploaderService($q, $http, $location) {
        var host = 'http://' + $location.host() + ':5002/';
        return {
            post: postImage,
            get: getImages,
            delete: deleteImages
        };

        function postImage(data) {
            var dfd = $q.defer();

            var fd = new FormData();
            for(var key in data) {
                fd.append(key, data[key]);
            }

            $http({
                method: 'POST',
                url: host + 'api/images',
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

        function getImages() {
            var dfd = $q.defer();

            $http({
                method: 'GET',
                url: host + 'api/images',
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

        function deleteImages(query) {
            var dfd = $q.defer();

            $http({
                method: 'DELETE',
                url: host + 'api/images',
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