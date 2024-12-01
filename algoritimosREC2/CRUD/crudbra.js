let listaBrawler = []; // conjunto de dados
let oQueEstaFazendo = ''; // variável global de controle
let brawler = null; // variável global 
bloquearAtributos(true);


fetch("http://localhost:8080/select",{
    method: "GET",
}).then((resposta) => {
    return resposta.json(); 
})
.then((dados) => {
    console.log(dados)
    for (const element of dados.results) {
        listaBrawler.push(new Brawler(element.idstatus, element.nome, element.nivel, element.estrela, element.aces, element.raridade, element.engrenagem));
    }
    listar()
}) 





function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaBrawler.length; i++) {
        const brawler = listaBrawler[i];
        if (brawler.id == chave) {
            brawler.posicaoNaLista = i;
            return listaBrawler[i];
        }
    }
    return null; 
}

function procure() {
    const id = document.getElementById("inputId").value;
    if (isNaN(id) || !Number.isInteger(Number(id))) {
        mostrarAviso("Precisa ser um número inteiro");
        document.getElementById("inputId").focus();
        return;
    }

    if (id) { // se digitou um Id
        brawler = procurePorChavePrimaria(id);
        if (brawler) { // achou na lista
            mostrarDadosBrawler(brawler);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { // não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputId").focus();
        return;
    }
}

// Função para iniciar inserção
function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clique no botão salvar");
    document.getElementById("inputId").focus();
}

// Função para alterar um brawler da lista
function alterar() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
    oQueEstaFazendo = 'alterando';
    mostrarAviso("ALTERANDO - Digite os atributos e clique no botão salvar");
}

// Função para excluir um brawler da lista
function excluir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
    oQueEstaFazendo = 'excluindo';
    mostrarAviso("EXCLUINDO - Clique no botão salvar para confirmar a exclusão");
}

// Função para salvar as alterações (inserir, alterar, excluir)
function salvar() {
    let id;
    if (brawler == null) {
        id = parseInt(document.getElementById("inputId").value);
    } else {
        id = brawler.id;
    }

    const nome = document.getElementById("inputNome").value;
    const nivel = parseInt(document.getElementById("inputNivel").value);
    const poderEstrela = document.getElementById("inputPoderEstrela").value;
    const acessorio = document.getElementById("inputAcessorio").value;
    const raridade = document.getElementById("inputRaridade").value;
    const engrenagem = document.getElementById("inputEngrenagem").value;

    if (id && nome && nivel && poderEstrela && acessorio && raridade && engrenagem) {
        switch (oQueEstaFazendo) {
            case 'inserindo':
                brawler = new Brawler(id, nome, nivel, poderEstrela, acessorio, raridade, engrenagem);
                listaBrawler.push(brawler);
                
                fetch("http://localhost:8080/inserir",{
                    method: "POST",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify({
                        id: id,
                        nome: nome,
                        nivel: nivel,
                        poderEstrela: poderEstrela,
                        acessorio: acessorio,
                        raridade: raridade,
                        engrenagem: engrenagem,
                    }),
                    
                })
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                const brawlerAlterado = new Brawler(id, nome, nivel, poderEstrela, acessorio, raridade, engrenagem);
                listaBrawler[brawler.posicaoNaLista] = brawlerAlterado;
                fetch("http://localhost:8080/alterar",{
                    method: "PUT",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify({
                        id: id,
                        nome: nome,
                        nivel: nivel,
                        poderEstrela: poderEstrela,
                        acessorio: acessorio,
                        raridade: raridade,
                        engrenagem: engrenagem,
                    }),
                    
                })
                mostrarAviso("Alterado");
                break;





            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaBrawler.length; i++) {
                    if (brawler.posicaoNaLista != i) {
                        novaLista.push(listaBrawler[i]);
                    }
                }
                listaBrawler = novaLista;
                fetch("http://localhost:8080/delete/"+id,{
                    method: "DELETE"
                })
                mostrarAviso("EXCLUÍDO");
                break;
            default:
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("inputId").focus();
    } else {
        alert("Erro nos dados digitados");
        return;
    }
}

// Função para listar brawlers
function preparaListagem(vetor) {
    let texto = "";
    for (let i = 0; i < vetor.length; i++) {
        const linha = vetor[i];
        texto +=
           " ID:  "+ linha.id + " | " +
           " NOME:  "+ linha.nome + " | " +
           " NIVEL:  "+ linha.nivel + " | " +
           "PODER ESTRELA:  "+ linha.poderEstrela + " | " +
           "ACESSÓRIO:  "+ linha.acessorio + " | " +
           "RARIDADE:  "+ linha.raridade + " | " +
           "ENGRENAGEM:  "+ linha.engrenagem + "<br>";

    }
    return texto;
}

function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaBrawler);
}

function cancelarOperacao() {
    limparAtributos();
    bloquearAtributos(true);
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
    mostrarAviso("Cancelou a operação de edição");
}

function mostrarAviso(mensagem) {
    document.getElementById("divAviso").innerHTML = mensagem;
}

function mostrarDadosBrawler(brawler) {
    document.getElementById("inputId").value = brawler.id;
    document.getElementById("inputNome").value = brawler.nome;
    document.getElementById("inputNivel").value = brawler.nivel;
    document.getElementById("inputPoderEstrela").value = brawler.poderEstrela;
    document.getElementById("inputAcessorio").value = brawler.acessorio;
    document.getElementById("inputRaridade").value = brawler.raridade;
    document.getElementById("inputEngrenagem").value = brawler.engrenagem;
    bloquearAtributos(true);
}

function limparAtributos() {
    document.getElementById("inputNome").value = "";
    document.getElementById("inputNivel").value = "";
    document.getElementById("inputPoderEstrela").value = "";
    document.getElementById("inputAcessorio").value = "";
    document.getElementById("inputRaridade").value = "";
    document.getElementById("inputEngrenagem").value = "";
    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    document.getElementById("inputId").readOnly = !soLeitura;
    document.getElementById("inputNome").readOnly = soLeitura;
    document.getElementById("inputNivel").readOnly = soLeitura;
    document.getElementById("inputPoderEstrela").readOnly = soLeitura;
    document.getElementById("inputAcessorio").readOnly = soLeitura;
    document.getElementById("inputRaridade").readOnly = soLeitura;
    document.getElementById("inputEngrenagem").readOnly = soLeitura;
}

function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {
    document.getElementById("btProcure").style.display = btProcure;
    document.getElementById("btInserir").style.display = btInserir;
    document.getElementById("btAlterar").style.display = btAlterar;
    document.getElementById("btExcluir").style.display = btExcluir;
    document.getElementById("btSalvar").style.display = btSalvar;
    document.getElementById("btCancelar").style.display = btSalvar;
    document.getElementById("inputId").focus();
}