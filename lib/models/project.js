'use strict';

var mongoose = require('mongoose'),
	supergoose = require('supergoose'),
    Schema = mongoose.Schema;
    
// Schema
var ProjectSchema = new Schema({
  projectName: String,
  owner: String,  
  collaborators: Array
},{
	strict: false
});

ProjectSchema.plugin(supergoose);
mongoose.model('Project', ProjectSchema);