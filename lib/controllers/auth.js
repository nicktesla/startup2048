'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	stage = require('../config/stage'),
	config = require('../config/' + stage.getStage() + '.json'),
	http = require('http'),
  	GithubStrategy = require('passport-github').Strategy;   

module.exports = function(app, passport) {
	/* GITHUB authentication */
	//set up login constants
	var GITHUB_CLIENT_ID = config.github.clientId,
		GITHUB_CLIENT_SECRET = config.github.clientSecret,
		CALLBACK_URL = config.app.url + "/auth/github/callback";

	//set up persistent login sessions with passport
	passport.serializeUser(function(user, done) {
	  done(null, user);
	});

	passport.deserializeUser(function(obj, done) {
	  done(null, obj);
	});

	// use the github strategy

	passport.use(new GithubStrategy({
	    clientID: GITHUB_CLIENT_ID,
	    clientSecret: GITHUB_CLIENT_SECRET,
	    callbackURL: CALLBACK_URL,
		scope: ['user:email'] 	    
	  },
	  function(token, tokenSecret, profile, done) {
	    // Associate the Github profile with a user record in app's DB
	    console.log("profile is: ", profile);
		User.findOrCreate({username:profile.username, email:profile.email}, function (err, user) {
			return done(err, user);
	    });
	  }
	));

	/* api routes */

	//github auth routes
	app.get('/auth/github', passport.authenticate('github'), function(req, res){

	});
	app.get('/auth/github/callback', passport.authenticate('github', {failureRedirect: '/' }), function(req, res) {
		var profileRoute = "/dashboard"//+req.user.name.givenName+"-"+req.user.name.familyName;
		req.session.user = req.user;
		res.redirect(profileRoute);
	});

	//current user 
	app.get('/auth/currentUser', function(req, res) {
		var currentUser = req.session.user?req.session.user:{};
		res.json(currentUser);
	});

	// log out
	app.post('/auth/logout', function (req, res, next) {
		req.logout();
		req.session.destroy();
		res.redirect('/');
	});		
}



