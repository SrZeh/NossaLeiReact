import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from '../firebase';
import PopupForm from './PopupForm';
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
  const [showPopup, setShowPopup] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Função para abrir o popup de edição
  const openPopup = (id) => {
    setShowPopup(true);
    setSelectedId(id);
  };

  // Efeito para buscar dados sempre que a abrangência selecionada mudar
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchLeiData(selectedAbrangencia);
      setLeiData(data);
    };

    fetchData();
  }, [selectedAbrangencia]);

  // Função para excluir uma lei
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "leis", id));
      const data = await fetchLeiData(selectedAbrangencia);
      setLeiData(data);
    } catch (error) {
      console.error("Error:", error);
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
    <div>
      {showPopup && <PopupForm leiId={selectedId} closePopup={() => setShowPopup(false)} />}
      <div>
        <h2>Escolha a Abrangência</h2>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 10 }}>
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
                <td>{lei.abrangencia}</td>
                <td>{lei.ramo_direito}</td>
                <td>{lei.nome_proposta}</td>
                <td>{lei.exposicao_motivos}</td>
                <td>{lei.texto_lei}</td>
                <td>
                  {currentUser.email === lei.email_usuario ? (
                    <>
                      <button style={{ fontSize: 15 }} onClick={() => handleDelete(lei.id)}>Excluir</button>
                      <button style={{ fontSize: 15, marginLeft: 10 }} onClick={() => openPopup(lei.id)}>Alterar</button>
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
    </div>
  );
};

export default Table;
