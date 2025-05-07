const fs = require('fs');
const path = require('path');

require('dotenv').config();
const http = require('http');

function requestController(req, res) {
    if (req.url === '/' && req.method === 'GET') {
        const filePath = path.join(__dirname, 'public', 'index.html');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error interno del servidor');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Página no encontrada');
    }
}

const server = http.createServer(requestController);
const PORT = process.env.PORT 

server.listen(PORT, function(){
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})