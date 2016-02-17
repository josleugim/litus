/**
 * Created by Mordekaiser on 16/02/16.
 */
(function () {
    angular.module('app')
        .directive('economicActivities', function () {
            return {
                restrict: 'A',
                link: function (scope, element) {
                    element.on('change', function () {
                        console.log(element[0].value);
                        if(element[0].value === "fisica") {
                            $('#constitutiveAct').css('display','none');
                        } else {
                            $('#constitutiveAct').css('display','block');
                        }
                    })
                }
            }
        })
        .controller('RegistrationCtrl', function ($scope, $routeParams) {
            console.log($routeParams.type);
            $scope.register = function () {
                console.log('Ready');
            }
        });
}());