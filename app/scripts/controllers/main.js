'use strict';

angular.module('cilantroApp')
  .controller('MainCtrl', function ($scope, $rootScope, $http, $resource, $window, $cookies, $timeout, $location) {

    $scope.videoIsVisible = false;
    $scope.showVideo = function(){
      console.log("show video called");
      $scope.videoIsVisible = true;
    }

    $scope.hideVideo = function() {
      if($scope.videoIsVisible) {
        console.log("hide video called!");
        $scope.videoIsVisible = false;
      }
    }
    //button prompts
    var BEFORE_CLICK = "Submit request", 
        BEFORE_CLICK_STARTUP = "I want to share my experiences",
        BEFORE_SIGNUP = "Submit request",  
        AFTER_SIGNUP = "Thanks so much for the interest! We'll be in touch once we find you a match :)";
    
    loadThings();
    initInfoForm();
    
    $scope.signedUp = function(mode) {
      var key = modeToKey(mode);
      var isSignedUp = $cookies[key]?true:false
      return isSignedUp;
    }

    $scope.currCompany = "Stripe";
    
    $scope.onTimeout = function (){
      var currIndex = Math.ceil(Math.random()*$scope.awesomeThings.length-1);
      $scope.currCompany = $scope.awesomeThings[currIndex].name;
      setCompany = $timeout($scope.onTimeout, 1500);
    }

    var setCompany = $timeout($scope.onTimeout, 1500);

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
        if(!$cookies['startupCilantro']) {
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
        if(!$cookies['signupCilantro']) {
          text.signup = BEFORE_CLICK;
        }
        else {
          text.signup = AFTER_SIGNUP;
        }
      }      
      return text;
    }
    
    $scope.withImage = function(company) {
      var ok = true;
      ok &= company.logo != "";
      return ok;
    }

    /** CHAT **/
    $scope.supportedCompanies = [
      {name:"zynga", logo:"/media/zynga.png" },
      {name:"microsoft", logo: "/media/microsoft.png"},
      {name:"ibm", logo: "/media/ibm.png"},
      {name:"intel", logo: "/media/intel.png"}
    ];
    
    $scope.buildChat = function(companyName) {
      //generate an obfuscated probabilistically unique chat url
      var companyHash = {
        microsoft: "3d992988", 
        zynga: "3137aae1",
        ibm: "dc8f3d7d",
        intel: "868f100c"
      }
      var newChatURL = "/room/" + companyHash[companyName] + Date.now().toString();

      //send text to appropriate company employees with link
      var data = {
        companyName: companyName,
        chatURL: newChatURL
      }
      $http.post('/api/notifyEmployees/', data).success(function(){
        //redirect user to the chat link         
        $location.path(newChatURL);
        $rootScope.companyForChat = companyName;
      });
    }

    function initInfoForm () {
      $scope.formIsVisible = {startup:false, signup:true};
    }

    
    function loadThings() {
      $http.get('/api/awesomeThings').success(function(awesomeThings) {
        $scope.awesomeThings = awesomeThings;
      });
    }
    
    function submitForm(formData, mode) {
      $http.post(modeToEndpoint(mode), formData).success(function(val){
        _gaq.push('_trackEvent', 'Signup', 'signed_up', mode);
      });
    }
    
    function employeeChoice () {
      var choice = {};
      choice.previous = $scope.employeePrevious;
      choice.current = $scope.employeeCurrent;
      choice.none = $scope.employeeNone;
      return choice;
    }

    //convert a mode to a cookie key
    function modeToKey (mode) {
      return mode + "Cilantro";
    }
    //convert mode to api endpoint
    function modeToEndpoint (mode) {
      return mode=="startup"?"/api/startup":"/api/signup";
    }

  }).
  controller('BecomeExpertModalCtrl', function($scope, $modalInstance, $http) {


    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }).
  controller('BecomeExpertCtrl', function ($scope, $modal, $log, $http) {
    $scope.open = function() {            
      var modalInstance = $modal.open({
        templateUrl: 'partials/videoModal',
        controller: 'BecomeExpertModalCtrl'
      });

    modalInstance.result.then(function () {
      
      $log.info('Results:',formValues);
    }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  });

