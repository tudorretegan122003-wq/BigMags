const bodyParser = require('body-parser')
const express = require('express')
const cors =require("cors");

const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 3000


let usuaris = {"users":[
    {
        id: "1",
        nom: "Pepito",
        cognoms: "Pi"
    },
    {
        id: "2",
        nom: "Joan",
        cognoms: "Pi"
    },
]}

app.get("/", (req, res) => {
    res.send(`<h1>API usuaris en Javascript</h1>
        <ul>
            <li>obtenir usuaris /usuaris</li>
    `)
})

app.get('/usuaris', (req, res) => {
  res.type("json").send(JSON.stringify(usuaris))
  //res.json(usuaris)
})

app.get('/usuaris/:id', (req, res)=>{
    const id = parseInt(req.params.id)
    if (id){
        console.log("M'han tornat l'usuari", id)
        let i = 0
        let trobat = false
        let arrayUsuaris = usuaris["users"]
        while (i<arrayUsuaris.length && !trobat){
            if (arrayUsuaris[i]["id"] == id){
                trobat = true
            }else{
                i++
            }
        }
        if (trobat){
            res.json(arrayUsuaris[i]) 
        }
        else{
            res.status(404).json(
                {error:"Usuari no trobat."})  
        }
    }else{
        res.status(404).type('json').send(
            "{\"error\": \"El que m'has passat no és un num.\"}")
        //res.status(404).json(
        //    {error:"El que m'has passat no és un num."})    
    }
})

app.post("/usuaris/", (req,res) => {
    const cos = req.body
    //console.log(req.body)
    /*let usuariTrobat = usuaris.users.find( 
        usuari => { usuari.nom == cos.username})
    if (usuariTrobat)
        res.type("json").status(404)
            .send(`{"error":"usuari existent"}`)
    */
    let nouId = usuaris.users.length+1
    usuaris.users.push({
        id : nouId,
        nom : cos.nom,
        cognoms : cos.cognoms,
    })
    res.json(`{"msg":"He creat l'usuari amb id: ${nouId}"}`)
})


app.put("/usuaris/:usuari_id", (req, res)=>{
    console.log("estic al put.....")
    let idUsuari = parseInt(req.params.usuari_id)
    let dades = req.body
    console.log("DEBUG", dades)
    if (!idUsuari)
        return res.status(500).json(`{"error":"Id incorrecte"}`)
    let llistaUsuaris = usuaris.users
    let index = llistaUsuaris.findIndex( usuari =>
        usuari.id == idUsuari
    )
    if (index != -1){
        console.log(dades)
        llistaUsuaris[index].cognoms = dades.cognoms
        llistaUsuaris[index].nom = dades.nom
        return res.json(`{missatge: tot ok}`)
    }
    else{
        return res.status(400).json(`Usuari no trobat`)
    }

})

app.delete("/usuaris/:usuari_id", (req, res)=>{
    let idUsuari = parseInt(req.params.usuari_id)
    if (!idUsuari)
        return res.status(500).json(`{"error":"Id mal passat"}`)
    let llistaUsuaris = usuaris.users
    let index = llistaUsuaris.findIndex( usuari => 
        usuari.id == idUsuari
    )
    console.log(idUsuari, llistaUsuaris)
    if (index==-1){
        return res.status(500).json(`{"error":"Id usuari no existeix"}`)
    }
    llistaUsuaris.splice(index, 1)
    return res.json(`{"msg":"Tot correcte"}`)
})

function provaEnviarPost(nom, cognoms){
    fetch(`http://localhost:${port}/usuaris/`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: `{"nom":"${nom}", 
        "cognoms":"${cognoms}"}`
    }).then((resposta) => {
        if (!resposta.ok){
            throw new Error("Error resposta servidor")
        }
        return resposta.text()
    }).then(text =>{
        console.log("El servidor diu:", text)
    })
    .catch(error=>{
        console.log("----- ERROR:", error)
    })
}

function provaDelete(idUsuari){
    fetch(`http://localhost:${port}/usuaris/${idUsuari}`, {
        method: "DELETE"
    }).then((resposta) => {
        return resposta.text()
    }).then((resposta) =>{
        console.log("El servidor diu:", resposta)
    })
    .catch(error=>{
        console.log("----- ERROR:", error)
    })
}

function provaPut(){
    //Modificar un usuari.
    fetch(`http://localhost:${port}/usuaris/1`)
    .then(resposta => {
        return resposta.json()
    })
    .then(dades =>{
        let nom = dades.nom
        let cognoms = dades.cognoms
        
        //Modificar usuari
        fetch(`http://localhost:${port}/usuaris/1`,
        { 
            method: "PUT",
            headers: {"Content-Type":"application/json"},
            body: `{"cognoms":"Serra","nom":"Joan"}`
        })
        .then(respostaModificar =>{
            if (!respostaModificar.ok)
            {
                respostaModificar.text()
                .then(text => {
                    throw new Error(text)
                })
                return null
            }
            return respostaModificar.text()
        })
        .then(dades => {
            console.log("TOT OK", dades)
        })
    })
    .catch(error => {
        console.log("ERROR:", error)
    })
}

//Obrim el servidor
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//Enviem el post.
provaEnviarPost("xevi", "Terr.")
//provaEnviarPost("fchic", "56", "Girona")
//provaDelete("1")
//provaDelete("1")
//provaPut()

