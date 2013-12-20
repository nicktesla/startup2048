/* pre init setup to configure per environment */

var getStage;

getStage = function() {
	var stage;
	if(process.env.NODE_ENV) {
	  stage = process.env.NODE_ENV;
	} else {
	  stage = process.env.STAGE || 'local';
	}
	return 'local' //stage;	
}


module.exports = {
	getStage: getStage
};