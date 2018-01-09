const express = require('express');
const app = express();

// ruta de la pagina HOME
app.get('/', (req, res) => res.send('Hello World!'));

// escuchando en el puerto 80
app.listen(80, () => console.log('Example app listening on port 80!'));

// ruta de la pagina CONTACTO
app.get('/contacto', (req, res) => res.send('Esta es la paginita de contactos'));

// ruta de la pagina HOLA
app.get('/hola', (req, res) => res.send('Esta es la paginita que te SALUDA!'));

