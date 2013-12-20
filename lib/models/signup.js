'use strict';

var mongoose = require('mongoose'),
	supergoose = require('supergoose'),
    Schema = mongoose.Schema;
    
// Schema
var SignupSchema = new Schema({
  email: String,
  company: String
},{
	strict: false
});

SignupSchema.plugin(supergoose);
mongoose.model('Signup', SignupSchema);