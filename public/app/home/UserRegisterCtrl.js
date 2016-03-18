/**
 * Created by Mordekaiser on 23/02/16.
 */
(function () {
    angular.module('app')
        .controller('UserRegisterCtrl', function ($scope, userService, mvNotifier, $timeout, $location) {
            $scope.register = function () {
                var data = {
                    name: $scope.name,
                    lastName: $scope.lastName,
                    email: $scope.email,
                    password: $scope.password,
                    phone: Number($scope.phone),
                    type: 'cliente',
                    address: $scope.address
                };

                userService.post(data).then(function (success, error) {
                    if(success) {
                        mvNotifier.notify('Registro exitoso');
                        $timeout($location.path('login/'), 1500);
                    } else {
                        mvNotifier.error('No se pudo realizar el registro, error: ' + error);
                    }
                })
            }
        });
}());