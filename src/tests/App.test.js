import { render, screen, waitForElementToBeRemoved } from "@testing-library/react"
import App from "../App"
import { mockData } from "./helpers/mockData";

describe('1 - Testa a renderização da aplicação', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(
      async () => (
        { json: async () => (mockData)
      })
    );
  });

  it('verifica se a iniciar, é renderizado o texto "Carregando..."', async () => {
    render(<App />);
    
    await waitForElementToBeRemoved(() => screen.getByRole('heading', { name: 'Carregando...' }))
  });

  it('- verifica se é exibido um texto de erro caso a API retorne erro', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.reject('API.ERROR'));
    render(<App />);
    
    const loadingError = await screen.findByRole('heading', { name: 'Ocorreu um erro, tente recarregar a pagina' });
    
    expect(loadingError).toBeInTheDocument();
  });
  
  it('verifica se é carregado uma tabela de planetas', async () => {
    render(<App />);

    await screen.findByRole('cell', { name: 'Tatooine' });
  });
})


