CAD.onSaveCase = function () {
var options = { 
    success:    CAD.caseShowResponse,
    type:		'post',
    dataType:	'json',
    url:		'/cases/save',
    };
  $('#frmCase').ajaxSubmit(options); 	
};

CAD.caseShowResponse = function (responseText, statusText, xhr, $form)  { 
var data;
 if ( CAD.caseValidator.form() ) {
	data = eval(responseText);
	if ( data.outcome === 'success' ) {
			CAD.snapshotFormContent();
			$('#popupdialog').dialog({ title: 'Case Saved', show: 'slide', minWidth: 250, minHeight: 250, buttons: { "OK": function() { $(this).dialog("close"); } } } );
		}
	}
	else
	{
		$('#popupdialog').dialog({ title: 'Case Error', show: 'slide', minWidth: 250, minHeight: 250, buttons: { "OK": function() { $(this).dialog("close"); } } } );
	}
	
}


CAD.caseValidateForm = function() {
console.log('setup validation');
  CAD.caseValidator = $("#frmCase").validate({
		rules: {
			address1: {
				required: true,
			},
			address1: {
			required: true,
			minlength: 2
			},

		},
		messages: {
			address1: "Enter Address",
		},
		}
);
}
