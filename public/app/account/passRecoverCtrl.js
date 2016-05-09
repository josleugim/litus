/**
 * Created by Mordekaiser on 09/05/16.
 */
"use strict";
(function () {
    angular.module('app')
        .controller('PassRecoverCtrl', ['$scope', 'userService', 'mvNotifier', PassRecoverCtrl]);
    
    function PassRecoverCtrl($scope, userService, mvNotifier) {
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