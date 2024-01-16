import { findByRole, getByRole, render, screen } from "@testing-library/react"
import App from "../App"
import { mockData } from "./helpers/mockData";
import userEvent from "@testing-library/user-event";

describe('1 - Testa se existe opções para filtros', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(
      async () => (
        { json: async () => (mockData)
      })
    );
  });

  it(
    'verifica se existe na um input para pesquisar por nome, e se é possivel fitrar por ele', 
    async () => {
      render(<App />)

      const inputName = await screen.findByRole('textbox');
      const firstPlanetName = screen.getByRole('cell', { name: 'Tatooine' } )
      const removePlanetName = screen.getByRole('cell', { name: 'Alderaan' } )

      userEvent.type(inputName, 'Tatooine')

      expect(inputName).toBeInTheDocument();
      expect(firstPlanetName).toBeInTheDocument();
      expect(removePlanetName).not.toBeInTheDocument();

      userEvent.clear(inputName)

      screen.getByRole('cell', { name: 'Alderaan' } )
    }
  );

  it('verifica se existe uma tag select com as categorias possiveis', async () => {
    render(<App />);

    const selectCategory = await screen.findByTestId('column-filter');

    expect(selectCategory).toBeInTheDocument();
    expect(selectCategory.children.length).toBe(5);
  });

  it('verifica se existe uma tag select para selecionar a condição', async () => {
    render(<App />);

    const selectCondition = await screen.findByTestId('comparison-filter');

    expect(selectCondition).toBeInTheDocument();
    expect(selectCondition.children.length).toBe(3);
  });

  it('verifica se existe um imput do tipo number', async () => {
    render(<App />);

    const numberImput = await screen.findByRole('spinbutton');

    expect(numberImput).toBeInTheDocument();
    expect(numberImput.type).toBe('number');
  });

  it('verifica se existe um botão para ativar o filtro com o nome "Filtrar"', async () => {
    render(<App />);

    const buttonFilter = await screen.findByRole('button', { name: 'Filtrar' });

    expect(buttonFilter).toBeInTheDocument();
  });

  it('verifica se é possivel filtrar por um valor igual a condição selecinada', async () => {
    render(<App />);

    const buttonFilter = await screen.findByRole('button', { name: 'Filtrar' });
    const selectCategory = await screen.findByTestId('column-filter');
    const selectCondition = await screen.findByTestId('comparison-filter');
    const numberImput = await screen.findByRole('spinbutton');

    userEvent.selectOptions(selectCategory ,['rotation_period']);
    userEvent.selectOptions(selectCondition ,['igual a']);
    userEvent.type(numberImput, '12');
    userEvent.click(buttonFilter);

    screen.getByRole('cell', { name: 'Bespin' } )
  });

  it('verifica se é possivel filtrar por um valor maior que a condição selecinada', async () => {
    render(<App />);

    const buttonFilter = await screen.findByRole('button', { name: 'Filtrar' });
    const selectCategory = await screen.findByTestId('column-filter');
    const selectCondition = await screen.findByTestId('comparison-filter');
    const numberImput = await screen.findByRole('spinbutton');

    userEvent.selectOptions(selectCategory ,['population']);
    userEvent.selectOptions(selectCondition ,['maior que']);
    userEvent.type(numberImput, '2000000000');
    userEvent.click(buttonFilter);

    screen.getByRole('cell', { name: 'Naboo' } )
    screen.getByRole('cell', { name: 'Coruscant' } )
  });

  it('verifica se é possivel filtrar por um valor menor que a condição selecinada', async () => {
    render(<App />);

    const buttonFilter = await screen.findByRole('button', { name: 'Filtrar' });
    const selectCategory = await screen.findByTestId('column-filter');
    const selectCondition = await screen.findByTestId('comparison-filter');
    const numberImput = await screen.findByRole('spinbutton');

    userEvent.selectOptions(selectCategory ,['rotation_period']);
    userEvent.selectOptions(selectCondition ,['menor que']);
    userEvent.type(numberImput, '20');
    userEvent.click(buttonFilter);

    screen.getByRole('cell', { name: 'Bespin' } )
    screen.getByRole('cell', { name: 'Endor' } )
  });

  it('verifica se existe um botão para deletar os filtros com o nome "Remover todas filtragens"', async () => {
    render(<App />);

    const buttonRmFilter = await screen.findByRole('button', { name: 'Remover todas filtragens' });

    expect(buttonRmFilter).toBeInTheDocument();
  });

  it('verifica se é possivel deletar os filtros', async () => {
    render(<App />);

    const selectCategory = await screen.findByTestId('column-filter');
    const selectCondition = await screen.findByTestId('comparison-filter');
    const numberImput = await screen.findByRole('spinbutton');
    const buttonFilter = await screen.findByRole('button', { name: 'Filtrar' });
    const buttonRmFilter = await screen.findByRole('button', { name: 'Remover todas filtragens' });

    userEvent.selectOptions(selectCategory ,['rotation_period']);
    userEvent.selectOptions(selectCondition ,['menor que']);
    userEvent.type(numberImput, '20');
    userEvent.click(buttonFilter);

    expect(selectCategory.children.length).toBe(4);
    
    userEvent.click(buttonRmFilter)

    expect(selectCategory.children.length).toBe(5);
  });

  it('verifica se é possivel deletar os filtros', async () => {
    render(<App />);

    const selectCategory = await screen.findByTestId('column-filter');
    const selectCondition = await screen.findByTestId('comparison-filter');
    const numberImput = await screen.findByRole('spinbutton');
    const buttonFilter = await screen.findByRole('button', { name: 'Filtrar' });

    userEvent.selectOptions(selectCategory ,['rotation_period']);
    userEvent.selectOptions(selectCondition ,['igual a']);
    userEvent.type(numberImput, '23');
    userEvent.click(buttonFilter);
    userEvent.selectOptions(selectCategory ,['surface_water']);
    userEvent.selectOptions(selectCondition ,['maior que']);
    userEvent.type(numberImput, '1');
    userEvent.click(buttonFilter);
    userEvent.selectOptions(selectCategory ,['orbital_period']);
    userEvent.selectOptions(selectCondition ,['menor que']);
    userEvent.type(numberImput, '400');
    userEvent.click(buttonFilter);

    expect(selectCategory.children.length).toBe(2);
    
    const buttonRemoveFilter = screen.getAllByRole('button', { name: 'X' })

    userEvent.click(buttonRemoveFilter[2])
    
    expect(selectCategory.children.length).toBe(3);
    
    userEvent.click(buttonRemoveFilter[1])
    
    expect(selectCategory.children.length).toBe(4);

    userEvent.click(buttonRemoveFilter[0])
    
    expect(selectCategory.children.length).toBe(5);
  });
})
