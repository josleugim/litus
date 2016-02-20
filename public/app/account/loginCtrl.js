/**
 * Created by Mordekaiser on 17/02/16.
 */
(function () {
    angular.module('app').controller('loginCtrl', function ($scope, mvIdentity, mvNotifier, authService, $location, $route) {
        $scope.identity = mvIdentity;
        $scope.signin = function (email, password) {
            authService.authenticate(email, password).then(function (success) {
                if(success) {
                    mvNotifier.notify('Acceso exitoso');
                    if($scope.identity.currentUser.roles[0] == "abogado") {
                        $location.path('/perfil');
                    } else if($scope.identity.currentUser.roles[0] == "cliente") {
                        $location.path('/perfil');
                    } else {
                        $location.path('/admin');
                    }

                }
                else {
                    mvNotifier.notify('Usuario/Contraseña incorrectos');
                }
            });
        };

        $scope.signout = function () {
            authService.logout().then(function () {
                $scope.username = "";
                $scope.password = "";
                mvNotifier.notify("Sesión finalizada");
                $location.path('/');
            });
        }
    });
}());