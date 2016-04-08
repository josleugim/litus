/**
 * Created by Mordekaiser on 10/02/16.
 */
(function () {
    angular.module('app')
        .controller('NosotrosCtrl', function ($scope, sectionService, mvIdentity) {
            $scope.identity = mvIdentity;
            sectionService.getSectionBySlug('nosotros')
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