import { render, screen } from '@testing-library/react';
import App from '../components/Table';

test('renders Pagina Login Nossa Lei', () => {
  render(<App />);
  const linkElement = screen.getByText(/Todas/i);
  expect(linkElement).toBeInTheDocument();
});