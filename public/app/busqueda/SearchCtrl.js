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
        .controller('SearchCtrl', ['mvNotifier', '$scope', 'userService', 'payuService', SearchCtrl]);

    function SearchCtrl(mvNotifier, $scope, userService, payuService) {
        $scope.$on("updateItems", function(event, data) {
            if(Object.keys(data).length) {
                $scope.lawyers = data;
            } else {
                mvNotifier.error('No hay registros con esa área');
            }
        });

        userService.getLawyers({}).then(function (data) {
            if(data) {
                $scope.lawyers = data;
            }
        });

        $scope.scheduleAppointment = function() {
            console.log('Appointment');
            var data = {
                merchantId: "500238",
                accountId: "500547",
                ApiKey: "6u39nqhq8ftd0hlvnjfs66eh8c",
                description: "Test PAYU",
                referenceCode: "TestPayU",
                amount: "3",
                tax: "0",
                taxReturnBase: "0",
                currency: "USD",
                signature: "be2f083cb3391c84fdf5fd6176801278",
                test: "1",
                buyerEmail: "test@test.com"
            };

            payuService.post(data).then(function (success) {
                if(success) {

                }
            })
        }
    }
}());