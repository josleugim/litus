/**
 * Created by Mordekaiser on 22/02/16.
 */
(function () {
    angular.module('app')
        .controller('EditCtrl', function ($scope, userService, mvIdentity, $routeParams, mvNotifier, $timeout, $location) {
            $scope.identity = mvIdentity;
            userService.getUserByID({_id: $routeParams.id}).then(function (data) {
                if(data) {
                    $scope.name = data.name;
                    $scope.lastName = data.lastName;
                    $scope.phone = data.phone;
                    $scope.specialityArea = data.specialityArea;
                    $scope.description = data.description;
                    $scope.keyWords = data.keyWords;
                    $scope.isBusy = data.isBusy;
                    $scope.address = data.address;
                    $scope.languages = data.languages;
                    $scope.experienceYears = data.experienceYears;
                    $scope.schedule = data.schedule;
                }
            });

            $scope.editUser = function () {
                var query = {
                    _id: $routeParams.id
                };

                var data = {};
                // $pristine: True if user has not interacted with the form yet
                if(!$scope.userForm.name.$pristine)
                    data.name = $scope.name;
                if(!$scope.userForm.lastName.$pristine)
                    data.lastName = $scope.lastName;
                if(!$scope.userForm.phone.$pristine)
                    data.phone = $scope.phone;
                if(!$scope.userForm.specialityArea.$pristine)
                    data.specialityArea = $scope.specialityArea;
                if(!$scope.userForm.description.$pristine)
                    data.description = $scope.description;
                if(!$scope.userForm.keyWords.$pristine)
                    data.keyWords = $scope.keyWords;
                if(!$scope.userForm.isBusy.$pristine)
                    data.isBusy = $scope.isBusy;
                if(!$scope.userForm.address.$pristine)
                    data.address = $scope.address;
                if(!$scope.userForm.languages.$pristine)
                    data.languages = $scope.languages;
                if(!$scope.userForm.experienceYears.$pristine)
                    data.experienceYears = $scope.experienceYears;
                if(!$scope.userForm.schedule.$pristine)
                    data.schedule = $scope.schedule;

                userService.put(query, data).then(function (success) {
                    if(success) {
                        mvNotifier.notify('Información actualizada');
                        $timeout($location.path('perfil/'), 1500);
                    } else {
                        mvNotifier.notify('Ocurrio un error al actualizar la información');
                    }
                })
            }
        });
}());