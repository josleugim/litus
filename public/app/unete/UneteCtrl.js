/**
 * Created by Mordekaiser on 19/02/16.
 */
(function () {
    angular.module('app')
        .controller('UneteCtrl', ['$scope', 'sectionService', 'joinService', '$timeout', 'mvNotifier', '$location', UneteCtrl]);

        function UneteCtrl($scope, sectionService, joinService, $timeout, mvNotifier, $location) {
            sectionService.getSectionBySlug('unete-a-litus')
                .then(function (res) {
                    $scope.section = res.data;
                });

            $scope.join = function() {
                var data = {
                    name: $scope.name,
                    lastName: $scope.lastName,
                    email: $scope.email,
                    phone: $scope.phone,
                    comments: $scope.comments
                };

                joinService.post(data).then(function(success) {
                    if(success) {
                        mvNotifier.notify('La información se envió correctamente.');
                        $timeout($location.path('/'), 1500);
                    } else {
                        mvNotifier.error('No se pudo enviar la información.');
                    }
                })
            }    
        }
}());