'use strict';

angular.module('houdiniApp')
  .controller('HoudiniCtrl', function ($scope, $location, $rootScope) {
    $rootScope.modalOpen = false;
    console.log("setting modalOpen to: ", false);
  });
