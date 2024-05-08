import React from 'react';
import { render } from '@testing-library/react';
import NewLawScreen from '../screens/NewLawScreen';
import Header from '../components/Header';
import Form from '../components/Form';
import Table from '../components/Table';

test('Renderiza NewLawScreen corretamente', () => {
  // Renderiza o componente NewLawScreen
  const { getByTestId } = render(<NewLawScreen />);

  // Verifica se o componente Header está presente
  const headerComponent = getByTestId('header-component');
  expect(headerComponent).toBeInTheDocument();

  // Verifica se o componente Form está presente
  const formComponent = getByTestId('form-component');
  expect(formComponent).toBeInTheDocument();

  // Verifica se o componente Table está presente
  const tableComponent = getByTestId('table-component');
  expect(tableComponent).toBeInTheDocument();
});
