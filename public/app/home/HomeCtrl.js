/**
 * Created by Mordekaiser on 09/02/2016.
 */
(function () {
    angular.module('app')
        .controller('HomeCtrl', function ($scope, sectionService, mvIdentity) {
            $scope.identity = mvIdentity;
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