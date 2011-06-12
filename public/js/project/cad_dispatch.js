/*global document _ $ */
var	CAD = {

	initCAD: function () {
		this.initQuickHandler('edtCADQuickEntry');
		this.styleMainMenu();
		this.styleTabs();
		this.controllers = [];
		this.menuHidden = false;
		this.now = now;
		this.now.ready(function(){
			console.log('neow ready');
			console.log(now.caseCount);
			now.identity = "duncan";
			now.consoleTest();
			now.consoleTest2();
			now.consoleTest3();
			
			
			});
	},

	styleMainMenu: function () {
		$("#accordion").accordion({ autoheight: false });
	},
	
	styleTabs: function () {
		this.mainTabSet = $("#tabs").tabs().find(".ui-tabs-nav").sortable({axis: "x"});
	},
	
	snoopKeyPress: function (key) {
			if (key.keyCode == 113) {
			console.log("f2");
			};
	},
	
	toggleMenuBar: function () {
		if (!$('#chkShowMenu').attr('checked')){
			$("#divCadMenu").hide("slide", {direction: "left"},200 );
			$("#divCadDetail").removeClass("grid_8");
			$("#divCadDetail").addClass("grid_10");
			$("#divCadDetail").width("85%");
		}
		else
		{
			$("#divCadMenu").show("slide", {direction: "right"},200 );
			$("#divCadDetail").removeClass("grid_10");
			$("#divCadDetail").addClass("grid_8");
			$("#divCadDetail").width("");
		};
	},
	
	addViewTab: function (tabName) {
		var newTab,
			newTabDivName = _.uniqueId("#tab_");
		newTab = $("#tabs").tabs("add", newTabDivName, tabName);
		$("#tabs").tabs("select", newTabDivName);
		
		return newTabDivName;
	},	
		
	destroyCurrentViewTab: function () {
		var tabIndex = $("#tabs").tabs("option", "selected");
		$("#tabs").tabs('remove', tabIndex);
	},	
		
	registerController: function (controller) {
		controller.CAD = this;
		this.controllers.push(controller);
	},
	
	fillSelectWithCollection: function(element, collection, field) {
	  collection.each( function(member) {
						$(element).
							append($("<option></option>").
							attr("value",member.get("id")).
							text(member.get(field))); 		    
					}); 	
		
	},

	
	
	

};  


$(document).ready(function () {
	CAD.initCAD();
});

