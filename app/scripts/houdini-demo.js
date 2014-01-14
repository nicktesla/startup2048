/*
 * houdini
 * utility for listening to a sequence of actions done in a browser and emitting an event with a record of the sequence
 * use requirejs to load modules and minify by running: node r.js -o build.js
 */


 require(["customevent", "jquery"], function(require, customevent, jQuery) {
 	function Houdini() {
 		EventTarget.call(this);
 	}
 	Houdini.prototype = new EventTarget();
 	Houdini.prototype.constructor = Houdini;	 	
 	Houdini.prototype.currentTest = []; // needs to keep track of a current list of events
 	Houdini.prototype.captureComplete = false;
 	Houdini.prototype.addEvent = function(newEvent) {
 		// needs to be able to decide whether to add a new event to a current list and keep listening or to emit the current list, empty the current list and start listening again
 		 this.currentTest.push(newEvent); 
 		 this.terminateIfLastEvent(newEvent);
 	}
 	Houdini.prototype.testGenerated = function() {
 		// needs to be able to emit an event
 		this.fire("testGenerated");
 	};
 	//REFACTOR: rename this function to indicate that it fires off the newly generated test...can probably ignore the fact that it "terminated"
 	Houdini.prototype.terminateIfLastEvent = function(newEvent) {
 		//determine whether we should reset the currenttest array and fire off a new test event	
 		//console.log("checking whether to terminate latest event: ", newEvent);
 		var self = this;	
 		var terminateAndReset = function() {
 			self.testGenerated();
 			self.currentTest = [];
 		}
 		//HACK: simple criterion: terminate a test if we click on anything except for input fields and textareas
 		if(newEvent.eventType == "click" && newEvent.elemTagName != 'INPUT' && newEvent.elemTagName != "TEXTAREA") {
 			//console.log("clicked on something that isnt an input or text area, terminating the test and resetting the test list");
 			terminateAndReset(); // REFACTOR: probably wait a little while to see if user does something before you terminate
 		}
 		else {
 			//console.log("didn't reset because event is not a click or click  is on input or is textarea: ", newEvent.eventType, newEvent.elemTagName != 'INPUT', newEvent.elemTagName != 'TEXTAREA');
 		}
 	}
 	Houdini.prototype.startListening = function() {
		var self = this;
 		// needs to bind to a list of pre-specified high level events
		
		//bind to: loaded a page (url), clicked on an element (class,tagname,dom position, or id), entered a value into an input field or textarea (), hit the enter key, scrolled up(yamount), scrolled down(yamount), selected (textValue)
		
		//loop over each event and whenever it happens run a handler function
		//do it manually for now

		//detect clicks
		$(document).click(clickPage);

		//detect form inputs
		$(document).on('mouseout', 'input', addInputVal);

		function elemAttrs(event) {
			//get the id, class, and other attributes of the dom element involved in an event
			var elemAttrs = {};
			elemAttrs['id'] = event.target.id,
			elemAttrs['class'] = $(event.target).attr('class');
			elemAttrs['tagname'] = event.target.nodeName;
			return elemAttrs;
		}

		function addInputVal(event) {
			console.log("mouseout detected on an input field, now grabbing value: ", $(this).val());
			var attrs = elemAttrs(event);
			var inputVal = $(this).val();
			var houdiniEvent = {
				eventType:'inputEntry', 
				elemId: attrs.id, 
				elemClass: attrs.class,
				elemTagName: attrs.tagname,
				elemValue: $(this).val(), 
				timestamp: Date.now()
			};

			if(inputVal.length) {
				self.addEvent(houdiniEvent);				
			}
		}

		function clickPage(event) {
			console.log("click detected!");
			var attrs = elemAttrs(event);
			//REFACTOR: can generalize this by passing in eventtype and a list of extra key-value pairs specific to the event handler. do this in elemAttrs
			var houdiniEvent = {
				eventType: 'click', 
				elemId: attrs.id,
				elemClass: attrs.class,
				elemTagName: attrs.tagname, 
				timestamp: Date.now()
			};
			self.addEvent(houdiniEvent);
		} 		
 	}

 	function appendTestView() {
		var helpURL = "http://sudonow.com/room/stripe", 
			helpAnchor = document.createElement("a"),
			helpDiv = document.createElement("div");


		//configure the help link 
		helpAnchor.href = helpURL;
		helpAnchor._target = "blank";
		helpAnchor.innerHTML = "<img src='http://1.bp.blogspot.com/-tJ12f2YXqdg/TqdNLffj8FI/AAAAAAAADfM/iiLo9LEMdxo/s640/help.jpg' width='100'/>";

		//place the container div at the bottom right
		helpDiv.id="houdini-demo";
		helpDiv.style.float = "right"; 
		helpDiv.style.width="400px";
		helpDiv.style.height="400px";
		helpDiv.style.color="black";
		helpDiv.style['background-color']="white";
		helpDiv.style['position'] = "absolute"; 
		helpDiv.style['top'] = "100px"; 
		helpDiv.style['right'] = "100px"; 
		helpDiv.style['padding'] = "20px"; 		
		helpDiv.style['z-index'] = 1;

		//add link to div
		//helpDiv.appendChild(helpAnchor);

		document.body.appendChild(helpDiv);

 	}
 	function makeTestReadable(currentTest){
 		var english = "";
 		var englishAction = function(step) {
 			var elemId = "";
 			var elemClass="";
			if(step.elemId) {
				elemId = "#" +step.elemId;
			}
			if(step.elemClass) {
				elemClass = "."+step.elemClass;
			}
			var elem = step.elemTagName.toLowerCase() + elemId + elemClass; 			
 			if(step.eventType=="click") {
 				return "click " + elem;
 			}
 			else if(eventType="inputEntry") {
 				return step.elemValue.length <= 140 ? "enter " + step.elemValue.substring(0,140) + " into " + elem : "enter " + step.elemValue.substring(0,140) + " into " + elem;  
 			}
 		}
 		if(currentTest.length) {
 			var currPos = 0;
	 		currentTest.forEach(function(step){
	 			if(currPos==0) {
	 				english += "<p><b>first</b> " + englishAction(step) + "</p>";     
	 			}
	 			else {
	 				english += "<p><b>then</b> " + englishAction(step) + " </p>";
	 			}
	 			currPos++;
	 		});
 		}
 		else {
 			//should give an error
 		}
 		return english;
 	}  		
 	appendTestView();  		
 	var houdini = new Houdini();
 	houdini.startListening();
   // the interface for a user of the module then is
 
 	houdini.addListener("testGenerated", function(data) {
 		$("#houdini-demo").append("<li>HOUDINI: a new test was generated <br/>" + makeTestReadable(houdini.currentTest) + "</li>");
 	});

 });

