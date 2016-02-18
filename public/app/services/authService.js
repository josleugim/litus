/**
 * Created by Mordekaiser on 17/02/16.
 */
(function () {
    angular.module('app')
        .factory('authService', ['$q', '$http', 'mvIdentity', 'mvUser', authService]);

    function authService($q, $http, mvIdentity, mvUser) {
        return {
            authenticate: authenticateUser,
            logout: logoutUser,
            authUserRoute: authorizeCurrentUserForRoute
        };

        function  authenticateUser(email, password) {
            var dfd = $q.defer();
            $http.post('/login', {email: email, password:password}).then(function (response) {
                if(response.data.success) {
                    var user = new mvUser();
                    angular.extend(user, response.data.user);
                    mvIdentity.currentUser = user;
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        }

        function logoutUser() {
            var dfd = $q.defer();
            $http.post('/logout', {logout:true}).then(function () {
                mvIdentity.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        }

        function authorizeCurrentUserForRoute(role) {
            if(mvIdentity.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        }
    }
}());