// Table.js
import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase';

export const fetchLeiData = async (selectedAbrangencia) => {
  try {
    if (selectedAbrangencia === "Todas") { // Fetch all data
      const querySnapshot = await getDocs(collection(db, "leis"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return data;
    }
    else {
      const q = query(collection(db, "leis"), where("abrangencia", "==", selectedAbrangencia));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; // Return an empty array in case of error
  }
};

const Table = () => {
  const [leiData, setLeiData] = useState([]);
  const [selectedAbrangencia, setSelectedAbrangencia] = useState('Todas'); // Default selection

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
      // After deleting, update the data by refetching
      const data = await fetchLeiData(selectedAbrangencia);
      setLeiData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAbrangenciaChange = (event) => {
    setSelectedAbrangencia(event.target.value);
  };

  return (
    <div>
      <div>
        <h1 style={{ textAlign: 'center' }}>Escolha a Abrangência</h1>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 10 }}>
          <label>
            <input type="radio" value="Municipal" checked={selectedAbrangencia === "Municipal"} onChange={handleAbrangenciaChange} />
            Municipal
          </label>
          <label>
            <input type="radio" value="Estadual" checked={selectedAbrangencia === "Estadual"} onChange={handleAbrangenciaChange} />
            Estadual
          </label>
          <label>
            <input type="radio" value="Federal" checked={selectedAbrangencia === "Federal"} onChange={handleAbrangenciaChange} />
            Federal
          </label>
          <label>
            <input type="radio" value="Todas" checked={selectedAbrangencia === "Todas"} onChange={handleAbrangenciaChange} />
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
