/**
 * Created by Mordekaiser on 09/02/2016.
 */
(function () {
    var app = angular.module('app', ['ngResource', 'ngRoute', 'ngSanitize']);

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
            .when('/admin/details/:slug', {
                templateUrl: '../../partials/administrator/details',
                controller: 'DetailsCtrl'
            })
            .when('/admin/edit/:slug', {
                templateUrl: '../../partials/administrator/edit',
                controller: 'EditCtrl'
            })
            .when('/registro', {
                templateUrl: 'partials/home/registration',
                controller: 'RegistrationCtrl'
            })
            .when('/nosotros', {
                templateUrl: 'partials/nosotros/index',
                controller: 'NosotrosCtrl'
            })
            .when('/contacto', {
                templateUrl: 'partials/contacto/index',
                controller: 'ContactoCtrl'
            })
            .when('/', {
                templateUrl: 'partials/home/index',
                controller: 'HomeCtrl'
            });
    }]);
}());