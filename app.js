const express = require('express');
const app = express();
const path = require('path');
const port = 5000; 

app.use(express.static('public'));

// Rota para a página de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/login.html'));
});

// Rota para a página principal
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(port, () => {
    console.log(`Servidor Express rodando na porta ${port}`);
});
