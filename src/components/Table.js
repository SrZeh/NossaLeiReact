// import React, { useState, useEffect } from 'react';
// import { collection, query, where, getDocs, doc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
// import { db } from '../firebase';
// import { useAuth } from '../context/AuthContext';

// // Função para buscar dados de leis
// export const fetchLeiData = async (selectedAbrangencia) => {
//   try {
//     if (selectedAbrangencia === "Todas") {
//       const querySnapshot = await getDocs(collection(db, "leis"));
//       const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       return data;
//     } else {
//       const q = query(collection(db, "leis"), where("abrangencia", "==", selectedAbrangencia));
//       const querySnapshot = await getDocs(q);
//       const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       return data;
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return [];
//   }
// };

// const Table = () => {
//   const { currentUser } = useAuth(); // Obtém o usuário atual do contexto de autenticação
//   const [leiData, setLeiData] = useState([]);
//   const [selectedAbrangencia, setSelectedAbrangencia] = useState('Todas');
//   const [expandedRow, setExpandedRow] = useState(null);
//   const [editingItem, setEditingItem] = useState(null);
//   const [formData, setFormData] = useState({
//     abrangencia: '',
//     ramo_direito: '',
//     nome_proposta: '',
//     exposicao_motivos: '',
//     texto_lei: ''
//   });
//   const toggleExpandRow = (leiId) => {
//     setExpandedRow(expandedRow === leiId ? null : leiId);
//   };

//   // const truncateText = (text) => {
//   //   return text.length > 10 ? text.slice(0, 10) + '...' : text;
//   // };

//   const truncateText = (text) => {
//     if (!text) return '';  // Adiciona verificação para text indefinido ou vazio
//     return text.length > 10 ? text.slice(0, 10) + '...' : text;
//   };

//   // Função para atualizar os dados do formulário
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
//   };

