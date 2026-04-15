function pintaTrucks(trucks){
    let div = document.getElementById("divResultat");

    let html = "<table border='1'>";
    html += "<tr><th>ID</th><th>Matrícula</th><th>Model</th><th>Driver</th></tr>";

    trucks.forEach(t => {
        html += `
        <tr>
            <td>${t.id}</td>
            <td>${t.license_plate}</td>
            <td>${t.model}</td>
            <td>${t.driver_name}</td>
        </tr>`;
    });

    html += "</table>";
    div.innerHTML = html;
}

function getTrucks(){
    fetch(`${URL}/trucks`)
    .then(res => res.json())
    .then(data => pintaTrucks(data));
}

getTrucks();