function pintaFuel(data){
    let div = document.getElementById("divResultat");

    let html = "<table border='1'>";
    html += "<tr><th>ID</th><th>Truck</th><th>Litros</th><th>Precio</th></tr>";

    data.forEach(f => {
        html += `
        <tr>
            <td>${f.id}</td>
            <td>${f.truck_id}</td>
            <td>${f.liters}</td>
            <td>${f.total_price}</td>
        </tr>`;
    });

    html += "</table>";
    div.innerHTML = html;
}

function getFuel(){
    fetch(`${URL}/fuel`)
    .then(res => res.json())
    .then(data => pintaFuel(data));
}

getFuel();