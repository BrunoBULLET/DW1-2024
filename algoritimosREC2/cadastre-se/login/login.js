document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;

    if (validarLogin(email, senha)) {
        document.getElementById('message').style.color = "green";
        document.getElementById('message').innerText = "Login realizado com sucesso!";
    } else {
        document.getElementById('message').style.color = "red";
        document.getElementById('message').innerText = "E-mail ou senha inválidos!";
    }
});

function validarLogin(email, senha) {
    const emailValido = "usuario@exemplo.com";
    const senhaValida = "123456";

    if (email === emailValido && senha === senhaValida) {
        return true;
    }
    return false;
}
