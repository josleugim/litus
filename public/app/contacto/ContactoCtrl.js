/**
 * Created by Mordekaiser on 16/02/16.
 */
(function () {
    angular.module('app')
        .controller('ContactoCtrl', ['$scope', 'sectionService', 'contactService', 'mvNotifier', 'vcRecaptchaService', 'mvIdentity', ContactoCtrl]);

    function ContactoCtrl($scope, sectionService, contactService, mvNotifier, vcRecaptchaService, mvIdentity) {
        $scope.identity = mvIdentity;
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
            if(vcRecaptchaService.getResponse() === "") {
                mvNotifier.error('Captcha obligatorio');
            } else {
                var data = {
                    name: $scope.name,
                    email: $scope.email,
                    message: $scope.message,
                    'g-recaptcha-response': vcRecaptchaService.getResponse()
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
    }
}());