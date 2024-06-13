import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../../components/Header';
import { act } from 'react-dom/test-utils';

test('renders logo', () => {
    act(() => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
    });
    const logoElement = screen.getByAltText(/Logo/i);
    expect(logoElement).toBeInTheDocument();
});
