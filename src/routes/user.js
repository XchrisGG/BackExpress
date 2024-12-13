const express = require("express");
const User = require("../models/user"); // Importa el schema de usuario
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const router = express.Router();

// Ruta para crear un usuario
router.post('/users', async (req, res) => {
    try {
        const { nombres, apellidos, edad, sexo, fechaNacimiento, pais, email, password } = req.body;

        // Cifrar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear una nueva instancia del modelo User con la contraseña cifrada
        const newUser = new User({
            nombres,
            apellidos,
            edad,
            sexo,
            fechaNacimiento,
            pais,
            email,
            password: hashedPassword, // Guardar la contraseña cifrada
        });

        // Guardar el nuevo usuario en la base de datos
        const data = await newUser.save();
        res.status(201).json(data);
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(400).json({ message: error.message });
    }
});


// Ruta para obtener todos los usuarios
router.get("/users", (req, res) => {
   User.find()
   .then((data) => res.json(data))
   .catch((error) => res.json({message: error}));
});

// Ruta para borrar usuarios de db

router.delete("/users", (req, res) =>{
   User.deleteMany()
   .then((data) => res.json(data))
   .catch((error) => res.json({message: error}));
});



module.exports = router;
