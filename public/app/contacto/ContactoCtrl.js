/**
 * Created by Mordekaiser on 16/02/16.
 */
(function () {
    angular.module('app')
        .controller('ContactoCtrl', ['$scope', 'sectionService', 'contactService', 'mvNotifier', ContactoCtrl]);

    function ContactoCtrl($scope, sectionService, contactService, mvNotifier) {
        sectionService.getSectionBySlug('contacto').then(function (data) {
            if(data) {
                $scope.section = data;
            }
        })
            .catch(errorCallback)
            .finally(getSectionComplete);

        function getSectionComplete() {
            console.log('Contact service completed');
        }

        function errorCallback() {
            console.log('Error at contact service');
        }

        $scope.sendMessage = function() {
            var data = {
                name: $scope.name,
                email: $scope.email,
                message: $scope.message
            };

            contactService.post(data).then(function (success) {
                if(success) {
                    mvNotifier.notify('Mensaje enviado, pronto nos pondremos en contacto.');
                    $scope.name = "";
                    $scope.email = "";
                    $scope.message = "";
                } else {
                    mvNotifier.error('No se puedo enviar el mensaje, inténtalo más tarde');
                }
            })
        }
    }
}());