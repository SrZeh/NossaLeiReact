import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

// Função para buscar dados das notícias
export const fetchNoticiasData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "noticias"));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const NoticiasTable = () => {
  const { currentUser } = useAuth(); // Obtém o usuário atual do contexto de autenticação
  const [noticiasData, setNoticiasData] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    introducao: '',
    titulo: '',
    link: ''
  });

  const toggleExpandRow = (noticiaId) => {
    setExpandedRow(expandedRow === noticiaId ? null : noticiaId);
  };

  const truncateText = (text) => {
    return text.length > 50 ? text.slice(0, 50) + '...' : text;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingItem) {
      try {
        const noticiaRef = doc(db, "noticias", editingItem);
        await updateDoc(noticiaRef, formData);
        const data = await fetchNoticiasData();
        setNoticiasData(data);
        setEditingItem(null);
        setFormData({
          introducao: '',
          titulo: '',
          link: ''
        });
      } catch (error) {
        console.error("Erro ao atualizar a notícia:", error);
      }
    }
  };

  const startEditing = (noticia) => {
    setEditingItem(noticia.id);
    setFormData({
      introducao: noticia.introducao,
      titulo: noticia.titulo,
      link: noticia.link
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchNoticiasData();
      setNoticiasData(data);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Você tem certeza de que deseja excluir esta notícia?');
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "noticias", id));
        const data = await fetchNoticiasData();
        setNoticiasData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <table style={{ width: '100%', tableLayout: 'auto' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Título</th>
            <th style={{ textAlign: 'left' }}>Introdução</th>
            <th style={{ textAlign: 'left' }}>Link</th>
          </tr>
        </thead>
        <tbody>
          {noticiasData.map(noticia => (
            <React.Fragment key={noticia.id}>
              <tr>
                <td onClick={() => toggleExpandRow(noticia.id)} style={{ cursor: 'pointer' }}>{truncateText(noticia.titulo)}</td>
                <td onClick={() => toggleExpandRow(noticia.id)} style={{ cursor: 'pointer' }}>{truncateText(noticia.introducao)}</td>
                <td onClick={() => toggleExpandRow(noticia.id)} style={{ cursor: 'pointer' }}>{truncateText(noticia.link)}</td>
                <td>
                  {currentUser.email === noticia.email_usuario && (
                    <>
                      <button style={{ fontSize: 15 }} onClick={() => handleDelete(noticia.id)}>Excluir</button>
                      <button style={{ fontSize: 15, marginLeft: 10 }} onClick={() => startEditing(noticia)}>Alterar</button>
                    </>
                  )}
                </td>
              </tr>
              {expandedRow === noticia.id && (
                <tr>
                  <td colSpan="4">
                    <div>
                      <p><strong>Título:</strong> {noticia.titulo}</p>
                      <p><strong>Introdução:</strong> {noticia.introducao}</p>
                      <p>
                        <strong>Link:</strong>
                        <a href={noticia.link} target="_blank" rel="noopener noreferrer">
                          {noticia.link}
                        </a>
                      </p>
                    </div>
                  </td>
                </tr>
              )}
              {editingItem === noticia.id && (
                <tr>
                  <td colSpan="4">
                    <div style={{ marginTop: 20, width: '100%' }}>
                      <h3>Editar Notícia</h3>
                      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor="titulo">Título:</label>
                        <input
                          type="text"
                          id="titulo"
                          name="titulo"
                          value={formData.titulo}
                          onChange={handleInputChange}
                          required
                        />

                        <label htmlFor="introducao">Introdução:</label>
                        <textarea
                          id="introducao"
                          name="introducao"
                          value={formData.introducao}
                          onChange={handleInputChange}
                          required
                        />

                        <label htmlFor="link">Link:</label>
                        <input
                          type="text"
                          id="link"
                          name="link"
                          value={formData.link}
                          onChange={handleInputChange}
                          required
                        />

                      </form>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NoticiasTable;
