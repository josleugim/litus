/**
 * Created by Mordekaiser on 11/02/16.
 */
(function () {
    angular.module('app')
        .controller('EditCtrl', function ($scope, sectionService, $routeParams) {

        });

    function errorCallback(errorMsg) {
        console.log(errorMsg);
    }

    function getAllSectionsComplete() {
        console.log('complete');
    }
}());