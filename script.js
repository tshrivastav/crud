const form = document.getElementById("form-list");
const userTable = document.getElementById("users-table");
const id = document.getElementById("id")
const name = document.getElementById("name")
const email = document.getElementById("email-address")
const password = document.getElementById("password")
const url = "http://localhost:3000/details";


function mapTr(details) {
    return `<tr data-id=${details.id}>
            <td>${details.id}</td>
            <td>${details.name}</td>
            <td>${details.email}</td>
            <td>${details.password}</td>
            <td data-id=${details.id}> <a  id="edit-list" ${details.name}, ${details.id}>Edit</a></td>
            <td data-id=${details.id}> <a id="delete-list" ${details.id}>Delete</a></td>
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
        id: id.value,
        name: name.value,
        email: email.value,
        password: password.value
    }),
    headers: {
        "Content-Type": "application/json",
    },
    })
    .then(res => res.text())
    .then(data => {
        console.log(data);

        var result = document.getElementById("users-table")
        result.innerHTML = mapTr({
                id: id.value,
                name: name.value,
                email: email.value,
                password: password.value
            });
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
        .then(() => location.reload())
        .catch(err => console.log(err))
    }
})
    

userTable.addEventListener("click", (e) => {
    e.preventDefault();
    let editRaw = e.target.id == "edit-list";
    
    let id = e.target.parentElement.dataset.id
    if(editRaw) {
        fetch(`${url}/${id}`,{
            method:'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id: id.value,
                name: name.value
            })
        }).then(response=>{
            return response.text()
        }).then(data=> {
            console.log(data)
        
        });
    }
})




