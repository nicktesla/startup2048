/*
 * houdini
 * utility for listening to a sequence of actions done in a browser and emitting an event with a record of the sequence
 * use requirejs to load modules and minify by running: node r.js -o build.js
 */


 define("houdini", ["customevent", "jquery"], function(customevent, $) {
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
 		var self = this;	
 		var terminateAndReset = function() {
 			self.testGenerated();
 			self.currentTest = [];
 		}
 		//HACK: simple criterion: terminate a test if we click on anything except for input fields and textareas
 		if(newEvent.eventType == "click" && newEvent.elemTagName != 'INPUT' && newEvent.elemTagName != "TEXTAREA") {
 			terminateAndReset(); // REFACTOR: probably wait a little while to see if user does something before you terminate
 		}
 		else {
 			//"didn't reset because event is not a click or click  is on input or is textarea: ", newEvent.eventType, newEvent.elemTagName != 'INPUT', newEvent.elemTagName != 'TEXTAREA';
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
 	var houdiniObject = new Houdini();
	return houdiniObject
 });

