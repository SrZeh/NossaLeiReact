import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PopupForm from '../components/PopupForm';

test('PopupForm preenche corretamente os campos do formulário', () => {
  // Renderiza apenas o formulário do componente PopupForm
  const { getByLabelText } = render(
    <PopupForm leiId="id-da-lei" closePopup={jest.fn()} />
  );

  // Simula uma alteração nos campos do formulário
  fireEvent.change(getByLabelText('Nome da proposta'), { target: { value: 'Nova Proposta' } });
  fireEvent.change(getByLabelText('Exposição de motivos'), { target: { value: 'Novos Motivos' } });
  fireEvent.change(getByLabelText('Texto da lei'), { target: { value: 'Novo Texto' } });

  // Verifica se os campos do formulário foram preenchidos corretamente
  expect(getByLabelText('Nome da proposta')).toHaveValue('Nova Proposta');
  expect(getByLabelText('Exposição de motivos')).toHaveValue('Novos Motivos');
  expect(getByLabelText('Texto da lei')).toHaveValue('Novo Texto');
});
