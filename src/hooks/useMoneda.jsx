import React, { useState } from 'react';

const useMoneda = (initialState = []) => {
  const [state, setState] = useState(initialState);
  const [codigo, setCodigo] = useState('');

  const handleMoneda = (e) => {
    setCodigo(e.target.value);
  };

  const SelectMoneda = ({ titulo }) => (
    <>
      <h4>{titulo}</h4>
      <select onChange={handleMoneda} name="codigo" value={codigo}>
        <option value="">Seleccionar</option>
        {state.map((item) => (
          <option key={item.codigo} value={item.codigo}>
            {item.nombre}
          </option>
        ))}
      </select>
    </>
  );

  return [codigo, setState, SelectMoneda];
};

export default useMoneda;
