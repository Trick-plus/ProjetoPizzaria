import leia from "readline-sync";

import {
    cadastrarCliente,
    listarClientes,
    buscarCliente,
    alterarCliente,
    excluirCliente
} from "../clientes/clientes.js";

import {
    criarPedido,
    listarPedidos,
    consultarPedido,
    alterarStatusPedido,
    excluirPedido
} from "../pedidos/pedidos.js";

import {
    cadastrarPizza,
    listarPizzas,
    buscarPizza,
    alterarPizza,
    alterarDisponibilidade as alterarDisponibilidadePizza,
    excluirPizza
} from "../produtos/pizzas.js";

import {
    cadastrarBebida,
    listarBebidas,
    buscarBebida,
    alterarBebida,
    alterarDisponibilidade as alterarDisponibilidadeBebida,
    excluirBebida
} from "../produtos/bebidas.js";

export function menuPrincipal() {
    let opcao = -1;

    while (opcao != 0) {
        console.clear();

        console.log("====================================");
        console.log("     SISTEMA DE GERENCIAMENTO");
        console.log("           DE PIZZARIA");
        console.log("====================================");
        
        console.log("\n1 - Clientes");
        console.log("2 - Pedidos");
        console.log("3 - Pizzas");
        console.log("4 - Bebidas");
        console.log("0 - Sair");

        opcao = leia.questionInt("\nEscolha uma opcao: ");

        if (opcao == 1) {
            console.clear();
            menuClientes();
        } else if (opcao == 2) {
            console.clear();
            menuPedidos();
        } else if (opcao == 3) {
            console.clear();
            menuPizzas();
        } else if (opcao == 4) {
            console.clear();
            menuBebidas();
        } else if (opcao == 0) {
            console.log("\nSistema encerrado.");
        } else {
            console.log("\nOpcao invalida.");
            leia.question("\nPressione ENTER...");
        }
    }
}

export function menuClientes() {
    let opcao = -1;

    while (opcao != 0) {
        console.clear();

        console.log("====================================");
        console.log("             CLIENTES");
        console.log("====================================");

        console.log("1 - Cadastrar");
        console.log("2 - Listar");
        console.log("3 - Buscar");
        console.log("4 - Alterar");
        console.log("5 - Excluir");
        console.log("0 - Voltar");

        opcao = leia.questionInt("\nEscolha: ");

        if (opcao == 1) {
            console.clear();
            cadastrarCliente();
        } else if (opcao == 2) {
            console.clear();
            listarClientes();
        } else if (opcao == 3) {
            console.clear();
            buscarCliente();
        } else if (opcao == 4) {
            console.clear();
            alterarCliente();
        } else if (opcao == 5) {
            console.clear();
            excluirCliente();
        } else if (opcao != 0) {
            console.log("\nOpcao invalida.");
        }

        if (opcao != 0) {
            leia.question("\nPressione ENTER...");
        }
    }
}

export function menuPizzas() {
    let opcao = -1;

    while (opcao != 0) {
        console.clear();

        console.log("====================================");
        console.log("              PIZZAS");
        console.log("====================================");

        console.log("1 - Cadastrar");
        console.log("2 - Listar");
        console.log("3 - Buscar");
        console.log("4 - Alterar");
        console.log("5 - Alterar disponibilidade");
        console.log("6 - Excluir");
        console.log("0 - Voltar");

        opcao = leia.questionInt("\nEscolha: ");

        if (opcao == 1) {
            console.clear();
            cadastrarPizza();
        } else if (opcao == 2) {
            console.clear();
            listarPizzas();
        } else if (opcao == 3) {
            console.clear();
            buscarPizza();
        } else if (opcao == 4) {
            console.clear();
            alterarPizza();
        } else if (opcao == 5) {
            console.clear();
            alterarDisponibilidadePizza();
        } else if (opcao == 6) {
            console.clear();
            excluirPizza();
        } else if (opcao != 0) {
            console.log("\nOpcao invalida.");
        }

        if (opcao != 0) {
            leia.question("\nPressione ENTER...");
        }
    }
}

export function menuBebidas() {
    let opcao = -1;

    while (opcao != 0) {
        console.clear();

        console.log("====================================");
        console.log("              BEBIDAS");
        console.log("====================================");

        console.log("1 - Cadastrar");
        console.log("2 - Listar");
        console.log("3 - Buscar");
        console.log("4 - Alterar");
        console.log("5 - Alterar disponibilidade");
        console.log("6 - Excluir");
        console.log("0 - Voltar");

        opcao = leia.questionInt("\nEscolha: ");

        if (opcao == 1) {
            console.clear();
            cadastrarBebida();
        } else if (opcao == 2) {
            console.clear();
            listarBebidas();
        } else if (opcao == 3) {
            console.clear();
            buscarBebida();
        } else if (opcao == 4) {
            console.clear();
            alterarBebida();
        } else if (opcao == 5) {
            console.clear();
            alterarDisponibilidadeBebida();
        } else if (opcao == 6) {
            console.clear();
            excluirBebida();
        } else if (opcao != 0) {
            console.log("\nOpcao invalida.");
        }

        if (opcao != 0) {
            leia.question("\nPressione ENTER...");
        }
    }
}

export function menuPedidos() {
    let opcao = -1;

    while (opcao != 0) {
        console.clear();

        console.log("====================================");
        console.log("              PEDIDOS");
        console.log("====================================");

        console.log("1 - Criar pedido");
        console.log("2 - Listar pedidos");
        console.log("3 - Consultar pedido");
        console.log("4 - Alterar status");
        console.log("5 - Excluir pedido");
        console.log("0 - Voltar");

        opcao = leia.questionInt("\nEscolha: ");

        if (opcao == 1) {
            console.clear();
            criarPedido();
        } else if (opcao == 2) {
            console.clear();
            listarPedidos();
        } else if (opcao == 3) {
            console.clear();
            consultarPedido();
        } else if (opcao == 4) {
            console.clear();
            alterarStatusPedido();
        } else if (opcao == 5) {
            console.clear();
            excluirPedido();
        } else if (opcao != 0) {
            console.log("\nOpcao invalida.");
        }

        if (opcao != 0) {
            leia.question("\nPressione ENTER...");
        }
    }
}

