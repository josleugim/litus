/**
 * Created by Mordekaiser on 23/02/16.
 */
(function () {
    angular.module('app')
        .directive('specialityArea', ['$rootScope', 'userService', function ($rootScope, userService) {
            return {
                restrict: 'A',
                link: function (scope, element) {
                    element.on('change', function () {
                        userService.getLawyers({specialityArea: element[0].value}).then(function (data) {
                            if(data) {
                                $rootScope.$broadcast('updateItems', data);
                            }
                        });

                    })
                }
            }
        }])
        .controller('SearchCtrl', ['mvNotifier', '$scope', 'userService', 'notificationService', 'mvIdentity', SearchCtrl]);

    function SearchCtrl(mvNotifier, $scope, userService, notificationService, mvIdentity) {
        $scope.identity = mvIdentity;
        $scope.emails = [];
        /*$scope.$on("updateItems", function(event, data) {
            if(Object.keys(data).length) {
                $scope.lawyers = data;
            } else {
                mvNotifier.error('No hay registros con esa área');
            }
        });*/

        userService.getLawyers({}).then(function (data) {
            if(data) {
                $scope.lawyers = data;
            }
        });

        $scope.lawyerSelection = function(lawyersModel, email) {
            if(lawyersModel) {
                $scope.emails.push(email);
            } else {
                var index = $scope.emails.indexOf(email);
                $scope.emails.splice(index, 1);
            }
        };

        $scope.payu = function() {
            if($scope.emails.length > 1) {
                mvNotifier.error('Solo puedes seleccionar un abogado');
            } else if($scope.emails.length <= 0) {
                mvNotifier.error('Selecciona al menos un abogado');
            } else {
                // crete the notifications
                console.log(mvIdentity);
                var data = {
                    status: 'Pending',
                    lawyers: $scope.emails
                };

                // Here we redirect to PayU Web Checkout
                // if notification is successful save the notification to the db
                notificationService.post({_id: mvIdentity.currentUser._id}, data).then(function (success) {
                    if(success) {
                        mvNotifier.notify('Notifación exitosa, en breve el abogado se pondrá en contacto por medio del chat');
                    } else {
                        mvNotifier.error('Error al procesar la notificación, intenteló más tarde');
                    }
                })
            }
        }
    }
}());