'use strict';

var mongoose = require('mongoose'),
	supergoose = require('supergoose'),
    Schema = mongoose.Schema;
    
// Schema
var RequestSchema = new Schema({
  companyName: String,
  urls: Array,
},{
	strict: false
});

RequestSchema.plugin(supergoose);
mongoose.model('Request', RequestSchema);