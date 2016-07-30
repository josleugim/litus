"use strict";
angular.module('app')
	.factory('joinService', ['$q', '$http', '$location', joinService]);

	function joinService($q, $http, $location) {
		var host = 'http://' + $location.host() + ':5002/';

		return {
			post: post
		};

		function post(data) {
			var dfd = $q.defer();

           $http({
               method: 'POST',
               url: host + 'api/join/',
               data: data,
               headers: {
                   'Content-Type': 'application/json'
               }
           }).then(function successCallback(response) {
               if(response.data.success) {
                   dfd.resolve(true);
               }
           }, function errorCallback(response) {
               dfd.resolve(false);
           });

           return dfd.promise;
		}
	}