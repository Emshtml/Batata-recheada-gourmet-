// ======================================
// DADOS MOCKADOS - BATATA GOURMET
// ======================================

let pedidos = [
    {
        id: 2041,
        itens: "1x Batata Cheddar Bacon, 1x Coca-Cola",
        endereco: "Av. Paulista, 1000 - Apto 42",
        total: 38.90,
        status: "Pendente"
    },

    {
        id: 2040,
        itens: "2x Batata Frango Catupiry",
        endereco: "Rua Augusta, 540",
        total: 69.80,
        status: "Preparando"
    },

    {
        id: 2039,
        itens: "1x Batata Costela Barbecue",
        endereco: "Rua Oscar Freire, 200",
        total: 39.90,
        status: "Concluído"
    }
];

let cupons = [
    {
        codigo: "BATATA10",
        valor: 10.00,
        ativo: true
    },

    {
        codigo: "GOURMET5",
        valor: 5.00,
        ativo: true
    },

    {
        codigo: "CHEDDAR15",
        valor: 15.00,
        ativo: false
    }
];

// ======================================
// PRODUTOS DO CARDÁPIO
// ======================================

let produtosAdmin = [

    {
        id: 1,
        nome: "Batata Cheddar Bacon",
        preco: 32.90,
        imagem: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?q=80&w=1000"
    },

    {
        id: 2,
        nome: "Batata Frango Catupiry",
        preco: 34.90,
        imagem: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=1000"
    },

    {
        id: 3,
        nome: "Batata Costela Barbecue",
        preco: 39.90,
        imagem: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1000"
    },

    {
        id: 4,
        nome: "Batata Camarão Especial",
        preco: 44.90,
        imagem: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000"
    }
];

// ======================================
// LOGIN
// ======================================

const formLogin = document.getElementById("form-login");

const telaLogin = document.getElementById("tela-login");

const painelPrincipal =
    document.getElementById("painel-principal");

const erroLogin =
    document.getElementById("erro-login");

formLogin.addEventListener("submit", (e) => {

    e.preventDefault();

    const usuario =
        document.getElementById("login-usuario").value;

    const senha =
        document.getElementById("login-senha").value;

    if (usuario === "admin" && senha === "123456") {

        telaLogin.classList.add("hidden");

        painelPrincipal.classList.remove("hidden");

        inicializarPainel();

    } else {

        erroLogin.classList.remove("hidden");
    }
});

document.getElementById("btn-logout")
.addEventListener("click", () => {

    window.location.reload();
});

// ======================================
// NAVEGAÇÃO ENTRE ABAS
// ======================================

const botoesMenu =
    document.querySelectorAll("#menu-navegacao button");

const secoesAbas =
    document.querySelectorAll("main > section");

botoesMenu.forEach(botao => {

    botao.addEventListener("click", () => {

        const abaAlvo =
            botao.getAttribute("data-id")
            || botao.getAttribute("data-aba");

        // RESET VISUAL MENU

        botoesMenu.forEach(b => {

            b.className =
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm text-left text-gray-300 hover:bg-amber-900 hover:text-white";
        });

        // BOTÃO ATIVO

        botao.className =
            "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm text-left bg-yellow-500 text-white";

        // SEÇÕES

        secoesAbas.forEach(secao => {

            if (secao.id === `aba-${abaAlvo}`) {

                secao.classList.remove("hidden");

            } else {

                secao.classList.add("hidden");
            }
        });
    });
});

// ======================================
// INICIALIZAÇÃO
// ======================================

function inicializarPainel() {

    renderizarPedidos();

    renderizarProdutos();

    renderizarCupons();

    inicializarGraficos();
}

// ======================================
// PEDIDOS
// ======================================

function renderizarPedidos() {

    const tabela =
        document.getElementById("tabela-pedidos");

    tabela.innerHTML = "";

    pedidos.forEach(p => {

        const tr = document.createElement("tr");

        tr.className =
            "border-b hover:bg-yellow-50 transition-all";

        let badgeColor =
            p.status === "Pendente"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-blue-100 text-blue-700";

        if (p.status === "Concluído") {

            badgeColor =
                "bg-green-100 text-green-700";
        }

        tr.innerHTML = `
            <td class="p-4 font-bold text-gray-900">
                #${p.id}
            </td>

            <td class="p-4 font-medium">
                ${p.itens}
            </td>

            <td class="p-4 text-xs text-gray-500 max-w-xs truncate">
                ${p.endereco}
            </td>

            <td class="p-4 font-bold text-yellow-600">
                R$ ${p.total.toFixed(2)}
            </td>

            <td class="p-4">
                <span class="px-2.5 py-1 rounded-full text-xs font-semibold ${badgeColor}">
                    ${p.status}
                </span>
            </td>

            <td class="p-4 text-right space-x-1">

                ${
                    p.status !== "Concluído"

                    ? `
                    <button
                        onclick="avancarStatus(${p.id})"
                        class="bg-amber-950 hover:bg-amber-900 text-white text-xs px-2.5 py-1.5 rounded-lg transition-all"
                    >
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>
                    `

                    : ""
                }
            </td>
        `;

        tabela.appendChild(tr);
    });

    document.getElementById("badge-pedidos")
    .textContent =
        pedidos.filter(p =>
            p.status !== "Concluído").length;
}

// ======================================
// AVANÇAR STATUS
// ======================================

