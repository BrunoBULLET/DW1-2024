let listaNota = []; // Conjunto de dados
let oQueEstaFazendo = ''; // Variável global de controle
let nota = null; // Variável global

window.onload = function() {
    carregarListaDoLocalStorage();
    listar();
};

function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaNota.length; i++) {
        const nota = listaNota[i];
        if (nota.ra == chave) {
            nota.posicaoNaLista = i;
            return listaNota[i];
        }
    }
    return null; // Não achou
}

// Função para procurar um elemento pela chave primária
function procure() {
    const ra = document.getElementById("inputra").value;
    if (isNaN(ra) || !Number.isInteger(Number(ra))) {
        mostrarAviso("Precisa ser um número inteiro");
        document.getElementById("inputra").focus();
        return;
    }

    if (ra) { // Se digitou um Id
        nota = procurePorChavePrimaria(ra);
        if (nota) { // Achou na lista
            mostrarDadosNotas(nota);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { // Não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputra").focus();
        return;
    }
}

function inserir() {
    const ra = parseInt(document.getElementById("inputra").value);
    if (procurePorChavePrimaria(ra) !== null) {
        alert("Erro: RA já existente");
    } else {
        bloquearAtributos(false);
        visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); 
        oQueEstaFazendo = 'inserindo';
        mostrarAviso("INSERINDO - Digite os atributos e clique no botão salvar");
        document.getElementById("inputra").focus();
    }
}

function alterar() {
    // Remove o readonly dos campos
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
    oQueEstaFazendo = 'alterando';
    mostrarAviso("ALTERANDO - Digite os atributos e clique no botão salvar");
}

function excluir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
    oQueEstaFazendo = 'excluindo';
    mostrarAviso("EXCLUINDO - Clique no botão salvar para confirmar a exclusão");
}

function salvar() {
    let ra;
    if (nota == null) {
        ra = parseInt(document.getElementById("inputra").value);
    } else {
        ra = nota.ra;
    }

    const nome = document.getElementById("inputnome").value;
    const nota1 = parseFloat(document.getElementById("inputnota1").value);
    const nota2 = parseFloat(document.getElementById("inputnota2").value);
    const nota3 = parseFloat(document.getElementById("inputnota3").value);
    const nota4 = parseFloat(document.getElementById("inputnota4").value);

    if (ra && nome && nota1 && nota2 && nota3 && nota4) {
        switch (oQueEstaFazendo) {
            case 'inserindo':
                nota = new Nota(ra, nome, nota1, nota2, nota3, nota4);
                listaNota.push(nota);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                nota.nome = nome;
                nota.nota1bim = nota1;
                nota.nota2bim = nota2;
                nota.nota3bim = nota3;
                nota.nota4bim = nota4;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                listaNota.splice(nota.posicaoNaLista, 1);
                mostrarAviso("Excluído");
                break;
            default:
                mostrarAviso("Erro desconhecido");
        }

        salvarListaNoLocalStorage(); // Salva as alterações no Local Storage
        limparAtributos();
        listar();
    } else {
        alert("Erro nos dados digitados");
        return;
    }
}

function preparaListagem(vetor) {
    return vetor.map(nota => 
        `${nota.ra} - ${nota.nome} - ${nota.nota1bim} - ${nota.nota2bim} - ${nota.nota3bim} - ${nota.nota4bim}<br>`
    ).join('');
}

function adicionarNotaLista() {
    listaNota = [];
    let linha = new Nota(1, "Creuza", 80, 80, 80, 80);
    listaNota.push(linha);

    linha = new Nota(2, "Constâcio", 90, 95, 85, 90);
    listaNota.push(linha);

    linha = new Nota(3, "Tércio", 64, 70, 55, 42);
    listaNota.push(linha);

    linha = new Nota(4, "Berola", 90, 90, 90, 90);
    listaNota.push(linha);

    listar();
}

function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaNota);
}

function cancelarOperacao() {
    limparAtributos();
    bloquearAtributos(true);
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
    mostrarAviso("Operação cancelada");
}

function mostrarAviso(mensagem) {
    document.getElementById("divAviso").innerHTML = mensagem;
}

function mostrarDadosNotas(nota) {
    document.getElementById("inputra").value = nota.ra;
    document.getElementById("inputnome").value = nota.nome;
    document.getElementById("inputnota1").value = nota.nota1bim;
    document.getElementById("inputnota2").value = nota.nota2bim;
    document.getElementById("inputnota3").value = nota.nota3bim;
    document.getElementById("inputnota4").value = nota.nota4bim;

    bloquearAtributos(true);
}

function limparAtributos() {
    document.getElementById("inputnome").value = "";
    document.getElementById("inputnota1").value = "";
    document.getElementById("inputnota2").value = "";
    document.getElementById("inputnota3").value = "";
    document.getElementById("inputnota4").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    document.getElementById("inputra").readOnly = !soLeitura;
    document.getElementById("inputnome").readOnly = soLeitura;
    document.getElementById("inputnota1").readOnly = soLeitura;
    document.getElementById("inputnota2").readOnly = soLeitura;
    document.getElementById("inputnota3").readOnly = soLeitura;
    document.getElementById("inputnota4").readOnly = soLeitura;
}

function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {
    document.getElementById("btProcure").style.display = btProcure;
    document.getElementById("btInserir").style.display = btInserir;
    document.getElementById("btAlterar").style.display = btAlterar;
    document.getElementById("btExcluir").style.display = btExcluir;
    document.getElementById("btSalvar").style.display = btSalvar;
    document.getElementById("btCancelar").style.display = btSalvar; // O cancelar sempre aparece junto com o salvar
    document.getElementById("inputra").focus();
}

function salvarListaNoLocalStorage() {
    localStorage.setItem("listaNota", JSON.stringify(listaNota));
}

function carregarListaDoLocalStorage() {
    const listaSalva = localStorage.getItem("listaNota");
    if (listaSalva) {
        listaNota = JSON.parse(listaSalva);
    } else {
        adicionarNotaLista();
    }
}
