const express = require ("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const SECRET_KEY = 'tu_clave_secreta'; // Cambia esto por una clave más segura y almacénala en variables de entorno

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Iniciando sesión para:", email);

        const user = await User.findOne({ email });
        if (!user) {
            console.log("Usuario no encontrado:", email);
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        console.log("Usuario encontrado:", user);

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log("Contraseña incorrecta para:", email);
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token,
            user: {
                id: user._id,
                nombres: user.nombres,
                apellidos: user.apellidos,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Error en el servidor:", error.message);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});
module.exports = router; 