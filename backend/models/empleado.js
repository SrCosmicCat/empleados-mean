import mongoose from 'mongoose';
const { Schema } = mongoose;

const empleadoSchema = new Schema({
    nombre: {
        type: String
    },
    departamento: {
        type: String
    },
    email: {
        type: String
    },
    telefono: {
        type: String
    }
},{
    collection: 'empleados'
})

export default mongoose.model('Empleado', empleadoSchema);