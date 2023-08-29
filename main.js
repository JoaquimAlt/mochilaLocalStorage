const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach(function(elemento) {
    criarNovoItem(elemento);
});

form.onsubmit = function(evento) {
    evento.preventDefault();

    const nome = evento.target.elements['nome'].value;
    const quantidade = evento.target.elements['quantidade'].value;

    const existe = itens.find(elemento => elemento.nome === nome);

    const itemAtual = {
        "nome": nome,
        "quantidade": quantidade
    };

    if (existe) {
        itemAtual.id = existe.id;
        atualizaItem(itemAtual);
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0
        itens.push(itemAtual);
        criarNovoItem(itemAtual);
    }

    localStorage.setItem("itens", JSON.stringify(itens));
};

function criarNovoItem(item) {
    const novoItem = document.createElement('li');
    novoItem.classList.add("item");

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;

    lista.appendChild(novoItem);

    novoItem.appendChild(botaoDeleta(item.id))
}

function atualizaItem(item) {
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade;
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";

    elementoBotao.onclick = function(){
        deletaItem(this.parentNode, id)
    }

    return elementoBotao;
}

function deletaItem(item, id){
    item.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), id)

    localStorage.setItem("itens", JSON.stringify(itens));
}
