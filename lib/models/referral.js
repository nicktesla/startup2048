'use strict';

var mongoose = require('mongoose'),
	supergoose = require('supergoose'),
    Schema = mongoose.Schema;
    
// Schema
var ReferralSchema = new Schema({
  email: String,
},{
	strict: false
});

ReferralSchema.plugin(supergoose);
mongoose.model('Referral', ReferralSchema);