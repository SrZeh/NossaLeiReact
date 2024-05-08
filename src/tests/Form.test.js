import React from 'react';
import { render, screen } from '@testing-library/react';
import Form from '../components/Form';

test('renders form', () => {
    render(<Form />);
    // Verifique se o texto "Cadastro" está presente no formulário
    const linkElement = screen.getByText(/Cadastro/i);
    expect(linkElement).toBeInTheDocument();
    // Adicione mais verificações conforme necessário para os elementos do formulário
});
