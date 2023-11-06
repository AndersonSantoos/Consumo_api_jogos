// Importe as bibliotecas necessárias
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000; // Porta do servidor

// Middleware para servir arquivos estáticos (HTML, CSS, JavaScript)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para analisar o corpo das solicitações
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rotas
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Lógica de autenticação e proteção de rotas (adicione conforme necessário)

// Outras rotas da sua aplicação

// Inicialização do servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
