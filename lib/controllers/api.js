'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing'),
    User = mongoose.model('User'),
    Signup = mongoose.model('Signup'),
    Startup = mongoose.model('Startup'),
    Referral = mongoose.model('Referral'),
    Request = mongoose.model('Request'),
    async = require('async'),
    sendSms = require('./sms');


exports.awesomeThings = function(req, res) {
  return Thing.find(function (err, things) {
    if (!err) {
      return res.json(things);
    } else {
      return res.send(err);
    }
  });
};

exports.user = function(req, res) {
	var name = req.params.firstName + " " + req.params.lastName;
  console.log("querying db with name: ", name);
  return User.findOne({displayName: name}, function (err, user) {
    if (!err) {
      return res.json(user);
    } else {
      return res.send(err);
    }
  });
};

exports.newSignup = function(req, res) {
  var email = req.body.email,
      company = req.body.company;

  console.log("adding new signup to db ", email, company);

  return Signup.findOrCreate({email: email, company: company}, function (err, signup) {
    if (!err) {
      return res.json(signup);
    } else {
      return res.send(err);
    }
  });
};


exports.newStartup = function(req, res) {
  var email = req.body.email,
      name = req.body.name;

  console.log("adding new startup to db ", email, name);

  return Startup.findOrCreate({email: email, name: name}, function (err, startup) {
    if (!err) {
      return res.json(startup);
    } else {
      return res.send(err);
    }
  });
};

exports.newReferral = function(req, res) {
  var email = req.body.email;

  console.log("adding new referral to db ", email);

  return Referral.findOrCreate({email: email}, function (err, referral) {
    if (!err) {
      return res.json(referral);
    } else {
      return res.send(err);
    }
  });
};

exports.notifyEmployees = function(req, res) {
  var companyName = req.body.companyName,
    companyEmployees = {
      microsoft: [{name: "ran", num:"16177840913"}],
      zynga: [{name: "debo", num:"16508478907"}], 
      ibm: [{name:"debo", num:"16508478907"}],
      intel: [{name:"ran", num:"16177840913"}]
    },   
    sentTo = 0;
  console.log("sending out texts");
  var employeesToNotify = companyEmployees[companyName]
  var chatURLs = [];
  employeesToNotify.forEach(function(employee){
    var chatURL = "http://trycilantro.com"+req.body.chatURL+"/company/"+companyName;    
    var message = "Hey " + employee.name + "! A user on Cilantro would like to chat about " + companyName + " :) Please click: " + chatURL;
    sendSms(employee.num, message);
    chatURLs.push(chatURL);
    sentTo++;
  });

  return Request.findOneAndUpdate({companyName:companyName}, {$push: {urls: {$each: chatURLs}}}, {upsert:true}, function (err, request) {
    console.log("inside request update with user: ", request);
    if (!err) {
      return res.json({})
    } else {
      return res.send(err);
    }
  });  
};

exports.getRequests = function(req, res) {
  return Request.find({}, function (err, requests) {
    if (!err) {
      return res.json(requests)
    } else {
      return res.send(err);
    }
  });  
};
