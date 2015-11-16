kWEB_URL = 'http://localhost:9090/php_api/users/';
kHTTP_ACTION = 'http_action';
kEMP_NAME = 'employee_name';
kMGR_NAME = 'manager_name';
kJOB = 'job';

function getFormData()
{
	return "" + 
		kEMP_NAME + "='" + $('#' + kEMP_NAME).val() + "'&" +
		kMGR_NAME + "='" + $('#' + kMGR_NAME).val() + "'&" +
		kJOB + "='" + $('#' + kJOB).val() + "'";
}

function callWebApi(httpMethod)
{
	var data = (httpMethod === 'GET') ? null : getFormData();

	$.ajax({
		url: kWEB_URL,
		type: httpMethod,
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
		callWebApi("GET");
	});
	// POST
	$("#btnPost").click(function(){
		callWebApi("POST");
	});
	// PUT
	$("#btnPut").click(function(){
		callWebApi("PUT");
	});
	// DELETE
	$("#btnDelete").click(function(){
		callWebApi("DELETE");
	});
});