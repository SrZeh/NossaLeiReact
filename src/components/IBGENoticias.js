
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IBGENoticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [mostrarMais, setMostrarMais] = useState(false);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await axios.get('http://servicodados.ibge.gov.br/api/v3/noticias/?tipo=noticia&qtd=8&destaque=1&de=01-01-2022');
        if (!response.data.items) {
          throw new Error('Erro ao carregar as notícias');
        }
        setNoticias(response.data.items);
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    fetchNoticias();
  }, []);

  const noticiasExibidas = mostrarMais ? noticias : noticias.slice(0, 3);

  const handleMostrarMais = () => {
    setMostrarMais(true);
  };

  return (
    <div>
      <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Últimas Notícias do Brasil</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {noticiasExibidas.map(noticia => (
          <div key={noticia.id} style={{ flex: '0 0 calc(50% - 20px)', marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box', marginTop: '0', marginBottom: '0' }}>
            <h3 style={{ fontSize: '14px', marginBottom: '10px', lineHeight: '1.2' }}>{noticia.titulo}</h3>
            <p style={{ fontSize: '12px', marginBottom: '10px', lineHeight: '1.2', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{noticia.introducao}</p>
            <a href={noticia.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px' }}>Leia mais</a>
          </div>
        ))}
      </div>
      {!mostrarMais && (
        <button onClick={handleMostrarMais} style={{ fontSize: '16px', marginTop: '20px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', cursor: 'pointer' }}>Mostrar mais</button>
      )}
    </div>
  );
};

export default IBGENoticias;

