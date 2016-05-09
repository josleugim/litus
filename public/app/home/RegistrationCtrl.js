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
        .directive('fileCv', ['$parse', function($parse) {
            return {
                restrict: 'A',
                link: function (scope, elm, attrs) {
                    elm.bind('change', function () {
                        $parse(attrs.fileCv).assign(scope, elm[0].files[0]);
                        scope.$apply();
                    })
                }
            }
        }])
        .directive('fileProfile', ['$parse', function($parse) {
            return {
                restrict: 'A',
                link: function (scope, elm, attrs) {
                    elm.bind('change', function () {
                        $parse(attrs.fileProfile).assign(scope, elm[0].files[0]);
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
        .controller('RegistrationCtrl', function ($scope, userService, mvNotifier, $timeout, $location) {
            $scope.register = function () {
                var data = {
                    name: $scope.name,
                    lastName: $scope.lastName,
                    email: $scope.email,
                    password: $scope.password,
                    phone: Number($scope.phone),
                    economicActivities: $scope.economicActivities,
                    constitutiveAct: $scope.files,
                    professionalLicense: $scope.professionalLicense,
                    curriculum: $scope.curriculum,
                    profilePicture: $scope.profilePicture,
                    specialityArea: $scope.specialityArea,
                    languages: $scope.languages,
                    address: $scope.address,
                    experienceYears: Number($scope.experienceYears),
                    schedule: $scope.schedule,
                    description: $scope.description,
                    keyWords: $scope.keyWords,
                    casePerMonth: $scope.casePerMonth,
                    references: $scope.references,
                    type: 'abogado'
                };

                userService.post(data).then(function (success) {
                    if(success) {
                        mvNotifier.notify('Registro exitoso, recibiras un correo para confirmar tu email');
                        $timeout($location.path('reminder/'), 1500);
                    } else {
                        mvNotifier.error('No se pudo realizar el registro.');
                    }
                })
            }
        });
}());