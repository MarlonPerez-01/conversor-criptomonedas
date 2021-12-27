import React from 'react';

export const Resumen = ({ resultado }) => {
  if (Object.keys(resultado).length === 0) return null;

  return (
    <div className="resultado-container">
      <h3>Resultados:</h3>
      <p>
        El valor es: <span>{resultado.PRICE}</span>
      </p>
      <p>
        El valor más alto del día: <span>{resultado.HIGHDAY}</span>
      </p>
      <p>
        El valor más bajo del día: <span>{resultado.LOWDAY}</span>
      </p>
      <p>
        Variación últimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}</span>
      </p>
      <p>
        Última Actualización: <span>{resultado.LASTUPDATE}</span>
      </p>
    </div>
  );
};
