const app = require('./src/app');
const connectDB = require('./src/config/database');
const http = require('http');
require('dotenv').config();

const port = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();

        const server = http.createServer(app);

        server.listen(port, () => {
            console.log(`Servidor HTTP + WebSocket corriendo en http://localhost:${port}`);
        });

    } catch(error) {
        console.log('No se ha podido levantar el servidor', error);
        process.exit(1);
    }
}

startServer();