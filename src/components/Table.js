import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from '../firebase';

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
  const [leiData, setLeiData] = useState([]);
  const [selectedAbrangencia, setSelectedAbrangencia] = useState('Todas'); // Default selection
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    abrangencia: '',
    ramo_direito: '',
    nome_proposta: '',
    exposicao_motivos: '',
    texto_lei: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchLeiData(selectedAbrangencia);
      setLeiData(data);
    };

    fetchData();
  }, [selectedAbrangencia]);



  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "leis", id));
      const data = await fetchLeiData(selectedAbrangencia);
      setLeiData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePopUp = () => {
    setShowPopup(!showPopup);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const atualizarLei = async (id) => {
    try {
      await setDoc(doc(db, "leis", id), formData);
      setShowPopup(false);
      setFormData({
        abrangencia: '',
        ramo_direito: '',
        nome_proposta: '',
        exposicao_motivos: '',
        texto_lei: ''
      });
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  };

  let lei;

  return (
    <div>
      <div>
        <h1 style={{ textAlign: 'center' }}>Escolha a Abrangência</h1>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 10 }}>
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
            <th>ID</th>
            <th>Abrangência</th>
            <th>Ramo do Direito</th>
            <th>Nome da Proposta</th>
            <th>Exposição dos Motivos</th>
            <th>Texto da Lei</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {leiData.map(lei => {
            return (
              <tr key={lei.id}>
                <td>{lei.id}</td>
                <td>{lei.abrangencia}</td>
                <td>{lei.ramo_direito}</td>
                <td>{lei.nome_proposta}</td>
                <td>{lei.exposicao_motivos}</td>
                <td>{lei.texto_lei}</td>
                <td>
                  <div style={{ flex: 1, flexDirection: 'column' }}>
                    <button style={{ fontSize: 10 }} onClick={() => handleDelete(lei.id)}>Excluir</button>
                    <button style={{ fontSize: 10 }} onClick={() => handlePopUp()}>Alterar</button>
                  </div>
                </td>
              </tr>
            );
          })}
          {showPopup && (
            <div className="popup">
              <div className="popup-inner">
                <form id="formulario_lei">
                  <label htmlFor="abrangencia">Abrangência da Lei:</label>
                  <select id="abrangencia" value={formData.abrangencia} onChange={handleChange} required>
                    <option value="">Selecione a abrangência</option>
                    <option value="municipal">Municipal</option>
                    <option value="estadual">Estadual</option>
                    <option value="federal">Federal</option>
                  </select>

                  {/* Dropdown for the ramo do direito da proposta de lei */}
                  <label htmlFor="ramo_direito">Ramo do Direito da Proposta de Lei:</label>
                  <select id="ramo_direito" value={formData.ramo_direito} onChange={handleChange} required>
                    <option value="">Selecione o ramo do direito</option>
                    <option value="processual">Processual</option>
                    <option value="administrativo">Administrativo</option>
                    <option value="constitucional">Constitucional</option>
                    <option value="consumidor">Consumidor</option>
                    <option value="ambiental">Ambiental</option>
                    <option value="tributaria">Tributária</option>
                    <option value="civil">Cível</option>
                    <option value="penal">Penal</option>
                  </select>

                  <label htmlFor="nome_proposta">Nome da Proposta de Lei:</label>
                  <textarea id="nome_proposta" value={formData.nome_proposta} onChange={handleChange} rows="4" cols="30" required></textarea>
                  <label htmlFor="exposicao_motivos">Exposição de Motivos do Projeto de Lei:</label>
                  <textarea id="exposicao_motivos" value={formData.exposicao_motivos} onChange={handleChange} rows="4" cols="30" required></textarea>
                  <label htmlFor="texto_lei">Texto da Lei:</label>
                  <textarea id="texto_lei" value={formData.texto_lei} onChange={handleChange} rows="4" cols="30" required></textarea>
                  <div className="button-container">
                    <button style={{ marginRight: 20, fontSize: 15 }} type="button" onClick={() => atualizarLei(lei.id)}>Atualizar</button>
                    <button style={{ marginRight: 20, fontSize: 15 }} onClick={() => { setShowPopup(false); setFormData({}); }}>Limpar</button>
                  </div>
                </form>
                <button style={{ marginRight: 20, fontSize: 15 }} onClick={() => setShowPopup(false)}>Fechar</button>
              </div>
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
