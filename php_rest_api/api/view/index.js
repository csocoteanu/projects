kWEB_URL = 'http://localhost:9090/php_api/users/';
kHTTP_ACTION = 'http_action';
kEMP_NAME = 'employee_name';
kMGR_NAME = 'manager_name';
kJOB = 'job';
kNULL = 'null';

ROW_INDEX = 0;
UNASSIGNED_ID = 0;

function employeeToURIParams(employee)
{
	return "id=" + employee.id + "&" +
		   "employee_name=" + employee.name + "&" +
		   "manager_name=" + employee.employees_id + "&" +
		   "job=" + employee.jobs_id;
		   
}

function emitTextField(value)
{
	var displayValue = (value) ? value : kNULL;
	return "<input type='text' value='" + displayValue + "'>";
}

function emitButton(value, employee_id)
{
	return "<input type='submit' value='" + value + "' id='" + value + employee_id + "'>";
}

function emitRow(employee, rowIndex)
{
	return "<tr id='" + employee.id + "'>" +
				"<td>" + rowIndex + "</td>" +
				"<td>" + emitTextField(employee.name) + "</td>" +
				"<td>" + emitTextField(employee.jobs_id) + "</td>" +
				"<td>" + emitTextField(employee.employees_id) + "</td>" +
				"<td>" + emitButton("Clone", employee.id) + "</td>" +
				"<td>" + emitButton("Save", employee.id) + "</td>" +
			"</tr>"
}

function getRow(row_index)
{
	var rows = $('tr', '#data_table');
	
	if (row_index >= rows.length)
		return null;
		
	return rows[row_index];
}

function getEmployeeFromRow(row)
{
	var employee = null;
	
	if (row) {
		employee = { };
		employee.id = row.id;
		employee.name = row.children[1].childNodes[0].value;
		employee.jobs_id = row.children[2].childNodes[0].value;
		employee.employees_id = row.children[3].childNodes[0].value;
	}
	
	return employee;
}

function getCloneButton(employee_id)
{
	return $('#Clone' + employee_id);
}

function getSaveButton(employee_id)
{
	return $('#Save' + employee_id);
}

function registerEvents(row_index)
{	
	var row = getRow(row_index);
	var employee = getEmployeeFromRow(row);
	var clone_btn = getCloneButton(employee.id);
	var save_btn = getSaveButton(employee.id);
	
	clone_btn.click(function() {
		var employee = getEmployeeFromRow(row);
		employee.id = --UNASSIGNED_ID;

		var newRowIndex = ++ROW_INDEX;
		var emittedRow = emitRow(employee, newRowIndex);
		
		$('#data_table').append(emittedRow);
		registerEvents(newRowIndex);
	});
	
	save_btn.click(function() {
		var employee = getEmployeeFromRow(row);
		var method = null;
		
		if (employee.id > 0) {
			method = "PUT";
		} else {
			employee.id = null;
			method = "POST";
		}
		
		callWebApi(method, null, employeeToURIParams(employee));
	});
}

function populateDataTable(result)
{
	var employees = JSON.parse(result);

	for (i = 0; i < employees.length; i++) {
		var row_index = ++ROW_INDEX;
		var row = emitRow(employees[i], row_index);
		$('#data_table').append(row);
		
		registerEvents(row_index);
	}
}

function callWebApi(httpMethod, onSuccessCB, data)
{
	$.ajax({
		url: kWEB_URL,
		type: httpMethod,
		data: data,
		success: function(result){
			if (onSuccessCB)
				onSuccessCB(result);
			else
				$("#resultDiv").html(result);
		},
		error: function(xhr, status, error) {
			$("#resultDiv").html(xhr.responseText);
		}
	});
}

$( document ).ready(function() {
	ROW_INDEX = UNASSIGNED_ID = 0;
	callWebApi('GET', populateDataTable);
});