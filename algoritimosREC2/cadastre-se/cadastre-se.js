document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário

    let nome = document.getElementById('nome').value;
    let email = document.getElementById('email').value;
    let cpf = document.getElementById('cpf').value;

    if (validarCPF(cpf)) {
        document.getElementById('message').style.color = "green";
        document.getElementById('message').innerText = "Cadastro realizado com sucesso!";
    } else {
        document.getElementById('message').style.color = "red";
        document.getElementById('message').innerText = "CPF inválido!";
    }
});

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g,''); 
    if(cpf.length !== 11) return false;
    return true;
}
