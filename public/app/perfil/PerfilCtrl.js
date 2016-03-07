/**
 * Created by Mordekaiser on 19/02/16.
 */
(function () {
    angular.module('app')
        .controller('PerfilCtrl', ['mvNotifier', '$scope', 'userService', 'mvIdentity', 'notificationService', PerfilCtrl]);

    function PerfilCtrl(mvNotifier, $scope, userService, mvIdentity, notificationService) {
        $scope.identity = mvIdentity;
        $scope.notifications = [];

        // Get the notifications for the current user
        userService.getUserByID({_id: mvIdentity.currentUser._id}).then(function (data) {
            if(data) {
                $scope.user = data;
                // iterate the notifications, only the pending status is passed to the $scope
                angular.forEach(data.notifications, function (notification, key) {
                    if(notification.status == "Pending") {
                        // Get the client info for each notification
                        userService.getUserByID({_id: notification.client_id}).then(function (client) {
                            notification.client_name = client.name;
                            notification.client_lastName = client.lastName;
                            notification.client_id = client._id;
                            notification.notification_id = notification._id;

                            $scope.notifications.push(notification);
                        })
                    }
                });
            }
        });

        $scope.acceptAppointment = function (client_id, notification_id) {
            var query = {
                client_id: client_id
            };

            var data = {
                lawyer_id: mvIdentity.currentUser._id,
                notification_id: notification_id
            };

            notificationService.put(query, data).then(function (success) {
                if(success) {
                    mvNotifier.notify('Cita aceptada. En el chat podras conversar con tu cliente');
                } else {
                    mvNotifier.error('Error al aceptar la cita.');
                }
            })
        }
    }
}());