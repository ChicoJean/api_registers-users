const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Para processar JSON no corpo das requisições

let fila = []; // Aqui armazenamos os nomes na fila

// Rota para pegar a lista da fila
app.get('/api/fila', (req, res) => {
    res.json(fila);
});

// Rota para adicionar uma pessoa à fila
app.post('/api/adicionar', (req, res) => {
    const nome = req.body.nome;
    if (nome && !fila.includes(nome)) {
        fila.push(nome);
        res.status(200).send({ message: 'Nome adicionado com sucesso!' });
    } else {
        res.status(400).send({ message: 'Nome inválido ou já na fila!' });
    }
});

// Rota para remover uma pessoa da fila
app.delete('/api/remover', (req, res) => {
    const nome = req.body.nome;
    fila = fila.filter(pessoa => pessoa !== nome);
    res.status(200).send({ message: `${nome} removido da fila!` });
});

// Rota para chamar a próxima pessoa para cantar
app.post('/api/chamar', (req, res) => {
    if (fila.length > 0) {
        const nome = fila.shift(); // Remove a primeira pessoa da fila
        res.status(200).send({ message: `${nome} está pronto para cantar!` });
    } else {
        res.status(400).send({ message: 'Não há mais pessoas na fila!' });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
