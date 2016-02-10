/**
 * Created by Mordekaiser on 09/02/2016.
 */
angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $routeProvider
        .when('/', {templateUrl: 'partials/home/index', controller: 'mvHomeCtrl'})
});