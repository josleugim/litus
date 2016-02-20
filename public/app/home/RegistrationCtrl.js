/**
 * Created by Mordekaiser on 16/02/16.
 */
(function () {
    angular.module('app')
        .directive('fileConstitutive', ['$parse', function($parse) {
            return {
                restrict: 'A',
                link: function (scope, elm, attrs) {
                    elm.bind('change', function () {
                        $parse(attrs.fileConstitutive).assign(scope, elm[0].files[0]);
                        scope.$apply();
                    })
                }
            }
        }])
        .directive('fileLicense', ['$parse', function($parse) {
            return {
                restrict: 'A',
                link: function (scope, elm, attrs) {
                    elm.bind('change', function () {
                        $parse(attrs.fileLicense).assign(scope, elm[0].files[0]);
                        scope.$apply();
                    })
                }
            }
        }])
        // This directive hides or shows the constitutive Act field
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
        .controller('RegistrationCtrl', function ($scope, $routeParams, userService, mvNotifier, $timeout, $location) {
            $scope.register = function () {
                if($routeParams.type) {
                    var data = {
                        name: $scope.name,
                        lastName: $scope.lastName,
                        email: $scope.email,
                        password: $scope.password,
                        phone: Number($scope.phone),
                        economicActivities: $scope.economicActivities,
                        constitutiveAct: $scope.files,
                        professionalLicense: $scope.professionalLicense,
                        specialityArea: $scope.specialityArea,
                        description: $scope.description,
                        type: $routeParams.type
                    };

                    userService.post(data).then(function (success, error) {
                        if(success) {
                            mvNotifier.notify('Registro exitoso');
                            $timeout($location.path('login/'), 1500);
                        } else {
                            mvNotifier.error('No se pudo realizar el registro, error: ' + error);
                        }
                    })
                } else {
                    mvNotifier.error('Tipo de usuario requerido');
                }
            }
        });
}());