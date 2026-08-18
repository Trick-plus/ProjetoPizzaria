import leia from "readline-sync";
import {
    clientes,
    pizzas,
    pedidos,
    gerarIdPedido
} from "../dados/banco.js";

export function criarPedido() {
    console.clear();

    console.log("====================================");
    console.log("             NOVO PEDIDO");
    console.log("====================================");

    if (clientes.length == 0) {
        console.log("\nNao existem clientes cadastrados.");
        return;
    }

    if (pizzas.length == 0) {
        console.log("\nNao existem pizzas cadastradas.");
        return;
    }

    console.log("\nCLIENTES:");

    let i = 0;

    while (i < clientes.length) {
        console.log(
            clientes[i].id + " - " + clientes[i].nome
        );

        i++;
    }

    let clienteId = leia.questionInt("\nDigite o ID do cliente: ");

    let clienteExiste = false;

    i = 0;

    while (i < clientes.length) {
        if (clientes[i].id == clienteId) {
            clienteExiste = true;
        }

        i++;
    }

    if (clienteExiste == false) {
        console.log("\nCliente nao encontrado.");
        return;
    }

    let itens = [];
    let continuar = true;

    while (continuar == true) {
        console.log("\n====================================");
        console.log("             CARDAPIO");
        console.log("====================================");

        i = 0;

        while (i < pizzas.length) {
            if (pizzas[i].disponivel == true) {
                console.log(
                    pizzas[i].id +
                    " - " +
                    pizzas[i].nome +
                    " - R$ " +
                    pizzas[i].preco.toFixed(2)
                );
            }

            i++;
        }

        console.log("0 - Finalizar pedido");

        let pizzaId = leia.questionInt("\nID da pizza: ");

        if (pizzaId == 0) {
            continuar = false;
        } else {
            let pizzaEncontrada = false;
            let precoPizza = 0;

            i = 0;

            while (i < pizzas.length) {
                if (pizzas[i].id == pizzaId) {
                    if (pizzas[i].disponivel == true) {
                        pizzaEncontrada = true;
                        precoPizza = pizzas[i].preco;
                    }
                }

                i++;
            }

            if (pizzaEncontrada == false) {
                console.log("\nPizza invalida ou indisponivel.");
            } else {
                let quantidade = leia.questionInt("Quantidade: ");

                if (quantidade <= 0) {
                    console.log("\nQuantidade invalida.");
                } else {
                    let item = {
                        pizzaId: pizzaId,
                        quantidade: quantidade,
                        precoUnitario: precoPizza
                    };

                    itens.push(item);

                    console.log("\nPizza adicionada ao pedido!");
                }
            }
        }
    }

    if (itens.length == 0) {
        console.log("\nNenhum produto foi adicionado.");
        console.log("Pedido cancelado.");
        return;
    }

    let total = 0;

    i = 0;

    while (i < itens.length) {
        total =
            total +
            itens[i].quantidade * itens[i].precoUnitario;

        i++;
    }

    let pedido = {
        id: gerarIdPedido(),
        clienteId: clienteId,
        itens: itens,
        total: total,
        status: "Recebido"
    };

    pedidos.push(pedido);

    console.log("\n====================================");
    console.log("         PEDIDO CRIADO");
    console.log("====================================");

    console.log("Numero do pedido: " + pedido.id);
    console.log("Total: R$ " + pedido.total.toFixed(2));
    console.log("Status: " + pedido.status);
}

export function listarPedidos() {
    console.clear();

    console.log("====================================");
    console.log("            PEDIDOS");
    console.log("====================================");

    if (pedidos.length == 0) {
        console.log("\nNenhum pedido cadastrado.");
        return;
    }

    let i = 0;

    while (i < pedidos.length) {
        console.log("\nPedido: #" + pedidos[i].id);
        console.log("Cliente ID: " + pedidos[i].clienteId);
        console.log("Total: R$ " + pedidos[i].total.toFixed(2));
        console.log("Status: " + pedidos[i].status);

        console.log("------------------------------------");

        i++;
    }
}

