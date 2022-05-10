selectedRaw = null
function onSubmit() {
    var formData = readFromData();
    event.preventDefault();
    if(selectedRaw === null) 
        insertData(formData);
    else 
        updateData(formData);
    

    resetForm();
}

function readFromData() {
    var formData = {};
    formData["id"] = document.getElementById("id").value;
    formData["name"] = document.getElementById("name").value;
    formData["emailAddress"] = document.getElementById("email-address").value;
    formData["password"] = document.getElementById("password").value;
    return formData;
}


function insertData(data) {
    var tableData = document.getElementById("user-list").getElementsByTagName("tbody")[0];
    var newRaw = tableData.insertRow(tableData.lenght);
    var cell1 = newRaw.insertCell(0);
        cell1.innerHTML = data.id;
    var cell2 = newRaw.insertCell(1);
        cell2.innerHTML = data.name;
    var cell3 = newRaw.insertCell(2);
        cell3.innerHTML = data.emailAddress;
    var cell4 = newRaw.insertCell(3);
        cell4.innerHTML = data.password;
    var cell5 = newRaw.insertCell(4);
        cell5.innerHTML = `<a onClick="editData(this)">Edit</a>`
    var cell6 = newRaw.insertCell(5);
        cell6.innerHTML = `<a onClick="onDelete(this)">Delete</a>`

}

function resetForm() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email-address").value = "";
    document.getElementById("password").value = "";
    selectedRaw = null;
}

function editData(td) {
    selectedRaw = td.parentElement.parentElement;
    document.getElementById("id").value = selectedRaw.cells[0].innerHTML;
    document.getElementById("name").value = selectedRaw.cells[1].innerHTML;
    document.getElementById("email-address").value = selectedRaw.cells[2].innerHTML;
    document.getElementById("password").value = selectedRaw.cells[3].innerHTML;
}

function updateData(formData) {
    selectedRaw.cells[0].innerHTML = formData.id;
    selectedRaw.cells[1].innerHTML = formData.name;
    selectedRaw.cells[2].innerHTML = formData.emailAddress;
    selectedRaw.cells[3].innerHTML = formData.password;
}

function onDelete(td) {
    var row = td.parentElement.parentElement;
    document.getElementById("user-list").deleteRow(row.rowIndex);

    resetForm();
}











