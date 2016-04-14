/**
 * Created by Mordekaiser on 09/02/2016.
 */
(function () {
    angular.module('app')
        .controller('HomeCtrl', function ($scope, sectionService, mvIdentity, $location) {
            $scope.identity = mvIdentity;
            $scope.hideContent = false;

            $scope.$on('$locationChangeStart', function(event) {
                event.preventDefault;
                if($location.path() !== '/')
                    $scope.hideContent = true;
            });
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