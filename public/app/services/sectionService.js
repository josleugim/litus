/**
 * Created by Mordekaiser on 10/02/16.
 */
(function(){
   angular.module('app')
       .factory('sectionService', ['$q', '$http', sectionService]);

   function sectionService($q, $http) {
       return {
           getAllSections: getAllSections,
           getSectionByID: getSectionByID
       };

       function getAllSections() {
           return $http({
               method: 'GET',
               url: 'api/sections',
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

       function getSectionByID(sectionID) {
           return $http({
               method: 'GET',
               url: 'api/sections/' + sectionID
           })
               .success(function (response) {
                   return response.data;
               })
               .error(function (response) {
                   return $q.reject('Error retrieving section. HTTP status: ' + response.status);
               })
       }
   }
}());