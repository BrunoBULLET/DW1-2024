    function calcularimc(){

        
        let peso = Number(document.getElementById("peso").value)
        let altura = Number(document.getElementById("altura").value)
        let imc = peso / (altura ** 2)
           
        console.log(imc)
        document.getElementById("imcc").innerText = imc.toFixed(2)
    }
    document.getElementById("calcular").onclick = calcularimc