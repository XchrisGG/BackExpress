const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    nombres: {
        type: String,
        required: true,
        trim: true,
        match: [/^[a-zA-Z\s]+$/, 'El campo nombres solo puede contener caracteres alfabéticos y espacios']
    },
    apellidos: {
        type: String,
        required: true,
        trim: true,
        match: [/^[a-zA-Z\s]+$/]
    },
    edad: {
        type: Number,
        required: true,
        min: 0,
        max: 99,
        validate: {
            validator: function(v) {
                return /^[0-9]{1,2}$/.test(v);
            },
            message: props => `${props.value} no es una edad válida! Debe ser un número de uno o dos dígitos.`
        }
    },
    sexo: {
        type: String,
        enum: ['Masculino', 'Femenino', 'No especificar'],
        required: true
    },
    fechaNacimiento: {
        type: Date,
        required: true
    },
    pais: {
        type: String,
        required: true,
        trim: true,
        match: [/^[a-zA-Z\s]+$/, 'El campo país solo puede contener caracteres alfabéticos y espacios']
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.plugin(uniqueValidator, { message: 'El {PATH} YA ESTA EN Uso' });

module.exports = mongoose.model('User', userSchema);
