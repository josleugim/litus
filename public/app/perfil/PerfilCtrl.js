/**
 * Created by Mordekaiser on 19/02/16.
 */
(function () {
    angular.module('app')
        .controller('PerfilCtrl', ['mvNotifier', '$scope', 'userService', 'mvIdentity', 'notificationService', 'payUService', PerfilCtrl]);

    function PerfilCtrl(mvNotifier, $scope, userService, mvIdentity, notificationService, payUService) {
        $scope.identity = mvIdentity;
        $scope.notifications = [];
        $scope.payuData = {
            apiKey: '4Vj8eK4rloUd272L48hsrarnUA',
            merchantId: '508029',
            accountId: '512324'
        };
        /*payUService.get().then(function (data) {
            $scope.payuData.referenceCode = data.refCode;
            $scope.payuData.signature = data.signature;
        });*/

        // Get the notifications for the current user
        userService.getUserByID({_id: mvIdentity.currentUser._id}).then(function (data) {
            if(data) {
                $scope.user = data;
                // iterate the notifications, only the pending status is passed to the $scope
                angular.forEach(data.notifications, function (notification, key) {
                    if(notification.status == "Pending") {
                        $scope.notifications.push(notification);
                    }
                });
            }
        });

        $scope.acceptAppointment = function (_id, referenceCode) {
            var query = {
                email: mvIdentity.currentUser.email,
                notification_id: _id
            };

            var data = {
                referenceCode: referenceCode
            };
            notificationService.put(query, data);
        }
    }
}());