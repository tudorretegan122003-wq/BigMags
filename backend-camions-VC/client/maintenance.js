function pintaMaintenance(data){
    let div = document.getElementById("divResultat");

    let html = "<table border='1'>";
    html += "<tr><th>ID</th><th>Truck</th><th>Coste</th></tr>";

    data.forEach(m => {
        html += `
        <tr>
            <td>${m.id}</td>
            <td>${m.truck_id}</td>
            <td>${m.cost}</td>
        </tr>`;
    });

    html += "</table>";
    div.innerHTML = html;
}

function getMaintenance(){
    fetch(`${URL}/maintenance`)
    .then(res => res.json())
    .then(data => pintaMaintenance(data));
}

getMaintenance();