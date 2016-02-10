/**
 * Created by Mordekaiser on 09/02/2016.
 */
(function () {
    angular.module('app')
        .controller('HomeCtrl', ['sectionService', '$scope', HomeCtrl]);

    function HomeCtrl(sectionService, $scope) {

        sectionService.getAllSections()
            .then(getSectionsSuccess, null, getSectionsNotification)
            .catch(errorCallback)
            .finally(getAllSectionsComplete);

        function getSectionsSuccess(sections) {
            console.log(sections);
            $scope.sections = sections;
        }

        function getSectionsNotification() {

        }

        function errorCallback(errorMsg) {
            console.log(errorMsg);
        }

        function getAllSectionsComplete() {
            console.log('complete');
        }
    }
}());