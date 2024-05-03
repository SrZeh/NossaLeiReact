import React from "react";
import { render, screen } from "@testing-library/react";
import OpenPopup from "../components/OpenPopup"; // Corrija o caminho de importação para o componente OpenPopup

// Mock das dependências
jest.mock("../components/Table", () => () => <div data-testid="table-mock">Mocked Table</div>);
// Jest irá automaticamente criar um mock para o PopupForm se o arquivo não existir

test("renders OpenPopup component", () => {
  render(<OpenPopup />);
  // Verifique se o componente Table foi renderizado corretamente
  expect(screen.getByTestId("table-mock")).toBeInTheDocument();
});

