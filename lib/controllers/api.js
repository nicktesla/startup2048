'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Signup = mongoose.model('Signup'),
    Test = mongoose.model('Test'),
    Plan = mongoose.model('Plan'),
    Referral = mongoose.model('Referral'),
    Project = mongoose.model('Project');


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


exports.createTest = function(req, res) {
  var newTest = req.body.newTest;
  console.log("adding new test to db ", newTest);

  return Test.findOrCreate(newTest, function (err, test) {
    if (!err) {
      return res.json(test);
    } else {
      return res.send(err);
    }
  });
};

exports.appendTest = function(req, res) {

  var newTest = req.body.newTest, 
      owner = req.body.owner,
      apiKey = req.body.apiKey,
      projectName = req.body.projectName;
  console.log("updating tests for test with API KEY owner, project", apiKey, owner, projectName);

  Test.findOneAndUpdate({owner:owner, apiKey:apiKey, projectName:projectName}, {$push: {tests: newTest}}, function (err, test) {
    console.log("inside test update function ", test);
    if (!err) {
      return res.json(test)
    } else {
      return res.send(err);
    }
  });  
};

exports.getProjectTests = function(req, res) {
  var projectName = req.params.projectName,
      //currentUsername = req.session.user.username; 
      currentUsername = "nicktesla"; 
  
  console.log("getting tests for the project ", projectName);

  return Test.findOne({projectName:projectName, owner: currentUsername}, function (err, test) {
    console.log("returning tests for ", projectName, test);
    if (!err) {
      return res.json(test.tests);
    } else {
      return res.send(err);
    }
  });  
};

exports.createProject = function(req, res) {
  var newProject = req.body.newProject;
  console.log("adding new project to db ", newProject);

  return Project.findOrCreate(newProject, function (err, project) {
    if (!err) {
      //if project was successfully created, add a new test
      var newTest = {
        owner: project.owner,
        projectName: project.projectName,
        apiKey: project._id,
        tests: []
      };
      console.log("adding new test to db ", newTest);
      Test.findOrCreate(newTest, function (err, test) {
        if (!err) {
          res.json(project);
        } else {
          res.send(err);
        }
      });      
    } else {
      res.send(err);
    }
  });
};


exports.updateProject = function(req, res) {
  var updateObj = req.body.updateObj, 
      queryObj = req.body.queryObj;
  
  console.log("updating project ", queryObj);

  return Project.findOneAndUpdate(queryObj, updateObj, function (err, project) {
    console.log("inside project update function ", project);
    if (!err) {
      return res.json({})
    } else {
      return res.send(err);
    }
  });  
};

exports.getUserProjects = function(req, res) {
  var owner = req.params.owner?req.params.owner:req.session.user.username; 
  
  console.log("getting projects for the owner ", owner);

  return Project.find({owner:owner}, function (err, projects) {
    console.log("returning projects for ", owner, projects);
    if (!err) {
      return res.json(projects);
    } else {
      return res.send(err);
    }
  });  
};


exports.getPlans = function(req, res) {
  return Plan.find(function (err, plans) {
    if (!err) {
      return res.json(plans);
    } else {
      return res.send(err);
    }
  });
};

exports.updateUserPlan = function(req, res) {
  var updateObj = req.body.updateObj, 
      queryObj = req.body.queryObj;
  
  console.log("updating user ", queryObj);

  return User.findOneAndUpdate(queryObj, updateObj, function (err, user) {
    console.log("inside user update function ", user);
    if (!err) {
      return res.json(user)
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
