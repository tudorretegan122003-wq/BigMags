const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/hola/:nom_usuari', (req, res) => {
    let nomUsuari = req.params.nom_usuari
    res.send(`<h1>Benvingut ${nomUsuari}</h1>`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})