'use strict';

var mongoose = require('mongoose'),
	supergoose = require('supergoose'),
    Schema = mongoose.Schema;
    
// Schema
var UserSchema = new Schema({
  displayName: String,
  name: Object,
},{
	strict: false
});
UserSchema.plugin(supergoose);
mongoose.model('User', UserSchema);