function getUsuari(id){
    fetch(`${URL}/users/${id}`)
    .then(res => res.json())
    .then(u => {
        document.getElementById("username").innerText = u.username;
        document.getElementById("email").innerText = u.email;
    });
}

let params = new URLSearchParams(window.location.search);
let id = params.get("id");

if (id) getUsuari(id);