export function consultarPedido() {
    console.clear();

    console.log("====================================");
    console.log("          CONSULTAR PEDIDO");
    console.log("====================================");

    if (pedidos.length == 0) {
        console.log("Nenhum pedido cadastrado.");
        return;
    }

    let id = leia.questionInt("Digite o ID do pedido: ");

    let encontrado = false;
    let i = 0;

    while (i < pedidos.length) {
        if (pedidos[i].id == id) {
            encontrado = true;

            console.log("\nPedido #" + pedidos[i].id);
            console.log("Cliente ID: " + pedidos[i].clienteId);
            console.log("Status: " + pedidos[i].status);

            console.log("\nItens:");

            let j = 0;

            while (j < pedidos[i].itens.length) {
                console.log(
                    "Pizza ID: " +
                    pedidos[i].itens[j].pizzaId +
                    " | Quantidade: " +
                    pedidos[i].itens[j].quantidade +
                    " | Preco: R$ " +
                    pedidos[i].itens[j].precoUnitario.toFixed(2)
                );

                j++;
            }

            console.log(
                "\nTOTAL: R$ " +
                pedidos[i].total.toFixed(2)
            );
        }

        i++;
    }

    if (encontrado == false) {
        console.log("\nPedido nao encontrado.");
    }
}

export function alterarStatusPedido() {
    console.clear();

    console.log("====================================");
    console.log("         ALTERAR STATUS");
    console.log("====================================");

    if (pedidos.length == 0) {
        console.log("Nenhum pedido cadastrado.");
        return;
    }

    let i = 0;

    while (i < pedidos.length) {
        console.log(
            "#" +
            pedidos[i].id +
            " - " +
            pedidos[i].status
        );

        i++;
    }

    let id = leia.questionInt("\nID do pedido: ");

    let encontrado = false;

    i = 0;

    while (i < pedidos.length) {
        if (pedidos[i].id == id) {
            encontrado = true;

            console.log("\n1 - Recebido");
            console.log("2 - Em preparo");
            console.log("3 - Pronto");
            console.log("4 - Saiu para entrega");
            console.log("5 - Entregue");
            console.log("6 - Cancelado");

            let opcao = leia.questionInt("\nEscolha: ");

            if (opcao == 1) {
                pedidos[i].status = "Recebido";
            } else if (opcao == 2) {
                pedidos[i].status = "Em preparo";
            } else if (opcao == 3) {
                pedidos[i].status = "Pronto";
            } else if (opcao == 4) {
                pedidos[i].status = "Saiu para entrega";
            } else if (opcao == 5) {
                pedidos[i].status = "Entregue";
            } else if (opcao == 6) {
                pedidos[i].status = "Cancelado";
            } else {
                console.log("\nOpcao invalida.");
                return;
            }

            console.log(
                "\nStatus alterado para: " +
                pedidos[i].status
            );
        }

        i++;
    }

    if (encontrado == false) {
        console.log("\nPedido nao encontrado.");
    }
}

export function excluirPedido() {
    console.clear();

    console.log("====================================");
    console.log("          EXCLUIR PEDIDO");
    console.log("====================================");

    if (pedidos.length == 0) {
        console.log("Nenhum pedido cadastrado.");
        return;
    }

    let id = leia.questionInt("Digite o ID do pedido: ");

    let encontrado = false;
    let i = 0;

    while (i < pedidos.length) {
        if (pedidos[i].id == id) {
            encontrado = true;

            if (pedidos[i].status == "Cancelado") {
                pedidos.splice(i, 1);

                console.log("\nPedido excluido com sucesso.");
            } else {
                console.log(
                    "\nSomente pedidos cancelados podem ser excluidos."
                );
            }
        }

        i++;
    }

    if (encontrado == false) {
        console.log("\nPedido nao encontrado.");
    }
}