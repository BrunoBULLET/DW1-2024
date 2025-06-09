import React, { useState } from 'react';
import './IMCC.css';

const IMCCalculator = () => {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState(null);
  const [categoria, setCategoria] = useState('');

  const calcularIMC = () => {
    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);
    if (!pesoNum || !alturaNum) return;

    const imcCalculado = pesoNum / (alturaNum * alturaNum);
    setImc(imcCalculado.toFixed(2));

    let cat = '';
    if (imcCalculado < 18.5) cat = 'Baixo peso';
    else if (imcCalculado < 25) cat = 'Peso normal';
    else if (imcCalculado < 30) cat = 'Excesso de peso';
    else if (imcCalculado < 35) cat = 'Obesidade de classe 1';
    else if (imcCalculado < 40) cat = 'Obesidade de classe 2';
    else cat = 'Obesidade de classe 3';

    setCategoria(cat);
  };

  return (
    <div className="imc-container">
      <h2>Calculadora de IMC</h2>
      <input
        type="number"
        placeholder="Peso (kg)"
        value={peso}
        onChange={(e) => setPeso(e.target.value)}
      />
      <input
        type="number"
        placeholder="Altura (m)"
        value={altura}
        onChange={(e) => setAltura(e.target.value)}
      />
      <button onClick={calcularIMC}>Calcular IMC</button>
      {imc && (
        <div className="resultado">
          <p><strong>IMC:</strong> {imc}</p>
          <p><strong>Categoria:</strong> {categoria}</p>
        </div>
      )}
    </div>
  );
};

export default IMCCalculator;
