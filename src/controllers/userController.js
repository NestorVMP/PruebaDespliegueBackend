const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateTokken');

const UserController = {
    insertUser: 
        async (req, res) => {
            const { name, email, password, role } = req.body;
            try {
                const exists = await User.findOne({ email });
                if (exists) {
                    return res.status(400).json({ message: 'El email ya está registrado' });
                }
                const hash = await bcrypt.hash(password, 10);
                const newUser = new User({ name, email, password: hash, role });
                const savedUser = await newUser.save();
                const token = generateToken(savedUser._id, savedUser.role);
                /*res.cookie('token', token, {
                    httpOnly: true,
                    sameSite: 'Lax',
                    secure: false,
                    maxAge: 3 * 60 * 1000
                });*/
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                    maxAge: 3 * 60 * 1000
                });


                  

                res.status(201).json({ message: 'Usuario registrado correctamente', user: savedUser });
            } catch (err) {
                res.status(500).json({ message: 'Error al registrar el usuario', err });
                throw err;
            }
        },
        loginUser: 
        async (req, res) => {
            const { email, password } = req.body;
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    return res.status(400).json({ message: 'El email no está registrado' });
                }
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

                const token = generateToken(user._id, user.role);
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'Lax',
                    maxAge: 3 * 60 * 1000
                });


                res.status(201).json({ message: 'Inicio de sesión exitoso', user: user });
            } catch (err) {
                res.status(500).json({ message: 'Error en el login', err });
                throw err;
            }
        }
};

module.exports = UserController;