/**
 * Created by Mordekaiser on 09/02/2016.
 */
(function () {
    var app = angular.module('app', ['ngResource', 'ngRoute', 'ngSanitize']);

    app.value('ApiUrl', 'http://localhost:5002/');

    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        var routeRoleChecks = {
            admin: {
                auth: function(authService) {
                    return authService.authUserRoute('admin');
                }
            }
        };

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $routeProvider
            .when('/admin', {
                templateUrl: 'partials/administrator/index',
                controller: 'AdminCtrl',
                resolve: routeRoleChecks.admin
            })
            .when('/admin/details/:slug', {
                templateUrl: '../../partials/administrator/details',
                controller: 'DetailsCtrl',
                resolve: routeRoleChecks.admin
            })
            .when('/admin/edit/:slug', {
                templateUrl: '../../partials/administrator/edit',
                controller: 'EditCtrl',
                resolve: routeRoleChecks.admin
            })
            .when('/registro', {
                templateUrl: 'partials/home/registration',
                controller: 'RegistrationCtrl'
            })
            .when('/nosotros', {
                templateUrl: 'partials/nosotros/index',
                controller: 'NosotrosCtrl'
            })
            .when('/garantia', {
                templateUrl: 'partials/garantia/index',
                controller: 'garantiaCtrl'
            })
            .when('/abogados', {
                templateUrl: 'partials/abogados/index',
                controller: 'abogadosCtrl'
            })
            .when('/referidos', {
                templateUrl: 'partials/referidos/index',
                controller: 'referidosCtrl'
            })
            .when('/ayuda', {
                templateUrl: 'partials/ayuda/index',
                controller: 'ayudaCtrl'
            })
            .when('/unete-a-litus', {
                templateUrl: 'partials/unete/index',
                controller: 'UneteCtrl'
            })
            .when('/terminos-y-condiciones', {
                templateUrl: 'partials/terminos/index',
                controller: 'TerminosCtrl'
            })
            .when('/contacto', {
                templateUrl: 'partials/contacto/index',
                controller: 'ContactoCtrl'
            })
            .when('/login', {
                templateUrl: 'partials/account/login',
                controller: 'loginCtrl'
            })
            .when('/', {
                templateUrl: 'partials/home/index',
                controller: 'HomeCtrl'
            });
    }]);

    angular.module('app').run(function ($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
            if(rejection === 'not authorized') {
                $location.path('/');
            }
        });
    });

    app.run(['$templateCache', function ( $templateCache ) {
        $templateCache.removeAll(); }]);
}());