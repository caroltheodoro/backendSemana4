
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
    console.log(req.body);
    res.send(req.body);

    let usuario = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        telefone: req.body.telefone,
        username: req.body.username,
        foto: req.body.foto,
        senha: "",
        reputacao: -1,
        //local = {lat, lng}
    };

    if (!req.body.cpf || !req.body.telefone || !req.body.nome || !req.body.username || !req.body.foto ) {
        res.status(400).send({ 'error': 'Preencha todos os campos obrigatorios' });
        return;
    }

     req.db.collection('usuarios')
        .insert(req.body, (err, data) => {
            res.send(data);
        });
});


app.post('/item', (req, res) => {
    console.log(req.body);

    let Item = {
        imagem: req.body.imagem,
        nome: req.body.nome,
        descricao: req.body.descricao,
        tempoInicio: req.body.tempoInicio,
        tempoFim: req.body.tempoFim,
        preco: req.body.preco,
        multa: req.body.multa,
        locador: req.body.locador,
    };

    if (!req.body.imagem || !req.body.nome || !req.body.descricao || !req.body.preco || !req.body.locador ) {
        res.status(400).send({ 'error': 'Preencha todos os campos obrigatorios' });
        return;
    }

    req.db.collection('itens')
        .insert(req.body, (err, data) => {
            res.send(data);
        });
});


app.listen(3000, () => {
    console.log('Servidor rodando na 3000');
});