/**
 * Created by Mordekaiser on 19/02/16.
 */
(function () {
    angular.module('app')
        .controller('abogadosCtrl', function ($scope, sectionService) {
            sectionService.getSectionBySlug('abogados')
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