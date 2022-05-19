const url = "http://localhost:3000/details";
const userTable = document.getElementById("users-table");
const form = document.getElementById("form-list");
const submitInput = document.getElementById("add-list");
const updateInput = document.getElementById("update-list");

let idInput = document.getElementById("id");
let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email-address");
let passwordInput = document.getElementById("password");


function mapTr(details) {
    return `<tr data-id=${details.id}>
                <td>${details.id}</td>
                <td><input type="text" style="display: none;" class="editname" />
                <div class="edit-btn">
                        ${details.name}
                    </div>
                    </td>
                </td>
                <td>${details.email}</td>
                <td>${details.password}</td>
                <td onclick="enableInputName('${details.name}', ${details.id})"><a>Edit</a>
                <td><a onclick="deleteRow(${details.id})">Delete</a></td>
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


//////////////////// PUT ////////////////////////////////////
function enableInputName(name, id) {
    let inputForUPdate;
    let divForDisplay;
    Array.from(userTable.children[1].children).forEach(eachRow => {
        if(eachRow.dataset.id == id) {
            inputForUPdate = eachRow.children[1].children[0];
            inputForUPdate.style.display = "block";
            inputForUPdate.value = name;

            divForDisplay = eachRow.children[1].children[1];
            divForDisplay.style.display = "none";
        }
    });   

    

    
    updateInput.addEventListener("click", (e) => {
        e.preventDefault();
        fetch(`${url}/${id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: inputForUPdate.value,
            }),
            })
            .then(res => res.text())
            .then(data => {
                console.log(data)
                const tableRows = userTable.children[1].children;
                const rowList = Array.from(tableRows)
                rowList.forEach(eachTr => {
                    if(eachTr.dataset.id == id) {
                        eachTr.children[1].children[1].innerText = inputForUPdate.value;
                        inputForUPdate.style.display = "none";
                        divForDisplay.style.display = "block";
                    }
                });
            }).catch(err => console.log(err));
    });
}   
    



//////////////////////////////    DELETE    //////////////////////////////////
function deleteRow(id) {
         fetch(`${url}/${id}`, {
            method: "DELETE",
        })
        .then(res => res.text())
        .then(() => {
            Array.from(userTable.children[1].children).forEach(element => {
                if(element.dataset.id == id) {
                    element.remove(); 
                }
            });
        })
        .catch(err => console.log(err))
    }

