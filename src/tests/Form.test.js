import { render, screen } from '@testing-library/react';
import Form from '../components/Form';

test('renders form', () => {
    render(<Form />);
    const linkElement = screen.getByText(/Cadastro/i);
    expect(linkElement).toBeInTheDocument();
});
