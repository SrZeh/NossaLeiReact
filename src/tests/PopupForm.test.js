import { render, screen } from '@testing-library/react';
import App from '../components/PopupForm';

test('renders Pagina Login Nossa Lei', () => {
  render(<App />);
  const linkElement = screen.getByText(/Leis/i);
  expect(linkElement).toBeInTheDocument();
});