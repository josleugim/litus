/**
 * Created by Mordekaiser on 09/05/16.
 */
(function () {
    angular.module('app')
        .controller('PassRecoverCtrl', ['$scope', 'userService', 'mvNotifier', '$location', '$routeParams', PassRecoverCtrl]);
    
    function PassRecoverCtrl($scope, userService, mvNotifier, $location, $routeParams) {
        $scope.status = "";
        if($routeParams.res == "false") {
            $scope.status = "No se pudo cambiar la contraseña, inténtelo más tarde";
            mvNotifier.error('Error al cambiar la contraseña');
        } else if($routeParams.res == "true") {
            $scope.status = "Contraseña cambiada exitosamente, revise su correo electrónico e inicie sesión para continuar.";
        }
        $scope.recover = function (email) {
            userService.recoverPassNotification({email: email}).then(function (success) {
                if(success) {
                    mvNotifier.notify('Pronto recibirá un email para el siguiente paso.');
                    $location.path('/');
                } else {
                    mvNotifier.error('El correo que ingreso no existe en nuestra plataforma');
                }
            })
        }
    }
}());