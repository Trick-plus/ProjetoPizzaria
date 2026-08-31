export function limparTela() {
    console.clear();
}

export function formatarData(data) {
    return new Date(data).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

export function mostrarCabecalhoCadastro(titulo) {
    limparTela();
    console.log("====================================");
    console.log(titulo);
    console.log("====================================");
}
