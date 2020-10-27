require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')

app.use(express.json())

const PORT = process.env.PORT

app.post('/api/personas', (req, res) => {
    const body = req.body

    const person = new Person({
        nombre: body.nombre,
        correo: body.correo,
        kilometros: body.kilometros,
    })

    if(parseFloat(person.kilometros) >= 4) {
        person.save().then(savedPerson => {
            res.json(savedPerson);
            console.log('Persona guardada con exito')
        })
    } else {
        console.log('Debes de caminar más')
        res.status(204).end()
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})