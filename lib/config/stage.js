/* pre init setup to configure per environment */

var getStage;

getStage = function() {
	var stage;
	if(process.env.NODE_ENV) {
	  stage = process.env.NODE_ENV;
	} else {
	  stage = process.env.STAGE || 'local';
	}
	console.log("setting stage to :", stage);
	return stage;	
}

getMongoUri = function() {
	var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/houdini';
	return uristring;	
}


module.exports = {
	getStage: getStage,
	getMongoUri: getMongoUri
};