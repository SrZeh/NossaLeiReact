import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Pagina Login Nossa Lei', () => {
  render(<App />);
  const linkElement = screen.getByText(/Nossa Lei/i);
  expect(linkElement).toBeInTheDocument();
});
