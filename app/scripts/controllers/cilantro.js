'use strict';

angular.module('cilantroApp')
  .controller('CilantroCtrl', function ($scope, $location) {
    
    loadBackground();

    function loadBackground () {
      if($location.path() == "/") {
       $('body').css({'background-color': '#000 '});
        $('body').css({'background-size': 'cover'});        
      }
    }
  });
