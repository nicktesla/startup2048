'use strict';

var mongoose = require('mongoose'),
    Test = mongoose.model('Test'),
    Plan = mongoose.model('Plan');

//Clear old tests, then add tests in
Test.find({}).remove(function() {
	Test.create({ 
		owner : 'nicktesla',
		projectName : 'Twitter',
		apiKey: "52d1da7371fcd8680735867b",
		tests: [
			{
				id: "login",
				status: "passed",
				title: "User Login",
				steps:["enter username levandreessen", "enter password aabbccdd", "click the submit button"], 
				snapshots:{before:"https://dl.dropboxusercontent.com/u/106722666/twitter-login-page.png", after:"https://dl.dropboxusercontent.com/u/106722666/twitter-logged-in-page.png", latestDiff:"https://dl.dropboxusercontent.com/u/106722666/twitter-logged-in-page.png"}
			},
			{
				id: "failed-login",
				status: "failed",
				title: "User Login",
				steps:["enter username levandreessen", "enter password aabbccdd", "click the submit button"], 
				snapshots:{before:"https://dl.dropboxusercontent.com/u/106722666/twitter-login-page.png", after:"https://dl.dropboxusercontent.com/u/106722666/twitter-logged-in-page.png", latestDiff:"https://dl.dropboxusercontent.com/u/106722666/twitter-login-page.png"}
			},
			{
				id: "tweet",
				status: "passed",
				title: "Post Content",
				steps:["enter hello world anything is possible into textarea", "click the submit button"], 
				snapshots:{before:"https://dl.dropboxusercontent.com/u/106722666/twitter-login-page.png", after:"https://dl.dropboxusercontent.com/u/106722666/twitter-logged-in-page.png", latestDiff:"https://dl.dropboxusercontent.com/u/106722666/twitter-logged-in-page.png"}
			},			 
			{	
				id: "signup",
				status: "passed",
				title: "User Signup",
				steps:["enter fullname Nick Tesla", "enter email nickteslacodes@gmail.com", "enter password aabbcc", "click the signup button"], 
				snapshots:{before:"", after:"", latestDiff:""}
			} 						
		]
	},	 		 	
	function(err) {
			if(err) {
				throw err;
			}
			else {
				console.log('no error, finished populating tests');				
			}
		}
	);
});


//Clear old plans, then add plans in
Plan.find({}).remove(function() {
	Plan.create({ 
		title : 'Hacker',
		monthlyPrice: "19.99",
		numProjects : "1 app",
		numAccounts: "1 collaborator",
		numChecks: 50,
		numNotifications: 50,
		supportType: "online",
		supportSLA: "none",
		testLimit: "unlimited",
		mobileWeb: true,
		crossBrowser: true
	},	
	{ 
		title : 'Pro',
		monthlyPrice: "59.99",		
		numProjects : "2 apps",
		numAccounts: "5 collaborators",
		numChecks: 300,
		numNotifications: 1500,
		supportType: "email",
		supportSLA: "none",
		testLimit: "unlimited",
		mobileWeb: true,
		crossBrowser: true
	},
	{ 
		title : 'Team',
		monthlyPrice: "299.99",		
		numProjects : "5 apps",
		numAccounts: "25 collaborators",
		numChecks: 1000,
		numNotifications: 5000,
		supportType: "phone",
		supportSLA: "none",
		testLimit: "unlimited",
		mobileWeb: true,
		crossBrowser: true
	},				 		 	
	function(err) {
			if(err) {
				throw err;
			}
			else {
				console.log('no error, finished populating plans');				
			}
		}
	);
});
