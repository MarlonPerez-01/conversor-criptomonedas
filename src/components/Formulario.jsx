import React, { useEffect, useState } from 'react';
import useMoneda from '../hooks/useMoneda';
import { Error } from '../components/Error';

export const Formulario = ({ setResultado }) => {
  const initialMonedas = [
    { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
    { codigo: 'MXN', nombre: 'Peso Mexicano' },
    { codigo: 'EUR', nombre: 'Euro' },
    { codigo: 'GBP', nombre: 'Libra Esterlina' },
  ];

  const initialCripto = [];

  const [moneda, , SelectMoneda] = useMoneda(initialMonedas);
  const [cripto, setCriptos, SelectCripto] = useMoneda(initialCripto);
  const [error, setError] = useState(false);

  const obtenerCriptos = async () => {
    try {
      const response = await fetch('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD');
      const datos = await response.json();

      const arrayCriptos = datos.Data.map(({ CoinInfo }) => {
        let { Name, FullName } = CoinInfo;
        return { codigo: Name, nombre: FullName };
      });
      setCriptos(arrayCriptos);
      return datos.Data;
    } catch (err) {
      throw new Error(err);
    }
  };

  const convertir = async () => {
    try {
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`
      );

      const data = await response.json();

      setResultado(data?.DISPLAY[cripto][moneda]);
      return data?.DISPLAY[cripto][moneda];
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleConvertir = (e) => {
    e.preventDefault();

    //validacion
    if (moneda.trim() === '' || cripto.trim() === '') {
      return setError(true);
    }

    setError(false);

    //peticion a la api
    convertir();
  };

  useEffect(() => {
    obtenerCriptos(); //obtener listado de criptomonedas al iniciar
  }, []);

  return (
    <form onSubmit={handleConvertir}>
      <div>
        <h3 className="titulo-principal">Conversor de criptomonedas</h3>
      </div>
      <div>
        {error && <Error mensaje="Todos los campos son obligatorios" />}
        <SelectMoneda titulo="Seleccionar Moneda" />
        <SelectCripto titulo="Seleccionar CriptoMoneda" />
        <button type="submit">Convertir</button>
      </div>
    </form>
  );
};
