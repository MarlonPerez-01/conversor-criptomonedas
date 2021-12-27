import React, { useState } from 'react';
import { Formulario } from './components/Formulario';
import { Resumen } from './components/Resumen';
import bg from './assets/bg.png';

function App() {
  const [resultado, setResultado] = useState({});

  return (
    <div className='container'>
      <div className='column img-container'>
        <img src={bg} alt='criptomonedas' />
      </div>
      <div className='column'>
        <Formulario setResultado={setResultado} />
        <Resumen resultado={resultado} />
      </div>
    </div>
  );
}

export default App;
