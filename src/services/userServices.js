const Usuario = require('../models/User');

async function insertUser(userData) {
    try {
        const usuario = new Usuario(userData);
        const res = await usuario.save();
        return res;
    } catch (err) {
        console.error('Error al insertar usuario:', err);
        throw err;
    }
}

async function getUsers() {
    try {
        const usuarios = await Usuario.find();
        return usuarios;
    } catch (err) {
        console.error('Error al obtener usuarios:', err);
    }
}

async function updateUser(id, userData) {
    try {
        const res = await Usuario.findByIdAndUpdate(id, userData, { new: true });
    } catch (err) {
        console.error('Error al actualizar usuario:', err);
    }
}

async function deleteUser(id) {
    try {
        const res = await Usuario.findByIdAndDelete(id);
    } catch (err) {
        console.error('Error al eliminar usuario:', err);
    }
}

module.exports = { insertUser, getUsers, updateUser, deleteUser };