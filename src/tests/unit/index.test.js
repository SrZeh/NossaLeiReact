// index.test.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import App from '../App'; // assuming you have App component

// Mock the App component
jest.mock('../App', () => ({
    __esModule: true,
    default: () => <div className="mockedApp">Mocked App</div>,
}));

// Mock reportWebVitals function
const mockReportWebVitals = jest.fn();
jest.mock('../reportWebVitals', () => ({
    __esModule: true,
    default: mockReportWebVitals,
}));

test('renders app with strict mode', () => {
    const root = document.createElement('div');
    const container = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
    root.appendChild(container);

    act(() => {
        const rootElement = createRoot(container);
        rootElement.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        );
    });

    // Check if Mocked App renders without crashing
    expect(container.querySelector('.mockedApp')).toBeTruthy();

    // Check if reportWebVitals is called
    expect(mockReportWebVitals).toHaveBeenCalled();

    // Cleanup
    document.body.removeChild(root);
});
