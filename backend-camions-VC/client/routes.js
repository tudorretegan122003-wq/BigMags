function pintaRoutes(routes){
    let div = document.getElementById("divResultat");

    let html = "<table border='1'>";
    html += "<tr><th>ID</th><th>Truck</th><th>Origen</th><th>Destino</th><th>Km</th></tr>";

    routes.forEach(r => {
        html += `
        <tr>
            <td>${r.id}</td>
            <td>${r.truck_id}</td>
            <td>${r.start_location}</td>
            <td>${r.end_location}</td>
            <td>${r.distance_km}</td>
        </tr>`;
    });

    html += "</table>";
    div.innerHTML = html;
}

function getRoutes(){
    fetch(`${URL}/routes`)
    .then(res => res.json())
    .then(data => pintaRoutes(data));
}

getRoutes();