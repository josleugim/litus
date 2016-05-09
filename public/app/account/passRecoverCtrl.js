/**
 * Created by Mordekaiser on 09/05/16.
 */
"use strict";
(function () {
    angular.module('app')
        .controller('PassRecoverCtrl', ['$scope', PassRecoverCtrl]);
    
    function PassRecoverCtrl($scope) {
        $scope.recover = function (email) {
            console.log(email);
        }
    }
}());