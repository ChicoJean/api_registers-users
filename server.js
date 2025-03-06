const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Armazenar usuários em memória
let usuarios = [];

// Rota para registrar um novo usuário
app.post('/api/registrar', (req, res) => {
    const { nome } = req.body;
    if (!nome) {
        return res.status(400).json({ mensagem: 'Nome é obrigatório.' });
    }

    const novoUsuario = { _id: Date.now().toString(), nome };
    usuarios.push(novoUsuario);
    res.status(201).json({ mensagem: `Usuário ${nome} registrado com sucesso!` });
});

// Rota para listar todos os usuários
app.get('/api/usuarios', (req, res) => {
    res.json(usuarios);
});

// Rota para remover um usuár

