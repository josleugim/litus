/**
 * Created by Mordekaiser on 10/02/16.
 */
(function(){
   angular.module('app')
       .factory('sectionService', ['$q', '$http', '$location', sectionService]);

   function sectionService($q, $http, $location) {
       var host = 'http://' + $location.host() + ':5002/';
       return {
           getAllSections: getAllSections,
          getSectionBySlug: getSectionBySlug,
           editSectionBySlug: editSectionBySlug
       };

       function getAllSections() {
           return $http({
               method: 'GET',
               url: host + 'api/sections',
               headers: {
                   'Content-type':'application/json'
               }
           })
               .success(function (response) {
                   return response.data;
               })
               .error(function (response) {
                   return $q.reject('Error retrieving section(s). HTTP status: ' + response.status);
               })
       }

       function getSectionBySlug(slug) {
           return $http({
               method: 'GET',
               url: host + 'api/sections/' + slug
           })
               .success(function (response) {
                   return response.data;
               })
               .error(function (response) {
                   return $q.reject('Error retrieving section. HTTP status: ' + response.status);
               })
       }

       function editSectionBySlug(query, data) {
           var dfd = $q.defer();

           $http({
               method: 'PUT',
               url: host + 'api/sections/',
               params: {slug: query},
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
}());