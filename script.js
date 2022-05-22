const url = "http://localhost:3000/details";
const userTable = document.getElementById("users-table");
const form = document.getElementById("form-list");
const submitInput = document.getElementById("add-list");

let idInput = document.getElementById("id");
let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email-address");
let passwordInput = document.getElementById("password");


function mapTr(details) {
    return `<tr data-id=${details.id}>
                <td class="td-id">${details.id}</td>
                <td class="edit-td"><input type="text" style="display: none;" class="editname" />
                <div class="edit-btn">
                        ${details.name}
                    </div>
                    <i onclick="updateDetails(event, ${details.id})" style="display: none;" class="fa-solid fa-pen-to-square"></i>
                    </td>
                </td>
                <td>${details.email}</td>
                <td>${details.password}</td>
                <td onclick="enableInputName(event,'${details.name}', ${details.id})"><a>Edit</a>
                <td><a onclick="deleteRow(event, ${details.id})">Delete</a></td>
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
function toggle(event, name, inVisible) {
    const tr = event.target.parentElement.parentElement;
    const td = tr.querySelector(".edit-td");
    if(inVisible) {
        td.children[0].style.display = "block";
        td.children[2].style.display = "block";
        td.children[0].value = name;

        td.children[1].style.display = "none";
    }
    else {
        td.children[0].style.display = "none";
        td.children[1].style.display = "block";
        td.children[2].style.display = "none";
    }
    
}

//////////////////// PUT ////////////////////////////////////

function enableInputName(event, name, id) {
    toggle(event, name, true);
}
///////////////////// UPDATE  /////////////////////////////////////////

function updateDetails(event, id) {
    const tr = event.target.parentElement.parentElement;
    const td = tr.querySelector(".edit-td");
    let nameUpdateInput = td.children[0].value;
    
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
            td.children[1].innerText = nameUpdateInput;
            toggle(event, false);


            
        }).catch(err => console.log(err));
}

//////////////////////////////    DELETE    //////////////////////////////////
function deleteRow(event, id) {
         fetch(`${url}/${id}`, {
            method: "DELETE",
        })
        .then(res => res.text())
        .then(() => {
        const tr = event.target.parentElement.parentElement;
            if(tr) {
                    tr.remove(); 
                }
        })
        .catch(err => console.log(err))
    }