//   // Função para enviar as alterações
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (editingItem) {
//       try {
//         const leiRef = doc(db, "leis", editingItem);
//         await updateDoc(leiRef, formData);
//         const data = await fetchLeiData(selectedAbrangencia);
//         setLeiData(data);
//         setEditingItem(null);
//         setFormData({
//           abrangencia: '',
//           ramo_direito: '',
//           nome_proposta: '',
//           exposicao_motivos: '',
//           texto_lei: ''
//         });
//       } catch (error) {
//         console.error("Erro ao atualizar a lei:", error);
//       }
//     }
//   };

//   // Função para iniciar a edição
//   const startEditing = (lei) => {
//     setEditingItem(lei.id);
//     setFormData({
//       abrangencia: lei.abrangencia,
//       ramo_direito: lei.ramo_direito,
//       nome_proposta: lei.nome_proposta,
//       exposicao_motivos: lei.exposicao_motivos,
//       texto_lei: lei.texto_lei
//     });
//   };

//   // Efeito para buscar dados sempre que a abrangência selecionada mudar
//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await fetchLeiData(selectedAbrangencia);
//       setLeiData(data);
//     };

//     fetchData();
//   }, [selectedAbrangencia]);

//   // Função para excluir uma lei com confirmação
//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm('Você tem certeza de que deseja excluir esta lei?');
//     if (confirmDelete) {
//       try {
//         await deleteDoc(doc(db, "leis", id));
//         const data = await fetchLeiData(selectedAbrangencia);
//         setLeiData(data);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     }
//   };

//   // Função para assinar uma lei
//   const handleSign = async (id) => {
//     try {
//       const leiRef = doc(db, "leis", id);
//       await updateDoc(leiRef, {
//         assinaturas: arrayUnion(currentUser.email) // Adiciona o email ao array 'assinaturas'
//       });
//       const data = await fetchLeiData(selectedAbrangencia); // Atualiza a tabela após assinar
//       setLeiData(data);
//     } catch (error) {
//       console.error("Erro ao assinar a lei:", error);
//     }
//   };

//   // Função para retirar a assinatura de uma lei
//   const handleUnsign = async (id) => {
//     try {
//       const leiRef = doc(db, "leis", id);
//       await updateDoc(leiRef, {
//         assinaturas: arrayRemove(currentUser.email) // Remove o email do array 'assinaturas'
//       });
//       const data = await fetchLeiData(selectedAbrangencia); // Atualiza a tabela após retirar a assinatura
//       setLeiData(data);
//     } catch (error) {
//       console.error("Erro ao retirar a assinatura:", error);
//     }
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      
//       <div>
//         <h2>Escolha a Abrangência</h2>
//         <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
//           {/* Opções de abrangência */}
//           <label>
//             <input type="radio" value="Municipal" checked={selectedAbrangencia === "Municipal"} onChange={(e) => setSelectedAbrangencia(e.target.value)} />
//             Municipal
//           </label>
//           <label>
//             <input type="radio" value="Estadual" checked={selectedAbrangencia === "Estadual"} onChange={(e) => setSelectedAbrangencia(e.target.value)} />
//             Estadual
//           </label>
//           <label>
//             <input type="radio" value="Federal" checked={selectedAbrangencia === "Federal"} onChange={(e) => setSelectedAbrangencia(e.target.value)} />
//             Federal
//           </label>
//           <label>
//             <input type="radio" value="Todas" checked={selectedAbrangencia === "Todas"} onChange={(e) => setSelectedAbrangencia(e.target.value)} />
//             Todas
//           </label>
//         </div>
//       </div>
//       <table style={{ width: '100%', tableLayout: 'auto' }}>
//         <thead>
//           <tr>
//             <th style={{ textAlign: 'left' }}>Assinaturas</th> {/* Nova coluna para o número de assinaturas */}
//             <th style={{ textAlign: 'left' }}>Abrangência</th>
//             <th style={{ textAlign: 'left' }}>Ramo do Direito</th>
//             <th style={{ textAlign: 'left' }}>Nome da Proposta</th>
//             <th style={{ textAlign: 'left' }}>Exposição dos Motivos</th>
//             <th style={{ textAlign: 'left' }}>Texto da Lei</th>
//             <th style={{ textAlign: 'left' }}>Ações</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leiData.map(lei => {
//             const isSigned = lei.assinaturas?.includes(currentUser.email); // Verifica se o usuário já assinou a lei
//             return (
//               <React.Fragment key={lei.id}>
//                 <tr>
//                   <td onClick={() => toggleExpandRow(lei.id)} style={{ cursor: 'pointer' }}>{lei.assinaturas?.length || 0}</td> {/* Exibe o número de assinaturas */}
//                   <td onClick={() => toggleExpandRow(lei.id)} style={{ cursor: 'pointer' }}>{truncateText(lei.abrangencia)}</td>
//                   <td onClick={() => toggleExpandRow(lei.id)} style={{ cursor: 'pointer' }}>{truncateText(lei.ramo_direito)}</td>
//                   <td onClick={() => toggleExpandRow(lei.id)} style={{ cursor: 'pointer' }}>{truncateText(lei.nome_proposta)}</td>
//                   <td onClick={() => toggleExpandRow(lei.id)} style={{ cursor: 'pointer' }}>{truncateText(lei.exposicao_motivos)}</td>
//                   <td onClick={() => toggleExpandRow(lei.id)} style={{ cursor: 'pointer' }}>{truncateText(lei.texto_lei)}</td>
//                   <td>
//                     {currentUser.email === lei.email_usuario ? (
//                       <>
//                         <button style={{ fontSize: 15 }} onClick={() => handleDelete(lei.id)}>Excluir</button>
//                         <button style={{ fontSize: 15, marginLeft: 10 }} onClick={() => startEditing(lei)}>Alterar</button>
//                       </>
//                     ) : (
//                       isSigned ? (
//                         <button style={{ fontSize: 15 }} onClick={() => handleUnsign(lei.id)}>Retirar Assinatura</button>
//                       ) : (
//                         <button style={{ fontSize: 15 }} onClick={() => handleSign(lei.id)}>Assinar</button>
//                       )
//                     )}
//                   </td>
//                 </tr>
//                 {expandedRow === lei.id && (
//                   <tr>
//                     <td colSpan="7">
//                       <div>
//                         <p><strong>Abrangência:</strong> {lei.abrangencia}</p>
//                         <p><strong>Ramo do Direito:</strong> {lei.ramo_direito}</p>
//                         <p><strong>Nome da Proposta:</strong> {lei.nome_proposta}</p>
//                         <p><strong>Exposição dos Motivos:</strong> {lei.exposicao_motivos}</p>
//                         <p><strong>Texto da Lei:</strong> {lei.texto_lei}</p>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//                 {editingItem === lei.id && (
//                   <tr>
//                     <td colSpan="7">
//                       <div style={{ marginTop: 20, width: '100%' }}>
//                         <h3>Editar Lei</h3>
//                         <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
//                           <label htmlFor="abrangencia">Abrangência:</label>
//                           <select id="abrangencia" name="abrangencia" value={formData.abrangencia} onChange={handleInputChange} required>
//                             <option value="">Selecione a abrangência</option>
//                             <option value="Municipal">Municipal</option>
//                             <option value="Estadual">Estadual</option>
//                             <option value="Federal">Federal</option>
//                           </select>

//                           <label htmlFor="ramo_direito">Ramo do Direito:</label>
//                           <input
//                             type="text"
//                             id="ramo_direito"
//                             name="ramo_direito"
//                             value={formData.ramo_direito}
//                             onChange={handleInputChange}
//                             required
//                           />

//                           <label htmlFor="nome_proposta">Nome da Proposta:</label>
//                           <input
//                             type="text"
//                             id="nome_proposta"
//                             name="nome_proposta"
//                             value={formData.nome_proposta}
//                             onChange={handleInputChange}
//                             required
//                           />

//                           <label htmlFor="exposicao_motivos">Exposição dos Motivos:</label>
//                           <textarea
//                             id="exposicao_motivos"
//                             name="exposicao_motivos"
//                             value={formData.exposicao_motivos}
//                             onChange={handleInputChange}
//                             required
//                           />

//                           <label htmlFor="texto_lei">Texto da Lei:</label>
//                           <textarea
//                             id="texto_lei"
//                             name="texto_lei"
//                             value={formData.texto_lei}
//                             onChange={handleInputChange}
//                             required
//                           />

//                           <button type="submit" style={{ fontSize: 15, marginTop: 10 }}>Salvar Alterações</button>
//                           <button type="button" style={{ fontSize: 15, marginTop: 10 }} onClick={() => setEditingItem(null)}>Cancelar</button>
//                         </form>
//                       </div>
//                     </td>
//                   </tr>

//                 )}
//               </React.Fragment>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;

import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

// Função para buscar dados de leis
export const fetchLeiData = async (selectedAbrangencia) => {
  try {
    const querySnapshot = selectedAbrangencia === "Todas" 
      ? await getDocs(collection(db, "leis")) 
      : await getDocs(query(collection(db, "leis"), where("abrangencia", "==", selectedAbrangencia)));
    
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const Table = () => {
  const { currentUser } = useAuth();
  const [leiData, setLeiData] = useState([]);
  const [selectedAbrangencia, setSelectedAbrangencia] = useState('Todas');
  const [expandedRow, setExpandedRow] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingItem) {
      try {
        const leiRef = doc(db, "leis", editingItem);
        await updateDoc(leiRef, formData);
        setLeiData(await fetchLeiData(selectedAbrangencia));
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

  const handleDelete = async (id) => {
    if (window.confirm('Você tem certeza de que deseja excluir esta lei?')) {
      try {
        await deleteDoc(doc(db, "leis", id));
        setLeiData(await fetchLeiData(selectedAbrangencia));
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleSign = async (id) => {
    try {
      const leiRef = doc(db, "leis", id);
      await updateDoc(leiRef, {
        assinaturas: arrayUnion(currentUser.email)
      });
      setLeiData(await fetchLeiData(selectedAbrangencia));
    } catch (error) {
      console.error("Erro ao assinar a lei:", error);
    }
  };

  const handleUnsign = async (id) => {
    try {
      const leiRef = doc(db, "leis", id);
      await updateDoc(leiRef, {
        assinaturas: arrayRemove(currentUser.email)
      });
      setLeiData(await fetchLeiData(selectedAbrangencia));
    } catch (error) {
      console.error("Erro ao retirar a assinatura:", error);
    }
  };

  const truncateText = (text) => {
    return text?.length > 50 ? `${text.slice(0, 50)}...` : text || '';
  };

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           entry.target.classList.add('visible');
  //         }
  //       });
  //     },
  //     { threshold: 0.3 } // Elemento precisa estar 10% visível para ativar animação
  //   );

  //   const elements = document.querySelectorAll('.fade-in');
  //   elements.forEach((el) => observer.observe(el));
  // }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Adiciona a classe 'visible' para tornar o elemento visível
          } else {
            entry.target.classList.remove('visible'); // Remove 'visible' se o elemento não estiver mais visível (opcional)
          }
        });
      },
      { threshold: 0.1 } // Elemento precisa estar 10% visível para ativar a animação
    );
  
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el) => observer.observe(el));
  
    // Limpar o observer quando o componente for desmontado
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
  

  return (
    <div style={{ paddingTop: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div 
      
      style={{
        
        border: '1px solid #000',
        borderRadius: '15px',
        padding: '8px',
        backgroundColor:'#d9d9d9',
        margin: '10px',
        width: '35%',
        boxShadow: '0 4px 8px rgba(0,1,0,1)',
        alignContent: 'center',
        textAlign: 'center'
        }}>
      <h1 className="fade-in" style={{ textAlign: 'center'  }}>Propostas de Lei</h1>
        <h2 className="fade-in">Escolha a Abrangência</h2>
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10,  alignItems: 'left', textAlign:'left', marginLeft: '75px' }}>
          <label className="fade-in">
            <input type="radio" value="Municipal" checked={selectedAbrangencia === "Municipal"} onChange={(e) => setSelectedAbrangencia(e.target.value)} />
            Municipal
          </label>
          <label className="fade-in">
            <input type="radio" value="Estadual" checked={selectedAbrangencia === "Estadual"} onChange={(e) => setSelectedAbrangencia(e.target.value)} />
            Estadual
          </label>
          <label className="fade-in">
            <input type="radio" value="Federal" checked={selectedAbrangencia === "Federal"} onChange={(e) => setSelectedAbrangencia(e.target.value)} />
            Federal
          </label>
          <label className="fade-in">
            <input type="radio" value="Abaixo Assinado" checked={selectedAbrangencia === "Abaixo Assinado"} onChange={(e) => setSelectedAbrangencia(e.target.value)} />
            Abaixo Assinado
          </label>
          <label className="fade-in">
            <input type="radio" value="Todas" checked={selectedAbrangencia === "Todas"} onChange={(e) => setSelectedAbrangencia(e.target.value)} />
            Todas
          </label>
        </div>
      </div>
      
      
      <div  style={{ display: 'flex',paddingTop:'25px', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
        {leiData.map(lei => {
          const isSigned = lei.assinaturas?.includes(currentUser.email);

          return (
            <div  
            key={lei.id} 
            
            style={{ border: '2px solid #000', borderRadius: '15px', padding: '15px', backgroundColor:'#d9d9d9', margin: '10px', width: '80%', boxShadow: '0 4px 8px rgba(0,0,0,1)' }}
            
            >
              <div  onClick={() => setExpandedRow(expandedRow === lei.id ? null : lei.id)} style={{ cursor: 'pointer' }}>
                <h3>{truncateText(lei.nome_proposta, 50)}</h3>
                <p><strong>Ramo do Direito:</strong> {truncateText(lei.ramo_direito, 50)}</p>
                <p><strong>Abrangência:</strong> {truncateText(lei.abrangencia, 50)}</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p><strong>Assinaturas:</strong> {lei.assinaturas?.length || 0}</p>
                <div>
                  {currentUser.email === lei.email_usuario ? (
                    <>
                      <button style={{ fontSize: 15, backgroundColor: 'red', color: 'white', border: 'none', padding: '8px', margin: '0 5px' }} onClick={() => handleDelete(lei.id)}>Excluir</button>
                      <button style={{ fontSize: 15, backgroundColor: 'yellow', color: 'black', border: 'none', padding: '8px', margin: '0 5px' }} onClick={() => startEditing(lei)}>Alterar</button>
                    </>
                  ) : (
                    isSigned ? (
                      <button style={{ fontSize: 15, backgroundColor: '#7a5656', color: 'white', border: 'none', padding: '8px', margin: '0 5px' }} onClick={() => handleUnsign(lei.id)}>Retirar Assinatura</button>
                    ) : (
                      <button style={{ fontSize: 15, backgroundColor: 'green', color: 'white', border: 'none', padding: '8px', margin: '0 5px' }} onClick={() => handleSign(lei.id)}>Assinar</button>
                    )
                  )}
                </div>
              </div>
              

              {expandedRow === lei.id && (
                <div>
                  <p><strong>Abrangência:</strong> {lei.abrangencia}</p>
                  <p><strong>Ramo do Direito:</strong> {lei.ramo_direito}</p>
                  <p><strong>Nome da Proposta:</strong> {lei.nome_proposta}</p>
                  <p><strong>Exposição dos Motivos:</strong> {lei.exposicao_motivos}</p>
                  <p><strong>Texto da Lei:</strong> {lei.texto_lei}</p>
                </div>
              )}

              {editingItem === lei.id && (
                <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
                  <label>Abrangência:</label>
                  <select name="abrangencia" value={formData.abrangencia} onChange={handleInputChange}>
                    <option value="">Selecione a abrangência</option>
                    <option value="Municipal">Municipal</option>
                    <option value="Estadual">Estadual</option>
                    <option value="Federal">Federal</option>
                  </select>

                  <label>Ramo do Direito:</label>
                  <input type="text" name="ramo_direito" value={formData.ramo_direito} onChange={handleInputChange} />

                  <label>Nome da Proposta:</label>
                  <input type="text" name="nome_proposta" value={formData.nome_proposta} onChange={handleInputChange} />

                  <label>Exposição dos Motivos:</label>
                  <input type="text" name="exposicao_motivos" value={formData.exposicao_motivos} onChange={handleInputChange} />

                  <label>Texto da Lei:</label>
                  <textarea name="texto_lei" value={formData.texto_lei} onChange={handleInputChange}></textarea>

                  <button type="submit">Salvar Alterações</button>
                </form>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Table;
