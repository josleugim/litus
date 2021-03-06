/**
 * Created by Mordekaiser on 09/02/2016.
 */
(function () {
    var app = angular.module('app', ['ngResource', 'ngRoute', 'ngSanitize', 'vcRecaptcha']);
    
    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        var routeRoleChecks = {
            admin: {
                auth: function(authService) {
                    return authService.authUserRoute('admin');
                }
            },
            client: {
                auth: function(authService) {
                    return authService.authUserRoute('cliente');
                }
            },
            lawyer: {
                auth: function(authService) {
                    return authService.authUserRoute('abogado');
                }
            },
            user: {
                auth: function (authService) {
                    return authService.authUserRoute('user');
                }
            }
        };

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $routeProvider
            .when('/admin/edit/:slug', {
                templateUrl: '../../partials/administrator/edit',
                controller: 'SectionEditCtrl',
                resolve: routeRoleChecks.admin
            })
            .when('/admin/details/:slug', {
                templateUrl: '../../partials/administrator/details',
                controller: 'DetailsCtrl',
                resolve: routeRoleChecks.admin
            })
            .when('/admin/sections', {
                templateUrl: '../../partials/administrator/sections',
                controller: 'SectionsCtrl',
                resolve: routeRoleChecks.admin
            })
            .when('/admin', {
                templateUrl: 'partials/administrator/index',
                controller: 'AdminCtrl',
                resolve: routeRoleChecks.admin
            })
            .when('/admin/images', {
                templateUrl: 'partials/administrator/images',
                controller: 'ImageUploaderCtrl',
                resolve: routeRoleChecks.admin
            })
            .when('/admin/image-uploader', {
                templateUrl: 'partials/administrator/imageUploader',
                controller: 'ImageUploaderCtrl',
                resolve: routeRoleChecks.admin
            })
            .when('/perfil', {
                templateUrl: 'partials/perfil/index',
                controller: 'PerfilCtrl',
                resolve: routeRoleChecks.user
            })
            .when('/perfil/edit/:id', {
                templateUrl: '../../partials/perfil/edit',
                controller: 'EditCtrl',
                resolve: routeRoleChecks.lawyer
            })
            .when('/perfil/change-password/:id', {
                templateUrl: '../../partials/perfil/changePass',
                controller: 'ChangePassCtrl',
                resolve: routeRoleChecks.user
            })
            .when('/chat/:id', {
                templateUrl: 'partials/chat/index',
                controller: 'ChatCtrl',
                resolve: routeRoleChecks.user
            })
            .when('/chat-list', {
                templateUrl: 'partials/chat/chatList',
                controller: 'ChatListCtrl',
                resolve: routeRoleChecks.user
            })
            .when('/busqueda', {
                templateUrl: 'partials/busqueda/index',
                controller: 'SearchCtrl',
                resolve: routeRoleChecks.client
            })
            .when('/response', {
                templateUrl: 'partials/payu/response',
                resolve: routeRoleChecks.user
            })
            .when('/account/verify', {
                templateUrl: '../../partials/account/verify',
                controller: 'VerifyCtrl'
            })
            .when('/password-recover', {
                templateUrl: 'partials/account/passwordRecover',
                controller: 'PassRecoverCtrl'
            })
            .when('/registro-abogados', {
                templateUrl: 'partials/home/registration',
                controller: 'RegistrationCtrl'
            })
            .when('/registro-usuarios', {
                templateUrl: 'partials/home/userRegister',
                controller: 'UserRegisterCtrl'
            })
            .when('/reminder', {
                templateUrl: 'partials/home/reminder'
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
            })
            .otherwise('/');
    }]);

    angular.module('app').run(function ($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
            if(rejection === 'not authorized') {
                $location.path('/');
            }
        });
    });
}());