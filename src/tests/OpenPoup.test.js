// import { render, screen, fireEvent } from '@testing-library/react';
// import OpenPopup from '../components/OpenPopup';

// jest.mock('../components/PopupForm', () => {
//   const PopupFormMock = () => <div>Mocked PopupForm</div>;
//   return PopupFormMock;
// });

// test('renders table and popup form', () => {
//   render(<OpenPopup />);
//   const abrirPopupButton = screen.getByText(/OpenPopup/i); // Utilizando uma expressão regular para buscar o texto
//   fireEvent.click(abrirPopupButton);
//   const mockedPopupForm = screen.getByText('Mocked PopupForm');
//   expect(mockedPopupForm).toBeInTheDocument();
// });

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import OpenPopup from "./OpenPopup";

jest.mock("./PopupForm", () => {
  return jest.fn(() => <div data-testid="mocked-popup">Mocked Popup Form</div>);
});

describe("OpenPopup Component", () => {
  it("should render without crashing", () => {
    render(<OpenPopup />);
  });

  it("should open popup when table row is clicked", () => {
    const { getByText, getByTestId } = render(<OpenPopup />);
    const tableRow = getByText("YourTableRowContent"); // Substitua com o conteúdo real da sua tabela
    fireEvent.click(tableRow);
    const popup = getByTestId("mocked-popup");
    expect(popup).toBeInTheDocument();
  });

  it("should close popup when close button is clicked", () => {
    const { getByTestId, queryByTestId } = render(<OpenPopup />);
    const tableRow = getByTestId("mocked-popup");
    const closeButton = getByTestId("close-button");
    fireEvent.click(closeButton);
    expect(queryByTestId("mocked-popup")).not.toBeInTheDocument();
  });
});
