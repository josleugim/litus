/**
 * Created by Mordekaiser on 19/02/16.
 */
(function () {
    angular.module('app')
        .controller('PerfilCtrl', function ($scope, sectionService, mvIdentity) {
            $scope.identity = mvIdentity;
        });
}());