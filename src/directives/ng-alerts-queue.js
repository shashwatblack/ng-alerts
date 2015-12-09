angular.module('ngAlerts').directive('ngAlertsQueue', [
    'ngAlertsMngr',
    'ngAlertsEvent',
    '$timeout',
    function (ngAlertsMngr, ngAlertsEvent, $timeout) {
    'use strict';
    
    return {
        templateUrl: 'templates/ng-alerts/queue.html',
        controller: function ($scope) {
            $scope.alerts = [];

            function remove(id) {
                var i;
                for (i = 0; i < $scope.alerts.length; i += 1) {
                    if ($scope.alerts[i].id === id) {
                        $scope.alerts.splice(i, 1);
                        return;
                    }
                }
            }

            $scope.$on(ngAlertsEvent.event('remove'), function (e, id) {
                remove(id);
            });

            $scope.$on(ngAlertsEvent.event('add'), function (e, alert) {
                $scope.alerts.push(alert);
                $timeout(function () {
                    remove(alert.id);
                }, 3000);
            });
        }
    };
}]);