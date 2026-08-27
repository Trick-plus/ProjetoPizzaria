import leia from "readline-sync";
import { clientes, pedidos, gerarIdCliente, salvarDados } from "../2.banco/dados.js";

function formatarData(data) {
    return new Date(data).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

export function cadastrarCliente() {
    console.clear();

    console.log("====================================");
    console.log("        CADASTRAR CLIENTE");
    console.log("====================================");

    let nome = leia.question("Nome: ");
    let telefone = leia.question("Telefone: ");
    let endereco = leia.question("Endereco: ");

    if (nome == "" || telefone == "" || endereco == "") {
        console.log("\nPreencha todos os campos.");
        return;
    }

    let cliente = {
        id: gerarIdCliente(),
        nome: nome,
        telefone: telefone,
        endereco: endereco,
        atualizadoEm: new Date().toISOString()
    };

    clientes.push(cliente);
    salvarDados();

    console.log("\nCliente cadastrado com sucesso!");
}

export function listarClientes() {
    console.clear();

    console.log("====================================");
    console.log("          LISTA DE CLIENTES");
    console.log("====================================");

    if (clientes.length == 0) {
        console.log("\nNenhum cliente cadastrado.");
        return;
    }

    let i = 0;

    while (i < clientes.length) {
        console.log("\nID: " + clientes[i].id);
        console.log("Nome: " + clientes[i].nome);
        console.log("Telefone: " + clientes[i].telefone);
        console.log("Endereco: " + clientes[i].endereco);
        console.log("Atualizado em: " + formatarData(clientes[i].atualizadoEm));
        console.log("------------------------------------");

        i++;
    }
}

export function buscarCliente() {
    console.clear();

    console.log("====================================");
    console.log("           BUSCAR CLIENTE");
    console.log("====================================");

    let nome = leia.question("Digite o nome: ");

    let encontrado = false;
    let i = 0;

    while (i < clientes.length) {
        if (clientes[i].nome.toLowerCase() == nome.toLowerCase()) {
            console.log("\nCliente encontrado!");
            console.log("ID: " + clientes[i].id);
            console.log("Nome: " + clientes[i].nome);
            console.log("Telefone: " + clientes[i].telefone);
            console.log("Endereco: " + clientes[i].endereco);
            console.log("Atualizado em: " + formatarData(clientes[i].atualizadoEm));

            encontrado = true;
        }

        i++;
    }

    if (encontrado == false) {
        console.log("\nCliente nao encontrado.");
    }
}

export function alterarCliente() {
    console.clear();

    console.log("====================================");
    console.log("          ALTERAR CLIENTE");
    console.log("====================================");

    if (clientes.length == 0) {
        console.log("Nenhum cliente cadastrado.");
        return;
    }

    listarClientes();

    let id = leia.questionInt("\nDigite o ID do cliente: ");

    let encontrado = false;
    let i = 0;

    while (i < clientes.length) {
        if (clientes[i].id == id) {
            let nome = leia.question("Novo nome: ");
            let telefone = leia.question("Novo telefone: ");
            let endereco = leia.question("Novo endereco: ");
            let foiAlterado = false;

            if (nome != "") {
                clientes[i].nome = nome;
                foiAlterado = true;
            }

            if (telefone != "") {
                clientes[i].telefone = telefone;
                foiAlterado = true;
            }

            if (endereco != "") {
                clientes[i].endereco = endereco;
                foiAlterado = true;
            }

            if (foiAlterado == true) {
                clientes[i].atualizadoEm = new Date().toISOString();
                salvarDados();
                console.log("\nCliente alterado com sucesso!");
            } else {
                console.log("\nNenhum dado foi alterado.");
            }

            encontrado = true;
        }

        i++;
    }

    if (encontrado == false) {
        console.log("\nCliente nao encontrado.");
    }
}

export function excluirCliente() {
    console.clear();

    console.log("====================================");
    console.log("          EXCLUIR CLIENTE");
    console.log("====================================");

    if (clientes.length == 0) {
        console.log("Nenhum cliente cadastrado.");
        return;
    }

    listarClientes();

    let id = leia.questionInt("\nDigite o ID do cliente: ");

    let encontrado = false;
    let possuiPedido = false;

    let i = 0;

    while (i < pedidos.length) {
        if (pedidos[i].clienteId == id) {
            possuiPedido = true;
        }

        i++;
    }

    if (possuiPedido == true) {
        console.log("\nEsse cliente possui pedidos e nao pode ser excluido.");
        return;
    }

    i = 0;

    while (i < clientes.length) {
        if (clientes[i].id == id) {
            clientes.splice(i, 1);
            salvarDados();

            console.log("\nCliente excluido com sucesso!");

            encontrado = true;
            break;
        }

        i++;
    }

    if (encontrado == false) {
        console.log("\nCliente nao encontrado.");
    }
}