'use strict';

angular.module('houdiniApp')
  .controller('MainCtrl', function ($scope, $rootScope, $http, $resource, $window, $cookies, $timeout, $location) {

    $scope.loginSocial = function() {
      $window.open("/auth/github","_self"); // need this to take request out of angular scope and prevent it from getting routed to /      
    };

    //button prompts
    var BEFORE_CLICK = "", 
        BEFORE_CLICK_STARTUP = "I want to share my experiences",
        BEFORE_SIGNUP = "",  
        AFTER_SIGNUP = "Thanks so much for your interest!";
    
    initInfoForm();

    $scope.currentUser = $rootScope.currentUser;
    
    $scope.signedUp = function(mode) {
      var key = modeToKey(mode);
      var isSignedUp = $cookies[key]?true:false
      return isSignedUp;
    }

    $scope.handleForm = function(mode) {
      //if clicked sign up, set a cookie and submit form data
      if($scope.signupText()[mode] == BEFORE_SIGNUP && $scope.email || ($scope.startupEmail && $scope.startupName)) {
        var key = modeToKey(mode);
        $cookies[key] = "true";
        var formData;
        if(mode=="signup") {
          formData = {
            email: $scope.email
          }
        }
        else if(mode=="startup") {
          formData = {
            name: $scope.startupName,
            email: $scope.startupEmail
          }          
        }
        submitForm(formData, mode);
      }
      //toggle form visibility
      $scope.formIsVisible[mode] = !$scope.formIsVisible[mode];

    }

    $scope.signupText = function() {
      var text = {};
      //startup signup
      if($scope.formIsVisible.startup) {
        text.startup = BEFORE_SIGNUP;
      }
      else {
        if(!$cookies['startupHoudini']) {
          text.startup = BEFORE_CLICK_STARTUP;
        }
        else {
          text.startup = AFTER_SIGNUP;
        }
      }
      
      //user signup
      if($scope.formIsVisible.signup) {
        text.signup = BEFORE_SIGNUP;
      }
      else {
        if(!$cookies['signupHoudini']) {
          text.signup = BEFORE_CLICK;
        }
        else {
          text.signup = AFTER_SIGNUP;
        }
      }      
      return text;
    }
    

    
    function initInfoForm () {
      $scope.formIsVisible = {startup:false, signup:true};
    }

    
    function submitForm(formData, mode) {
      $http.post(modeToEndpoint(mode), formData).success(function(val){
        _gaq.push('_trackEvent', 'Signup', 'signed_up', mode);
      });
    }

    //convert a mode to a cookie key
    function modeToKey (mode) {
      return mode + "Houdini";
    }
    //convert mode to api endpoint
    function modeToEndpoint (mode) {
      return mode=="startup"?"/api/startup":"/api/signup";
    }


  }).
  controller('VideoModalCtrl', function($scope, $rootScope, $modalInstance, $http) {
    //HACK FOR MODAL
    $('body').click(function(event) {
      if($(event.target).attr('class')=="modal fade in") {
        console.log("class clicked on is modal fade in!, so closing");
        $modalInstance.close();
      }
    });
    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }).
  controller('VideoCtrl', function ($scope, $rootScope, $modal, $log, $http, $timeout) {
    $scope.open = function() {            
      var modalInstance = $modal.open({
        templateUrl: '/media/videoModal.html',
        controller: 'VideoModalCtrl'
      });

    modalInstance.result.then(function () {
      
      $log.info('closed the modal haha');
    }, function () {
        $log.info('Modal dismissed at: ' + new Date());       
      });

      $rootScope.modalOpen = true;
      $timeout(function(){
        $('.modal').show();
      },100);
    };
  });

