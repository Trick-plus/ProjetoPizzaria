import leia from "readline-sync";
import { bebidas, pedidos, gerarIdBebida, salvarDados } from "../2.banco/dados.js";

function formatarData(data) {
    return new Date(data).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

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
        disponivel: true,
        atualizadoEm: new Date().toISOString()
    };

    bebidas.push(bebida);
    salvarDados();

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
        console.log("Atualizado em: " + formatarData(bebidas[i].atualizadoEm));
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
            console.log("Atualizado em: " + formatarData(bebidas[i].atualizadoEm));
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
            let foiAlterado = false;

            if (nome != "") {
                bebidas[i].nome = nome;
                foiAlterado = true;
            }

            if (descricao != "") {
                bebidas[i].descricao = descricao;
                foiAlterado = true;
            }

            if (preco > 0) {
                bebidas[i].preco = preco;
                foiAlterado = true;
            }

            if (foiAlterado == true) {
                bebidas[i].atualizadoEm = new Date().toISOString();
                salvarDados();
                console.log("\nBebida alterada com sucesso!");
            } else {
                console.log("\nNenhum dado foi alterado.");
            }

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

            bebidas[i].atualizadoEm = new Date().toISOString();
            salvarDados();

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
            salvarDados();

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