/**
 * Created by Mordekaiser on 17/05/16.
 */
(function () {
    angular.module('app')
        .directive('fileImage', ['$parse', function($parse) {
            return {
                restrict: 'A',
                link: function (scope, elm, attrs) {
                    elm.bind('change', function () {
                        $parse(attrs.fileImage).assign(scope, elm[0].files[0]);
                        scope.$apply();
                    })
                }
            }
        }])
        .controller('ImageUploaderCtrl', function ($scope, uploaderService, mvNotifier, $timeout, $location) {
            $scope.images = "";
            getImages();

            $scope.delete = function (id) {
                uploaderService.delete({_id: id}).then(function (success) {
                    if(success) {
                        getImages();
                        console.log($scope.images);
                        angular.forEach($scope.images, function (value, key) {
                            $('#imageList').append("<div class='col-md-4'><img src=" + value.name + "></div>"
                                + "<div class='col-md-2'><button class='btn btn-default' ng-click='delete(" + value._id + ")'></button></div><div class='col-md-6'></div>")
                        })

                    }
                })
            };

            $scope.upload = function () {
                var data = {
                    newImage: $scope.files
                };

                uploaderService.post(data).then(function (success) {
                    if(success) {
                        mvNotifier.notify('Imagen subida exitosamente');
                        $timeout($location.path('admin/images/'), 1500);
                    } else {
                        mvNotifier.error('No se pudo subir la imagen');
                    }
                })
            };

            function getImages() {
                uploaderService.get().then(function (data) {
                    $scope.images = data;
                });
            }
        });
}());