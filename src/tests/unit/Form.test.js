import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Form from '../../components/Form';
import { db, collection, addDoc } from '../../firebase';

jest.mock('../../firebase', () => {
    const firestore = {
        collection: jest.fn(() => ({
            add: jest.fn(() => Promise.resolve({ id: 'lei-1' })),
        })),
    };
    return {
        db: firestore,
        collection: jest.fn(() => firestore.collection()),
        addDoc: jest.fn((collectionRef, data) => firestore.collection().add(data)),
    };
});

describe('Form', () => {
    it('adds a new document to Firestore when the form is submitted', async () => {
        const { getByLabelText, getByText } = render(<Form />);

        const abrangenciaInput = getByLabelText('Abrangência da Lei:');
        const ramoDireitoInput = getByLabelText('Ramo do Direito da Proposta de Lei:');
        const nomePropostaInput = getByLabelText('Nome da Proposta de Lei:');
        const exposicaoMotivosInput = getByLabelText('Exposição de Motivos do Projeto de Lei:');
        const textoLeiInput = getByLabelText('Texto da Lei:');
        const enviarButton = getByText('Enviar');

        fireEvent.change(abrangenciaInput, { target: { value: 'municipal' } });
        fireEvent.change(ramoDireitoInput, { target: { value: 'processual' } });
        fireEvent.change(nomePropostaInput, { target: { value: 'Proposta de Lei' } });
        fireEvent.change(exposicaoMotivosInput, { target: { value: 'Motivos da Proposta' } });
        fireEvent.change(textoLeiInput, { target: { value: 'Texto da Lei' } });

        fireEvent.click(enviarButton);

        await waitFor(() => {
            expect(addDoc).toHaveBeenCalledTimes(1);
            expect(addDoc).toHaveBeenCalledWith(collection(db, 'leis'), {
                abrangencia: 'municipal',
                ramo_direito: 'processual',
                nome_proposta: 'Proposta de Lei',
                exposicao_motivos: 'Motivos da Proposta',
                texto_lei: 'Texto da Lei',
            });
        });
    });
});