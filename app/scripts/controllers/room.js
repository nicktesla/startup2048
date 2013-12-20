'use strict';

angular.module('cilantroApp')
  .controller('RoomCtrl', function ($scope, $rootScope, $http, $routeParams, $location, $timeout,  Firebase, angularFireCollection,  FBURL) {
      
    removeBigVideo();
    initChat();

    $scope.room = $routeParams.roomName;
    var ref = new Firebase(FBURL + "/"+ $scope.room + '/messages').limit(1000);
    $scope.messages = angularFireCollection(ref, function(messages){
      if(!messages.val()) {
        var welcomeMessage = "Welcome to Cilantro. A past/current employee from " + $rootScope.companyForChat + " will be here to chat with you in less than a minute! Please be patient :)";
        $scope.addMessage('Cilantro', welcomeMessage);
      }
      else {
        console.log("the messages are", Object.keys(messages.val()));
      }
    });

    if($routeParams.companyName) {
      $scope.username = $routeParams.companyName + "-employee";
    }
    else {
      $scope.username = 'Guest' + Math.floor(Math.random()*101);
      $scope.classForRole = "chat-user";      
    }

    $scope.classForRole = function(username){
      if(username == $scope.username) {
        return "chat-self";    
      }
      else {
        return "chat-other";
      }
    }

    $scope.goHome = function(){
      $location.path("/");
    }
   
    // add new messages to the list
    $scope.addMessage = function(from, content) {
      if(content) {
          $scope.messages.add({from: from, content: content});
          $scope.message = null;
      }
      scrollToBottom();               
    };


    $scope.inviteFriend = function() {
      var referralData = {
        email: $scope.email
      };
      $http.post('/api/referrals', referralData).success(function(referral){
        console.log("referral successfully sent!", referral);
        $scope.invited = true;
        $scope.email = "";
      });
    }
  
  $http.get('/api/requests').success(function(requests){
    $scope.requests = requests;
  });
  
    // CHAT
    function setChatHeight() {
      console.log('setchatheight being called');
      $('#chat-window').height($(window).height()-$("#chat").outerHeight() - $("#chat-menu").height() - $("#msg-field").height()-80);
    }

  
    function initChat() {
      setChatHeight();
      scrollToBottom();      
    }


    function scrollToBottom() {
      $timeout(function () {
        $("#chat-window").scrollTop(10000);
      }, 50);
    }    

    function removeBigVideo() {
      //THIS IS A HACK: loadVideo should be run at the applevel and should detect whether its on the right page.
      if($location.path() != "/") {
        console.log("not home so remove background!");
        $("#big-video-wrap").hide();
        $('body').css('background', '#fff url() no-repeat');                        
      }
      else {
        console.log("path is: ", $location.path());
      }
    }            
  });



