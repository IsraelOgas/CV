const express  = require('express');
const app = express();
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');

// Creando conexion
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'a5c338eaed21c2018',
    database : 'almacenamiento',
});

// Conectandose a la BD
db.connect((err) => {
    if(!err){
	console.log('Conexion con la BD EXITOSA');
    }else{
	console.log('Error al intentar conectarse a la BD');
    	throw err;
    }
});

app.get('/list', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, rows, fields) => {
         db.end();
	 if(!err){
            console.log('datos: ',rows);
	    res.send(rows);
	    res.render('/assets/usuarios.html',{
	   	usuarios: rows
            });
	 }else{
            console.log('Ocurrio un error al ejecutar la consulta');
	    throw err;
	}
    });
});

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

app.listen('80',() =>{
    console.log('Servidor iniciado en el puerto 80');
});

