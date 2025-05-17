

const btnBotoes = document.querySelectorAll("[btn-numero]");
const btnOperacoes = document.querySelectorAll("[btn-operador]");
const btnIgual = document.querySelector("[btn-igual]");
const btnDelete = document.querySelector("[btn-delete]");
const btnAC = document.querySelector("[btn-ac]");

const bufferElemento = document.querySelector("[txt-buffer]");
const displayElemento = document.querySelector("[txt-display]");

const calculadora = {
  operandoAnterior: "",
  operandoAtual: "",
  operador: "",
  bufferTextoElemento: bufferElemento,
  displayTextoElemento: displayElemento,
};

// Botão AC
btnAC.addEventListener("click", () => {
  limpaVariaveis(calculadora);
});

// Botão Delete
btnDelete.addEventListener("click", () => {
  apagaDigito(calculadora);
});

// Botão de igual
btnIgual.addEventListener("click", () => {
  executaCalculo(calculadora);
});

// Botões dos números
btnBotoes.forEach((btn) => {
  btn.addEventListener("click", () => {
    adicionaNumero(calculadora, btn.innerText);
  });
});

// Botões dos operadores
btnOperacoes.forEach((btn) => {
  btn.addEventListener("click", () => {
    escolheOperador(calculadora, btn.innerText);
  });
});


function atualizaDisplay(calculadora) {
  calculadora.bufferTextoElemento.innerText = calculadora.operandoAnterior + " " + calculadora.operador;
  calculadora.displayTextoElemento.innerText = calculadora.operandoAtual;
}

function limpaVariaveis(calculadora) {
  calculadora.operandoAnterior = "";
  calculadora.operandoAtual = "";
  calculadora.operador = "";
  atualizaDisplay(calculadora);
}

function adicionaNumero(calculadora, numero) {
  if (numero === "." && calculadora.operandoAtual.includes(".")) return;
  calculadora.operandoAtual += numero;
  atualizaDisplay(calculadora);
}

function escolheOperador(calculadora, operador) {
  if (calculadora.operandoAtual === "") return;
  if (calculadora.operandoAnterior !== "") {
    executaCalculo(calculadora);
  }
  calculadora.operador = operador;
  calculadora.operandoAnterior = calculadora.operandoAtual;
  calculadora.operandoAtual = "";
  atualizaDisplay(calculadora);
}

function executaCalculo(calculadora) {
  let resultado;
  const anterior = parseFloat(calculadora.operandoAnterior);
  const atual = parseFloat(calculadora.operandoAtual);

  if (isNaN(anterior) || isNaN(atual)) return;

  switch (calculadora.operador) {
    case "+":
      resultado = anterior + atual;
      break;
    case "-":
      resultado = anterior - atual;
      break;
    case "*":
      resultado = anterior * atual;
      break;
    case "÷":
      if (atual === 0) {
        resultado = "Erro";
      } else {
        resultado = anterior / atual;
      }
      break;
    default:
      return;
  }

  calculadora.operandoAtual = resultado.toString();
  calculadora.operador = "";
  calculadora.operandoAnterior = "";
  atualizaDisplay(calculadora);
}

function apagaDigito(calculadora) {
  calculadora.operandoAtual = calculadora.operandoAtual.slice(0, -1);
  atualizaDisplay(calculadora);
}
