import leia from "readline-sync";
import { pizzas, pedidos, gerarIdPizza } from "../2.banco/dados.js";

export function cadastrarPizza() {
    console.clear();

    console.log("====================================");
    console.log("           CADASTRAR PIZZA");
    console.log("====================================");

    let nome = leia.question("Nome da pizza: ");
    let descricao = leia.question("Descricao: ");
    let preco = leia.questionFloat("Preco: R$ ");

    if (nome == "" || descricao == "" || preco <= 0) {
        console.log("\nDados invalidos.");
        return;
    }

    let pizza = {
        id: gerarIdPizza(),
        nome: nome,
        descricao: descricao,
        preco: preco,
        disponivel: true
    };

    pizzas.push(pizza);

    console.log("\nPizza cadastrada com sucesso!");
}

export function listarPizzas() {
    console.clear();

    console.log("====================================");
    console.log("            LISTA DE PIZZAS");
    console.log("====================================");

    if (pizzas.length == 0) {
        console.log("\nNenhuma pizza cadastrada.");
        return;
    }

    let i = 0;

    while (i < pizzas.length) {
        console.log("\nID: " + pizzas[i].id);
        console.log("Nome: " + pizzas[i].nome);
        console.log("Descricao: " + pizzas[i].descricao);
        console.log("Preco: R$ " + pizzas[i].preco.toFixed(2));
        
        if (pizzas[i].disponivel == true) {
            console.log("Disponivel: SIM");
        } else {
            console.log("Disponivel: NAO");
        }

        console.log("------------------------------------");

        i++;
    }
}

export function buscarPizza() {
    console.clear();

    console.log("====================================");
    console.log("             BUSCAR PIZZA");
    console.log("====================================");

    let nome = leia.question("Digite o nome da pizza: ");

    let encontrado = false;
    let i = 0;

    while (i < pizzas.length) {
        if (pizzas[i].nome.toLowerCase() == nome.toLowerCase()) {
            console.log("\nPizza encontrada!");
            console.log("ID: " + pizzas[i].id);
            console.log("Nome: " + pizzas[i].nome);
            console.log("Descricao: " + pizzas[i].descricao);
            console.log("Preco: R$ " + pizzas[i].preco.toFixed(2));

            encontrado = true;
        }

        i++;
    }

    if (encontrado == false) {
        console.log("\nPizza nao encontrada.");
    }
}

export function alterarPizza() {
    console.clear();

    console.log("====================================");
    console.log("            ALTERAR PIZZA");
    console.log("====================================");

    if (pizzas.length == 0) {
        console.log("Nenhuma pizza cadastrada.");
        return;
    }

    listarPizzas();

    let id = leia.questionInt("\nDigite o ID da pizza: ");

    let encontrado = false;
    let i = 0;

    while (i < pizzas.length) {
        if (pizzas[i].id == id) {
            let nome = leia.question("Novo nome: ");
            let descricao = leia.question("Nova descricao: ");
            let preco = leia.questionFloat("Novo preco: R$ ");

            if (nome != "") {
                pizzas[i].nome = nome;
            }

            if (descricao != "") {
                pizzas[i].descricao = descricao;
            }

            if (preco > 0) {
                pizzas[i].preco = preco;
            }

            console.log("\nPizza alterada com sucesso!");

            encontrado = true;
        }

        i++;
    }

    if (encontrado == false) {
        console.log("\nPizza nao encontrada.");
    }
}

export function alterarDisponibilidade() {
    console.clear();

    console.log("====================================");
    console.log("       DISPONIBILIDADE DA PIZZA");
    console.log("====================================");

    listarPizzas();

    if (pizzas.length == 0) {
        return;
    }

    let id = leia.questionInt("\nDigite o ID da pizza: ");

    let encontrado = false;
    let i = 0;

    while (i < pizzas.length) {
        if (pizzas[i].id == id) {
            if (pizzas[i].disponivel == true) {
                pizzas[i].disponivel = false;
                console.log("\nPizza marcada como indisponivel.");
            } else {
                pizzas[i].disponivel = true;
                console.log("\nPizza marcada como disponivel.");
            }

            encontrado = true;
        }

        i++;
    }

    if (encontrado == false) {
        console.log("\nPizza nao encontrada.");
    }
}

export function excluirPizza() {
    console.clear();

    console.log("====================================");
    console.log("            EXCLUIR PIZZA");
    console.log("====================================");

    if (pizzas.length == 0) {
        console.log("Nenhuma pizza cadastrada.");
        return;
    }

    listarPizzas();

    let id = leia.questionInt("\nDigite o ID da pizza: ");

    let possuiPedido = false;
    let encontrado = false;

    let i = 0;

    while (i < pedidos.length) {
        let j = 0;

        while (j < pedidos[i].itens.length) {
            if (pedidos[i].itens[j].pizzaId == id) {
                possuiPedido = true;
            }

            j++;
        }

        i++;
    }

    if (possuiPedido == true) {
        console.log("\nEssa pizza esta presente em um pedido.");
        console.log("Nao sera possivel excluir.");
        return;
    }

    i = 0;

    while (i < pizzas.length) {
        if (pizzas[i].id == id) {
            pizzas.splice(i, 1);

            console.log("\nPizza excluida com sucesso!");

            encontrado = true;
            break;
        }

        i++;
    }

    if (encontrado == false) {
        console.log("\nPizza nao encontrada.");
    }
}