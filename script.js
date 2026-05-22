// ===============================
// CARDÁPIO BATATA GOURMET
// ===============================

const produtos = [
    {
        id: 1,
        nome: "Batata Cheddar Bacon",
        descricao: "Batata recheada com cheddar cremoso, bacon crocante e cebolinha fresca.",
        preco: 32.90,
        imagem: "./assets/img/batata-cheddar-bacon.png"
    },

    {
        id: 2,
        nome: "Batata Frango Catupiry",
        descricao: "Frango desfiado temperado com Catupiry original e queijo gratinado.",
        preco: 34.90,
        imagem: "./assets/img/batata-frango-catupiry.png"
    },

    {
        id: 3,
        nome: "Batata Calabresa Suprema",
        descricao: "Calabresa acebolada, mussarela derretida e molho especial da casa.",
        preco: 33.90,
        imagem: "./assets/img/batata-calabresa-suprema.png"
    },

    {
        id: 4,
        nome: "Batata Costela Barbecue",
        descricao: "Costela desfiada ao molho barbecue com cheddar e cebola crispy.",
        preco: 39.90,
        imagem: "./assets/img/batata-costela-barbecue.png"
    },

    {
        id: 5,
        nome: "Batata Strogonoff Gourmet",
        descricao: "Strogonoff cremoso de carne com batata palha e parmesão ralado.",
        preco: 37.90,
        imagem: "./assets/img/batata-strogonoff-gourmet.png"
    },

    {
        id: 6,
        nome: "Batata Vegetariana Premium",
        descricao: "Brócolis, milho, champignon, queijo e molho branco artesanal.",
        preco: 31.90,
        imagem: "./assets/img/batata-vegetariana-premium.png"
    },

    {
        id: 7,
        nome: "Batata Camarão Especial",
        descricao: "Camarões salteados no alho com requeijão cremoso e queijo gratinado.",
        preco: 44.90,
        imagem: "./assets/img/batata-camarao-especial.png"
    },

    {
        id: 8,
        nome: "Batata Filé Mignon",
        descricao: "Cubos de filé mignon ao molho especial com queijo premium gratinado.",
        preco: 42.90,
        imagem: "./assets/img/batata-file-mignon.png"
    }
];

let carrinho = [];

// ===============================
// ELEMENTOS DOM
// ===============================

const cardapioContainer = document.getElementById("cardapio");
const modalCarrinho = document.getElementById("modal-carrinho");
const btnVerCarrinho = document.getElementById("btn-ver-carrinho");
const btnFecharModal = document.getElementById("btn-fechar-modal");
const itensCarrinhoContainer = document.getElementById("itens-carrinho");
const totalBarra = document.getElementById("total-barra");
const totalModal = document.getElementById("total-modal");
const contadorCarrinho = document.getElementById("contador-carrinho");
const inputEndereco = document.getElementById("input-endereco");
const avisoEndereco = document.getElementById("aviso-endereco");
const btnFinalizarPedido = document.getElementById("btn-finalizar-pedido");

// ===============================
// RENDERIZAR CARDÁPIO
// ===============================

function renderizarCardapio() {

    cardapioContainer.innerHTML = "";

    produtos.forEach(produto => {

        const div = document.createElement("div");

        div.className =
            "bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 flex flex-col";

        div.innerHTML = `
            <img 
                src="${produto.imagem}" 
                alt="${produto.nome}" 
                class="w-full h-56 object-cover"
            >

            <div class="p-4 flex flex-col flex-1 justify-between">

                <div>
                    <h3 class="font-bold text-lg text-gray-900 mb-1">
                        ${produto.nome}
                    </h3>

                    <p class="text-gray-500 text-sm leading-relaxed mb-4">
                        ${produto.descricao}
                    </p>
                </div>

                <div class="flex items-center justify-between mt-auto">

                    <span class="font-bold text-2xl text-orange-600">
                        R$ ${produto.preco.toFixed(2).replace(".", ",")}
                    </span>

                    <button
                        class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow transition-all active:scale-95 btn-add"
                        data-id="${produto.id}"
                    >
                        <i class="fa-solid fa-plus mr-1"></i>
                        Adicionar
                    </button>

                </div>

            </div>
        `;

        cardapioContainer.appendChild(div);
    });
}

// ===============================
// ADICIONAR AO CARRINHO
// ===============================

cardapioContainer.addEventListener("click", (e) => {

    const botao = e.target.closest(".btn-add");

    if (botao) {

        const id = parseInt(botao.getAttribute("data-id"));

        adicionarAoCarrinho(id);
    }
});

