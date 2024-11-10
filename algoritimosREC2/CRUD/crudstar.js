class Brawler {
    constructor(id, nome, nivel, poderEstrela, acessorio, raridade, engrenagem, posicaoNaLista) {
        this.id = id;
        this.nome = nome;
        this.nivel = nivel;
        this.poderEstrela = poderEstrela;
        this.acessorio = acessorio;
        this.raridade = raridade;
        this.engrenagem = engrenagem;

        this.posicaoNaLista = posicaoNaLista; // atributo para facilitar a alteração e exclusão 
    }
}
