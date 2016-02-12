/**
 * Created by Mordekaiser on 09/02/2016.
 */
(function () {
    var app = angular.module('app', ['ngResource', 'ngRoute']);

    app.value('ApiUrl', 'http://localhost:5002/');

    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $routeProvider
            .when('/admin', {
                templateUrl: 'partials/administrator/index',
                controller: 'AdminCtrl'
            })
            .when('/admin/edit/:slug', {
                templateUrl: '../../partials/administrator/edit',
                controller: 'EditCtrl'
            })
            .when('/nosotros', {
                templateUrl: 'partials/nosotros/index',
                controller: 'NosotrosCtrl'
            })
            .when('/', {
                templateUrl: 'partials/home/index',
                controller: 'HomeCtrl'
            });
    }]);
}());