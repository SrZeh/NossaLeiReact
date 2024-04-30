import { render, screen } from '@testing-library/react'; // importe React
import { MemoryRouter } from 'react-router-dom'; // Importe MemoryRouter
import Header from '../components/Header';

test('renders logo', () => {
    render(
        <MemoryRouter> {/* Use MemoryRouter para envolver o componente Header */}
            <Header />
        </MemoryRouter>
    );
    const logoElement = screen.getByAltText(/Logo/i);
    expect(logoElement).toBeInTheDocument();
});
