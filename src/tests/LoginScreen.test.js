import React from "react";
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import LoginScreen from '../screens/LoginScreen';

test('LoginScreen renderiza corretamente e navega para a tela de nova lei ao clicar em entrar', async () => {
  // Inicializa uma variável para armazenar a rota atual
  let currentPath = '';

  // Define uma função navigate que atualiza a variável currentPath com o destino
  const navigate = (path) => {
    currentPath = path;
  };

  // Renderiza o componente LoginScreen dentro de MemoryRouter para testar o roteamento
  const { getByText, getByPlaceholderText } = render(
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<LoginScreen navigate={navigate} />} />
        <Route path="/new-law" element={<div />} />
      </Routes>
    </MemoryRouter>
  );

  // Simula o preenchimento do email e da senha
  const emailInput = getByPlaceholderText('Digite seu email');
  const passwordInput = getByPlaceholderText('Digite sua senha');
  fireEvent.change(emailInput, { target: { value: 'example@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  // Simula o clique no botão de entrar
  fireEvent.click(getByText('Entrar'));

  // Verifica se a função navigate foi chamada com o URL correto
  expect(currentPath).toBe('/new-law');
});
