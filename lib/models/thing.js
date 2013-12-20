'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
// Schema
var ThingSchema = new Schema({
  name: String,
  logo: String,
  info: String,
  pay: Number,
  awesomeness: Number,
  tag: String
});

// Validations
ThingSchema.path('awesomeness').validate(function (num) {
  return num >= 1 && num <= 10000;
}, 'Awesomeness must be between 1 and 10');

mongoose.model('Thing', ThingSchema);
