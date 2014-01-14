'use strict';

var mongoose = require('mongoose'),
	supergoose = require('supergoose'),
    Schema = mongoose.Schema;
    
// Schema
var PlanSchema = new Schema({
  title: String,
  monthlyPrice: String,
  numProjects: String,
  numAccounts: String,
  numChecks: Number,
  numNotifications: Number, 
  supportType: String,
  supportSLA: String,  
  testLimit: String,
  mobileWeb: Boolean,
  crossBrowser: Boolean
},{
	strict: false
});
PlanSchema.plugin(supergoose);
mongoose.model('Plan', PlanSchema);