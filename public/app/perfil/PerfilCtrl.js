/**
 * Created by Mordekaiser on 19/02/16.
 */
(function () {
    angular.module('app')
        .controller('PerfilCtrl', function ($scope, userService, mvIdentity) {
            $scope.identity = mvIdentity;
            userService.getUserByID({_id: $scope.identity.currentUser._id}).then(function (data) {
                if(data) {
                    $scope.user = data;
                }
            })
        });
}());