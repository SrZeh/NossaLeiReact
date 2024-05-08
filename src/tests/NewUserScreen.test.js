import React from "react";
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NewUserScreen from '../screens/NewUserScreen';

test('NewUserScreen executa a função de navegação ao clicar em Entrar', () => {
  // Mock da função de navegação
  const navigate = jest.fn();

  // Renderiza o componente NewUserScreen com BrowserRouter
  const { getByText } = render(
    <Router>
      <NewUserScreen navigate={navigate} />
    </Router>
  );

  // Simula o clique no botão "Entrar"
  fireEvent.click(getByText('Entrar'));

  // Verifica se a função de navegação foi chamada
  expect(navigate).toHaveBeenCalled();
});
