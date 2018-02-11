const express = require('express');
const fs = require('fs');
const expressMongoDb = require('express-mongo-db');
const bodyParser = require('body-parser');
const cors = require('cors')
const ObjectID = require('mongodb').ObjectID;

const app = express();

app.use(expressMongoDb('mongodb://localhost/backendSemana4'));
app.use(bodyParser.json({ limit: '50mb'}));
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

//pega o feed de itens
//TODO receber localizacao como parametro
app.get('/getItens', (req, res) => {
    //CHANGE THIS TO USE PROMISES
    req.db.collection('itens')
        .find({})
        .toArray((err, itemData) => {
            req.db.collection('usuarios')
            .find({})
            .toArray((err, userData) => {
                let flag = true;

                //TODO OPTIMIZE THIS
                //SHOULD NOT BE HARD
                for(item in itemData) {
                    flag = true;
                    for(user in userData) {
                        if(flag == true && item.dono == user.username) {
                            //this should only happen once
                            item.dono = user;
                            flag = false;
                        }
                    }
                }

                // SEND TREATED ITEM LIST
                // TODO: make front end just link images to owners
                // and not send redundant data
                res.send(itemData);
            });
        });
});

//pega todos os itens de um determinado dono
app.get('/getMeusItens/:id', (req, res) => {
    let busca = {
        // idDono: new ObjectID(req.params.id)
        dono: req.params.id
    };

    req.db.collection('itens')
    .find(busca)
    .toArray((err, data) => {
        res.send(data);
    });
});

app.post('/item', (req, res) => {
    console.log(req.body);

    let item = {
        imagem: req.body.imagem,
        nome: req.body.nome,
        descricao: req.body.descricao,
        tempoInicio: req.body.tempoInicio,
        tempoFim: req.body.tempoFim,
        preco: req.body.preco,
        multa: req.body.multa,
        locador: req.body.locador,
        dono: req.body.dono
    };

    if (!req.body.imagem || !req.body.nome || !req.body.descricao || !req.body.preco || !req.body.locador ) {
        res.status(400).send({ 'error': 'Preencha todos os campos obrigatorios' });
        return;
    }

    req.db.collection('itens')
        .insert(item, (err, data) => {
            if(err){
                res.status(500).send({});
            }

            res.send(data);
        });
});

app.post('/login', (req, res) => {
    if (!req.body.username || !req.body.senha) {
        res.status(400).send({ 'error': 'Preencha todos os campos obrigatorios' });
        return;
    }

    let busca = {
        username: req.body.username,
        senha: req.body.senha
    }

    req.db.collection('usuarios')
    .findOne(busca, (err, data) => {
        if(data){
            res.send(data);
        } else {
            // TODO: use status, but this didnt work
            // res.status(400).send({});
            res.send({});
        }
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
            if(!err) {
                res.send(data);
            } else {
                res.send(err);
            }
            
        });
});


app.listen(3000, () => {
    console.log('Servidor rodando na 3000');
});
