/**
 * Created by Mordekaiser on 09/02/2016.
 */
(function () {
    angular.module('app')
        .controller('HomeCtrl', function ($scope, sectionService) {
            sectionService.getAllSections()
                .then(function (res) {
                    $scope.sections = res.data;
                })
                .catch(errorCallback)
                .finally(getAllSectionsComplete);
        });

    function getSectionsNotification() {

    }

    function errorCallback(errorMsg) {
        console.log(errorMsg);
    }

    function getAllSectionsComplete() {
        console.log('complete');
    }
}());