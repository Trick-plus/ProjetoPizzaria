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
        console.log("2 - Pizzas");
        console.log("3 - Bebidas");
        console.log("4 - Pedidos");
        console.log("0 - Sair");

        opcao = leia.questionInt("\nEscolha uma opcao: ");

        if (opcao == 1) {
            menuClientes();
        } else if (opcao == 2) {
            menuPizzas();
        } else if (opcao == 3) {
            menuBebidas();
        } else if (opcao == 4) {
            menuPedidos();
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
            cadastrarCliente();
        } else if (opcao == 2) {
            listarClientes();
        } else if (opcao == 3) {
            buscarCliente();
        } else if (opcao == 4) {
            alterarCliente();
        } else if (opcao == 5) {
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
            cadastrarPizza();
        } else if (opcao == 2) {
            listarPizzas();
        } else if (opcao == 3) {
            buscarPizza();
        } else if (opcao == 4) {
            alterarPizza();
        } else if (opcao == 5) {
            alterarDisponibilidadePizza();
        } else if (opcao == 6) {
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
            cadastrarBebida();
        } else if (opcao == 2) {
            listarBebidas();
        } else if (opcao == 3) {
            buscarBebida();
        } else if (opcao == 4) {
            alterarBebida();
        } else if (opcao == 5) {
            alterarDisponibilidadeBebida();
        } else if (opcao == 6) {
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
            criarPedido();
        } else if (opcao == 2) {
            listarPedidos();
        } else if (opcao == 3) {
            consultarPedido();
        } else if (opcao == 4) {
            alterarStatusPedido();
        } else if (opcao == 5) {
            excluirPedido();
        } else if (opcao != 0) {
            console.log("\nOpcao invalida.");
        }

        if (opcao != 0) {
            leia.question("\nPressione ENTER...");
        }
    }
}

