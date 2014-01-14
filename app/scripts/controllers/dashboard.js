'use strict';

angular.module('houdiniApp')
  .controller('DashboardCtrl', function ($scope, $rootScope, $http, $routeParams, $location, $timeout) {
  	//var username = "nicktesla";

  	$scope.showEmbedCode = false;
  	$scope.showTests = true;

  	if($routeParams.testName) {
  		console.log($routeParams.testName)
  		$scope.currTest = $routeParams.testName;
  	}

	loadCurrentUser();
	loadPlans();
	
	$scope.toggleTests = function(){
		$scope.showTests = !$scope.showTests;
	}

	$scope.statusImage = function(status) {
		if(status=="passed") {
			return "passed30.png";
		}
		else {
			return "failed30.jpg";
		}
	}
	$scope.selectPlan = function(planTitle){
		var planData = {
			updateObj: {
				plan: planTitle
			},
			queryObj: {
				username: $scope.currentUser.username
			}
		}
		$http.put("/api/user/plan/"+$scope.currentUser.username, planData).success(function(user){
			console.log("successfully added the plan", user);
		});
	}
	$scope.selectProject = function(projectName) {
		$scope.currProjectName = projectName;
	}

	$scope.addProject = function(projectName) {
		var projectData = { 
			newProject: {
			  projectName: projectName,
			  owner: $scope.currentUser.username,  
			  collaborators: []
			}		
		}		
		$http.post('/api/project', projectData).success(function(project){
			console.log("new project added", project);
			$scope.currProjectName = project.projectName;
			$scope.currProject = project; //These two things are redundant
			loadTests();
		});
	}

	$scope.showSnapshot = function(snapshotLabel) {
		console.log(snapshotLabel);
		if(snapshotLabel == 'before') {
			$scope.beforeVisible = !$scope.beforeVisible;
		}
		else if(snapshotLabel == "after") {
			$scope.afterVisible = !$scope.afterVisible;
		}
		else if(snapshotLabel == "latest") {
			$scope.latestVisible = !$scope.latestVisible;
		}
		else {
			console.log("no valid snapshot label was clicked..the function should never have been called");
		}
		console.log($scope.beforeVisible, $scope.afterVisible);
	}

	$scope.showCode = function() {
		$scope.codeVisible = !$scope.codeVisible;
	}

	$scope.logOut = function() {
		$http.post("/auth/logout").success(function(){
			console.log("successfully logged out the user");
			$location.path("/");
		})
	}

	$scope.goHome = function() {
		$location.path("/");
	}

	function loadProjects() {
		$http.get("/api/project/"+$scope.currentUser.username).success(function(projects){
			$scope.projects = projects;
			if($scope.projects && $scope.projects.length) {
				setDefaultProject();
				loadTests();
			}
		});
	}

	function loadTests() {
		if($scope.currProjectName) {
			$http.get("/api/test/"+$scope.currProjectName).success(function(tests){
			  	
			  	var testsToShow = {
			  		"login": ["login"],
			  		"signup": ["failed-login", "tweet", "signup"],
			  		"tweet": ["login", "tweet"],
			  		"failed-login":["failed-login", "tweet", "signup"]
			  	}
			  	if($scope.currTest == "none") {
			  		$scope.tests = [];
			  		$scope.showEmbedCode = true;
			  	}
				else if($scope.currTest) {
					$scope.tests = _.filter(tests, function(test){
						console.log(test.id, "is in the tests to show for: ", $scope.currTest);
						return testsToShow[$scope.currTest].indexOf(test.id)>-1;
					})
				}
				else {
					$scope.tests = tests;      					
				}
			});
		}		
	}

	function setDefaultProject() {
		if(!$scope.currProjectName && $scope.projects) {
			$scope.currProject = $scope.projects[0];
			$scope.currProjectName = $scope.currProject.projectName;
		}
		else {
			// do something here
		}
	}

	function loadPlans() {
		$http.get("/api/plan").success(function(plans){
			$scope.plans = plans;
		});
	}

	function loadCurrentUser() {
	    $http.get('/auth/currentUser').success(function(user) {
	    	$scope.currentUser = user;
	    	$rootScope.currentUser = user;
  			console.log("current user is: ", $scope.currentUser);
  			loadProjects();
	    })
	}	
            
  });



