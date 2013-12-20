'use strict';

angular.module('cilantroApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute', 
  'firebase',
  'ui.bootstrap', 
  'cilantroApp.config'
])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);  

    $routeProvider
      .when('/', {
        templateUrl: '/partials/main',
        controller: 'MainCtrl'
      })
      .when('/room/:roomName/company/:companyName', {
        templateUrl: '/partials/room',
        controller: 'RoomCtrl'
      })
      .when('/dashboard', {
        templateUrl: '/partials/dashboard',
        controller: 'RoomCtrl'
      })      
      .when('/room/:roomName', {
        templateUrl: '/partials/room',
        controller: 'RoomCtrl'
      })
      .when('/:dashedFullName', {
        templateUrl: '/partials/profile',
        controller: 'ProfileCtrl'
      })            
      .otherwise({
        redirectTo: '/'
      });
  });