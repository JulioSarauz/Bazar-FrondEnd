//Mostrar web
//introduccion express
//plantillas
var express = require('express');
var app = express();
const hbs = require('hbs');
const lamina = require('./controlador/laminas');

const port = process.env.PORT || 3000;
//llamado a helpers
require('./hbs/helpers')

app.use(express.static(__dirname + '/public'));

//express HBS engine
hbs.registerPartials(__dirname + '/views/parciales');
app.set('view engine', 'hbs');
app.engine('hbs', hbs.__express);


app.get('/', function(req, res) {
    const start = async() => {
        await lamina.getLaminas(0, 100).then(function(datos) {
            res.render('home', {
                nombre: "laMinas",
                datos: datos
            });
        });
    }
    start();
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/guardar', (req, res) => {
    const save = async() => {
        let num = req.query.num;
        let nom = req.query.nom;
        let num_sec = req.query.num_sec;
        let nom_sec = req.query.nom_sec;
        let stock = req.query.stock;
        let nuevalamina = await lamina.nuevaLamina(num, nom, num_sec, nom_sec, stock).then(async function() {
            var lam = await lamina.getLaminas(0, 100).then(async function(data) {

                res.render('home', {
                    nombre: "laMinas",
                    datos: data
                });
            });
        });
    }
    save();
});

app.get('/eliminar', (req, res) => {
    const save = async() => {
        let id = req.query.ide;
        let eliminarLamina = await lamina.eliminarLamina(id).then(async function() {
            var lam = await lamina.getLaminas(0, 100).then(async function get(data) {
                res.render('home', {
                    nombre: "laMinas",
                    datos: data
                });
            });
        });
    }
    save();
});


app.get('/modificar', (req, res) => {
    const find = async() => {
        let id = req.query.ide;
        let buscarLamina = await lamina.getLaminas(0, 100).then(async function(data) {
            for (l in data.laminas) {
                if (id === data.laminas[l]._id) {
                    res.render('update', {
                        id: id,
                        n1: data.laminas[l].numero,
                        n2: data.laminas[l].nombre,
                        n3: data.laminas[l].numero_seccion,
                        n4: data.laminas[l].seccion,
                        n5: data.laminas[l].stock
                    });
                }
            }
        });
    }
    find();
});

app.get('/actualizar', (req, res) => {
    const save = async() => {
        let id = req.query.id;
        let num = req.query.num;
        let nom = req.query.nom;
        let num_sec = req.query.num_sec;
        let nom_sec = req.query.nom_sec;
        let stock = req.query.stock;

        let actualizarLamina = await lamina.actualizarLamina(id, num, nom, num_sec, nom_sec, stock).then(async function() {
            var lam = await lamina.getLaminas(0, 100).then(async function get(data) {
                res.render('home', {
                    nombre: "laMinas",
                    datos: data
                });
            });
        });
    }
    save();
});


app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto: ${port}`);
});