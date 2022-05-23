const url = "http://localhost:3000/details";
const userTable = document.getElementById("users-table");
const form = document.getElementById("form-list");

let idInput = document.getElementById("id");
let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email-address");
let passwordInput = document.getElementById("password");


function mapTr(details) {
    return `<tr data-id=${details.id}>
                <td class="td-id">${details.id}</td>
                <td class="edit-td">
                    <div style="display: none;">
                        <input type="text"/>
                        <i onclick="updateDetails(event, ${details.id})" class="fa-solid fa-floppy-disk"></i>
                    </div>
                    <div>
                        ${details.name}
                    </div>
                    <td class="edit-icon"><i onclick="enableInputName(event,'${details.name}', ${details.id})" class="fa-solid fa-user-pen"></i></td>
                </td>
                <td>${details.email}</td>
                <td>${details.password}</td>
                <td><i onclick="deleteRow(event, ${details.id})" class="fa-solid fa-delete-left"></i></td>
            </tr>`;
    }


fetch(url)
    .then(response => {
        if(response.ok) {
            console.log("Get request successful");
        }else 
            console.log("Get request unsuccessful");
        return response;    
    })
    .then(response => response.json())
    .then(data => {
        const userList = data.map(details => {
            return mapTr(details);
        }).join("");

        userTable.children[1].innerHTML= userList;

    }).catch(err => console.log("Can't Fetch Data..!"));


    /////////////////////////////////////////////////////// POST Request////////////////////////////////////////


form.addEventListener("submit", function(e) {
    e.preventDefault()

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: idInput.value,
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        })
    }).then(response => response.text())
    .then(data => {
        console.log(data)   
        const trElement = mapTr({
            id: idInput.value, 
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        });
    
        let res = `<table>${trElement}</table>`;
        let doc = new DOMParser().parseFromString(res, 'text/html');
    
        userTable.children[1].appendChild(doc.body.firstChild.firstChild.firstChild);
    }).catch(err => console.log(err));

});
//////////////////// Toggle //////////////////////////////////// 
function toggle(tr, name, inVisible) {
    let td = tr.querySelector(".edit-td");    
    if(inVisible) {
        td.children[0].style.display = "block";
        td.children[0].children[0].value = name;
        td.children[1].style.display = "none";
        return;
    }
    
    td.children[1].style.display = "block";  
    td.children[0].style.display = "none"; 
    td.children[1].innerText = name;
 
}

//////////////////// PUT ////////////////////////////////////

function enableInputName(event, name, id) {
    const tr = event.target.parentElement.parentElement;    
    toggle(tr, name, true);
}
///////////////////// UPDATE  /////////////////////////////////////////
function updateDetails(event, id) {
    const tr = event.target.parentElement.parentElement.parentElement;   
    let td = tr.querySelector(".edit-td");
    let nameUpdateInput = td.children[0].children[0].value;
    
    fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: nameUpdateInput,
        }),
        })
        .then(res => res.text())
        .then(data => {
            console.log(data)
            toggle(tr, nameUpdateInput, false);            
        }).catch(err => console.log(err));
}

//////////////////////////////    DELETE    //////////////////////////////////
function deleteRow(event, id)  {
    fetch(`${url}/${id}`, {
        method: "DELETE",
    })
    .then(res => res.text())
    .then(() => {
    const tr = event.target.parentElement.parentElement;
    tr.remove();         
    }).catch(err => console.log(err));
}

