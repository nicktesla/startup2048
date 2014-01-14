'use strict';

var mongoose = require('mongoose'),
	supergoose = require('supergoose'),
    Schema = mongoose.Schema;
    
// Schema
var UserSchema = new Schema({
  username: String,
  email: String,
  plan: String
},{
	strict: false
});
UserSchema.plugin(supergoose);
mongoose.model('User', UserSchema);