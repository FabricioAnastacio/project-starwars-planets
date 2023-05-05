import { render, screen } from "@testing-library/react";
import { mockData } from "./helpers/mockData";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe('1 - Testa se axiste opções para ordernar a tabela', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(
      async () => (
        { json: async () => (mockData)
      })
    );
  });

  it('verifica se existe uma tag select com as categorias possiveis para ordenar', async () => {
    render(<App />);

    const selectOptionOrder = await screen.findByTestId('column-sort');

    expect(selectOptionOrder).toBeInTheDocument();
    expect(selectOptionOrder.children.length).toBe(5);
  });

  it('verifica se existe dois inputs do raido, um com o valor "ASC" e outro com "DESC"', async () => {
    render(<App />);

    const inputRidor1 = await screen.findByTestId('column-sort-input-asc');
    const inputRidor2 = await screen.findByTestId('column-sort-input-desc');

    expect(inputRidor1).toBeInTheDocument();
    expect(inputRidor2).toBeInTheDocument();
    expect(inputRidor1.type).toBe('radio');
    expect(inputRidor2.type).toBe('radio');
  });

  it('verifica se existe um button para ativar a ordem selecionada, com o nome "Ordenar"', async () => {
    render(<App />);

    const buttonOrder = await screen.findByRole('button', { name: 'Ordenar' });

    expect(buttonOrder).toBeInTheDocument();
  });
})

describe('2 - Testa as funções de ordenação', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(
      async () => (
        { json: async () => (mockData)
      })
    );
  });

  it(`Testa se é possivel ordenar em ordem Ascendente nas categorias selecionadas.
    Caso haja alguma propriedade "unknown" sua posição deve sempra ser a ultima.`,
    async () => {
      render(<App />);

      const selectOptionOrder = await screen.findByTestId('column-sort');
      const inputRidorASC = await screen.findByTestId('column-sort-input-asc');
      const buttonOrder = await screen.findByRole('button', { name: 'Ordenar' });

      userEvent.selectOptions(selectOptionOrder, ['orbital_period']);
      userEvent.click(inputRidorASC);
      userEvent.click(buttonOrder);

      const planetsNamesORBITAL = screen.getAllByTestId('planet-name');
      const namesORBITAL = planetsNamesORBITAL.map((planet) => planet.textContent);

      expect(namesORBITAL[0]).toBe('Tatooine');
      expect(namesORBITAL[namesORBITAL.length -1]).toBe('Bespin');

      userEvent.selectOptions(selectOptionOrder, ['population']);
      userEvent.click(inputRidorASC);
      userEvent.click(buttonOrder);

      const planetsNamesPOPULATION = screen.getAllByTestId('planet-name');
      const namesPOPULATION = planetsNamesPOPULATION.map((planet) => planet.textContent);

      expect(namesPOPULATION[0]).toBe('Yavin IV');
      expect(namesPOPULATION[namesPOPULATION.length -1]).toBe('Hoth');
    }
  );

  it(`Testa se é possivel ordenar em ordem Descendente nas categorias selecionadas.
    Caso haja alguma propriedade "unknown" sua posição deve sempra ser a ultima.`,
    async () => {
      render(<App />);

      const selectOptionOrder = await screen.findByTestId('column-sort');
      const inputRidorDESC = await screen.findByTestId('column-sort-input-desc');
      const buttonOrder = await screen.findByRole('button', { name: 'Ordenar' });

      userEvent.selectOptions(selectOptionOrder, ['orbital_period']);
      userEvent.click(inputRidorDESC);
      userEvent.click(buttonOrder);

      const planetsNamesORBITAL = screen.getAllByTestId('planet-name');
      const namesORBITAL = planetsNamesORBITAL.map((planet) => planet.textContent);

      expect(namesORBITAL[0]).toBe('Bespin');
      expect(namesORBITAL[namesORBITAL.length -1]).toBe('Tatooine');

      userEvent.selectOptions(selectOptionOrder, ['population']);
      userEvent.click(inputRidorDESC);
      userEvent.click(buttonOrder);

      const planetsNamesPOPULATION = screen.getAllByTestId('planet-name');
      const namesPOPULATION = planetsNamesPOPULATION.map((planet) => planet.textContent);

      expect(namesPOPULATION[0]).toBe('Bespin');
      expect(namesPOPULATION[namesPOPULATION.length -1]).toBe('Tatooine');
    }
  );
})
