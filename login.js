document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Verificar as credenciais (coloque sua lógica de validação de login aqui)
    if (username === 'andersonteste@hotmail.com' && password === '123') {
        // Redirecionar para a página principal (index.html) após o login bem-sucedido
        window.location.href = 'index.html';
    } else {
        alert('Credenciais inválidas. Tente novamente.');
    }
});
