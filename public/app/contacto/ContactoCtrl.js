/**
 * Created by Mordekaiser on 16/02/16.
 */
(function () {
    angular.module('app')
        .controller('ContactoCtrl', function ($scope, sectionService) {
            sectionService.getSectionBySlug('contacto')
                .then(function (res) {
                    $scope.section = res.data;
                })
                .catch(errorCallback)
                .finally(getAllSectionsComplete);

            $scope.contact = function () {

            }
        });

    function errorCallback(errorMsg) {
        console.log(errorMsg);
    }

    function getAllSectionsComplete() {
        console.log('complete');
    }
}());