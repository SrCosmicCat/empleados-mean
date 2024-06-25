import express from 'express'
import Empleado from '../models/empleado.js'

const empleadoRouter = express.Router()

empleadoRouter.post('/agregar', (req,res) => {
    Empleado.create(req.body)
    .then(data => {
        console.log('Se insertó un empleado')
        res.send(data)
    })
    .catch(e => {
        console.log(`Error: ${e}`)
    })
})

empleadoRouter.get('/empleados', (req, res) => {
    Empleado.find()
    .then(data => {
        res.send(data)
    })
    .catch(e => {
        console.log(`Error: ${e}`)
    })
})

empleadoRouter.get('/empleado/:id', (req, res) => {
    const {id} = req.params
    Empleado.findById(id)
    .then(data => {
        res.send(data)
    })
    .catch(e => {
        console.log(`Error: ${e}`)
    })
})

empleadoRouter.put('/actualizar/:id', (req, res) => {
    const {id} = req.params
    Empleado.findByIdAndUpdate(id, {
        $set: req.body
    })
    .then(data => {
        console.log('Se ha actualizado')
        res.send(data)
    })
    .catch(e => {
        console.log(`Error: ${e}`)
    })
})

empleadoRouter.delete('/delete/:id', (req, res) => {
    const {id} = req.params
    Empleado.findByIdAndDelete(id)
    .then(data => {
        console.log('Se eliminó el empleado')
        res.send(data)
    })
    .catch(e => {
        console.log(`Error: ${e}`)
    })
})

export default empleadoRouter