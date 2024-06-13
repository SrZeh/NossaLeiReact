// src/tests/unit/Form.test.js

import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import Form from '../../components/Form';
import firebase from '../../firebase'; // Correct import of mocked firebase

jest.mock('../../firebase'); // Automatic mock works

describe('Form Component', () => {
    it('should submit form data correctly', async () => {
        const { getByLabelText, getByText } = render(<Form />);

        // Fill out form fields
        fireEvent.change(getByLabelText('Abrangência da Lei:'), { target: { value: 'municipal' } });
        fireEvent.change(getByLabelText('Ramo do Direito da Proposta de Lei:'), { target: { value: 'constitucional' } });
        fireEvent.change(getByLabelText('Nome da Proposta de Lei:'), { target: { value: 'Teste Lei' } });
        fireEvent.change(getByLabelText('Exposição de Motivos do Projeto de Lei:'), { target: { value: 'Motivos do teste' } });
        fireEvent.change(getByLabelText('Texto da Lei:'), { target: { value: 'Texto da lei de teste' } });

        // Submit form
        await act(async () => {
            fireEvent.click(getByText('Enviar'));
        });

        // Assert that addDoc was called with the correct data
        expect(firebase.firestore().collection).toHaveBeenCalledWith('your-collection-name'); // Replace with your actual collection name
        expect(firebase.firestore().collection().add).toHaveBeenCalledWith({
            abrangencia: 'Municipal',
            ramo_direito: 'Constitucional',
            nome_proposta: 'Teste Lei',
            exposicao_motivos: 'Motivos do teste',
            texto_lei: 'Texto da lei de teste'
        });

        // Ensure other assertions related to form submission
        // ...
    });

    // Add more test cases as needed...
});
