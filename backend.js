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
    req.db.collection('clientes')
    .find({})
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

app.post('/.objetos', (req, res) => {
    console.log(req.body);

    if(!req.usuario.id|| !req.usuario.cpf ||!req.usuario.telefone|| !req.usuario.nome || !req.usuario.username|| !req.usuario.foto){
     
        res.status(400).send({'error': 'Nome e email são obrigatórios'});
        return;
    }

    let objeto = {
        nome:
        email:
        telefone:
    }

    req.db.collection('clientes')
    .insert(cliente, (err, data) => {
        res.send(data);
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na 3000'); 
});