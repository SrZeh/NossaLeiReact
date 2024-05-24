import { render, screen, fireEvent } from '@testing-library/react';
import OpenPopup from '../components/OpenPopup';

jest.mock('../components/PopupForm', () => {
  const PopupFormMock = () => <div>Mocked PopupForm</div>;
  return PopupFormMock;
});

test('renders table and popup form', () => {
  render(<OpenPopup />);
  const abrirPopupButton = screen.getByText(/OpenPopup/i); // Utilizando uma expressão regular para buscar o texto
  fireEvent.click(abrirPopupButton);
  const mockedPopupForm = screen.getByText('Mocked PopupForm');
  expect(mockedPopupForm).toBeInTheDocument();
});
