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
        .controller('SearchCtrl', ['mvNotifier', '$scope', 'userService', SearchCtrl]);

    function SearchCtrl(mvNotifier, $scope, userService) {
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

        }
    }
}());