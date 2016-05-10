/**
 * Created by Mordekaiser on 09/05/16.
 */
(function () {
    angular.module('app')
        // This directive checks that the passwords match
        .directive('pwCheck', [function () {
            return {
                require: 'ngModel',
                link: function (scope, elem, attrs, ctrl) {
                    var firstPassword = '#' + attrs.pwCheck;
                    elem.add(firstPassword).on('keyup', function () {
                        scope.$apply(function () {
                            var v = elem.val()===$(firstPassword).val();
                            ctrl.$setValidity('pwmatch', v);
                        });
                    });
                }
            }
        }])
        .controller('ChangePassCtrl', ['$scope', 'mvIdentity', 'userService', 'mvNotifier', '$location', ChangePassCtrl]);
    

    function ChangePassCtrl($scope, mvIdentity, userService, mvNotifier, $location) {
        
        $scope.sendPass = function (newPass) {
            var data = {
                password: $scope.password,
                newPass: newPass
            };
            userService.changePassword({_id: mvIdentity.currentUser._id}, data).then(function (success) {
                if(success) {
                    mvNotifier.notify('Contraseña cambiada exitosamente!');
                    $location.path('/perfil');
                } else {
                    mvNotifier.error('No se pudo cambiar la contraseña');
                }
            })
        }
    }
}());