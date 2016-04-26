/**
 * Created by Mordekaiser on 17/02/16.
 */
(function () {
    angular .module('app').factory('mvIdentity', function ($window, mvUser) {
        var currentUser;
        // Get the user bootstrapped in the window
        if(!!$window.bootstrappedUserObject) {
            currentUser = new mvUser();
            angular.extend(currentUser, $window.bootstrappedUserObject);
        }
        return {
            currentUser: currentUser,
            isAuthenticated: function () {
                return !!this.currentUser;
            },
            isAuthorized: function (role) {
                return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
            }
        }
    });
}());