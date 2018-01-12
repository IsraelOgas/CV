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


// ruta de la pagina usuario  (Buscar Todos)
app.get('/usuario', (req, res) => {
    Usuario.find({}, (err, usuario) => {
    	if(err) return res.status(500).send({message: `Error al realizar peticion: ${err}`});
    	if(!usuario) return res.status(400).send({message: 'No existe ningun usuario'});

    	res.status(200).send({usuario});
	console.log(usuario);
    });
});

// Buscar por uno en especifico
app.get('/usuario/:_id', (req, res) => {
    let usuarioId = req.params._id;

    Usuario.findById(usuarioId, (err, usuario) => {
    	if(err) return res.status(500).send({message: `Error al realizar peticion: ${err}`});
    	if(!usuario) return res.status(400).send({message: 'El usuario no existe'});
    	res.status(200).send({usuarios : usuario});
	console.log(usuario);
    });
});


app.post('/usuario', (req, res) => {
	console.log('POST /usuario');
	//req.body _ cuerpo de la cabecera
	console.log(req.body);

	let usuario = new Usuario();
	usuario.nombre = req.body.nombre;
	usuario.rut = req.body.rut;
	usuario.edad = req.body.edad;

	usuario.save((err, usuarioAGuardar) => {
		if(err) res.status(500).send({message: `Error al guardar en la base de datos: ${err} `});
		
		res.status(200).send({usuarios: usuarioAGuardar});
		//console.log(usuarioAGuardar);
	});
});

app.listen('80',() =>{
    console.log('Servidor iniciado en el puerto 80');
});

