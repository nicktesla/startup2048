'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	stage = require('../config/stage'),
	config = require('../config/' + stage.getStage() + '.json'),
	http = require('http'),
  LinkedInStrategy = require('passport-linkedin').Strategy;   

module.exports = function(app, passport) {
	/* linkedIn authentication */
	//set up login constants
	var LINKEDIN_API_KEY = config.linkedin.clientId,
		LINKEDIN_SECRET_KEY = config.linkedin.clientSecret,
		CALLBACK_URL = config.app.url + "/auth/linkedin/callback";

	//set up persistent login sessions with passport
	passport.serializeUser(function(user, done) {
	  done(null, user);
	});

	passport.deserializeUser(function(obj, done) {
	  done(null, obj);
	});

	// use the linkedin strategy

	passport.use(new LinkedInStrategy({
	    consumerKey: LINKEDIN_API_KEY,
	    consumerSecret: LINKEDIN_SECRET_KEY,
	    callbackURL: CALLBACK_URL,
			scope: ['r_fullprofile', 'r_emailaddress', 'r_network', 'r_contactinfo'] 	    
	  },
	  function(token, tokenSecret, profile, done) {
	    // Associate the LinkedIn profile with a user record in app's DB
	    console.log("profile is: ", profile);
			User.findOrCreate({linkedinId: profile.id, displayName: profile.displayName, 'name.givenName': profile.name.givenName, 'name.familyName': profile.name.familyName}, function (err, user) {
				return done(err, user);
	    });
	  }
	));

	/* api routes */

	//linkedin auth routes
	app.get('/auth/linkedin', passport.authenticate('linkedin'), function(req, res){

	});
	app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {failureRedirect: '/' }), function(req, res) {
		var profileRoute = "/"//+req.user.name.givenName+"-"+req.user.name.familyName;
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



