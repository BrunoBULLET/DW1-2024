function aplicarMulta() {
    let velocidadeMaximaInput = document.getElementById("velmax").value;
    let velocidadeVeiculoInput = document.getElementById("velvei").value;

    let velocidadeMaxima = Number(velocidadeMaximaInput);
    let velocidadeVeiculo = Number(velocidadeVeiculoInput);

    let diferencaVelocidade = (velocidadeVeiculo - velocidadeMaxima);
    let excessoVelocidade = (velocidadeVeiculo - velocidadeMaxima);
    let porcentagemExcedida = (excessoVelocidade / velocidadeMaxima);
    let percentualExcedido = (porcentagemExcedida * 100);

    let saida = document.getElementById("saida");

    if (diferencaVelocidade <= 0) {
        saida.innerHTML = (`Parabéns, você não tomou multa!`);
    } else {
        if (porcentagemExcedida < 0.20) {
            saida.innerHTML = (`Você excedeu ${percentualExcedido}% da velocidade máxima. Sua multa é de R$ 130,16`);
        } else if (0.20 <= porcentagemExcedida && porcentagemExcedida <= 0.50) {
            saida.innerHTML = (`Você excedeu ${percentualExcedido}% da velocidade máxima. Sua multa é de R$ 195,23`);
        } else if (porcentagemExcedida > 0.50) {
            saida.innerHTML = (`Você excedeu ${percentualExcedido}% da velocidade máxima. Sua multa é de R$ 880,41`);
        }
    }
}
