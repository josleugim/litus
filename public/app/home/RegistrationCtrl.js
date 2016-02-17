/**
 * Created by Mordekaiser on 16/02/16.
 */
(function () {
    angular.module('app')
        .controller('RegistrationCtrl', function ($scope, $routeParams) {
            console.log($routeParams.type);
            $scope.register = function () {
                console.log('Ready');
            }
        });
}());