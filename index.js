const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// realizando conexion con la bd
//mongoose.connect('mongodb://localhost/almacenamiento');

mongoose.connect('mongodb://localhost/almacenamiento', { useMongoClient: true })


var usuariosSchemaJSON = {
    nombre: String,
    rut: String,
    edad: Number
};

// Creando Schema
var usuarioSchema = new Schema(usuariosSchemaJSON);

// Creando modelo
var Usuario = mongoose.model("Usuario",usuarioSchema);


app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

// ruta de la pagina HOME
app.get('/', (req, res) => res.send('Hello World!'));

// ruta de la pagina CONTACTO
app.get('/contacto', (req, res) => res.send('Esta es la paginita de contactos'));

// ruta de la pagina HOLA
app.get('/hola', (req, res) => res.send('Esta es la paginita que te SALUDA!'));

// ruta de la pagina CV
app.use(express.static('assets'));
app.get('/CV', (req, res) => res.sendFile(path.join(__dirname , 'assets/index.html')));

// ruta de la pagina list
app.get('/list', (req, res) => {
    Usuario.find((err, result) => {
        console.log(result);
        res.send(result);
    });
});

app.listen('80',() =>{
    console.log('Servidor iniciado en el puerto 80');
});

