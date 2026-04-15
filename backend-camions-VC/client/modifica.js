function modificarUsuari(id){
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;

    fetch(`${URL}/users/${id}`, {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ username, email })
    })
    .then(res => res.json())
    .then(data => console.log(data));
}