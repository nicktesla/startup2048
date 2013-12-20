/*
 * GET home page.
 */

exports.index = function(app){
   return function(req, res){
	   	if(app.get('env') == "production") {
		  console.log("calling index route!", app.get('views'));
		  res.render('index.html');	
	   	}
	   	else {
	   		res.render('index');
	   	}
};
}


exports.partials = function(app) {
  return function(req, res){
  	var name = req.params.name;  	
  	if(app.get('env') == "production") {
	  res.render('partials/' + name + '.html');
  	}
  	else {
  		res.render('partials/'+ name);
  	}
};
}