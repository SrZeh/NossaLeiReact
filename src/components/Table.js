import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

// Função para buscar dados de leis
export const fetchLeiData = async (selectedAbrangencia) => {
  try {
    if (selectedAbrangencia === "Todas") {
      const querySnapshot = await getDocs(collection(db, "leis"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return data;
    } else {
      const q = query(collection(db, "leis"), where("abrangencia", "==", selectedAbrangencia));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const Table = () => {
  const { currentUser } = useAuth(); // Obtém o usuário atual do contexto de autenticação
  const [leiData, setLeiData] = useState([]);
  const [selectedAbrangencia, setSelectedAbrangencia] = useState('Todas');

  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    abrangencia: '',
    ramo_direito: '',
    nome_proposta: '',
    exposicao_motivos: '',
    texto_lei: ''
  });

  // Função para atualizar os dados do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  // Função para enviar as alterações
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingItem) {
      try {
        const leiRef = doc(db, "leis", editingItem);
        await updateDoc(leiRef, formData);
        const data = await fetchLeiData(selectedAbrangencia);
        setLeiData(data);
        setEditingItem(null);
        setFormData({
          abrangencia: '',
          ramo_direito: '',
          nome_proposta: '',
          exposicao_motivos: '',
          texto_lei: ''
        });
      } catch (error) {
        console.error("Erro ao atualizar a lei:", error);
      }
    }
  };

  // Função para iniciar a edição
  const startEditing = (lei) => {
    setEditingItem(lei.id);
    setFormData({
      abrangencia: lei.abrangencia,
      ramo_direito: lei.ramo_direito,
      nome_proposta: lei.nome_proposta,
      exposicao_motivos: lei.exposicao_motivos,
      texto_lei: lei.texto_lei
    });
  };

  // Efeito para buscar dados sempre que a abrangência selecionada mudar
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchLeiData(selectedAbrangencia);
      setLeiData(data);
    };

    fetchData();
  }, [selectedAbrangencia]);

  // Função para excluir uma lei com confirmação
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Você tem certeza de que deseja excluir esta lei?');
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "leis", id));
        const data = await fetchLeiData(selectedAbrangencia);
        setLeiData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  // Função para assinar uma lei
  const handleSign = async (id) => {
    try {
      const leiRef = doc(db, "leis", id);
      await updateDoc(leiRef, {
        assinaturas: arrayUnion(currentUser.email) // Adiciona o email ao array 'assinaturas'
      });
      const data = await fetchLeiData(selectedAbrangencia); // Atualiza a tabela após assinar
      setLeiData(data);
    } catch (error) {
      console.error("Erro ao assinar a lei:", error);
    }
  };

  // Função para retirar a assinatura de uma lei
  const handleUnsign = async (id) => {
    try {
      const leiRef = doc(db, "leis", id);
      await updateDoc(leiRef, {
        assinaturas: arrayRemove(currentUser.email) // Remove o email do array 'assinaturas'
      });
      const data = await fetchLeiData(selectedAbrangencia); // Atualiza a tabela após retirar a assinatura
      setLeiData(data);
    } catch (error) {
      console.error("Erro ao retirar a assinatura:", error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div>
        <h2>Escolha a Abrangência</h2>
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
          {/* Opções de abrangência */}
          <label>
            <input type="radio" value="Municipal" checked={selectedAbrangencia === "Municipal"} onChange={(e) => setSelectedAbrangencia(e.target.value)} />
            Municipal
          </label>
          <label>
            <input type="radio" value="Estadual" checked={selectedAbrangencia === "Estadual"} onChange={(e) => setSelectedAbrangencia(e.target.value)} />
            Estadual
          </label>
          <label>
            <input type="radio" value="Federal" checked={selectedAbrangencia === "Federal"} onChange={(e) => setSelectedAbrangencia(e.target.value)} />
            Federal
          </label>
          <label>
            <input type="radio" value="Todas" checked={selectedAbrangencia === "Todas"} onChange={(e) => setSelectedAbrangencia(e.target.value)} />
            Todas
          </label>
        </div>
      </div>
      <table style={{ width: '100%', tableLayout: 'auto' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Número de Assinaturas</th> {/* Nova coluna para o número de assinaturas */}
            <th style={{ textAlign: 'left' }}>Abrangência</th>
            <th style={{ textAlign: 'left' }}>Ramo do Direito</th>
            <th style={{ textAlign: 'left' }}>Nome da Proposta</th>
            <th style={{ textAlign: 'left' }}>Exposição dos Motivos</th>
            <th style={{ textAlign: 'left' }}>Texto da Lei</th>
            <th style={{ textAlign: 'left' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {leiData.map(lei => {
            const isSigned = lei.assinaturas?.includes(currentUser.email); // Verifica se o usuário já assinou a lei
            return (
              <tr key={lei.id}>
                <td>{lei.assinaturas?.length || 0}</td> {/* Exibe o número de assinaturas */}
                <td>{lei.abrangencia}</td>
                <td>{lei.ramo_direito}</td>
                <td>{lei.nome_proposta}</td>
                <td>{lei.exposicao_motivos}</td>
                <td>{lei.texto_lei}</td>
                <td>
                  {currentUser.email === lei.email_usuario ? (
                    <>
                      <button style={{ fontSize: 15 }} onClick={() => handleDelete(lei.id)}>Excluir</button>
                      <button style={{ fontSize: 15, marginLeft: 10 }} onClick={() => startEditing(lei)}>Alterar</button>
                    </>
                  ) : (
                    isSigned ? (
                      <button style={{ fontSize: 15 }} onClick={() => handleUnsign(lei.id)}>Retirar Assinatura</button>
                    ) : (
                      <button style={{ fontSize: 15 }} onClick={() => handleSign(lei.id)}>Assinar</button>
                    )
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {editingItem && (
        <div style={{ marginTop: 20, width: '100%', maxWidth: 600 }}>
          <h3>Editar Lei</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="abrangencia">Abrangência:</label>
            <select id="abrangencia" name="abrangencia" value={formData.abrangencia} onChange={handleInputChange} required>
              <option value="">Selecione a abrangência</option>
              <option value="Municipal">Municipal</option>
              <option value="Estadual">Estadual</option>
              <option value="Federal">Federal</option>
            </select>
            <label htmlFor="ramo_direito">Ramo do Direito:</label>
            <select id="ramo_direito" name="ramo_direito" value={formData.ramo_direito} onChange={handleInputChange} required>
              <option value="">Selecione o ramo do direito</option>
              <option value="Processual">Processual</option>
              <option value="Administrativo">Administrativo</option>
              <option value="Constitucional">Constitucional</option>
              <option value="Consumidor">Consumidor</option>
              <option value="Ambiental">Ambiental</option>
              <option value="Tributária">Tributária</option>
              <option value="Cível">Cível</option>
              <option value="Penal">Penal</option>
            </select>
            <label htmlFor="nome_proposta">Nome da Proposta:</label>
            <textarea id="nome_proposta" name="nome_proposta" value={formData.nome_proposta} onChange={handleInputChange} rows="4" required></textarea>
            <label htmlFor="exposicao_motivos">Exposição dos Motivos:</label>
            <textarea id="exposicao_motivos" name="exposicao_motivos" value={formData.exposicao_motivos} onChange={handleInputChange} rows="4" required></textarea>
            <label htmlFor="texto_lei">Texto da Lei:</label>
            <textarea id="texto_lei" name="texto_lei" value={formData.texto_lei} onChange={handleInputChange} rows="4" required></textarea>
            <button type="submit">Salvar Alterações</button>
            <button type="button" onClick={() => setEditingItem(null)}>Cancelar</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Table;
