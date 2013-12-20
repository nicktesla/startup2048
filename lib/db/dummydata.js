'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing');

//Clear old things, then add things in
Thing.find({}).remove(function() {
	Thing.create({ 
		name : 'Microsoft',
		logo : '',
		info: "stripe is awesome",
		pay: 5000,
		awesomeness: 1000,
		tag: "data"
	},
	{
		name : 'IBM',
		logo: "",
		info : 'Improve RMSE on Uber wait times with the Uber science team',
		pay: 2000,
		awesomeness: 800,
		tag: "data"
	}, 
	{
		name : 'Twilio',
		logo: "/media/twilio.png",
		info : 'Measure the impact of moustaches on car discovery times',
		pay: 2500,
		awesomeness: 650,
		tag: "data"
	}, 
	{
		name : 'Firebase',
		logo: "",
		info : 'How often do classmates become soulmates?',
		pay: 3500,		
		awesomeness: 1350,
		tag: "data"
	},
	{
		name : 'Dropbox',
		logo : '/media/dropbox.png',
		info: "quora is sweet",
		pay: 4500,				
		awesomeness: 1480,
		tag: "front"
	},
	{
		name : 'Pinterest',
		logo: "/media/pinterest.png",
		info : 'Embedding rich media in tweets',
		pay: 2800,						
		awesomeness: 2050,
		tag: "front"
	},
	{
		name : 'Pandora',
		logo: "",
		info : 'Single page mobile-web app for accepting payments',
		pay: 4800,								
		awesomeness: 1280,
		tag: "front"
	},
	{
		name : 'Ebay',
		logo: "",
		info : 'Building a scalable VPN as a service',
		pay: 1800,						
		awesomeness: 180,
		tag: "distributed"
	},
	{
		name : 'Quantcast',
		logo: "",
		info: 'movies are awesome',
		pay: 3800,								
		awesomeness: 380,
		tag: "distributed"
	},
	 {
		name : 'Github',
		logo: "/media/github.png",
		info : 'Work with Jonny Ives on iOS 8',
		pay: 1000,										
		awesomeness: 100,
		tag: "design"
	}, 
	{
		name : 'Zynga',
		logo: "",
		info : 'Work with Jeff Dean on Android OS internals to improve speech recognition',
		pay: 3000,										
		awesomeness: 100,
		tag: "mobile"
	},
	{
		name : 'ClassDojo',
		logo: "",
		info : 'Improve restaurant recommendations on iOS',
		pay: 2500,										
		awesomeness: 100,
		tag: "mobile"
	},
	{
		name : 'Codecademy',
		logo: "",
		info : 'Improve RMSE on Uber wait times with the Uber science team',
		pay: 2000,
		awesomeness: 800,
		tag: "data"
	}, 
	{
		name : 'Elacarte',
		logo: "",
		info : 'Measure the impact of moustaches on car discovery times',
		pay: 2500,
		awesomeness: 650,
		tag: "data"
	}, 
	{
		name : 'YourMechanic',
		logo: "",
		info : 'How often do classmates become soulmates?',
		pay: 3500,		
		awesomeness: 1350,
		tag: "data"
	},
	{
		name : 'Coursera',
		logo: "",
		info : 'How often do classmates become soulmates?',
		pay: 3500,		
		awesomeness: 1350,
		tag: "data"
	},
	{
		name : 'Appurify',
		logo: "",
		info: "quora is sweet",
		pay: 4500,				
		awesomeness: 1480,
		tag: "front"
	},
	{
		name : 'Evernote',
		logo: "/media/evernote.png",
		info : 'Embedding rich media in tweets',
		pay: 2800,						
		awesomeness: 2050,
		tag: "front"
	},
	{
		name : 'Yahoo',
		logo: "",
		info : 'Building a scalable VPN as a service',
		pay: 1800,						
		awesomeness: 180,
		tag: "distributed"
	},
	{
		name : 'Path',
		logo: "",
		info: 'movies are awesome',
		pay: 3800,								
		awesomeness: 380,
		tag: "distributed"
	},
	 {
		name : 'Instagram',
		logo: "",
		info : 'Work with Jonny Ives on iOS 8',
		pay: 1000,										
		awesomeness: 100,
		tag: "design"
	}, 
	{
		name : 'Tumblr',
		logo: "",
		info : 'Work with Jeff Dean on Android OS internals to improve speech recognition',
		pay: 3000,										
		awesomeness: 100,
		tag: "mobile"
	},
	{
		name : 'Airbnb',
		logo: "/media/airbnb.png",
		info : 'Improve restaurant recommendations on iOS',
		pay: 2500,										
		awesomeness: 100,
		tag: "mobile"
	},
	{
		name : 'Foursquare',
		logo: "/media/foursquare.png",
		info : 'Improve RMSE on Uber wait times with the Uber science team',
		pay: 2000,
		awesomeness: 800,
		tag: "data"
	}, 
	{
		name : 'Mint',
		logo: "",
		info : 'Measure the impact of moustaches on car discovery times',
		pay: 2500,
		awesomeness: 650,
		tag: "data"
	}, 
	{
		name : 'Spotify',
		logo: "/media/spotify.png",
		info : 'How often do classmates become soulmates?',
		pay: 3500,		
		awesomeness: 1350,
		tag: "data"
	},
	{
		name : 'LinkedIn',
		logo: "",
		info: "quora is sweet",
		pay: 4500,				
		awesomeness: 1480,
		tag: "front"
	},
	{
		name : 'Smule',
		logo: "",
		info : 'Embedding rich media in tweets',
		pay: 2800,						
		awesomeness: 2050,
		tag: "front"
	},
	{
		name : 'Adobe',
		logo: "",
		info : 'Single page mobile-web app for accepting payments',
		pay: 4800,								
		awesomeness: 1280,
		tag: "front"
	},
	{
		name : 'Automattic',
		logo: "",
		info : 'Building a scalable VPN as a service',
		pay: 1800,						
		awesomeness: 180,
		tag: "distributed"
	},
	{
		name : 'Soundhound',
		logo: "",
		info: 'movies are awesome',
		pay: 3800,								
		awesomeness: 380,
		tag: "distributed"
	},
	 {
		name : 'Asana',
		logo: "",
		info : 'Work with Jonny Ives on iOS 8',
		pay: 1000,										
		awesomeness: 100,
		tag: "design"
	}, 
	{
		name : 'Uber',
		logo: "/media/uber.png",
		info : 'Improve RMSE on Uber wait times with the Uber science team',
		pay: 2000,
		awesomeness: 800,
		tag: "data"
	}, 
	{
		name : 'Lyft',
		logo: "",
		info : 'Measure the impact of moustaches on car discovery times',
		pay: 2500,
		awesomeness: 650,
		tag: "data"
	}, 
	{
		name : 'Facebook',
		logo: "/media/facebook.gif",
		info : 'How often do classmates become soulmates?',
		pay: 3500,		
		awesomeness: 1350,
		tag: "data"
	},
	{
		name : 'Quora',
		logo: "",
		info: "quora is sweet",
		pay: 4500,				
		awesomeness: 1480,
		tag: "front"
	},
	{
		name : 'Twitter',
		logo: "/media/twitter.png",
		info : 'Embedding rich media in tweets',
		pay: 2800,						
		awesomeness: 2050,
		tag: "front"
	},
	{
		name : 'Square',
		logo: "/media/square.png",
		info : 'Single page mobile-web app for accepting payments',
		pay: 4800,								
		awesomeness: 1280,
		tag: "front"
	},
	{
		name : 'Amazon',
		logo: "",
		info : 'Building a scalable VPN as a service',
		pay: 1800,						
		awesomeness: 180,
		tag: "distributed"
	},
	{
		name : 'Netflix',
		logo: "",
		info: 'movies are awesome',
		pay: 3800,								
		awesomeness: 380,
		tag: "distributed"
	},
	 {
		name : 'Apple',
		logo: "",
		info : 'Work with Jonny Ives on iOS 8',
		pay: 1000,										
		awesomeness: 100,
		tag: "design"
	}, 
	{
		name : 'Google',
		logo: "/media/google.png",
		info : 'Work with Jeff Dean on Android OS internals to improve speech recognition',
		pay: 3000,										
		awesomeness: 100,
		tag: "mobile"
	},
	{
		name : 'Yelp',
		logo: "",
		info : 'Improve restaurant recommendations on iOS',
		pay: 2500,										
		awesomeness: 100,
		tag: "mobile"
	},	 		 	
	function(err) {
			if(err) {
				throw err;
			}
			else {
				console.log('no error, finished populating things');				
			}
		}
	);
});