kWEB_URL = 'http://localhost:9090/php_api/users/';
kHTTP_ACTION = 'http_action';
kEMP_NAME = 'employee_name';
kMGR_NAME = 'manager_name';
kJOB = 'job';

function getFormData(httpAction)
{
	// TODO: replace hardcoded values with constants
	return {
		'http_action': httpAction,
		'employee_name': $('#' + kEMP_NAME).val(),
		'manager_name': $('#' + kMGR_NAME).val(),
		'job': $('#' + kJOB).val()
	};
}

function callWebApi(isGetMethod, httpAction)
{
	var ajaxCall = (isGetMethod) ? 'GET' : 'POST';
	var data = (isGetMethod) ? null : getFormData(httpAction);
	
	$.ajax({
		url: kWEB_URL,
		type: ajaxCall,
		data: data,
		success: function(result){
			$("#resultDiv").html(result);
		},
		error: function(xhr, status, error) {
			$("#resultDiv").html(xhr.responseText);
		}
	});
}

$( document ).ready(function() {
	// GET
	$("#btnGet").click(function(){
		callWebApi(true, null);
	});
	// POST
	$("#btnPost").click(function(){
		callWebApi(false, "POST");
	});
	// PUT
	$("#btnPut").click(function(){
		callWebApi(false, "PUT");
	});
	// DELETE
	$("#btnDelete").click(function(){
		callWebApi(false, "DELETE");
	});
});