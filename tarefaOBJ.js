//Primeira
const carro = {
    marca: "Toyota",
    modelo: "Corolla",
    ano: 2020
  };
  
  console.log(carro);


//Segunda
console.log(carro.marca); 

carro.ano = 2021; 
console.log(carro);

//Terceira

carro.cor = "preto";
delete carro.modelo;
console.log(carro);

//Quarta

const pessoa = {
    nome: "João",
    idade: 25,
    cumprimentar: function () {
      console.log(`Olá, meu nome é ${this.nome}`);
    }
  };
  
  pessoa.cumprimentar();
  
//Quinta

const produto = {
    nome: "Notebook",
    preco: 2500,
    categoria: "Eletrônicos"
  };
  
  for (let propriedade in produto) {
    console.log(`${propriedade}: ${produto[propriedade]}`);
  }
  
//Sexta

const biblioteca = [
    { titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", anoPublicacao: 1954 },
    { titulo: "1984", autor: "George Orwell", anoPublicacao: 1949 },
    { titulo: "Orgulho e Preconceito", autor: "Jane Austen", anoPublicacao: 1813 }
  ];
  
  biblioteca.forEach(livro => console.log(livro.titulo));
  
//Setima

const carrinho = {
    itens: [
      { nome: "Camisa", preco: 50 },
      { nome: "Calça", preco: 100 }
    ],
    calcularTotal: function () {
      return this.itens.reduce((total, item) => total + item.preco, 0);
    }
  };
  
  console.log(carrinho.calcularTotal()); 


//Oitava

const aluno = {
    nome: "Maria",
    idade: 21,
    curso: "Ciências da Computação"
  };
  
  const { nome, curso } = aluno;
  console.log(`Nome: ${nome}, Curso: ${curso}`);


//nona

const estoque = [
    { id: 1, nome: "Caneta", quantidade: 10 },
    { id: 2, nome: "Caderno", quantidade: 15 }
  ];
  
  function atualizarQuantidade(id, novaQuantidade) {
    const produto = estoque.find(item => item.id === id);
    if (produto) {
      produto.quantidade = novaQuantidade;
    }
  }
  
  atualizarQuantidade(2, 30);
  console.log(estoque);


//decima

const usuarios = [
    { nome: "Ana", idade: 28, email: "ana@email.com" },
    { nome: "Bruno", idade: 34, email: "bruno@email.com" },
    { nome: "Carla", idade: 25, email: "carla@email.com" }
  ];
  
  const nomesEmails = usuarios.map(({ nome, email }) => ({ nome, email }));
  console.log(nomesEmails);
  
  
  
  
  
  
  

  

  