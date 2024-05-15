import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase';
import PopupForm from './PopupForm';
import IBGENoticias from './IBGENoticias';



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
  const [selectedAbrangencia, setSelectedAbrangencia] = useState('Todas');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const openPopup = (id) => {
    setShowPopup(true);
    setSelectedId(id);
  };

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


  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.id]: e.target.value });
  // };



  return (
    <div>
      <IBGENoticias />
      {showPopup && <PopupForm leiId={selectedId} closePopup={() => setShowPopup(false)} />}
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
          {leiData.map(lei => (
            <tr key={lei.id}>
              <td>{lei.id}</td>
              <td>{lei.abrangencia}</td>
              <td>{lei.ramo_direito}</td>
              <td>{lei.nome_proposta}</td>
              <td>{lei.exposicao_motivos}</td>
              <td>{lei.texto_lei}</td>
              <td>
                <button style={{ fontSize: 15 }} onClick={() => handleDelete(lei.id)}>Excluir</button>
                <button style={{ fontSize: 15, marginLeft: 10 }} onClick={() => openPopup(lei.id)}>Alterar</button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>

    </div>
  );
};

export default Table;