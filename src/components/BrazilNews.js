import React, { useState, useEffect } from 'react';

const BrazilNews = () => {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await fetch('https://hacker-news.firebaseio.com/v0/newstories.json');
        if (!response.ok) {
          throw new Error('Erro ao carregar as notícias');
        }
        const data = await response.json();
        // Pegar apenas os primeiros 5 IDs de notícias
        const topFiveIds = data.slice(0, 5);
        // Fazer uma requisição para cada ID de notícia e obter detalhes
        const noticiasPromises = topFiveIds.map(async (id) => {
          const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          return res.json();
        });
        // Aguardar todas as requisições serem concluídas
        const noticiasData = await Promise.all(noticiasPromises);
        // Filtrar apenas as notícias com URL (ignorar itens sem URL)
        const noticiasComUrl = noticiasData.filter((noticia) => noticia.url);
        setNoticias(noticiasComUrl);
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    fetchNoticias();
  }, []);

  return (
    <div>
      <h2>News</h2>
      <ul>
        {noticias.map((noticia, index) => (
          <li key={index}>
            <a href={noticia.url} target="_blank" rel="noopener noreferrer">{noticia.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrazilNews;
