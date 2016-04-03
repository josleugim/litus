/**
 * Created by Mordekaiser on 03/04/16.
 */
(function () {
    angular.module('app')
        .controller('SectionsCtrl', function ($scope, sectionService, mvIdentity) {
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