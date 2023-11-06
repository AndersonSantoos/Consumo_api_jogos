const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public')); // Servir arquivos estáticos da pasta 'public'

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/login.html'); // Rota para a página de login
});

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Rota para a página principal
});

app.listen(port, () => {
    console.log(`Servidor Express rodando na porta ${port}`);
});
