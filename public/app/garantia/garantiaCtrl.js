/**
 * Created by Mordekaiser on 19/02/16.
 */
(function () {
    angular.module('app')
        .controller('garantiaCtrl', function ($scope, sectionService) {
            sectionService.getSectionBySlug('garantia')
                .then(function (res) {
                    $scope.section = res.data;
                })
                .catch(errorCallback)
                .finally(getAllSectionsComplete);
        });

    function errorCallback(errorMsg) {
        console.log(errorMsg);
    }

    function getAllSectionsComplete() {
        console.log('complete');
    }
}());