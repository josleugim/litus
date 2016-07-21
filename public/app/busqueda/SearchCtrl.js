/**
 * Created by Mordekaiser on 23/02/16.
 */
(function () {
    angular.module('app')
        .directive('specialityArea', ['$rootScope', 'userService', function ($rootScope, userService) {
            return {
                restrict: 'A',
                link: function (scope, element) {
                    element.on('change', function () {
                        userService.getLawyers({specialityArea: element[0].value}).then(function (data) {
                            if(data) {
                                $rootScope.$broadcast('updateItems', data);
                            }
                        });

                    })
                }
            }
        }])
        .controller('SearchCtrl', ['$scope', 'userService', 'mvIdentity', 'payUService', 'notificationService', SearchCtrl]);
    
    function SearchCtrl($scope, userService, mvIdentity, payUService, notificationService) {
        $scope.identity = mvIdentity;
        $scope.payuData = {
            apiKey: '4Vj8eK4rloUd272L48hsrarnUA',
            merchantId: '508029',
            accountId: '512324'
        };
        $scope.lawyersModel = "";

        payUService.get().then(function (data) {
            $scope.payuData.referenceCode = data.refCode;
            $scope.payuData.signature = data.signature;
        });

        userService.getLawyers({}).then(function (data) {
            if(data) {
                $scope.lawyers = data;
            }
        });

        $scope.continue = function(email) {
            $('#payuBtn').prop("disabled", false);
            $scope.lawyersModel = email;
        };

        $scope.payu = function () {
            // crete the notifications
            var data = {
                lawyerEmail: $scope.lawyersModel,
                referenceCode: $scope.payuData.referenceCode
            };
            // Here we redirect to PayU Web Checkout
            // if notification is successful save the notification to the db
            notificationService.post({_id: mvIdentity.currentUser._id}, data);
        }
    }
}());