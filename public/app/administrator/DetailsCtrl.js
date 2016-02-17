/**
 * Created by Mordekaiser on 16/02/16.
 */
(function () {
    angular.module('app')
        .controller('DetailsCtrl', function ($scope, sectionService, $routeParams) {
            sectionService.getSectionBySlug($routeParams.slug)
                .then(function (response) {
                    $scope.section = response.data;
                })
                .catch(errorCallback)
                .finally(getAllSectionsComplete);
        });

    function errorCallback(errorMsg) {
        console.log(errorMsg);
    }

    function getAllSectionsComplete() {
        console.log('Section service completed');
    }
}());