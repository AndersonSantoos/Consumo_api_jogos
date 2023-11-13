const jogosContainer = document.getElementById('jogos-container');
const carrinhoList = document.getElementById('carrinho-list');
const carrinhoTotal = document.getElementById('carrinho-total');
const carrinhoItens = {};
const confirmarCompraBtn = document.getElementById('confirmar-compra');

//==================================================================================================


//Config botão de início e botão sair


// Adicione um evento de clique ao botão "Início"
const inicioButton = document.getElementById('inicio-button');
inicioButton.addEventListener('click', () => {
    // Redirecione para a página de login (substitua 'login.html' pela URL da página de login)
    window.location.href = 'login.html';
});

// Adicione um evento de clique ao botão "Sair"
const sairButton = document.getElementById('sair-button');
sairButton.addEventListener('click', () => {
    // Redirecione para a página de login ao sair (substitua 'login.html' pela URL da página de login)
    window.location.href = 'login.html';
});



//======================================================================



//Config do carrinho de compras

// Atualize a função atualizarCarrinho
function atualizarCarrinho() {
    carrinhoList.innerHTML = '';
    let total = 0;

    for (const jogoId in carrinhoItens) {
        if (carrinhoItens.hasOwnProperty(jogoId)) {
            const jogo = carrinhoItens[jogoId];
            const carrinhoItem = document.createElement('li');
            const quantidade = document.createElement('input');
            quantidade.type = 'number';
            quantidade.value = jogo.quantidade || 1; // Padrão para 1
            quantidade.min = 1;
            quantidade.addEventListener('change', (event) => {
                jogo.quantidade = parseInt(event.target.value);
                atualizarCarrinho(); // Atualize o carrinho após a alteração da quantidade
            });

            const aumentarQuantidade = document.createElement('button');
            aumentarQuantidade.textContent = '+';
            aumentarQuantidade.addEventListener('click', () => {
                jogo.quantidade = (jogo.quantidade || 1) + 1;
                quantidade.value = jogo.quantidade;
                atualizarCarrinho(); // Atualize o carrinho após o aumento da quantidade
            });

            const diminuirQuantidade = document.createElement('button');
            diminuirQuantidade.textContent = '-';
            diminuirQuantidade.addEventListener('click', () => {
                if (jogo.quantidade > 1) {
                    jogo.quantidade = jogo.quantidade - 1;
                    quantidade.value = jogo.quantidade;
                }
                atualizarCarrinho(); // Atualize o carrinho após a diminuição da quantidade
            });

            carrinhoItem.innerHTML = `${jogo.nome} - ${jogo.preco} x `;
            carrinhoItem.appendChild(aumentarQuantidade);
            carrinhoItem.appendChild(quantidade);
            carrinhoItem.appendChild(diminuirQuantidade);

            carrinhoList.appendChild(carrinhoItem);

            // Atualize o preço com base na quantidade
            total += parseFloat(jogo.preco.replace('R$: ', '').replace(',', '').replace('.', '').replace(',', '.')) * (jogo.quantidade || 1);
        }
    }

    carrinhoTotal.textContent = `R$ ${total.toFixed(2)}`;

    if (Object.keys(carrinhoItens).length > 0) {
        confirmarCompraBtn.style.display = 'block';
    } else {
        confirmarCompraBtn.style.display = 'none';
    }
}



//Continuação do código de cima. Aqui é configurado a confirmação da compra.

// Adicione um evento de clique ao botão de confirmar compra
confirmarCompraBtn.addEventListener('click', () => {
    // Lógica para confirmar a compra
    alert('Compra finalizada! Obrigado por comprar os jogos.');
    // Adicione um evento de clique ao botão de confirmar compra

    // Lógica para confirmar a compra (por exemplo, envio de dados para o servidor, etc.)

    // Esvazie o carrinho  // O carrinho é esvaziado após finalizar a compra.
    for (const jogoId in carrinhoItens) {
        if (carrinhoItens.hasOwnProperty(jogoId)) {
            delete carrinhoItens[jogoId];
        }
    }
    
    // Atualize a exibição do carrinho
    atualizarCarrinho();


});



// Adicione um evento de clique ao botão "Carrinho"
const carrinhoButton = document.getElementById('carrinho-button');
carrinhoButton.addEventListener('click', () => {
    carrinhoList.classList.toggle('carrinho-visible');
});

// Adicione uma classe inicialmente oculta para o carrinho
carrinhoList.classList.add('carrinho-hidden');



//========================================================================================

// URL da api consumida

fetch('https://api-jogos.onrender.com/')
    .then(response => response.json())
    .then(data => {
        data.forEach(jogo => {
            const jogoCard = document.createElement('div');
            jogoCard.classList.add('jogo-card');

            const jogoImg = document.createElement('img');
            jogoImg.classList.add('jogo-img');
            jogoImg.src = jogo.imagem;
            jogoImg.alt = jogo.nome;

            const jogoDados = document.createElement('div');
            jogoDados.classList.add('jogo-dados');
            jogoDados.innerHTML = `
                <h2>${jogo.nome}</h2>
                <p>Plataformas: ${jogo.plataformas}</p>
                <p>Gênero: ${jogo.genero}</p>
                <p>Ano de Lançamento: ${jogo.anoLancamento}</p>
                <p>Preço: ${jogo.preco}</p>
                <button class="comprar-btn" data-id="${jogo.id}">Adicionar ao carrinho</button>
            `;

            jogoCard.appendChild(jogoImg);
            jogoCard.appendChild(jogoDados);
            jogosContainer.appendChild(jogoCard);

            const comprarBtn = jogoDados.querySelector('.comprar-btn');
            comprarBtn.addEventListener('click', () => {
                const jogoId = comprarBtn.getAttribute('data-id');
                if (!carrinhoItens[jogoId]) {
                    carrinhoItens[jogoId] = {
                        id: jogo.id,
                        nome: jogo.nome,
                        preco: jogo.preco
                    };
                    atualizarCarrinho();
                }
            });
        });
    })
    .catch(error => console.error('Erro ao buscar os dados da API:', error));








    //=====================================================================


// ... (seu código existente)

// Adiciona evento de clique ao botão "Carrinho"

carrinhoButton.addEventListener('click', () => {
    carrinhoList.classList.toggle('carrinho-visible');
    atualizarExibicaoBotoes();
});

// Adiciona evento de clique ao botão esvaziar carrinho
const esvaziarCarrinhoBtn = document.getElementById('esvaziar-carrinho');
esvaziarCarrinhoBtn.addEventListener('click', () => {
    carrinhoItens = {}; // Esvazia o carrinho
    atualizarCarrinho(); // Atualiza a exibição do carrinho
    atualizarExibicaoBotoes();
});

// Função para atualizar a exibição dos botões Esvaziar Carrinho e Confirmar Compra
function atualizarExibicaoBotoes() {
    esvaziarCarrinhoBtn.style.display = Object.keys(carrinhoItens).length > 0 ? 'block' : 'none';
    confirmarCompraBtn.style.display = Object.keys(carrinhoItens).length > 0 ? 'block' : 'none';
}

// Adiciona evento de clique ao botão de confirmar compra
confirmarCompraBtn.addEventListener('click', () => {
    // Lógica para confirmar a compra
    alert('Compra finalizada! Obrigado por comprar os jogos.');

    // Lógica para confirmar a compra (por exemplo, envio de dados para o servidor, etc.)

    // Esvazie o carrinho  // O carrinho é esvaziado após finalizar a compra.
    carrinhoItens = {};
    atualizarCarrinho();
    atualizarExibicaoBotoes();
});

// ... (seu código existente)


// ... (seu código existente)













