'use strict';

var mongoose = require('mongoose'),
	supergoose = require('supergoose'),
    Schema = mongoose.Schema;
    
// Schema
var TestSchema = new Schema({
  owner: String,
  projectName: String,
  apiKey: String,
  tests: Array
},{
	strict: false
});

TestSchema.plugin(supergoose);
mongoose.model('Test', TestSchema);