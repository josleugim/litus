/**
 * Created by Mordekaiser on 11/02/16.
 */
(function () {
    angular.module('app')
        .controller('AdminCtrl', function ($scope, sectionService) {
            sectionService.getAllSections()
                .then(function (res) {
                    $scope.sections = res.data;
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