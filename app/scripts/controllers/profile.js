'use strict';

angular.module('cilantroApp')
  .controller('ProfileCtrl', function ($scope, $http, $routeParams) {

    loadProfileOwner();

    function loadProfileOwner() {
      var dashedFullName = $routeParams.dashedFullName,
          nameParts = dashedFullName.split("-"),
          firstName = nameParts[0],
          lastName = nameParts[1];      
      $http.get('/api/user/'+firstName+"/"+lastName).success(function(user) {
        console.log("the profile owner is: ", user);
        $scope.profileOwner = user;
      });
    }
  });
