const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conexión a la base de datos establecida correctamente');
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        process.exit(1);
    }
};

module.exports = connectDB; 