
import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase';
import { fetchLeiData } from './Table';


const atualizarPagina = () => {
    window.location.reload();
};


const Form = () => {
    const [formData, setFormData] = useState({
        abrangencia: '',
        ramo_direito: '',
        nome_proposta: '',
        exposicao_motivos: '',
        texto_lei: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const enviarLei = async () => {
        const abrangencia = {
            'municipal': 'Municipal',
            'estadual': 'Estadual',
            'federal': 'Federal'
        }[formData.abrangencia];
        const ramodireito = {
            'processual': 'Processual',
            'administrativo': 'Administrativo',
            'constitucional': 'Constitucional',
            'consumidor': 'Consumidor',
            'ambiental': 'Ambiental',
            'tributaria': 'Tributária',
            'civil': 'Cível',
            'penal': 'Penal'
        }[formData.ramo_direito];

        const formDataToSend = {
            abrangencia: abrangencia,
            ramo_direito: ramodireito,
            nome_proposta: formData.nome_proposta,
            exposicao_motivos: formData.exposicao_motivos,
            texto_lei: formData.texto_lei
        };

        console.log("FormDataToSend:", formDataToSend);

        try {
            await addDoc(collection(db, "leis"), formDataToSend);
            await fetchLeiData(formData.abrangencia);
            limpar();
        } catch (error) {
            console.error('Error writing document: ', error);
        }
        atualizarPagina();

    };

    const limpar = () => {
        setFormData({
            abrangencia: '',
            ramo_direito: '',
            nome_proposta: '',
            exposicao_motivos: '',
            texto_lei: ''
        });
    };

    return (
        <div className="container">
            <h1 style={{ textAlign: 'center' }}>Cadastro de Leis de Iniciativa Popular</h1>
            <label htmlFor="abrangencia">Abrangência da Lei:</label>
            <select id="abrangencia" value={formData.abrangencia} onChange={handleChange} required>
                <option value="">Selecione a abrangência</option>
                <option value="municipal">Municipal</option>
                <option value="estadual">Estadual</option>
                <option value="federal">Federal</option>
            </select>
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
            <form id="formulario_lei">
                <label htmlFor="nome_proposta">Nome da Proposta de Lei:</label>
                <textarea id="nome_proposta" value={formData.nome_proposta} onChange={handleChange} rows="4" cols="30" required></textarea>
                <label htmlFor="exposicao_motivos">Exposição de Motivos do Projeto de Lei:</label>
                <textarea id="exposicao_motivos" value={formData.exposicao_motivos} onChange={handleChange} rows="4" cols="30" required></textarea>
                <label htmlFor="texto_lei">Texto da Lei:</label>
                <textarea id="texto_lei" value={formData.texto_lei} onChange={handleChange} rows="4" cols="30" required></textarea>
                <div className="button-container">
                    <button style={{ marginRight: 20, fontSize: 15, backgroundColor: '#28a745' }} type="button" onClick={enviarLei}>Enviar</button>
                    <button style={{ marginRight: 20, fontSize: 15, backgroundColor: '#FF7F7F' }} onClick={limpar}>Limpar</button>
                </div>
            </form>
        </div>
    );
};

export default Form;