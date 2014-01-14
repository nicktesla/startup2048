'use strict';

angular.module('houdiniApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute', 
  'firebase',
  'ui.bootstrap', 
  'houdiniApp.config'
])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);  

    $routeProvider
      .when('/', {
        templateUrl: '/partials/main',
        controller: 'MainCtrl'
      })
      .when('/dashboard', {
        templateUrl: '/partials/dashboard',
        controller: 'DashboardCtrl'
      })                 
      .otherwise({
        redirectTo: '/'
      });
  });