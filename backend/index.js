import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import empleadoRouter from './routes/empleado.routes.js'


// mongodb://127.0.0.1:27017/empleados
mongoose.connect('XD')
    .then(data => {
        console.log(`Conectado a ${data.connections[0].name}`)
    })
    .catch(e => {
        console.log(`Error: ${e}`)
    })

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())

// Routes
app.use('/api', empleadoRouter)

const port = process.env.port || 4000
const server = app.listen(port, () => {
    console.log(`App listening in port ${port}`)
})

app.use(function(err, req, res, next) {
    console.log(err.message)
    err.statusCode ?? 500
    res.status(err.statusCode).send(err.message)
})