function adicionarAoCarrinho(id) {

    const produto = produtos.find(p => p.id === id);

    const itemExistente = carrinho.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }

    atualizarInterface();
}

// ===============================
// ATUALIZAR INTERFACE
// ===============================

function atualizarInterface() {

    let total = 0;
    let totalItens = 0;

    carrinho.forEach(item => {

        total += item.preco * item.quantidade;

        totalItens += item.quantidade;
    });

    const totalFormatado =
        `R$ ${total.toFixed(2).replace(".", ",")}`;

    totalBarra.textContent = totalFormatado;

    totalModal.textContent = totalFormatado;

    contadorCarrinho.textContent = totalItens;
}

// ===============================
// MODAL CARRINHO
// ===============================

btnVerCarrinho.addEventListener("click", () => {

    renderizarCarrinhoModal();

    modalCarrinho.classList.remove("hidden");
});

btnFecharModal.addEventListener("click", () => {

    modalCarrinho.classList.add("hidden");
});

modalCarrinho.addEventListener("click", (e) => {

    if (e.target === modalCarrinho) {

        modalCarrinho.classList.add("hidden");
    }
});

// ===============================
// RENDERIZAR CARRINHO
// ===============================

function renderizarCarrinhoModal() {

    itensCarrinhoContainer.innerHTML = "";

    if (carrinho.length === 0) {

        itensCarrinhoContainer.innerHTML = `
            <p class="text-gray-500 text-center py-4">
                Seu carrinho está vazio.
            </p>
        `;

        return;
    }

    carrinho.forEach(item => {

        const div = document.createElement("div");

        div.className =
            "flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100";

        div.innerHTML = `
            <div class="flex-1">

                <h4 class="font-bold text-gray-900 text-sm">
                    ${item.nome}
                </h4>

                <span class="text-xs text-gray-500">
                    R$ ${item.preco.toFixed(2).replace(".", ",")} un.
                </span>

            </div>

            <div class="flex items-center gap-3">

                <button
                    class="text-red-500 hover:text-red-700 px-1 font-bold btn-diminuir"
                    data-id="${item.id}"
                >
                    -
                </button>

                <span class="font-semibold text-sm bg-white border px-2 py-0.5 rounded-md">
                    ${item.quantidade}
                </span>

                <button
                    class="text-green-500 hover:text-green-700 px-1 font-bold btn-aumentar"
                    data-id="${item.id}"
                >
                    +
                </button>

            </div>
        `;

        itensCarrinhoContainer.appendChild(div);
    });
}

// ===============================
// ALTERAR QUANTIDADE
// ===============================

itensCarrinhoContainer.addEventListener("click", (e) => {

    if (e.target.classList.contains("btn-aumentar")) {

        const id = parseInt(e.target.getAttribute("data-id"));

        const item = carrinho.find(i => i.id === id);

        item.quantidade++;

        atualizarInterface();

        renderizarCarrinhoModal();
    }

    if (e.target.classList.contains("btn-diminuir")) {

        const id = parseInt(e.target.getAttribute("data-id"));

        const idx = carrinho.findIndex(i => i.id === id);

        if (carrinho[idx].quantidade > 1) {

            carrinho[idx].quantidade--;

        } else {

            carrinho.splice(idx, 1);
        }

        atualizarInterface();

        renderizarCarrinhoModal();
    }
});

// ===============================
// FINALIZAR PEDIDO
// ===============================

btnFinalizarPedido.addEventListener("click", () => {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio!");

        return;
    }

    if (inputEndereco.value.trim() === "") {

        avisoEndereco.classList.remove("hidden");

        inputEndereco.classList.add("border-red-500");

        return;
    }

    avisoEndereco.classList.add("hidden");

    inputEndereco.classList.remove("border-red-500");

    let msg = `🍟 *NOVO PEDIDO - BATATA GOURMET* 🍟\n\n`;

    carrinho.forEach(item => {

        msg += `• ${item.quantidade}x ${item.nome}\n`;
    });

    let total = carrinho.reduce(
        (acc, item) => acc + (item.preco * item.quantidade),
        0
    );

    msg += `\n💰 *Total:* R$ ${total.toFixed(2)}`;

    msg += `\n📍 *Endereço:* ${inputEndereco.value}`;

    const telefone = "5511999999999";

    const url =
        `https://api.whatsapp.com/send?phone=${telefone}&text=${encodeURIComponent(msg)}`;

    carrinho = [];

    atualizarInterface();

    inputEndereco.value = "";

    modalCarrinho.classList.add("hidden");

    window.open(url, "_blank");
});

// ===============================
// INICIALIZAÇÃO
// ===============================

renderizarCardapio();
