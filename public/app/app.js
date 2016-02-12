/**
 * Created by Mordekaiser on 09/02/2016.
 */
(function () {
    var app = angular.module('app', ['ngResource', 'ngRoute']);

    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $routeProvider
            .when('/', {
                templateUrl: 'partials/home/index',
                controller: 'HomeCtrl',
                resolve: {
                    sections: function () {

                    }
                }
            })
            .when('/nosotros', {
                templateUrl: 'partials/nosotros/index',
                controller: 'NosotrosCtrl'
            })
            .when('/admin-litus', {
                templateUrl: 'partials/admin/index',
                controller: 'AdminCtrl'
            })
            .when('/admin-litus/edit/:id', {
                templateUrl: 'partials/admin/edit',
                controller: 'EditCtrl'
            })
            .otherwise('/')
    }]);
}());