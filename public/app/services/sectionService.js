/**
 * Created by Mordekaiser on 10/02/16.
 */
(function(){
   angular.module('app')
       .factory('sectionService', ['$q', '$http', sectionService]);

   function sectionService($q, $http) {
      return {
         getAllSections: getAllSections
         //getSectionByID: getSectionByID
      };

      function getAllSections() {
         return $http({
            method: 'GET',
            url: 'api/sections'
         })
             .then(sendResponseData)
             .then(sendGetSectionsError);
      }

      function sendResponseData(response) {
         return response.data;
      }

      function sendGetSectionsError(response) {
         return $q.reject('Error retrieving section(s). HTTP status: ' + response.status);
      }
   }
}());