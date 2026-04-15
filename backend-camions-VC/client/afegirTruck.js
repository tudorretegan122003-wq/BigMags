function afegirTruck(){
    let plate = document.getElementById("plate").value;
    let model = document.getElementById("model").value;
    let driver = document.getElementById("driver").value;

    fetch(`${URL}/trucks`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            license_plate: plate,
            model: model,
            driver_name: driver
        })
    })
    .then(res => res.json())
    .then(data => console.log(data));
}