function afegirFuel(){
    fetch(`${URL}/fuel`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            truck_id: document.getElementById("truck_id").value,
            date: document.getElementById("date").value,
            fuel_type: document.getElementById("type").value,
            liters: document.getElementById("liters").value,
            price_per_liter: document.getElementById("price").value,
            total_price: document.getElementById("total").value
        })
    })
    .then(res => res.json())
    .then(data => console.log(data));
}