    function afegirRoute(){
    fetch(`${URL}/routes`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            truck_id: document.getElementById("truck_id").value,
            start_location: document.getElementById("start").value,
            end_location: document.getElementById("end").value,
            distance_km: document.getElementById("km").value,
            fuel_consumed_liters: document.getElementById("fuel").value,
            date: document.getElementById("date").value
        })
    })
    .then(res => res.json())
    .then(data => console.log(data));
}