import { render, screen } from '@testing-library/react';
import Form from '../components/Form';

test('renders form', () => {
  render(<Form />);

  // Usando uma expressão regular para encontrar o texto "Cadastro"
  const cadastroText = screen.getByText(/Cadastro/i);
  expect(cadastroText).toBeInTheDocument();
});