window.avancarStatus = (id) => {

    const pedido =
        pedidos.find(p => p.id === id);

    if (pedido.status === "Pendente") {

        pedido.status = "Preparando";

    } else if (pedido.status === "Preparando") {

        pedido.status = "Concluído";
    }

    renderizarPedidos();
};

// ======================================
// PRODUTOS
// ======================================

function renderizarProdutos() {

    const grid =
        document.getElementById("grid-admin-produtos");

    grid.innerHTML = "";

    produtosAdmin.forEach(prod => {

        const div = document.createElement("div");

        div.className =
            "bg-white p-4 rounded-2xl border border-yellow-100 shadow-sm flex items-center gap-4";

        div.innerHTML = `
            <img
                src="${prod.imagem}"
                class="w-16 h-16 rounded-xl object-cover"
            >

            <div class="flex-1">

                <h4 class="font-bold text-gray-900 text-sm">
                    ${prod.nome}
                </h4>

                <p class="text-sm font-semibold text-yellow-600 mt-0.5">
                    R$ ${prod.preco.toFixed(2)}
                </p>
            </div>

            <button
                onclick="deletarProduto(${prod.id})"
                class="text-gray-400 hover:text-red-500 p-2"
            >
                <i class="fa-solid fa-trash-can"></i>
            </button>
        `;

        grid.appendChild(div);
    });
}

// ======================================
// NOVO PRODUTO
// ======================================

document.getElementById("btn-novo-produto")
.addEventListener("click", () => {

    const nome =
        prompt("Nome da Batata Gourmet:");

    const preco =
        parseFloat(prompt("Preço (ex: 39.90):"));

    if (nome && preco) {

        produtosAdmin.push({

            id: Date.now(),

            nome,

            preco,

            imagem:
                "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?q=80&w=1000"
        });

        renderizarProdutos();
    }
});

// ======================================
// DELETAR PRODUTO
// ======================================

window.deletarProduto = (id) => {

    produtosAdmin =
        produtosAdmin.filter(p => p.id !== id);

    renderizarProdutos();
};

// ======================================
// CUPONS
// ======================================

const formCupom =
    document.getElementById("form-cupom");

formCupom.addEventListener("submit", (e) => {

    e.preventDefault();

    const codigo =
        document.getElementById("cupom-codigo")
        .value
        .trim()
        .toUpperCase();

    const valor =
        parseFloat(
            document.getElementById("cupom-valor").value
        );

    if (codigo && valor) {

        cupons.push({
            codigo,
            valor,
            ativo: true
        });

        formCupom.reset();

        renderizarCupons();
    }
});

// ======================================
// RENDER CUPONS
// ======================================

function renderizarCupons() {

    const tabela =
        document.getElementById("tabela-cupons");

    tabela.innerHTML = "";

    cupons.forEach(cupom => {

        const tr = document.createElement("tr");

        tr.className =
            "border-b hover:bg-yellow-50 transition-all";

        tr.innerHTML = `
            <td class="p-4 font-mono font-bold text-gray-900">
                ${cupom.codigo}
            </td>

            <td class="p-4 font-semibold text-green-600">
                R$ ${cupom.valor.toFixed(2)}
            </td>

            <td class="p-4">

                <span class="px-2 py-0.5 text-xs font-medium rounded-full
                    ${
                        cupom.ativo
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-600'
                    }
                ">

                    ${cupom.ativo ? 'Ativo' : 'Inativo'}
                </span>
            </td>

            <td class="p-4 text-right">

                <button
                    onclick="alternarCupom('${cupom.codigo}')"
                    class="text-xs font-semibold
                    ${
                        cupom.ativo
                        ? 'text-red-500 hover:text-red-700'
                        : 'text-green-500 hover:text-green-700'
                    }"
                >
                    ${cupom.ativo ? 'Desativar' : 'Ativar'}
                </button>
            </td>
        `;

        tabela.appendChild(tr);
    });

    document.getElementById("dash-total-cupons")
    .textContent =
        cupons.filter(c => c.ativo).length;
}

// ======================================
// ATIVAR / DESATIVAR CUPOM
// ======================================

window.alternarCupom = (codigo) => {

    const cupom =
        cupons.find(c => c.codigo === codigo);

    cupom.ativo = !cupom.ativo;

    renderizarCupons();
};

// ======================================
// CHARTS
// ======================================

function inicializarGraficos() {

    // ======================================
    // GRÁFICO FATURAMENTO
    // ======================================

    const ctxVendas =
        document.getElementById('chart-vendas')
        .getContext('2d');

    new Chart(ctxVendas, {

        type: 'line',

        data: {

            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],

            datasets: [{

                label: 'Faturamento (R$)',

                data: [
                    18000,
                    22000,
                    19500,
                    26800,
                    29400,
                    33200
                ],

                borderColor: '#eab308',

                backgroundColor:
                    'rgba(234, 179, 8, 0.15)',

                tension: 0.3,

                fill: true
            }]
        },

        options: {
            responsive: true
        }
    });

    // ======================================
    // MAIS VENDIDOS
    // ======================================

    const ctxProdutos =
        document.getElementById('chart-produtos')
        .getContext('2d');

    new Chart(ctxProdutos, {

        type: 'doughnut',

        data: {

            labels: [
                'Cheddar Bacon',
                'Frango Catupiry',
                'Costela BBQ',
                'Camarão Especial'
            ],

            datasets: [{

                data: [45, 30, 15, 10],

                backgroundColor: [
                    '#eab308',
                    '#f97316',
                    '#92400e',
                    '#16a34a'
                ]
            }]
        },

        options: {
            responsive: true
        }
    });
}
