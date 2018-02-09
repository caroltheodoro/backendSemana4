const express = require('express');
const expressMongoDb = require('express-mongo-db');
const bodyParser = require('body-parser');
const cors = require('cors')
const ObjectID = require('mongodb').ObjectID;

const app = express();

app.use(expressMongoDb('mongodb://localhost/backendSemana4'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    req.db.collection('usuarios').find({})
    .toArray((err, data) => {
            res.send(data);
        });
});

app.get('/cliente/:id', (req, res) => {
    let busca = {
        _id: new ObjectID(req.params.id)
    };

    req.db.collection('objetos')
        .findOne(busca, (err, data) => {
            res.send(data);
        });
});

app.post('/cadastro', (req, res) => {
    if (!req.body.cpf || !req.body.telefone || !req.body.nome || !req.body.username || !req.body.foto  || !req.body.senha || !req.body.local) {
        res.status(400).send({ 'error': 'Preencha todos os campos obrigatorios' });
        return;
    }

    let usuario = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        telefone: req.body.telefone,
        username: req.body.username,
        foto: req.body.foto,
        senha: req.body.senha,
        local: {
            lat: req.body.local.lat,
            lng: req.body.local.lng
        },
        reputacao: -1
    };

    req.db.collection('usuarios')
        .insert(usuario, (err, data) => {
            res.send(data);
        });
});

app.listen(3000, () => {
    console.log('Servidor rodando na 3000');
});