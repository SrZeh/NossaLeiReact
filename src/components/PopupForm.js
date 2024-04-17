import React, { useEffect, useState } from "react";
import { doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Modal from 'react-modal';


const atualizarPagina = () => {
    // Esta função pode conter qualquer lógica necessária para atualizar a página, como recarregar a página
    window.location.reload();
};
const PopupForm = ({ leiId, closePopup }) => {
    const [leiData, setLeiData] = useState(leiId);
    const [formData, setFormData] = useState({
        nome_proposta: leiData.nome_proposta,
        exposicao_motivos: leiData.exposicao_motivos,
        texto_lei: leiData.texto_lei
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!leiId) {
                    console.log("Lei não encontrada 1");
                    return;
                }
                const docRef = doc(db, "leis", leiId);
                const docSnap = await getDocs(docRef);
                if (docSnap.exists()) {
                    setLeiData(docSnap.data());
                    setFormData(docSnap.data());
                } else {
                    console.log("Lei não encontrada");
                }
            } catch (error) {
                console.error("Erro ao buscar dados da lei:", error);
            }
        };
        fetchData();
    }, [leiId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!leiId) {
            console.log("Lei não encontrada");
            return;
        }
        const leiDocRef = doc(db, "leis", leiId);
        await updateDoc(leiDocRef, formData);
        console.log("Lei atualizada com sucesso");
        closePopup();
        atualizarPagina();
    };

    return (
        <Modal
            isOpen={leiId}
            onRequestClose={closePopup}
            contentLabel="Popup Modal"
        >
            <div className="popup-inner">
                <h2>Editar lei</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nome_proposta">Nome da proposta</label>
                    <textarea id="nome_proposta" value={formData.nome_proposta} onChange={handleChange} rows="4" cols="30" required></textarea>
                    <label htmlFor="exposicao_motivos">Exposição de motivos</label>
                    <textarea id="exposicao_motivos" value={formData.exposicao_motivos} onChange={handleChange} rows="4" cols="30" required></textarea>
                    <label htmlFor="texto_lei">Texto da lei</label>
                    <textarea id="texto_lei" value={formData.texto_lei} onChange={handleChange} rows="4" cols="30" required></textarea>
                    <button style={{ backgroundColor: '#28a745' }} type="submit">Salvar</button>
                </form>
            </div>
        </Modal>
    );
};

export default PopupForm;

