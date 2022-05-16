const form = document.getElementById("form-list");
const userTable = document.getElementById("users-table");
var idInput = document.getElementById("id")
var nameInput = document.getElementById("name")
var emailInput = document.getElementById("email-address")
var passwordInput = document.getElementById("password")
var submitInput = document.getElementById("saveFormList")

const url = "http://localhost:3000/details";


function mapTr(details) {
    return `<tr data-id=${details.id}>
            <td>${details.id}</td>
            <td>${details.name}</td>
            <td>${details.email}</td>
            <td>${details.password}</td>
            <td data-id=${details.id}> <a  id="edit-list">Edit</a></td>
            <td data-id=${details.id}> <a id="delete-list">Delete</a></td>
            </tr>`;
    }


fetch(url)
    .then(response => {
        if(response.ok) {
            console.log("Get request successful")
        }else 
            console.log("Get request unsuccessful")
        return response;
        
    })
    .then(response => response.json())
    .then(data => {
        const userList = data.map(details => {
            return mapTr(details);
        }).join("");

        userTable.children[1].innerHTML= userList;

    })
    .catch(err => console.log("Can't Fetch Data..!"));


form.addEventListener("submit", function(e) {
    e.preventDefault()

    fetch(url, {
    method: "POST",
    body: JSON.stringify({
        id: idInput.value,
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    }),
    headers: {
        "Content-Type": "application/json",
    },
    })
    .then(res => res.text())
    .then(data => {
        console.log(data);

        var result = document.getElementById("users-table")
        result= mapTr({
                id: idInput.value,
                name: nameInput.value,
                email: emailInput.value,
                password: passwordInput.value
            });
            let res = `<table>${result}</table>`;
            let doc = new DOMParser().parseFromString(res, 'text/html');
        
            userTable.children[1].appendChild(doc.body.firstChild.firstChild.firstChild);
    })
    .catch(err => console.log(err));
})


userTable.addEventListener("click", (e) => {
    e.preventDefault();
    let deleteRaw = e.target.id == "delete-list";
    
    let id = e.target.parentElement.dataset.id

    if(deleteRaw) {
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
})

userTable.addEventListener("click", (e) => {
    e.preventDefault();
    let idDetails = e.target.id == "edit-list";
    const idEdit = e.target.parentElement.dataset.id;

        
    if(idDetails) {
        const nameEdit = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        const emailEdit = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const passwordEdit = e.target.parentElement.previousElementSibling.textContent;
    
        const data = {
            idEdit,
            nameEdit,
            emailEdit,
            passwordEdit
        }
    
        idInput.value = data.idEdit;
        nameInput.value = data.nameEdit;
        emailInput.value = data.emailEdit;
        passwordInput.value = data.passwordEdit;
    }
    
    submitInput.addEventListener("click", (e) => {
        e.preventDefault();
        fetch(`${url}/${idEdit}`, {
            method: "PUT",
            body: JSON.stringify({
                id: idInput.value,
                name: nameInput.value,
                email: emailInput.value,
                password: passwordInput.value
            }),
            headers: {
                "Content-Type": "application/json",
            },
            })
            .then(res => res.text())
            .then(data => {
                console.log(data);
            }) 
    });
     
});






