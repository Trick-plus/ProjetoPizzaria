import leia from "readline-sync";
import { bebidas, pedidos, gerarIdBebida } from "../2.banco/dados.js";

export function cadastrarBebida() {
    console.clear();

    console.log("====================================");
    console.log("           CADASTRAR BEBIDA");
    console.log("====================================");

    let nome = leia.question("Nome da bebida: ");
    let descricao = leia.question("Descricao: ");
    let preco = leia.questionFloat("Preco: R$ ");

    if (nome == "" || descricao == "" || preco <= 0) {
        console.log("\nDados invalidos.");
        return;
    }

    let bebida = {
        id: gerarIdBebida(),
        nome: nome,
        descricao: descricao,
        preco: preco,
        disponivel: true
    };

    bebidas.push(bebida);

    console.log("\nBebida cadastrada com sucesso!");
}

export function listarBebidas() {
    console.clear();

    console.log("====================================");
    console.log("            LISTA DE BEBIDAS");
    console.log("====================================");

    if (bebidas.length == 0) {
        console.log("\nNenhuma bebida cadastrada.");
        return;
    }

    let i = 0;

    while (i < bebidas.length) {
        console.log("\nID: " + bebidas[i].id);
        console.log("Nome: " + bebidas[i].nome);
        console.log("Descricao: " + bebidas[i].descricao);
        console.log("Preco: R$ " + bebidas[i].preco.toFixed(2));
        
        if (bebidas[i].disponivel == true) {
            console.log("Disponivel: SIM");
        } else {
            console.log("Disponivel: NAO");
        }

        console.log("------------------------------------");

        i++;
    }
}

export function buscarBebida() {
    console.clear();

    console.log("====================================");
    console.log("             BUSCAR BEBIDA");
    console.log("====================================");

    let nome = leia.question("Digite o nome da bebida: ");

    let encontrado = false;
    let i = 0;

    while (i < bebidas.length) {
        if (bebidas[i].nome.toLowerCase() == nome.toLowerCase()) {
            console.log("\nBebida encontrada!");
            console.log("ID: " + bebidas[i].id);
            console.log("Nome: " + bebidas[i].nome);
            console.log("Descricao: " + bebidas[i].descricao);
            console.log("Preco: R$ " + bebidas[i].preco.toFixed(2));

            encontrado = true;
        }

        i++;
    }

    if (encontrado == false) {
        console.log("\nBebida nao encontrada.");
    }
}

export function alterarBebida() {
    console.clear();

    console.log("====================================");
    console.log("            ALTERAR BEBIDA");
    console.log("====================================");

    if (bebidas.length == 0) {
        console.log("Nenhuma bebida cadastrada.");
        return;
    }

    listarBebidas();

    let id = leia.questionInt("\nDigite o ID da bebida: ");

    let encontrado = false;
    let i = 0;

    while (i < bebidas.length) {
        if (bebidas[i].id == id) {
            let nome = leia.question("Novo nome: ");
            let descricao = leia.question("Nova descricao: ");
            let preco = leia.questionFloat("Novo preco: R$ ");

            if (nome != "") {
                bebidas[i].nome = nome;
            }

            if (descricao != "") {
                bebidas[i].descricao = descricao;
            }

            if (preco > 0) {
                bebidas[i].preco = preco;
            }

            console.log("\nBebida alterada com sucesso!");

            encontrado = true;
        }

        i++;
    }

    if (encontrado == false) {
        console.log("\nBebida nao encontrada.");
    }
}

export function alterarDisponibilidade() {
    console.clear();

    console.log("====================================");
    console.log("       DISPONIBILIDADE DA BEBIDA");
    console.log("====================================");

    listarBebidas();

    if (bebidas.length == 0) {
        return;
    }

    let id = leia.questionInt("\nDigite o ID da bebida: ");

    let encontrado = false;
    let i = 0;

    while (i < bebidas.length) {
        if (bebidas[i].id == id) {
            if (bebidas[i].disponivel == true) {
                bebidas[i].disponivel = false;
                console.log("\nBebida marcada como indisponivel.");
            } else {
                bebidas[i].disponivel = true;
                console.log("\nBebida marcada como disponivel.");
            }

            encontrado = true;
        }

        i++;
    }

    if (encontrado == false) {
        console.log("\nBebida nao encontrada.");
    }
}

export function excluirBebida() {
    console.clear();

    console.log("====================================");
    console.log("            EXCLUIR BEBIDA");
    console.log("====================================");

    if (bebidas.length == 0) {
        console.log("Nenhuma bebida cadastrada.");
        return;
    }

    listarBebidas();

    let id = leia.questionInt("\nDigite o ID da bebida: ");

    let possuiPedido = false;
    let encontrado = false;

    let i = 0;

    while (i < pedidos.length) {
        let j = 0;

        while (j < pedidos[i].itens.length) {
            if (pedidos[i].itens[j].bebidaId == id) {
                possuiPedido = true;
            }

            j++;
        }

        i++;
    }

    if (possuiPedido == true) {
        console.log("\nEssa bebida esta presente em um pedido.");
        console.log("Nao sera possivel excluir.");
        return;
    }

    i = 0;

    while (i < bebidas.length) {
        if (bebidas[i].id == id) {
            bebidas.splice(i, 1);

            console.log("\nBebida excluida com sucesso!");

            encontrado = true;
            break;
        }

        i++;
    }

    if (encontrado == false) {
        console.log("\nBebida nao encontrada.");
    }
}