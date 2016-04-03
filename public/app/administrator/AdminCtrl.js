/**
 * Created by Mordekaiser on 11/02/16.
 */
(function () {
    angular.module('app')
        .controller('AdminCtrl', function ($scope, sectionService, mvIdentity) {
            $scope.identity = mvIdentity;
        });
}());