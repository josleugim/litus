/**
 * Created by Mordekaiser on 13/03/16.
 */
(function () {
    angular.module('app')
        .controller('VerifyCtrl', ['$scope', '$routeParams', 'mvNotifier', VerifyCtrl]);

    function VerifyCtrl($scope, $routeParams, mvNotifier) {
        $scope.status = "Cuenta verificada exitosamente, inicie sesión para continuar.";
        if($routeParams.res == "false") {
            $scope.status = "No se pudo verificar la cuenta.";
            mvNotifier.error('Error al verificar la cuenta');
        }
    }
}());