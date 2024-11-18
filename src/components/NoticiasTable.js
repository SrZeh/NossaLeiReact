

import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import '../style/NoticiasTable.css'; // Importando o CSS para estilização

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
  const { currentUser } = useAuth();
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
    <div className="noticias-container">
      {noticiasData.map(noticia => (
        <div key={noticia.id} className="noticia-card">
          <div className="noticia-content" onClick={() => toggleExpandRow(noticia.id)}>
            <h3>{truncateText(noticia.titulo)}</h3>
            <p>{truncateText(noticia.introducao)}</p>
            {/* <a href={noticia.link} target="_blank" rel="noopener noreferrer">Leia mais</a> */}
            <p className='linknews' >Leia Mais</p>
          </div>
          {currentUser.email === noticia.email_usuario && (
            <div className="noticia-actions">
              <button onClick={() => handleDelete(noticia.id)}>Excluir</button>
              <button onClick={() => startEditing(noticia)}>Alterar</button>
            </div>
          )}
          {expandedRow === noticia.id && (
            <div className="noticia-detalhes">
              <p><strong>Título:</strong> {noticia.titulo}</p>
              <p><strong>Introdução:</strong> {noticia.introducao}</p>
              <p><strong>Link:</strong> <a href={noticia.link} target="_blank" rel="noopener noreferrer">{noticia.link}</a></p>
            </div>
          )}
          {editingItem === noticia.id && (
            <div className="editar-form">
              <h3>Editar Notícia</h3>
              <form onSubmit={handleSubmit}>
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
                <button type="submit">Salvar</button>
              </form>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NoticiasTable;
