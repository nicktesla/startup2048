'use strict';

var mongoose = require('mongoose'),
	supergoose = require('supergoose'),
    Schema = mongoose.Schema;
    
// Schema
var StartupSchema = new Schema({
  email: String,
  name: String
},{
	strict: false
});

StartupSchema.plugin(supergoose);
mongoose.model('Startup', StartupSchema);