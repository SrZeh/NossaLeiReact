import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Table, { fetchLeiData } from '../../components/Table';
import { getDocs, setDoc, deleteDoc } from '../../__mocks__/firebase';


jest.mock('../../firebase'); // Mock the firebase module

describe('Table Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mock functions
  });

  test('fetchLeiData fetches data for "Todas" abrangencia', async () => {
    getDocs.mockResolvedValueOnce({
      docs: [
        { id: '1', data: () => ({ abrangencia: 'Municipal', ramo_direito: 'Direito Civil', nome_proposta: 'Proposta 1', exposicao_motivos: 'Motivo 1', texto_lei: 'Texto 1' }) },
        { id: '2', data: () => ({ abrangencia: 'Estadual', ramo_direito: 'Direito Penal', nome_proposta: 'Proposta 2', exposicao_motivos: 'Motivo 2', texto_lei: 'Texto 2' }) }
      ]
    });

    const data = await fetchLeiData('Todas');
    expect(data).toEqual([
      { id: '1', abrangencia: 'Municipal', ramo_direito: 'Direito Civil', nome_proposta: 'Proposta 1', exposicao_motivos: 'Motivo 1', texto_lei: 'Texto 1' },
      { id: '2', abrangencia: 'Estadual', ramo_direito: 'Direito Penal', nome_proposta: 'Proposta 2', exposicao_motivos: 'Motivo 2', texto_lei: 'Texto 2' }
    ]);
  });

  test('handleDelete deletes the document and fetches updated data', async () => {
    getDocs.mockResolvedValueOnce({
      docs: [
        { id: '1', data: () => ({ abrangencia: 'Municipal', ramo_direito: 'Direito Civil', nome_proposta: 'Proposta 1', exposicao_motivos: 'Motivo 1', texto_lei: 'Texto 1' }) }
      ]
    });

    await act(async () => {
      render(<Table />);
    });

    deleteDoc.mockResolvedValueOnce();
    getDocs.mockResolvedValueOnce({
      docs: []
    });

    fireEvent.click(screen.getByText(/Excluir/i));

    await waitFor(() => {
      expect(deleteDoc).toHaveBeenCalled();
      expect(getDocs).toHaveBeenCalledTimes(2); // Initial fetch and after delete
    });
  });

  test('atualizarLei updates the document', async () => {
    getDocs.mockResolvedValueOnce({
      docs: [
        { id: '1', data: () => ({ abrangencia: 'Municipal', ramo_direito: 'Direito Civil', nome_proposta: 'Proposta 1', exposicao_motivos: 'Motivo 1', texto_lei: 'Texto 1' }) }
      ]
    });

    await act(async () => {
      render(<Table />);
    });

    fireEvent.click(screen.getByText(/Alterar/i));

    fireEvent.change(screen.getByLabelText(/Abrangência/i), { target: { value: 'Federal' } });
    fireEvent.change(screen.getByLabelText(/Ramo do Direito/i), { target: { value: 'Direito Constitucional' } });

    fireEvent.click(screen.getByText(/Salvar/i));

    await waitFor(() => {
      expect(setDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          abrangencia: 'Federal',
          ramo_direito: 'Direito Constitucional',
        })
      );
    });
  });
});
