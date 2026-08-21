export const clientes = [
    {
        id: 1,
        nome: "Joao Silva",
        telefone: "(48) 99999-1111",
        endereco: "Rua das Flores, 100"
    },
    {
        id: 2,
        nome: "Maria Souza",
        telefone: "(48) 98888-2222",
        endereco: "Rua Central, 250"
    },
    {
        id: 3,
        nome: "Pedro Santos",
        telefone: "(48) 97777-3333",
        endereco: "Avenida Brasil, 500"
    }
];

export const pizzas = [
    {
        id: 1,
        nome: "Calabresa",
        descricao: "Calabresa, queijo e cebola",
        preco: 45.00,
        disponivel: true
    },
    {
        id: 2,
        nome: "Frango com Catupiry",
        descricao: "Frango, queijo e catupiry",
        preco: 50.00,
        disponivel: true
    },
    {
        id: 3,
        nome: "Portuguesa",
        descricao: "Presunto, queijo, ovo, cebola e azeitona",
        preco: 48.00,
        disponivel: true
    },
    {
        id: 4,
        nome: "Chocolate com Morango",
        descricao: "Chocolate e morango",
        preco: 42.00,
        disponivel: true
    }
];

export const bebidas = [
    {
        id: 1,
        nome: "Coca-Cola 2L",
        preco: 12.00,
        disponivel: true
    },
    {
        id: 2,
        nome: "Guarana Antarctica 2L",
        preco: 10.00,
        disponivel: true
    },
    {
        id: 3,
        nome: "Coca-Cola Lata",
        preco: 6.00,
        disponivel: true
    },
    {
        id: 4,
        nome: "Guarana Lata",
        preco: 5.00,
        disponivel: true
    },
    {
        id: 5,
        nome: "Fanta Laranja 2L",
        preco: 10.00,
        disponivel: true
    },
    {
        id: 6,
        nome: "Agua 500ml",
        preco: 4.00,
        disponivel: true
    }
];

export const pedidos = [];

export let idCliente = 4;
export let idPizza = 5;
export let idBebida = 7;
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