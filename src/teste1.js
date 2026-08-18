import leia from "readline-sync";

// ======================================================
// SISTEMA DE GERENCIAMENTO DE PIZZARIA - CRUD
// ======================================================

// Banco de dados em memória
const clientes = [];
const categorias = [];
const pizzas = [];
const pedidos = [];

// Contadores dos IDs
let proximoClienteId = 1;
let proximaCategoriaId = 1;
let proximaPizzaId = 1;
let proximoPedidoId = 1;

// ======================================================
// FUNÇÕES AUXILIARES
// ======================================================

function pausar() {
    leia.question("\nPressione ENTER para continuar...");
}

function limparTela() {
    console.clear();
}

function titulo(texto) {
    console.log("\n==============================================");
    console.log(`        ${texto}`);
    console.log("==============================================");
}

function dinheiro(valor) {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

function clientePorId(id) {
    return clientes.find(cliente => cliente.id === id);
}

function categoriaPorId(id) {
    return categorias.find(categoria => categoria.id === id);
}

function pizzaPorId(id) {
    return pizzas.find(pizza => pizza.id === id);
}

function pedidoPorId(id) {
    return pedidos.find(pedido => pedido.id === id);
}

// ======================================================
// CLIENTES - CRUD
// ======================================================

function cadastrarCliente() {
    limparTela();
    titulo("CADASTRAR CLIENTE");

    const nome = leia.question("Nome: ").trim();
    const telefone = leia.question("Telefone: ").trim();
    const endereco = leia.question("Endereco: ").trim();

    if (!nome || !telefone || !endereco) {
        console.log("\nTodos os campos sao obrigatorios.");
        pausar();
        return;
    }

    const cliente = {
        id: proximoClienteId++,
        nome,
        telefone,
        endereco,
        dataCadastro: new Date().toLocaleString("pt-BR")
    };

    clientes.push(cliente);

    console.log("\nCliente cadastrado com sucesso!");
    console.log(`ID: ${cliente.id}`);

    pausar();
}

function listarClientes() {
    limparTela();
    titulo("LISTA DE CLIENTES");

    if (clientes.length === 0) {
        console.log("Nenhum cliente cadastrado.");
        pausar();
        return;
    }

    clientes.forEach(cliente => {
        console.log(`\nID: ${cliente.id}`);
        console.log(`Nome: ${cliente.nome}`);
        console.log(`Telefone: ${cliente.telefone}`);
        console.log(`Endereco: ${cliente.endereco}`);
        console.log(`Cadastrado em: ${cliente.dataCadastro}`);
        console.log("----------------------------------------------");
    });

    pausar();
}

function atualizarCliente() {
    limparTela();
    titulo("ALTERAR CLIENTE");

    if (clientes.length === 0) {
        console.log("Nenhum cliente cadastrado.");
        pausar();
        return;
    }

    listarClientesSemPausa();

    const id = leia.questionInt("\nDigite o ID do cliente: ");
    const cliente = clientePorId(id);

    if (!cliente) {
        console.log("\nCliente nao encontrado.");
        pausar();
        return;
    }

    const nome = leia.question(`Nome (${cliente.nome}): `).trim();
    const telefone = leia.question(`Telefone (${cliente.telefone}): `).trim();
    const endereco = leia.question(`Endereco (${cliente.endereco}): `).trim();

    if (nome) cliente.nome = nome;
    if (telefone) cliente.telefone = telefone;
    if (endereco) cliente.endereco = endereco;

    console.log("\nCliente atualizado com sucesso!");

    pausar();
}

function excluirCliente() {
    limparTela();
    titulo("EXCLUIR CLIENTE");

    if (clientes.length === 0) {
        console.log("Nenhum cliente cadastrado.");
        pausar();
        return;
    }

    listarClientesSemPausa();

    const id = leia.questionInt("\nDigite o ID do cliente: ");
    const indice = clientes.findIndex(cliente => cliente.id === id);

    if (indice === -1) {
        console.log("\nCliente nao encontrado.");
        pausar();
        return;
    }

    const possuiPedido = pedidos.some(pedido => pedido.clienteId === id);

    if (possuiPedido) {
        console.log("\nNao e possivel excluir este cliente porque existem pedidos vinculados a ele.");
        pausar();
        return;
    }

    const confirmacao = leia.keyInYNStrict(
        `Tem certeza que deseja excluir ${clientes[indice].nome}? `
    );

    if (confirmacao) {
        clientes.splice(indice, 1);
        console.log("\nCliente excluido com sucesso!");
    } else {
        console.log("\nOperacao cancelada.");
    }

    pausar();
}

function listarClientesSemPausa() {
    clientes.forEach(cliente => {
        console.log(
            `ID: ${cliente.id} | Nome: ${cliente.nome} | Telefone: ${cliente.telefone}`
        );
    });
}

// ======================================================
// CATEGORIAS - CRUD
// ======================================================

function cadastrarCategoria() {
    limparTela();
    titulo("CADASTRAR CATEGORIA");

    const nome = leia.question("Nome da categoria: ").trim();

    if (!nome) {
        console.log("\nO nome da categoria e obrigatorio.");
        pausar();
        return;
    }

    const categoriaExistente = categorias.some(
        categoria => categoria.nome.toLowerCase() === nome.toLowerCase()
    );

    if (categoriaExistente) {
        console.log("\nEssa categoria ja existe.");
        pausar();
        return;
    }

    const categoria = {
        id: proximaCategoriaId++,
        nome
    };

    categorias.push(categoria);

    console.log("\nCategoria cadastrada com sucesso!");
    pausar();
}

function listarCategorias() {
    limparTela();
    titulo("LISTA DE CATEGORIAS");

    if (categorias.length === 0) {
        console.log("Nenhuma categoria cadastrada.");
        pausar();
        return;
    }

    categorias.forEach(categoria => {
        console.log(`ID: ${categoria.id} | Nome: ${categoria.nome}`);
    });

    pausar();
}

function listarCategoriasSemPausa() {
    categorias.forEach(categoria => {
        console.log(`ID: ${categoria.id} | ${categoria.nome}`);
    });
}

function atualizarCategoria() {
    limparTela();
    titulo("ALTERAR CATEGORIA");

    if (categorias.length === 0) {
        console.log("Nenhuma categoria cadastrada.");
        pausar();
        return;
    }

    listarCategoriasSemPausa();

    const id = leia.questionInt("\nDigite o ID da categoria: ");
    const categoria = categoriaPorId(id);

    if (!categoria) {
        console.log("\nCategoria nao encontrada.");
        pausar();
        return;
    }

    const novoNome = leia.question(`Novo nome (${categoria.nome}): `).trim();

    if (!novoNome) {
        console.log("\nNenhuma alteracao realizada.");
        pausar();
        return;
    }

    categoria.nome = novoNome;

    console.log("\nCategoria atualizada com sucesso!");

    pausar();
}

function excluirCategoria() {
    limparTela();
    titulo("EXCLUIR CATEGORIA");

    if (categorias.length === 0) {
        console.log("Nenhuma categoria cadastrada.");
        pausar();
        return;
    }

    listarCategoriasSemPausa();

    const id = leia.questionInt("\nDigite o ID da categoria: ");
    const indice = categorias.findIndex(categoria => categoria.id === id);

    if (indice === -1) {
        console.log("\nCategoria nao encontrada.");
        pausar();
        return;
    }

    const possuiPizza = pizzas.some(
        pizza => pizza.categoriaId === id
    );

    if (possuiPizza) {
        console.log(
            "\nNao e possivel excluir a categoria porque existem pizzas vinculadas a ela."
        );
        pausar();
        return;
    }

    const confirmacao = leia.keyInYNStrict(
        `Deseja excluir ${categorias[indice].nome}? `
    );

    if (confirmacao) {
        categorias.splice(indice, 1);
        console.log("\nCategoria excluida com sucesso!");
    } else {
        console.log("\nOperacao cancelada.");
    }

    pausar();
}

// ======================================================
// PIZZAS - CRUD
// ======================================================

function cadastrarPizza() {
    limparTela();
    titulo("CADASTRAR PIZZA");

    if (categorias.length === 0) {
        console.log("Cadastre pelo menos uma categoria antes.");
        pausar();
        return;
    }

    const nome = leia.question("Nome da pizza: ").trim();
    const descricao = leia.question("Descricao: ").trim();
    const preco = leia.questionFloat("Preco: R$ ");

    if (!nome || !descricao || preco <= 0) {
        console.log("\nDados invalidos.");
        pausar();
        return;
    }

    console.log("\nCategorias:");
    listarCategoriasSemPausa();

    const categoriaId = leia.questionInt("\nDigite o ID da categoria: ");
    const categoria = categoriaPorId(categoriaId);

    if (!categoria) {
        console.log("\nCategoria nao encontrada.");
        pausar();
        return;
    }

    const pizza = {
        id: proximaPizzaId++,
        nome,
        descricao,
        preco,
        categoriaId,
        disponivel: true
    };

    pizzas.push(pizza);

    console.log("\nPizza cadastrada com sucesso!");
    pausar();
}

function listarPizzas() {
    limparTela();
    titulo("LISTA DE PIZZAS");

    if (pizzas.length === 0) {
        console.log("Nenhuma pizza cadastrada.");
        pausar();
        return;
    }

    pizzas.forEach(pizza => {
        const categoria = categoriaPorId(pizza.categoriaId);

        console.log(`\nID: ${pizza.id}`);
        console.log(`Nome: ${pizza.nome}`);
        console.log(`Descricao: ${pizza.descricao}`);
        console.log(`Categoria: ${categoria ? categoria.nome : "Sem categoria"}`);
        console.log(`Preco: ${dinheiro(pizza.preco)}`);
        console.log(`Disponivel: ${pizza.disponivel ? "Sim" : "Nao"}`);
        console.log("----------------------------------------------");
    });

    pausar();
}

function listarPizzasDisponiveis() {
    pizzas
        .filter(pizza => pizza.disponivel)
        .forEach(pizza => {
            const categoria = categoriaPorId(pizza.categoriaId);

            console.log(
                `ID: ${pizza.id} | ${pizza.nome} | ${categoria?.nome ?? "Sem categoria"} | ${dinheiro(pizza.preco)}`
            );
        });
}

function atualizarPizza() {
    limparTela();
    titulo("ALTERAR PIZZA");

    if (pizzas.length === 0) {
        console.log("Nenhuma pizza cadastrada.");
        pausar();
        return;
    }

    pizzas.forEach(pizza => {
        console.log(
            `ID: ${pizza.id} | ${pizza.nome} | ${dinheiro(pizza.preco)}`
        );
    });

    const id = leia.questionInt("\nDigite o ID da pizza: ");
    const pizza = pizzaPorId(id);

    if (!pizza) {
        console.log("\nPizza nao encontrada.");
        pausar();
        return;
    }

    const nome = leia.question(`Nome (${pizza.nome}): `).trim();
    const descricao = leia.question(`Descricao (${pizza.descricao}): `).trim();
    const precoTexto = leia.question(
        `Preco (${dinheiro(pizza.preco)}): R$ `
    ).trim();

    if (nome) pizza.nome = nome;
    if (descricao) pizza.descricao = descricao;

    if (precoTexto) {
        const novoPreco = Number(precoTexto);

        if (!isNaN(novoPreco) && novoPreco > 0) {
            pizza.preco = novoPreco;
        }
    }

    console.log("\nPizza atualizada com sucesso!");
    pausar();
}

function excluirPizza() {
    limparTela();
    titulo("EXCLUIR PIZZA");

    if (pizzas.length === 0) {
        console.log("Nenhuma pizza cadastrada.");
        pausar();
        return;
    }

    pizzas.forEach(pizza => {
        console.log(
            `ID: ${pizza.id} | ${pizza.nome} | ${dinheiro(pizza.preco)}`
        );
    });

    const id = leia.questionInt("\nDigite o ID da pizza: ");
    const indice = pizzas.findIndex(pizza => pizza.id === id);

    if (indice === -1) {
        console.log("\nPizza nao encontrada.");
        pausar();
        return;
    }

    const usadaEmPedido = pedidos.some(
        pedido => pedido.itens.some(item => item.pizzaId === id)
    );

    if (usadaEmPedido) {
        console.log(
            "\nEssa pizza ja foi utilizada em um pedido e nao pode ser excluida."
        );
        console.log("Voce pode deixar a pizza como indisponivel.");

        pausar();
        return;
    }

    const confirmacao = leia.keyInYNStrict(
        `Deseja excluir ${pizzas[indice].nome}? `
    );

    if (confirmacao) {
        pizzas.splice(indice, 1);
        console.log("\nPizza excluida com sucesso!");
    } else {
        console.log("\nOperacao cancelada.");
    }

    pausar();
}

function alterarDisponibilidadePizza() {
    limparTela();
    titulo("ALTERAR DISPONIBILIDADE");

    if (pizzas.length === 0) {
        console.log("Nenhuma pizza cadastrada.");
        pausar();
        return;
    }

    pizzas.forEach(pizza => {
        console.log(
            `ID: ${pizza.id} | ${pizza.nome} | Disponivel: ${pizza.disponivel ? "Sim" : "Nao"}`
        );
    });

    const id = leia.questionInt("\nDigite o ID da pizza: ");
    const pizza = pizzaPorId(id);

    if (!pizza) {
        console.log("\nPizza nao encontrada.");
        pausar();
        return;
    }

    pizza.disponivel = !pizza.disponivel;

    console.log(
        `\nPizza agora esta ${pizza.disponivel ? "DISPONIVEL" : "INDISPONIVEL"}.`
    );

    pausar();
}

// ======================================================
// PEDIDOS
// ======================================================

function criarPedido() {
    limparTela();
    titulo("NOVO PEDIDO");

    if (clientes.length === 0) {
        console.log("Cadastre pelo menos um cliente antes.");
        pausar();
        return;
    }

    if (pizzas.filter(pizza => pizza.disponivel).length === 0) {
        console.log("Nao existem pizzas disponiveis.");
        pausar();
        return;
    }

    console.log("\nCLIENTES:");
    listarClientesSemPausa();

    const clienteId = leia.questionInt("\nID do cliente: ");
    const cliente = clientePorId(clienteId);

    if (!cliente) {
        console.log("\nCliente nao encontrado.");
        pausar();
        return;
    }

    const itens = [];

    while (true) {
        console.log("\n----------------------------------------------");
        console.log("PIZZAS DISPONIVEIS");
        console.log("----------------------------------------------");

        listarPizzasDisponiveis();

        console.log("\n0 - Finalizar pedido");

        const pizzaId = leia.questionInt("\nDigite o ID da pizza: ");

        if (pizzaId === 0) {
            break;
        }

        const pizza = pizzaPorId(pizzaId);

        if (!pizza || !pizza.disponivel) {
            console.log("\nPizza invalida ou indisponivel.");
            continue;
        }

        const quantidade = leia.questionInt("Quantidade: ");

        if (quantidade <= 0) {
            console.log("\nQuantidade invalida.");
            continue;
        }

        const itemExistente = itens.find(
            item => item.pizzaId === pizzaId
        );

        if (itemExistente) {
            itemExistente.quantidade += quantidade;
        } else {
            itens.push({
                pizzaId: pizza.id,
                quantidade,
                precoUnitario: pizza.preco
            });
        }

        console.log("\nPizza adicionada ao pedido!");
    }

    if (itens.length === 0) {
        console.log("\nPedido cancelado. Nenhum item foi adicionado.");
        pausar();
        return;
    }

    let total = 0;

    itens.forEach(item => {
        total += item.precoUnitario * item.quantidade;
    });

    const pedido = {
        id: proximoPedidoId++,
        clienteId,
        itens,
        total,
        status: "Recebido",
        data: new Date().toLocaleString("pt-BR")
    };

    pedidos.push(pedido);

    console.log("\n==============================================");
    console.log("             PEDIDO CRIADO");
    console.log("==============================================");
    console.log(`Pedido: #${pedido.id}`);
    console.log(`Cliente: ${cliente.nome}`);
    console.log(`Total: ${dinheiro(pedido.total)}`);
    console.log(`Status: ${pedido.status}`);

    pausar();
}

function listarPedidos() {
    limparTela();
    titulo("LISTA DE PEDIDOS");

    if (pedidos.length === 0) {
        console.log("Nenhum pedido cadastrado.");
        pausar();
        return;
    }

    pedidos.forEach(pedido => {
        const cliente = clientePorId(pedido.clienteId);

        console.log(`\nPedido #${pedido.id}`);
        console.log(`Cliente: ${cliente ? cliente.nome : "Desconhecido"}`);
        console.log(`Data: ${pedido.data}`);
        console.log(`Status: ${pedido.status}`);
        console.log(`Total: ${dinheiro(pedido.total)}`);
        console.log("Itens:");

        pedido.itens.forEach(item => {
            const pizza = pizzaPorId(item.pizzaId);

            console.log(
                `  - ${pizza ? pizza.nome : "Pizza removida"} x${item.quantidade} = ${dinheiro(item.precoUnitario * item.quantidade)}`
            );
        });

        console.log("----------------------------------------------");
    });

    pausar();
}

function consultarPedido() {
    limparTela();
    titulo("CONSULTAR PEDIDO");

    if (pedidos.length === 0) {
        console.log("Nenhum pedido cadastrado.");
        pausar();
        return;
    }

    const id = leia.questionInt("Digite o ID do pedido: ");
    const pedido = pedidoPorId(id);

    if (!pedido) {
        console.log("\nPedido nao encontrado.");
        pausar();
        return;
    }

    const cliente = clientePorId(pedido.clienteId);

    console.log("\n==============================================");
    console.log(`PEDIDO #${pedido.id}`);
    console.log("==============================================");

    console.log(`Cliente: ${cliente?.nome ?? "Desconhecido"}`);
    console.log(`Telefone: ${cliente?.telefone ?? "N/A"}`);
    console.log(`Endereco: ${cliente?.endereco ?? "N/A"}`);
    console.log(`Data: ${pedido.data}`);
    console.log(`Status: ${pedido.status}`);

    console.log("\nItens:");

    pedido.itens.forEach(item => {
        const pizza = pizzaPorId(item.pizzaId);

        console.log(
            `${pizza?.nome ?? "Pizza removida"} | Quantidade: ${item.quantidade} | Preco: ${dinheiro(item.precoUnitario)}`
        );
    });

    console.log(`\nTOTAL: ${dinheiro(pedido.total)}`);

    pausar();
}

function atualizarStatusPedido() {
    limparTela();
    titulo("ALTERAR STATUS DO PEDIDO");

    if (pedidos.length === 0) {
        console.log("Nenhum pedido cadastrado.");
        pausar();
        return;
    }

    pedidos.forEach(pedido => {
        console.log(
            `#${pedido.id} | ${pedido.status} | ${dinheiro(pedido.total)}`
        );
    });

    const id = leia.questionInt("\nDigite o ID do pedido: ");
    const pedido = pedidoPorId(id);

    if (!pedido) {
        console.log("\nPedido nao encontrado.");
        pausar();
        return;
    }

    console.log("\nStatus disponiveis:");
    console.log("1 - Recebido");
    console.log("2 - Em preparo");
    console.log("3 - Pronto");
    console.log("4 - Saiu para entrega");
    console.log("5 - Entregue");
    console.log("6 - Cancelado");

    const opcao = leia.questionInt("\nEscolha: ");

    const status = {
        1: "Recebido",
        2: "Em preparo",
        3: "Pronto",
        4: "Saiu para entrega",
        5: "Entregue",
        6: "Cancelado"
    };

    if (!status[opcao]) {
        console.log("\nOpcao invalida.");
        pausar();
        return;
    }

    pedido.status = status[opcao];

    console.log(`\nPedido #${pedido.id} alterado para: ${pedido.status}`);

    pausar();
}

function excluirPedido() {
    limparTela();
    titulo("EXCLUIR PEDIDO");

    if (pedidos.length === 0) {
        console.log("Nenhum pedido cadastrado.");
        pausar();
        return;
    }

    pedidos.forEach(pedido => {
        console.log(
            `#${pedido.id} | ${pedido.status} | ${dinheiro(pedido.total)}`
        );
    });

    const id = leia.questionInt("\nDigite o ID do pedido: ");
    const indice = pedidos.findIndex(pedido => pedido.id === id);

    if (indice === -1) {
        console.log("\nPedido nao encontrado.");
        pausar();
        return;
    }

    const pedido = pedidos[indice];

    if (pedido.status !== "Cancelado") {
        console.log(
            "\nPara excluir um pedido, primeiro altere o status para 'Cancelado'."
        );
        pausar();
        return;
    }

    const confirmacao = leia.keyInYNStrict(
        `Deseja excluir o pedido #${id}? `
    );

    if (confirmacao) {
        pedidos.splice(indice, 1);
        console.log("\nPedido excluido com sucesso!");
    } else {
        console.log("\nOperacao cancelada.");
    }

    pausar();
}

// ======================================================
// RELATORIOS
// ======================================================

function resumoSistema() {
    limparTela();
    titulo("RESUMO DO SISTEMA");

    const pedidosAtivos = pedidos.filter(
        pedido =>
            pedido.status !== "Entregue" &&
            pedido.status !== "Cancelado"
    );

    const faturamento = pedidos
        .filter(pedido => pedido.status !== "Cancelado")
        .reduce((total, pedido) => total + pedido.total, 0);

    console.log(`Clientes cadastrados: ${clientes.length}`);
    console.log(`Categorias cadastradas: ${categorias.length}`);
    console.log(`Pizzas cadastradas: ${pizzas.length}`);
    console.log(`Pedidos registrados: ${pedidos.length}`);
    console.log(`Pedidos em andamento: ${pedidosAtivos.length}`);
    console.log(`Faturamento total: ${dinheiro(faturamento)}`);

    pausar();
}

// ======================================================
// MENUS
// ======================================================

function menuClientes() {
    while (true) {
        limparTela();
        titulo("MENU DE CLIENTES");

        console.log("1 - Cadastrar clientoooo");
        console.log("2 - Listar clientes");
        console.log("3 - Alterar cliente");
        console.log("4 - Excluir cliente");
        console.log("0 - Voltar");

        const opcao = leia.questionInt("\nEscolha uma opcao: ");

        switch (opcao) {
            case 1:
                cadastrarCliente();
                break;
            case 2:
                listarClientes();
                break;
            case 3:
                atualizarCliente();
                break;
            case 4:
                excluirCliente();
                break;
            case 0:
                return;
            default:
                console.log("\nOpcao invalida.");
                pausar();
        }
    }
}

function menuCategorias() {
    while (true) {
        limparTela();
        titulo("MENU DE CATEGORIAS");

        console.log("1 - Cadastrar categoria");
        console.log("2 - Listar categorias");
        console.log("3 - Alterar categoria");
        console.log("4 - Excluir categoria");
        console.log("0 - Voltar");

        const opcao = leia.questionInt("\nEscolha uma opcao: ");

        switch (opcao) {
            case 1:
                cadastrarCategoria();
                break;
            case 2:
                listarCategorias();
                break;
            case 3:
                atualizarCategoria();
                break;
            case 4:
                excluirCategoria();
                break;
            case 0:
                return;
            default:
                console.log("\nOpcao invalida.");
                pausar();
        }
    }
}

function menuPizzas() {
    while (true) {
        limparTela();
        titulo("MENU DE PIZZAS");

        console.log("1 - Cadastrar pizza");
        console.log("2 - Listar pizzas");
        console.log("3 - Alterar pizza");
        console.log("4 - Excluir pizza");
        console.log("5 - Alterar disponibilidade");
        console.log("0 - Voltar");

        const opcao = leia.questionInt("\nEscolha uma opcao: ");

        switch (opcao) {
            case 1:
                cadastrarPizza();
                break;
            case 2:
                listarPizzas();
                break;
            case 3:
                atualizarPizza();
                break;
            case 4:
                excluirPizza();
                break;
            case 5:
                alterarDisponibilidadePizza();
                break;
            case 0:
                return;
            default:
                console.log("\nOpcao invalida.");
                pausar();
        }
    }
}

function menuPedidos() {
    while (true) {
        limparTela();
        titulo("MENU DE PEDIDOS");

        console.log("1 - Novo pedido");
        console.log("2 - Listar pedidos");
        console.log("3 - Consultar pedido");
        console.log("4 - Alterar status");
        console.log("5 - Excluir pedido");
        console.log("0 - Voltar");

        const opcao = leia.questionInt("\nEscolha uma opcao: ");

        switch (opcao) {
            case 1:
                criarPedido();
                break;
            case 2:
                listarPedidos();
                break;
            case 3:
                consultarPedido();
                break;
            case 4:
                atualizarStatusPedido();
                break;
            case 5:
                excluirPedido();
                break;
            case 0:
                return;
            default:
                console.log("\nOpcao invalida.");
                pausar();
        }
    }
}

// ======================================================
// DADOS INICIAIS
// ======================================================

function carregarDadosIniciais() {

    // Categorias
    categorias.push(
        {
            id: proximaCategoriaId++,
            nome: "Pizzas Salgadas"
        },
        {
            id: proximaCategoriaId++,
            nome: "Pizzas Doces"
        },
        {
            id: proximaCategoriaId++,
            nome: "Bebidas"
        }
    );

    // Pizzas
    pizzas.push(
        {
            id: proximaPizzaId++,
            nome: "Calabresa",
            descricao: "Calabresa, queijo e cebola",
            preco: 45,
            categoriaId: 1,
            disponivel: true
        },
        {
            id: proximaPizzaId++,
            nome: "Frango com Catupiry",
            descricao: "Frango, queijo e catupiry",
            preco: 50,
            categoriaId: 1,
            disponivel: true
        },
        {
            id: proximaPizzaId++,
            nome: "Chocolate com Morango",
            descricao: "Chocolate e morango",
            preco: 40,
            categoriaId: 2,
            disponivel: true
        }
    );

    // Clientes
    clientes.push(
        {
            id: proximoClienteId++,
            nome: "Joao Silva",
            telefone: "(47) 99999-9999",
            endereco: "Rua das Flores, 100",
            dataCadastro: new Date().toLocaleString("pt-BR")
        },
        {
            id: proximoClienteId++,
            nome: "Maria Souza",
            telefone: "(47) 98888-8888",
            endereco: "Rua Central, 250",
            dataCadastro: new Date().toLocaleString("pt-BR")
        }
    );
}

// ======================================================
// PROGRAMA PRINCIPAL
// ======================================================

function iniciarSistema() {

    carregarDadosIniciais();

    while (true) {

        limparTela();

        console.log("==============================================");
        console.log("       SISTEMA DE GERENCIAMENTO");
        console.log("               DE PIZZARIA");
        console.log("==============================================");

        console.log("\n1 - Clientes");
        console.log("2 - Categorias");
        console.log("3 - Pizzas");
        console.log("4 - Pedidos");
        console.log("5 - Resumo do sistema");
        console.log("0 - Sair");

        const opcao = leia.questionInt("\nEscolha uma opcao: ");

        switch (opcao) {

            case 1:
                menuClientes();
                break;

            case 2:
                menuCategorias();
                break;

            case 3:
                menuPizzas();
                break;

            case 4:
                menuPedidos();
                break;

            case 5:
                resumoSistema();
                break;

            case 0:
                limparTela();
                console.log("==============================================");
                console.log("     Obrigado por usar o sistema!");
                console.log("==============================================\n");
                process.exit(0);

            default:
                console.log("\nOpcao invalida.");
                pausar();
        }
    }
}

// Inicia o sistema
iniciarSistema();