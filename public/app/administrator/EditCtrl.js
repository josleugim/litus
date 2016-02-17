/**
 * Created by Mordekaiser on 11/02/16.
 */
(function () {
    angular.module('app')
        .controller('EditCtrl', function ($scope, sectionService, $routeParams, mvNotifier, $timeout, $location) {
            var ck = CKEDITOR.instances.content;
            ck.on('instanceReady',function() {
                sectionService.getSectionBySlug($routeParams.slug)
                    .then(function (response) {
                        $scope.title = response.data.title;
                        ck.setData(response.data.content);
                        $scope.content = response.data.content;
                    })
                    .catch(errorCallback)
                    .finally(getAllSectionsComplete);
            });

            $scope.editSection = function () {
                var data = {};
                if(CKEDITOR.instances.content.getData())
                    data.content = CKEDITOR.instances.content.getData();

                sectionService.editSectionBySlug($routeParams.slug, data).then(function (success) {
                    if(success) {
                        mvNotifier.notify('Sección actualizada');
                        $timeout($location.path('admin/'), 1500);
                    } else {
                        mvNotifier.notify('Ocurrio un error al actualizar la sección');
                    }
                })
            }
        });

    function errorCallback(errorMsg) {
        console.log(errorMsg);
    }

    function getAllSectionsComplete() {
        console.log('Section service completed');
    }

}());