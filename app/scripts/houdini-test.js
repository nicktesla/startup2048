require(["houdini"], function(Houdini) {
 	// the interface for a user of the module then is
 	console.log("grabbed houdini which is set to: ", Houdini);
 	Houdini.startListening();  		 	
 	Houdini.addListener("testGenerated", function() {
 		console.log("HOUDINI: a new test was generated, the current test is: ", Houdini.currentTest);
 	});
 	
 });

