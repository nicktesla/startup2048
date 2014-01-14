'use strict';

// Module dependencies.
var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    engines = require('consolidate'),
    routes = require('./lib/routes'),
    passport = require('passport'),
    MongoStore = require('connect-mongo')(express),
    stage = require('./lib/config/stage');        

var app = express();

// Connect to database
var db = require('./lib/db/mongo');


// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

// Populate empty DB with dummy data
require('./lib/db/dummydata');

// Controllers
var api = require('./lib/controllers/api'),
    auth = require('./lib/controllers/auth');

// Express Configuration
app.configure(function(){
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());  
  app.use(express.session({
    secret: 'aaaaaa',
    maxAge: 3600000,
    store: new MongoStore({ 
      url: stage.getMongoUri()
    })    
  }));  
  app.use(passport.initialize());
  app.use(passport.session());  
  app.use(app.router);
});

app.configure('development', function(){
  app.set('views', __dirname + '/app/views');
  app.set('view engine', 'jade');  
  app.use(express.static(path.join(__dirname, '.tmp')));
  app.use(express.static(path.join(__dirname, 'app')));
  app.use(express.errorHandler());
});

app.configure('production', function(){
  app.set('views', path.join(__dirname, 'public/views'));
  app.engine('html', engines.ejs);   
  app.use(express.favicon(path.join(__dirname, 'public/favicon.ico')));
  app.use(express.static(path.join(__dirname, 'public')));
});

// Routes
app.get('/', routes.index(app));
app.get('/partials/:name', routes.partials(app));
app.get('/api/user/:firstName/:lastName', api.user);
app.put('/api/user/plan/:username', api.updateUserPlan);
app.post('/api/signup', api.newSignup);
app.post('/api/project', api.createProject);
app.put('/api/project', api.updateProject);
app.get('/api/project/:owner', api.getUserProjects);
app.post('/api/test', api.createTest);
app.put('/api/test', api.appendTest);
app.get('/api/test/:projectName', api.getProjectTests);
app.get('/api/plan', api.getPlans);


auth(app, passport);

//redirect all others to the index (HTML5 history)
app.get('/dashboard', routes.index(app));



// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});