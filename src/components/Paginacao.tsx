import { useInscricaoStore } from "../store/inscricaoStore";
import { useRecuperarInscricoesPaginadas } from "../hooks/useRecuperarInscricoesPaginadas";

const Paginacao = () => {
  // 1. Conecta-se ao Zustand
  const { turmaId, pagina, setPagina } = useInscricaoStore();

  // 2. Busca os dados para saber o total de páginas
  // O React Query usa o cache, então não há custo extra de rede aqui
  const { data } = useRecuperarInscricoesPaginadas(turmaId, pagina);

  // 3. Se não houver turma, dados ou só houver 1 página, esconde a paginação
  if (!turmaId || !data || data.totalPages <= 1) {
    return null;
  }

  const { totalPages } = data;

  // Funções de navegação
  const handleAnterior = () => {
    if (pagina > 0) {
      setPagina(pagina - 1);
    }
  };

  const handleProximo = () => {
    if (pagina < totalPages - 1) {
      setPagina(pagina + 1);
    }
  };

  // Cria um array com os números das páginas [0, 1, 2...]
  const paginas = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <nav aria-label="Navegação de página" className="mt-3">
      <ul className="pagination justify-content-center">
        {/* Botão Anterior */}
        <li className={`page-item ${pagina === 0 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={handleAnterior}
            disabled={pagina === 0}
          >
            <i className="bi bi-arrow-left"></i>
          </button>
        </li>

        {/* Números das Páginas */}
        {paginas.map((numPagina) => (
          <li
            key={numPagina}
            className={`page-item ${pagina === numPagina ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => setPagina(numPagina)}
            >
              {numPagina + 1} {/* Mostra 1 para o usuário, mas usa 0 internamente */}
            </button>
          </li>
        ))}

        {/* Botão Próximo */}
        <li
          className={`page-item ${
            pagina === totalPages - 1 ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={handleProximo}
            disabled={pagina === totalPages - 1}
          >
            <i className="bi bi-arrow-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Paginacao;
