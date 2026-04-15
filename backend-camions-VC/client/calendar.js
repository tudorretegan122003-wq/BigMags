function pintaEvents(data){
    let div = document.getElementById("divResultat");

    let html = "<table border='1'>";
    html += "<tr><th>ID</th><th>Truck</th><th>Evento</th><th>Fecha</th></tr>";

    data.forEach(e => {
        html += `
        <tr>
            <td>${e.id}</td>
            <td>${e.truck_id}</td>
            <td>${e.event_type}</td>
            <td>${e.date}</td>
        </tr>`;
    });

    html += "</table>";
    div.innerHTML = html;
}

function getEvents(){
    fetch(`${URL}/calendar`)
    .then(res => res.json())
    .then(data => pintaEvents(data));
}

getEvents();