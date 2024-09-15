

// import React, { useState } from 'react';
// import { collection, addDoc } from "firebase/firestore";
// import { db } from '../firebase';
// import { fetchLeiData } from '../components/Table';
// import { useAuth } from '../context/AuthContext';
// import Header from '../components/Header';

// const Undersigned = () => {
//     const { currentUser } = useAuth();

//     const [formData, setFormData] = useState({
//         abrangencia: '',
//         ramo_direito: '',
//         nome_proposta: '',
//         exposicao_motivos: '',
//         texto_abaixo_assinado: ''
//     });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.id]: e.target.value });
//     };

//     const enviarAbaixoAssinado = async () => {
//         const formDataToSend = {
//             abrangencia: formData.abrangencia,
//             nome_proposta: formData.nome_abaixo_assinado,
//             exposicao_motivos: formData.exposicao_motivos_abaixo_assinado,
//             texto_lei: formData.texto_abaixo_assinado,
//             email_usuario: currentUser ? currentUser.email : 'Anônimo' // Adiciona o e-mail do usuário
//         };

//         try {
//             await addDoc(collection(db, "leis"), formDataToSend);
//             await fetchLeiData(formData.abrangencia);
//             limpar();
//         } catch (error) {
//             console.error('Error writing document: ', error);
//         }
//     };

//     const limpar = () => {
//         setFormData({
//             abrangencia: '',
//             nome_abaixo_assinado: '',
//             exposicao_motivos_abaixo_assinado: '',
//             texto_abaixo_assinado: ''
//         });
//     };

//     return (
//         <div className="container">
//             <Header />
//             <h1 style={{ textAlign: 'center' }}>Crie Seu Abaixo Assinado</h1>
            
//             <form id="formulario_undersigned" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>

//             <label htmlFor="abrangencia">Abrangência da Lei:</label>
//                 <select id="abrangencia" value={formData.abrangencia} onChange={handleChange} required>
                    
//                     <option value="abaixo_assinado">abaixo assinado</option>
//                 </select>

//                 <label htmlFor="nome_abaixo_assinado">Titulo do Abaixo Assinado:</label>
//                 <textarea id="nome_abaixo_assinado" value={formData.nome_abaixo_assinado} onChange={handleChange} rows="4" cols="30" required></textarea>
//                 <label htmlFor="exposicao_motivos_abaixo_assinado">Exposição de Motivos do Abaixo Assinado:</label>
//                 <textarea id="exposicao_motivos_abaixo_assinado" value={formData.exposicao_motivos_abaixo_assinado} onChange={handleChange} rows="4" cols="30" required></textarea>
//                 <label htmlFor="texto_abaixo_assinado">Texto do Abaixo Assinado:</label>
//                 <textarea id="texto_abaixo_assinado" value={formData.texto_abaixo_assinado} onChange={handleChange} rows="4" cols="30" required></textarea>
//                 <div className="button-container" style={{ marginTop: '20px' }}>
//                     <button style={{ marginRight: 20, fontSize: 15, backgroundColor: '#28a745' }} type="button" onClick={enviarAbaixoAssinado}>Enviar</button>
//                     <button style={{ marginRight: 20, fontSize: 15, backgroundColor: '#FF7F7F' }} onClick={limpar}>Limpar</button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default Undersigned;


import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase';
import { fetchLeiData } from '../components/Table';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

const PetitionForm = () => {
    const { currentUser } = useAuth();

    const [formData, setFormData] = useState({
        nome_abaixo_assinado: '',
        exposisicao_motivos_abaixo_assinado: '',
        texto_abaixo_assinado: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const enviarPeticao = async () => {
        const formDataToSend = {
            abrangencia: 'Abaixo Assinado', // Definido automaticamente como "abaixo assinado"
            nome_proposta: formData.nome_abaixo_assinado,
            exposicao_motivos: formData.exposisicao_motivos_abaixo_assinado,
            texto_lei: formData.texto_abaixo_assinado,
            email_usuario: currentUser ? currentUser.email : 'Anônimo' // Adiciona o e-mail do usuário
        };

        try {
            await addDoc(collection(db, "leis"), formDataToSend);
            await fetchLeiData('abaixo_assinado');
            limpar();
        } catch (error) {
            console.error('Error writing document: ', error);
        }
    };

    const limpar = () => {
        setFormData({
            nome_abaixo_assinado: '',
            exposisicao_motivos_abaixo_assinado: '',
            texto_abaixo_assinado: ''
        });
    };

    return (
        <div className="container">
            <Header />
            <h1 style={{ textAlign: 'center' }}>Crie Seu Abaixo Assinado</h1>
            
            <form id="formulario_peticao" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>

                <label htmlFor="nome_abaixo_assinado">Título do Abaixo Assinado:</label>
                <textarea id="nome_abaixo_assinado" value={formData.nome_abaixo_assinado} onChange={handleChange} rows="4" cols="30" required></textarea>

                <label htmlFor="exposisicao_motivos_abaixo_assinado">Exposição de Motivos do Abaixo Assinado:</label>
                <textarea id="exposisicao_motivos_abaixo_assinado" value={formData.exposisicao_motivos_abaixo_assinado} onChange={handleChange} rows="4" cols="30" required></textarea>

                <label htmlFor="texto_abaixo_assinado">Texto do Abaixo Assinado:</label>
                <textarea id="texto_abaixo_assinado" value={formData.texto_abaixo_assinado} onChange={handleChange} rows="4" cols="30" required></textarea>

                <div className="button-container" style={{ marginTop: '20px' }}>
                    <button style={{ marginRight: 20, fontSize: 15, backgroundColor: '#28a745' }} type="button" onClick={enviarPeticao}>Enviar</button>
                    <button style={{ marginRight: 20, fontSize: 15, backgroundColor: '#FF7F7F' }} type="button" onClick={limpar}>Limpar</button>
                </div>
            </form>
        </div>
    );
};

export default PetitionForm;
