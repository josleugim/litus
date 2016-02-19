/**
 * Created by Mordekaiser on 19/02/16.
 */
(function () {
    angular.module('app')
        .controller('referidosCtrl', function ($scope, sectionService) {
            sectionService.getSectionBySlug('referidos')
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