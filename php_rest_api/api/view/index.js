kWEB_URL = 'http://localhost:9090/php_api/users/';
kHTTP_ACTION = 'http_action';
kEMP_NAME = 'employee_name';
kMGR_NAME = 'manager_name';
kJOB = 'job';

function getFormData()
{
	return "" + 
		kEMP_NAME + "=" + $('#' + kEMP_NAME).val() + "&" +
		kMGR_NAME + "=" + $('#' + kMGR_NAME).val() + "&" +
		kJOB + "=" + $('#' + kJOB).val();
}

function emitTextField(value)
{
	return "<input type='text' value='" + value + "'>";
}

function emitButton(value, buttonClickCB)
{
	return "<input type='submit' value='" + value + "' id='" + value + "'>";
}

function emitRow(employee)
{
	return "<tr id='" + employee.id + "'>" +
				"<td>" + emitTextField(employee.name) + "</td>" +
				"<td>" + emitTextField(employee.jobs_id) + "</td>" +
				"<td>" + emitTextField(employee.employees_id) + "</td>" +
				"<td>" + emitButton("Clone", null) + "</td>" +
				"<td>" + emitButton("Save", null) + "</td>" +
			"</tr>"
}

function populateDataTable(result)
{
	employees = JSON.parse(result);
	for (i = 0; i < employees.length; i++) {
		row = emitRow(employees[i]);
		$('#data_table').append(row);
	}
}

function callWebApi(httpMethod, onSuccessCB)
{
	var data = (httpMethod === 'GET') ? null : getFormData();

	$.ajax({
		url: kWEB_URL,
		type: httpMethod,
		data: data,
		success: function(result){
			if (onSuccessCB)
				onSuccessCB(result);
		},
		error: function(xhr, status, error) {
			$("#resultDiv").html(xhr.responseText);
		}
	});
}

$( document ).ready(function() {
	callWebApi('GET', populateDataTable);
});