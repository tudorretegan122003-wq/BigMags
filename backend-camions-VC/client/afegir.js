function afegirUsuari(){
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;

    fetch(`${URL}/users`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            username: username,
            email: email,
            role: "user"
        })
    })
    .then(res => res.json())
    .then(data => console.log(data));
}