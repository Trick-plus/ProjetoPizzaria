import fs from "node:fs";

const arquivoDados = new URL("./dados.json", import.meta.url);
const dados = JSON.parse(fs.readFileSync(arquivoDados, "utf8"));

export const clientes = dados.clientes;
export const pizzas = dados.pizzas;
export const bebidas = dados.bebidas;
export const pedidos = dados.pedidos;

export let idCliente = dados.proximosIds.cliente;
export let idPizza = dados.proximosIds.pizza;
export let idBebida = dados.proximosIds.bebida;
export let idPedido = dados.proximosIds.pedido;

export function salvarDados() {
    const conteudo = {
        clientes,
        pizzas,
        bebidas,
        pedidos,
        proximosIds: {
            cliente: idCliente,
            pizza: idPizza,
            bebida: idBebida,
            pedido: idPedido
        }
    };

    fs.writeFileSync(arquivoDados, JSON.stringify(conteudo, null, 2));
}

export function gerarIdCliente() {
    let id = idCliente;
    idCliente++;
    return id;
}

export function gerarIdPizza() {
    let id = idPizza;
    idPizza++;
    return id;
}

export function gerarIdBebida() {
    let id = idBebida;
    idBebida++;
    return id;
}

export function gerarIdPedido() {
    let id = idPedido;
    idPedido++;
    return id;
}
