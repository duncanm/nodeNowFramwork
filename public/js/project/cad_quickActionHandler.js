CAD.quickVerbs = [];


CAD.quickActionHandler = function (event, text){
	if (event.keyCode == 13) {
		this.quickHandlerParseVerb(text);
	}
	
}

CAD.quickHandlerParseVerb = function(text) {
	var words = text.toUpperCase().split(" ");
	if (words.length > 0) {
		for (var i=0; i < this.quickHandlerCollection.length; i++) {
			if (this.quickHandlerCollection[i].verb === words[0]) {
				this.quickHandlerCollection[i].callback(text);
			};
		};
	};
};


CAD.newQuickHandler = function (theverb, thecallback, thesecondaryverbs){
	this.verb = theverb.toUpperCase();
	this.callback = thecallback;
	this.secondaryverbs = thesecondaryverbs.split(" ");;
	return this;
}

CAD.registerQuickHandler = function(handler){
	CAD.quickHandlerCollection.push(handler)
}

CAD.registerQuickHandlers = function() {
}




CAD.initQuickHandler = function (controlid) {
	CAD.quickHandlerCollection = [];
	CAD.registerQuickHandlers();
	var data = "case crew edit add list find close arrive crib message fleet netcall".split(" ");
	$("#" + controlid).autocomplete(data, {multiple: true, multipleSeparator: " "});
};
