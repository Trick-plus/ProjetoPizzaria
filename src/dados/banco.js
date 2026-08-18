export const clientes = [];
export const pizzas = [];
export const pedidos = [];

export let idCliente = 1;
export let idPizza = 1;
export let idPedido = 1;

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

export function gerarIdPedido() {
    let id = idPedido;
    idPedido++;
    return id;
}