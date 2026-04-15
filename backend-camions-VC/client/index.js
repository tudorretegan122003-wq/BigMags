function pintaUsuaris(usuaris){
    let div = document.getElementById("divResultat");

    let html = "<table border='1'>";
    html += "<tr><th>ID</th><th>Username</th><th>Email</th></tr>";

    usuaris.forEach(u => {
        html += `
        <tr>
            <td>${u.idUsuari}</td>
            <td>${u.username}</td>
            <td>${u.email}</td>
        </tr>`;
    });

    html += "</table>";

    div.innerHTML = html;
}

function getDades(){
    fetch(`${URL}/users`)
    .then(res => res.json())
    .then(data => pintaUsuaris(data));
}

getDades();