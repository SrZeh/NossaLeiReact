import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

test('Renderiza ForgotPasswordScreen corretamente', () => {
  // Renderiza o componente ForgotPasswordScreen
  const { getByText, getByPlaceholderText } = render(<ForgotPasswordScreen />);

  // Verifica se o texto do cabeçalho está presente
  const headerText = getByText('Esqueceu sua senha?');
  expect(headerText).toBeInTheDocument();

  // Verifica se o texto do parágrafo está presente
  const paragraphText = getByText('Insira seu e-mail abaixo para receber um link de recuperação de senha');
  expect(paragraphText).toBeInTheDocument();

  // Verifica se o campo de input de e-mail está presente
  const emailInput = getByPlaceholderText('Digite seu e-mail');
  expect(emailInput).toBeInTheDocument();

  // Verifica se o botão de recuperar senha está presente
  const recoverButton = getByText('Recuperar Senha');
  expect(recoverButton).toBeInTheDocument();
});

test('Chama a função de recuperar senha ao clicar no botão', () => {
  // Mock da função de recuperar senha
  const mockRecoverPassword = jest.fn();

  // Renderiza o componente ForgotPasswordScreen com a função de recuperar senha mockada
  const { getByText } = render(<ForgotPasswordScreen recoverPassword={mockRecoverPassword} />);

  // Encontra o botão de recuperar senha
  const recoverButton = getByText('Recuperar Senha');

  // Simula um clique no botão de recuperar senha
  fireEvent.click(recoverButton);

  // Verifica se a função de recuperar senha foi chamada
  expect(mockRecoverPassword).toHaveBeenCalledTimes(1);
});
